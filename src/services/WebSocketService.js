import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { receiveMessage } from "../redux/chatSlice";
import { store } from "../redux/store";
import { getUserInfo } from "../redux/apiCalls";

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.connected = false;
    this.userId = null;
    this.notificationListeners = []; // Thêm array lưu trữ các listeners
    this.notifications = []; // Lưu trữ các thông báo
  }

  connect(userId) {
    if (this.connected && this.userId === userId) {
      return;
    }

    // Đóng kết nối cũ nếu có
    if (this.stompClient) {
      this.disconnect();
    }

    this.userId = userId;

    // Tạo STOMP client đúng cách
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS("https://abms-be.onrender.com/ws"),
      debug: function (str) {},
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // Xử lý khi kết nối thành công
    this.stompClient.onConnect = (frame) => {
      this.connected = true;

      // Đăng ký nhận tin nhắn
      this.stompClient.subscribe(`/user/${this.userId}/queue/messages`, async (message) => {
        try {
          const receivedMessage = JSON.parse(message.body);
          const { dispatch, getState } = store;
          const state = getState();

          // Kiểm tra xem người gửi có trong danh sách liên hệ không
          const existingContact = state.chat.contacts.find(
            (contact) => contact.userId === receivedMessage.senderId
          );

          // Nếu không tìm thấy liên hệ, lấy thông tin người dùng
          if (!existingContact) {
            try {
              // Lấy thông tin người dùng và thêm vào danh sách liên hệ
              await dispatch(getUserInfo(receivedMessage.senderId));
            } catch {}
          }

          // Sau đó mới dispatch tin nhắn
          dispatch(receiveMessage(receivedMessage));

          // Tạo event báo hiệu có tin nhắn mới để components có thể phản ứng
          const newMessageEvent = new CustomEvent("new-message", {
            detail: {
              messageData: receivedMessage,
              isNewContact: !existingContact,
            },
          });
          document.dispatchEvent(newMessageEvent);
        } catch {}
      });

      // Đăng ký nhận thông báo cá nhân
      this.stompClient.subscribe(`/user/${this.userId}/queue/notifications`, (message) => {
        try {
          const notification = JSON.parse(message.body);

          // Thêm thông báo vào danh sách
          this.notifications.unshift(notification);

          // Gọi tất cả các listeners đã đăng ký
          this.notifyListeners(notification);

          // Hiển thị toast thông báo
          this.showNotificationToast(notification);

          // Tạo event để các component khác có thể lắng nghe
          const newNotificationEvent = new CustomEvent("new-notification", {
            detail: { notification },
          });
          document.dispatchEvent(newNotificationEvent);
        } catch {}
      });

      // Đăng ký nhận thông báo toàn cục
      this.stompClient.subscribe("/topic/global-notifications", (message) => {
        try {
          const notification = JSON.parse(message.body);

          // Thêm thông báo vào danh sách
          this.notifications.unshift(notification);

          // Gọi tất cả các listeners đã đăng ký
          this.notifyListeners(notification);

          // Hiển thị toast thông báo
          this.showNotificationToast(notification, true);

          // Tạo event để các component khác có thể lắng nghe
          const globalNotificationEvent = new CustomEvent("global-notification", {
            detail: { notification },
          });
          document.dispatchEvent(globalNotificationEvent);
        } catch {}
      });
    };

    // Xử lý lỗi kết nối
    this.stompClient.onStompError = (frame) => {
      this.connected = false;
    };

    // Xử lý mất kết nối
    this.stompClient.onWebSocketClose = () => {
      this.connected = false;
    };

    // Bắt đầu kết nối
    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.connected = false;
      this.userId = null;
    }
  }

  sendMessage(messageData) {
    if (!this.connected || !this.stompClient) {
      return false;
    }

    this.stompClient.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(messageData),
    });

    return true;
  }

  // Phương thức hiển thị thông báo
  showNotificationToast(notification, isGlobal = false) {
    // Giả sử bạn có một hàm toast global hoặc sử dụng thư viện
    if (window.toast) {
      const toastType = notification.notificationType === "warning" ? "warning" : "info";
      const prefix = isGlobal ? "[THÔNG BÁO CHUNG] " : "";

      window.toast[toastType](prefix + notification.notificationContent, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      // Fallback khi không có thư viện toast
    }
  }

  // Phương thức đánh dấu thông báo đã đọc
  markNotificationAsRead(notificationId) {
    if (!this.connected || !this.stompClient) {
      return false;
    }

    this.stompClient.publish({
      destination: "/app/notification.read",
      body: JSON.stringify({
        notificationId: notificationId,
        userId: this.userId,
      }),
    });

    // Cập nhật trạng thái local
    const notification = this.notifications.find((n) => n.id === notificationId);
    if (notification) {
      notification.status = true;
      this.notifyListeners(); // Thông báo cập nhật
    }

    return true;
  }

  // Đăng ký listener để nhận cập nhật thông báo
  addNotificationListener(listener) {
    this.notificationListeners.push(listener);
    return () => {
      this.notificationListeners = this.notificationListeners.filter((l) => l !== listener);
    };
  }

  // Gọi tất cả listeners
  notifyListeners(newNotification = null) {
    this.notificationListeners.forEach((listener) => {
      listener(this.notifications, newNotification);
    });
  }

  // Lấy danh sách thông báo
  getNotifications() {
    return this.notifications;
  }

  // Lấy số lượng thông báo chưa đọc
  getUnreadCount() {
    return this.notifications.filter((n) => !n.status).length;
  }

  // Phương thức để lấy thông báo từ server
  async fetchNotifications() {
    try {
      if (!this.userId) {
        return;
      }

      const response = await fetch(`/notification/view_all?userId=${this.userId}`);
      if (!response.ok) {
        throw new Error("Không thể lấy thông báo");
      }

      const data = await response.json();
      if (data.data) {
        this.notifications = data.data;
        this.notifyListeners();
      }
    } catch {}
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
