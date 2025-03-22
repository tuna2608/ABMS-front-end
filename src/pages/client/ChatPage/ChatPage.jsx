import React, { useState, useRef, useEffect } from 'react';
import { 
  Layout, 
  Input, 
  Button, 
  Avatar, 
  List, 
  Typography, 
  Badge,
  Spin,
  message
} from 'antd';
import {
  SendOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import webSocketService from '../../../services/WebSocketService';
import { fetchContacts, getMessages, markMessagesAsRead } from '../../../redux/apiCalls';
import { setCurrentUser } from '../../../redux/chatSlice';

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;
const { TextArea } = Input;

const ChatPage = () => {
  // Redux
  const dispatch = useDispatch();
  const { messages, contacts, isFetching } = useSelector(state => state.chat);
  const currentUser = useSelector(state => state.user.currentUser);
  const userId = currentUser?.id || currentUser?.userId;

  // Local state
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Lấy danh sách liên hệ khi component mount
  useEffect(() => {
    if (userId) {
      // Cập nhật currentUserId trong state
      dispatch(setCurrentUser(userId));
      
      setLoading(true);
      dispatch(fetchContacts(userId))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
      
      // Kết nối WebSocket
      webSocketService.connect(userId);
    }
    
    return () => {
      webSocketService.disconnect();
    };
  }, [dispatch, userId]);

  // Lấy tin nhắn khi chọn liên hệ và đánh dấu đã đọc
  useEffect(() => {
    if (activeChat && userId) {
      dispatch(getMessages(activeChat, userId));
      
      // Đánh dấu tin nhắn là đã đọc
      dispatch(markMessagesAsRead(activeChat, userId));
    }
  }, [activeChat, dispatch, userId]);

  // Lắng nghe sự kiện tin nhắn mới
  useEffect(() => {
    const handleNewMessage = (event) => {
      const { messageData, isNewContact } = event.detail;
      
      // Nếu đây là tin nhắn từ người gửi mới và có thông tin liên hệ mới
      if (isNewContact) {
        // Hiển thị thông báo về tin nhắn mới
        message.info(`Bạn có tin nhắn mới từ ${messageData.senderName || 'người dùng mới'}`);
        
        // Làm mới danh sách liên hệ
        if (userId) {
          dispatch(fetchContacts(userId));
        }
      }
      
      // Nếu tin nhắn thuộc về cuộc trò chuyện hiện tại, đánh dấu là đã đọc
      if (activeChat === messageData.senderId) {
        dispatch(markMessagesAsRead(messageData.senderId, userId));
      }
    };

    document.addEventListener('new-message', handleNewMessage);

    return () => {
      document.removeEventListener('new-message', handleNewMessage);
    };
  }, [activeChat, dispatch, userId]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Lọc danh sách liên hệ
  const filteredContacts = contacts && contacts.length > 0
    ? contacts.filter(contact => 
        (contact.fullName || contact.userName || "")
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      )
    : [];
  
  // Xử lý gửi tin nhắn
  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeChat) return;
    
    const messageData = {
      senderId: userId,
      receiverId: activeChat,
      content: messageInput
    };
    
    webSocketService.sendMessage(messageData);
    setMessageInput('');
  };

  // Lấy thông tin liên hệ đang active
  const getActiveContact = () => {
    if (contacts && contacts.length > 0) {
      return contacts.find(c => c.userId === activeChat);
    }
    return null;
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      
      if (diffMins < 1) return 'Vừa xong';
      if (diffMins < 60) return `${diffMins} phút trước`;
      if (diffMins < 1440) return `${Math.floor(diffMins/60)}h trước`;
      
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return timestamp;
    }
  };

  // Render danh sách tin nhắn
  const renderMessages = () => {
    if (!messages || messages.length === 0) {
      return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Text type="secondary">Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!</Text>
        </div>
      );
    }
    
    // Lọc tin nhắn chỉ hiển thị tin nhắn của cuộc trò chuyện hiện tại
    const filteredMessages = messages.filter(msg => 
      (msg.senderId === activeChat && msg.receiverId === userId) || 
      (msg.senderId === userId && msg.receiverId === activeChat)
    );
    
    if (filteredMessages.length === 0) {
      return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Text type="secondary">Chưa có tin nhắn nào với người dùng này. Hãy bắt đầu cuộc trò chuyện!</Text>
        </div>
      );
    }
    
    return filteredMessages.map((msg) => {
      const isUserMessage = msg.senderId === userId;
      
      return (
        <div
          key={msg.id}
          style={{
            display: 'flex',
            justifyContent: isUserMessage ? 'flex-end' : 'flex-start',
            marginBottom: 8,
          }}
        >
          {!isUserMessage && (
            <Avatar
              src={getActiveContact()?.userImgUrl}
              style={{ marginRight: 8, flexShrink: 0 }}
            >
              {getActiveContact()?.fullName?.charAt(0) || getActiveContact()?.userName?.charAt(0)}
            </Avatar>
          )}
          <div>
            {!isUserMessage && (
              <Text style={{ fontSize: '12px', marginLeft: 5 }}>
                {getActiveContact()?.fullName || getActiveContact()?.userName}
              </Text>
            )}
            <div
              style={{
                background: isUserMessage ? '#1890ff' : '#f0f0f0',
                color: isUserMessage ? 'white' : 'black',
                padding: '8px 12px',
                borderRadius: 16,
                maxWidth: 400,
                wordWrap: 'break-word',
                marginTop: !isUserMessage ? 4 : 0,
              }}
            >
              {msg.content}
            </div>
            <div
              style={{
                fontSize: '11px',
                marginTop: 4,
                textAlign: isUserMessage ? 'right' : 'left',
                paddingLeft: 5,
                color: '#888',
              }}
            >
              {formatTime(msg.timestamp)}
            </div>
          </div>
        </div>
      );
    });
  };

  // Xử lý chọn liên hệ - Đã tối ưu để xóa thông báo tin nhắn mới
  const handleSelectContact = (contactId) => {
    // Nếu đang chọn cùng một liên hệ, không làm gì cả
    if (contactId === activeChat) return;
    
    setActiveChat(contactId);
    
    // Lập tức đánh dấu là đã đọc khi nhấn vào liên hệ
    if (contactId && userId) {
      dispatch(markMessagesAsRead(contactId, userId));
    }
  };

  const activeContact = getActiveContact();

  return (
    <Layout style={{ height: '100vh' }}>
      {/* Sidebar - danh sách liên hệ */}
      <Sider 
        width={320} 
        theme="light" 
        style={{ 
          borderRight: '1px solid #f0f0f0',
          overflow: 'auto',
          height: '100vh'
        }}
      >
        <div style={{ padding: '16px 16px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Title level={4} style={{ margin: 0 }}>Chat</Title>
          </div>
          
          {/* Thanh tìm kiếm */}
          <Input
            placeholder="Tìm kiếm liên hệ"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            prefix={<SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
            style={{ marginBottom: 16 }}
            allowClear
          />
        </div>

        {/* Danh sách liên hệ */}
        {loading || isFetching ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin tip="Đang tải..." />
          </div>
        ) : (
          <List
            dataSource={filteredContacts}
            locale={{ emptyText: 'Không tìm thấy liên hệ nào' }}
            renderItem={(contact) => (
              <List.Item
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  background: activeChat === contact.userId ? '#f0f0f0' : 'transparent',
                  position: 'relative',
                  borderBottom: '1px solid #f0f0f0',
                }}
                onClick={() => handleSelectContact(contact.userId)}
              >
                <List.Item.Meta
                  avatar={
                    <Badge dot={false} color="green">
                      <Avatar src={contact.userImgUrl} size={48}>
                        {(contact.fullName || contact.userName)?.charAt(0)}
                      </Avatar>
                    </Badge>
                  }
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong>{contact.fullName || contact.userName}</Text>
                      {contact.unreadCount > 0 && (
                        <Badge count={contact.unreadCount} size="small" />
                      )}
                    </div>
                  }
                  description={
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {contact.unreadCount > 0 
                        ? `${contact.unreadCount} tin nhắn chưa đọc`
                        : 'Không có tin nhắn mới'}
                    </Text>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Sider>

      {/* Main Chat Area */}
      <Layout>
        {activeContact ? (
          <>
            {/* Chat Header */}
            <Header
              style={{
                background: '#fff',
                padding: '0 24px',
                display: 'flex',
                alignItems: 'center',
                height: 64,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  src={activeContact.userImgUrl} 
                  size={40} 
                  style={{ marginRight: 10 }}
                >
                  {(activeContact.fullName || activeContact.userName)?.charAt(0)}
                </Avatar>
                <div>
                  <Title level={5} style={{ margin: 0 }}>
                    {activeContact.fullName || activeContact.userName}
                  </Title>
                </div>
              </div>
            </Header>

            {/* Chat content */}
            <Content
              style={{
                padding: '24px',
                height: 'calc(100vh - 64px - 70px)',
                overflowY: 'auto',
                background: '#fff',
              }}
            >
              {isFetching ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  <Spin tip="Đang tải tin nhắn..." />
                </div>
              ) : (
                <>
                  {renderMessages()}
                  <div ref={messagesEndRef} />
                </>
              )}
            </Content>

            {/* Message Input Area */}
            <div
              style={{
                display: 'flex',
                padding: '12px 24px',
                background: '#fff',
                borderTop: '1px solid #f0f0f0',
                position: 'sticky',
                bottom: 0,
                alignItems: 'center',
                height: 70
              }}
            >
              <TextArea
                placeholder="Nhập tin nhắn..."
                autoSize={{ minRows: 1, maxRows: 4 }}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                style={{ 
                  borderRadius: 20,
                  resize: 'none',
                  padding: '10px 15px'
                }}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<SendOutlined />}
                style={{ marginLeft: 8 }}
                onClick={handleSendMessage}
              />
            </div>
          </>
        ) : (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            background: '#fff'
          }}>
            <div style={{ textAlign: 'center' }}>
              <Title level={4}>Chọn một liên hệ để bắt đầu trò chuyện</Title>
              <Text type="secondary">Hãy bắt đầu cuộc trò chuyện với một liên hệ từ danh sách</Text>
            </div>
          </div>
        )}
      </Layout>
    </Layout>
  );
};

export default ChatPage;