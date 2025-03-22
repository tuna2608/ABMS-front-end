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
}

const webSocketService = new WebSocketService();
export default webSocketService;