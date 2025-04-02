import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { receiveMessage } from '../redux/chatSlice';
import { store } from '../redux/store';
import { getUserInfo } from '../redux/apiCalls';

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
      console.log('WebSocket đã kết nối');
      return;
    }
    
    // Đóng kết nối cũ nếu có
    if (this.stompClient) {
      this.disconnect();
    }
    
    this.userId = userId;
    
    // Tạo STOMP client đúng cách
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      debug: function (str) {
        // console.log(str); // Bỏ comment nếu muốn xem logs
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // Xử lý khi kết nối thành công
    this.stompClient.onConnect = (frame) => {
      this.connected = true;
      console.log('WebSocket kết nối thành công');
      
      // Đăng ký nhận tin nhắn
      this.stompClient.subscribe(`/user/${this.userId}/queue/messages`, async (message) => {
        try {
          const receivedMessage = JSON.parse(message.body);
          const { dispatch, getState } = store;
          const state = getState();
          
          // Kiểm tra xem người gửi có trong danh sách liên hệ không
          const existingContact = state.chat.contacts.find(
            contact => contact.userId === receivedMessage.senderId
          );
          
          // Nếu không tìm thấy liên hệ, lấy thông tin người dùng
          if (!existingContact) {
            try {
              // Lấy thông tin người dùng và thêm vào danh sách liên hệ
              await dispatch(getUserInfo(receivedMessage.senderId));
            } catch (error) {
              console.error('Lỗi khi lấy thông tin người dùng mới:', error);
            }
          }
          
          // Sau đó mới dispatch tin nhắn
          dispatch(receiveMessage(receivedMessage));
          
          // Tạo event báo hiệu có tin nhắn mới để components có thể phản ứng
          const newMessageEvent = new CustomEvent('new-message', { 
            detail: {
              messageData: receivedMessage,
              isNewContact: !existingContact
            }
          });
          document.dispatchEvent(newMessageEvent);
        } catch (error) {
          console.error('Lỗi khi xử lý tin nhắn:', error);
        }
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
          const newNotificationEvent = new CustomEvent('new-notification', { 
            detail: { notification }
          });
          document.dispatchEvent(newNotificationEvent);
        } catch (error) {
          console.error('Lỗi khi xử lý thông báo:', error);
        }
      });
      
      // Đăng ký nhận thông báo toàn cục
      this.stompClient.subscribe('/topic/global-notifications', (message) => {
        try {
          const notification = JSON.parse(message.body);
          
          // Thêm thông báo vào danh sách
          this.notifications.unshift(notification);
          
          // Gọi tất cả các listeners đã đăng ký
          this.notifyListeners(notification);
          
          // Hiển thị toast thông báo
          this.showNotificationToast(notification, true);
          
          // Tạo event để các component khác có thể lắng nghe
          const globalNotificationEvent = new CustomEvent('global-notification', { 
            detail: { notification }
          });
          document.dispatchEvent(globalNotificationEvent);
        } catch (error) {
          console.error('Lỗi khi xử lý thông báo toàn cục:', error);
        }
      });
    };

    // Xử lý lỗi kết nối
    this.stompClient.onStompError = (frame) => {
      console.error('Lỗi STOMP:', frame.headers['message']);
      this.connected = false;
    };
    
    // Xử lý mất kết nối
    this.stompClient.onWebSocketClose = () => {
      console.log('WebSocket bị đóng');
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
      console.log('WebSocket đã ngắt kết nối');
    }
  }

  sendMessage(messageData) {
    if (!this.connected || !this.stompClient) {
      console.error('Không thể gửi tin nhắn: WebSocket chưa kết nối');
      return false;
    }
    
    this.stompClient.publish({
      destination: '/app/chat.send',
      body: JSON.stringify(messageData)
    });
    
    return true;
  }
  
  // Phương thức hiển thị thông báo
  showNotificationToast(notification, isGlobal = false) {
    // Giả sử bạn có một hàm toast global hoặc sử dụng thư viện
    if (window.toast) {
      const toastType = notification.notificationType === 'warning' ? 'warning' : 'info';
      const prefix = isGlobal ? '[THÔNG BÁO CHUNG] ' : '';
      
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
      console.log('Thông báo mới:', notification.notificationContent);
    }
  }
  
  // Phương thức đánh dấu thông báo đã đọc
  markNotificationAsRead(notificationId) {
    if (!this.connected || !this.stompClient) {
      console.error('Không thể đánh dấu thông báo: WebSocket chưa kết nối');
      return false;
    }
    
    this.stompClient.publish({
      destination: '/app/notification.read',
      body: JSON.stringify({
        notificationId: notificationId,
        userId: this.userId
      })
    });
    
    // Cập nhật trạng thái local
    const notification = this.notifications.find(n => n.id === notificationId);
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
      this.notificationListeners = this.notificationListeners.filter(l => l !== listener);
    };
  }
  
  // Gọi tất cả listeners
  notifyListeners(newNotification = null) {
    this.notificationListeners.forEach(listener => {
      listener(this.notifications, newNotification);
    });
  }
  
  // Lấy danh sách thông báo
  getNotifications() {
    return this.notifications;
  }
  
  // Lấy số lượng thông báo chưa đọc
  getUnreadCount() {
    return this.notifications.filter(n => !n.status).length;
  }
  
  // Phương thức để lấy thông báo từ server
  async fetchNotifications() {
    try {
      if (!this.userId) {
        console.error('Chưa có userId để lấy thông báo');
        return;
      }
      
      const response = await fetch(`/notification/view_all?userId=${this.userId}`);
      if (!response.ok) {
        throw new Error('Không thể lấy thông báo');
      }
      
      const data = await response.json();
      if (data.data) {
        this.notifications = data.data;
        this.notifyListeners();
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông báo:', error);
    }
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;