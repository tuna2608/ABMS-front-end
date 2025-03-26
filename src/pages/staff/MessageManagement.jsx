import React, { useState } from "react";
import { 
  Card, 
  Space, 
  List, 
  Button
} from "antd";
import { 
  MessageOutlined,
  CommentOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const MessageManagement = ({ onReplyMessage }) => {
  const navigate = useNavigate();
  const [messages] = useState([
    {
      id: '1',
      sender: 'Nguyễn Văn A',
      content: 'Tôi muốn hỏi về việc đặt cọc căn hộ',
      timestamp: '2025-03-25T10:30:00Z',
      status: 'unread'
    }
  ]);

  const navigateToChatPage = () => {
    navigate('/chat-page');
  };

  const renderMessageActions = (message) => [
    <Button 
      type="link" 
      onClick={() => onReplyMessage(message)}
    >
      Trả lời
    </Button>
  ];

  return (
    <Card 
      title={
        <Space>
          <MessageOutlined /> 
          <span>Quản lý tin nhắn</span>
        </Space>
      } 
      extra={
        <Button 
          type="primary" 
          icon={<CommentOutlined />} 
          onClick={navigateToChatPage}
        >
          Chuyển sang Chat
        </Button>
      }
    >
      <List
        itemLayout="vertical"
        dataSource={messages}
        renderItem={(message) => (
          <List.Item
            key={message.id}
            actions={renderMessageActions(message)}
          >
            <List.Item.Meta
              title={`Từ: ${message.sender}`}
              description={new Date(message.timestamp).toLocaleString()}
            />
            {message.content}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default MessageManagement;