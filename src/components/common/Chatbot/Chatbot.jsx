import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Avatar, Typography, Space } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, sendMessage } from '../../../redux/apiCalls';
import webSocketService from '../../../services/WebSocketService';

const { Text } = Typography;

const ChatBox = ({ receiverId, receiverName, onClose, hideFloatingButton = false }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?.id || currentUser?.userId;

  const [inputValue, setInputValue] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const messagesEndRef = useRef(null);

  // Kết nối WebSocket khi component mount
  useEffect(() => {
    if (userId) {
      webSocketService.connect(userId);
      dispatch(getMessages(receiverId, userId)); // Thêm userId
    }
    
    return () => {
      webSocketService.disconnect();
    };
  }, [userId, receiverId, dispatch]);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const messageData = {
      senderId: userId,
      receiverId: receiverId,
      content: inputValue
    };
    
    // dispatch(sendMessage(messageData));
    webSocketService.sendMessage(messageData);
    setInputValue('');
  };

  // Hàm format timestamp đã sửa để xử lý chuỗi
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      console.error("Error formatting timestamp:", e);
      return '';
    }
  };

  const handleClose = () => {
    setIsChatOpen(false);
    onClose && onClose();
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', width: '350px', height: '500px', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', zIndex: 1000 }}>
      {/* Header */}
      <div style={{ background: '#1890ff', color: 'white', padding: '10px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Space>
          <Avatar style={{ backgroundColor: 'white', color: '#1890ff' }}>
            {receiverName?.charAt(0).toUpperCase()}
          </Avatar>
          <Text style={{ color: 'white' }}>{receiverName}</Text>
        </Space>
        <Button type="text" icon={<CloseOutlined />} onClick={handleClose} style={{ color: 'white' }} />
      </div>

      {/* Vùng hiển thị tin nhắn */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: msg.senderId === userId ? 'row-reverse' : 'row', marginBottom: '10px' }}>
            <Avatar style={{ backgroundColor: msg.senderId === userId ? '#1890ff' : '#52c41a' }}>
              {msg.senderId === userId 
                ? currentUser.fullName?.charAt(0).toUpperCase() || userId.toString().charAt(0)
                : receiverName?.charAt(0).toUpperCase()}
            </Avatar>
            <div style={{ maxWidth: '70%', backgroundColor: msg.senderId === userId ? '#1890ff' : '#f0f0f0', color: msg.senderId === userId ? 'white' : 'black', padding: '10px', borderRadius: '8px', marginLeft: msg.senderId === userId ? '0' : '10px', marginRight: msg.senderId === userId ? '10px' : '0' }}>
              <Text style={{ color: msg.senderId === userId ? 'white' : 'inherit' }}>{msg.content}</Text>
              <div style={{ fontSize: '10px', color: msg.senderId === userId ? 'rgba(255,255,255,0.7)' : 'gray', textAlign: 'right', marginTop: '2px' }}>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Ô nhập tin nhắn */}
      <div style={{ padding: '10px', borderTop: '1px solid #e8e8e8' }}>
        <Input
          placeholder="Nhập tin nhắn..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSendMessage}
          suffix={
            <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} disabled={!inputValue.trim()} />
          }
        />
      </div>
    </div>
  );
};

export default ChatBox;