import React, { useState, useRef, useEffect } from 'react';
import { 
  Layout, 
  Input, 
  Button, 
  Avatar, 
  List, 
  Typography, 
  Space, 
  Badge, 
  Tooltip, 
  Menu, 
  Dropdown, 
  Modal,
  message
} from 'antd';
import {
  SearchOutlined,
  SendOutlined,
  SettingOutlined,
  EllipsisOutlined,
  SmileOutlined,
  PaperClipOutlined,
  FileImageOutlined,
  BellOutlined,
  PlusOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  ExpandAltOutlined,
  MoreOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;
const { TextArea } = Input;

// Dữ liệu mẫu danh sách cuộc trò chuyện
const conversationsList = [
  {
    id: 1,
    name: "Đồ Án Tốt Nghiệp PPT 🔥",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=11",
    lastMessage: "Xin chào, tôi muốn hỏi thêm về căn hộ",
    time: "8 giờ trước",
    isGroup: true,
    unread: 3,
    members: "Văn, admin • 1m"
  },
  {
    id: 2,
    name: "Cộng đồng căn đấu văn",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=12",
    lastMessage: "Sống trẻ - quận • Ngày mai • Có video",
    time: "1 giờ trước",
    isGroup: true,
    members: "1h"
  },
  {
    id: 3,
    name: "Ẩn Văn Phú Việt Hàn - fPT Đà Nẵng",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=13",
    lastMessage: "Ẩn Trả Lưu Lượng Đi FpT?",
    time: "1 ngày trước",
    description: "Phước sent a video • 58m"
  },
  {
    id: 4,
    name: "Thư Ngọ",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=14",
    lastMessage: "zalozalobom",
    time: "2 ngày trước",
    isOnline: true
  },
  {
    id: 5,
    name: "Nhà thương thức nghệ thuật chị lịch",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=15",
    lastMessage: "Xích đáng trợt 4 mới",
    time: "5 giờ trước",
    description: "1h"
  },
  {
    id: 6,
    name: "Sứ thỉ 🍎",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=16",
    lastMessage: "Chị ơi á Văn 2h",
    time: "6 giờ trước",
  },
  {
    id: 7,
    name: "AKĩnDiBăr",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=17",
    lastMessage: "Đang đợi hiện tên và ních còm lưu...",
    time: "1 ngày trước",
  },
  {
    id: 8,
    name: "Dũng Nguyễn",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=18",
    lastMessage: "sáng có Tuấn",
    time: "2 ngày trước",
  },
  {
    id: 9,
    name: "Thái Nguyễn",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=19",
    lastMessage: "Hôm nay",
    time: "3 ngày trước",
    isOnline: true
  }
];

// Dữ liệu mẫu các tin nhắn
const messagesList = [
  {
    id: 1,
    content: "Xin chào, tôi muốn hỏi thêm về căn hộ Vinhomes Central Park.",
    time: "10:30 AM",
    sender: "me",
  },
  {
    id: 2,
    content: "Chào bạn, tôi có thể giúp gì cho bạn?",
    time: "10:32 AM",
    sender: "other",
    senderName: "chatbot hỏi",
    senderAvatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=20"
  },
  {
    id: 3,
    content: "ừn chat ở trang detail nó nhìn tên cái box như messenger",
    time: "3h",
    sender: "me",
  },
  {
    id: 4,
    content: "còn chat box ở trang admin",
    time: "3h",
    sender: "other",
    senderName: "chatbot hỏi",
    senderAvatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=20"
  },
  {
    id: 5,
    content: "thì như này",
    time: "2h",
    sender: "me",
  },
  {
    id: 6,
    isSystem: true,
    content: "You replied to yourself",
    time: "1h"
  },
  {
    id: 7,
    content: "còn chat box ở trang admin",
    time: "1h",
    sender: "me",
  },
  {
    id: 8,
    isSystem: true,
    content: "You replied to yourself",
    time: "30m"
  },
  {
    id: 9,
    content: "admin và owners",
    time: "30m",
    sender: "me",
  },
  {
    id: 10,
    content: "okra",
    time: "15m",
    sender: "other",
    senderName: "chatbot hỏi",
    senderAvatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=20"
  }
];

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [messages, setMessages] = useState(messagesList);
  const [messageInput, setMessageInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const messagesEndRef = useRef(null);

  const filteredConversations = conversationsList.filter(
    (chat) => chat.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Xử lý gửi tin nhắn
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      content: messageInput,
      time: 'just now',
      sender: 'me',
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
    
    // Giả lập tin nhắn phản hồi 
    if (!isAdminMode) {
      setTimeout(() => {
        const autoReply = {
          id: messages.length + 2,
          content: 'Cảm ơn bạn đã nhắn tin. Admin sẽ phản hồi sớm nhất có thể.',
          time: 'just now',
          sender: 'other',
          senderName: 'chatbot hỏi',
          senderAvatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=20"
        };
        setMessages(prev => [...prev, autoReply]);
      }, 1000);
    }
  };

  // Mở modal chuyển chức năng admin
  const showAdminModal = () => {
    setIsModalVisible(true);
  };

  // Xử lý chuyển chức năng admin
  const handleSwitchToAdmin = () => {
    setIsAdminMode(true);
    setIsModalVisible(false);
    message.success('Đã chuyển sang chế độ Admin/Owner');
  };

  const getActiveConversation = () => {
    return conversationsList.find(conv => conv.id === activeChat) || conversationsList[0];
  };

  // Render danh sách tin nhắn
  const renderMessages = () => {
    return messages.map((msg) => {
      if (msg.isSystem) {
        return (
          <div 
            key={msg.id} 
            style={{ 
              textAlign: 'center',
              margin: '8px 0',
              color: '#888',
              fontSize: '12px'
            }}
          >
            <Text type="secondary">{msg.content}</Text>
          </div>
        );
      }
      
      const isUserMessage = msg.sender === 'me';
      
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
              src={msg.senderAvatar}
              style={{ marginRight: 8, flexShrink: 0 }}
            />
          )}
          <div>
            {!isUserMessage && (
              <Text style={{ fontSize: '12px', marginLeft: 5 }}>{msg.senderName}</Text>
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
              {msg.time}
            </div>
          </div>
        </div>
      );
    });
  };

  // Menu dropdown cho nút tùy chọn thêm
  const moreOptionsMenu = (
    <Menu>
      <Menu.Item key="admin" onClick={showAdminModal}>
        <Badge status={isAdminMode ? "success" : "default"} text={isAdminMode ? "Admin Mode (On)" : "Switch to Admin Mode"} />
      </Menu.Item>
      <Menu.Item key="preferences">
        <SettingOutlined /> Preferences
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="help">
        <InfoCircleOutlined /> Help & Support
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: '100vh' }}>
      {/* Sidebar - danh sách cuộc trò chuyện */}
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
            <Space>
              <Badge count={5}>
                <Button shape="circle" icon={<BellOutlined />} />
              </Badge>
              <Dropdown overlay={moreOptionsMenu} placement="bottomRight">
                <Button shape="circle" icon={<EllipsisOutlined />} />
              </Dropdown>
            </Space>
          </div>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm tin nhắn"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{ marginBottom: 8 }}
          />
        </div>

        <List
          dataSource={filteredConversations}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                background: activeChat === item.id ? '#f0f0f0' : 'transparent',
                position: 'relative',
                borderBottom: '1px solid #f0f0f0',
              }}
              onClick={() => setActiveChat(item.id)}
            >
              <List.Item.Meta
                avatar={
                  <Badge dot={item.isOnline} offset={[-2, 32]} color="green">
                    <Avatar src={item.avatar} size={48} />
                  </Badge>
                }
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong>{item.name}</Text>
                    <Space>
                      {item.unread && (
                        <Badge count={item.unread} size="small" style={{ marginRight: 4 }} />
                      )}
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {item.time}
                      </Text>
                    </Space>
                  </div>
                }
                description={
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text
                      type="secondary"
                      ellipsis={{ tooltip: item.lastMessage }}
                      style={{ fontSize: '13px' }}
                    >
                      {item.lastMessage}
                    </Text>
                    {item.description && (
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {item.description}
                      </Text>
                    )}
                    {item.members && (
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {item.members}
                      </Text>
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Sider>

      {/* Main Chat Area */}
      <Layout>
        {/* Chat Header */}
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              src={getActiveConversation().avatar} 
              size={40} 
              style={{ marginRight: 10 }}
            />
            <div>
              <Title level={5} style={{ margin: 0 }}>
                {getActiveConversation().name}
              </Title>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {getActiveConversation().isOnline ? 'Đang hoạt động' : 'Hoạt động ' + getActiveConversation().time}
              </Text>
            </div>
          </div>
          <Space>
            {isAdminMode && (
              <Badge dot color="green">
                <Tooltip title="Admin Mode Active">
                  <Button 
                    type="primary" 
                    shape="round" 
                    icon={<CheckCircleOutlined />}
                  >
                    Admin
                  </Button>
                </Tooltip>
              </Badge>
            )}
            <Button icon={<InfoCircleOutlined />} />
            <Button icon={<ExpandAltOutlined />} />
            <Button icon={<MoreOutlined />} />
          </Space>
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
          {renderMessages()}
          <div ref={messagesEndRef} />
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
          <Space style={{ marginRight: 8 }}>
            <Button 
              type="text" 
              shape="circle" 
              icon={<PlusOutlined />} 
              size="large"
            />
            <Button 
              type="text" 
              shape="circle" 
              icon={<FileImageOutlined />} 
              size="large"
            />
            <Button 
              type="text" 
              shape="circle" 
              icon={<PaperClipOutlined />} 
              size="large"
            />
          </Space>
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
          <Button
            type="text"
            shape="circle"
            icon={<SmileOutlined />}
            style={{ marginLeft: 8 }}
          />
        </div>
      </Layout>

      {/* Admin Role Modal */}
      <Modal
        title="Chuyển sang chế độ Admin/Owner"
        visible={isModalVisible}
        onOk={handleSwitchToAdmin}
        onCancel={() => setIsModalVisible(false)}
        okText="Chuyển đổi"
        cancelText="Hủy bỏ"
      >
        <p>Bạn muốn chuyển sang chế độ Admin/Owner để quản lý các tin nhắn và người dùng?</p>
        {isAdminMode && (
          <p style={{ color: '#52c41a' }}>
            <CheckCircleOutlined /> Bạn đang ở chế độ Admin/Owner
          </p>
        )}
      </Modal>
    </Layout>
  );
};

export default ChatPage;