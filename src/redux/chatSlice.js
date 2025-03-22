import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  contacts: [], 
  selectedContact: null, 
  currentUserId: null,
  isFetching: false,
  error: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getMessagesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getMessagesSuccess: (state, action) => {
      state.isFetching = false;
      state.messages = action.payload;
    },
    getMessagesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    sendMessageStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    sendMessageSuccess: (state, action) => {
      state.isFetching = false;
      // Đảm bảo timestamp là chuỗi
      const message = {
        ...action.payload,
        timestamp: typeof action.payload.timestamp === 'object' 
          ? action.payload.timestamp.toISOString() 
          : action.payload.timestamp
      };
      state.messages.push(message);
    },
    sendMessageFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    receiveMessage: (state, action) => {
      // Kiểm tra nếu tin nhắn đã tồn tại (để tránh trùng lặp)
      const isDuplicate = state.messages.some(msg => 
        (msg.id && msg.id === action.payload.id) || 
        (msg.senderId === action.payload.senderId && 
         msg.receiverId === action.payload.receiverId &&
         msg.content === action.payload.content && 
         msg.timestamp === action.payload.timestamp)
      );
      
      if (!isDuplicate) {
        // Thêm tin nhắn mới
        state.messages.push(action.payload);
        
        // Cập nhật số tin nhắn chưa đọc nếu người gửi không phải là người dùng hiện tại
        // và người nhận là người dùng hiện tại
        if (action.payload.senderId !== state.currentUserId && 
            action.payload.receiverId === state.currentUserId) {
            
          // Kiểm tra xem liên hệ này đã có trong danh sách chưa
          const contactIndex = state.contacts.findIndex(
            contact => contact.userId === action.payload.senderId
          );
          
          if (contactIndex !== -1) {
            // Nếu liên hệ đã tồn tại, tăng số tin nhắn chưa đọc
            if (!state.contacts[contactIndex].unreadCount) {
              state.contacts[contactIndex].unreadCount = 1;
            } else {
              state.contacts[contactIndex].unreadCount += 1;
            }
          }
        }
      }
    },
    fetchContactsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    fetchContactsSuccess: (state, action) => {
      state.isFetching = false;
      state.contacts = action.payload;
    },
    fetchContactsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    selectContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    // Thêm reducers cho việc đánh dấu tin nhắn là đã đọc
    markMessagesAsReadStart: (state) => {
      state.isFetching = true;
    },
    markMessagesAsReadSuccess: (state, action) => {
      state.isFetching = false;
      const contactId = action.payload;
      
      if (contactId) {
        // Đánh dấu tin nhắn là đã đọc
        state.messages = state.messages.map(msg => {
          if (msg.senderId === contactId && !msg.read) {
            return { ...msg, read: true };
          }
          return msg;
        });
        
        // Cập nhật số tin nhắn chưa đọc về 0
        const contactIndex = state.contacts.findIndex(
          contact => contact.userId === contactId
        );
        
        if (contactIndex !== -1) {
          state.contacts[contactIndex].unreadCount = 0;
        }
      }
    },
    markMessagesAsReadFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    setCurrentUser: (state, action) => {
      state.currentUserId = action.payload;
    },
    // Thêm reducer để cập nhật liên hệ khi có tin nhắn mới từ người chưa có trong danh sách
    addNewContact: (state, action) => {
      const newContact = action.payload;
      // Kiểm tra xem người liên hệ đã có trong danh sách chưa
      const exists = state.contacts.some(contact => contact.userId === newContact.userId);
      
      if (!exists) {
        state.contacts.push(newContact);
      }
    }
  },
});

export const {
  getMessagesStart,
  getMessagesSuccess,
  getMessagesFailure,
  sendMessageStart,
  sendMessageSuccess,
  sendMessageFailure,
  receiveMessage,
  fetchContactsStart,
  fetchContactsSuccess,
  fetchContactsFailure,
  selectContact,
  markMessagesAsReadStart,
  markMessagesAsReadSuccess,
  markMessagesAsReadFailure,
  setCurrentUser,
  addNewContact
} = chatSlice.actions;

export default chatSlice.reducer;