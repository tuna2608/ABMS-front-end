import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  Input, 
  Button, 
  Avatar, 
  Typography, 
  Space, 
  Badge, 
  Tooltip,
} from 'antd';
import { 
  SendOutlined, 
  UserOutlined, 
  RobotOutlined, 
  CloseOutlined, 
  EnvironmentOutlined,
  DollarOutlined,
  PictureOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined,
  MessageOutlined 
} from '@ant-design/icons';

const { Text, Title, Paragraph } = Typography;

// Mẫu câu hỏi thường gặp
const commonQuestions = [
  "Tôi muốn thuê căn hộ tại quận 2",
  "Quy trình đặt cọc như thế nào?",
  "Thời gian tham quan căn hộ",
  "Chi phí dịch vụ hàng tháng"
];

// Mẫu dữ liệu căn hộ đề xuất
const suggestedApartments = [
  {
    id: 1,
    title: "Căn hộ cao cấp Vinhomes Central Park",
    price: 5800000,
    address: "Quận Bình Thạnh, TP.HCM",
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    id: 2,
    title: "Studio căn hộ The Sun Avenue",
    price: 3500000,
    address: "Quận 2, TP.HCM",
    image: "https://picsum.photos/100/100?random=2"
  },
  {
    id: 3,
    title: "Căn hộ 2 phòng ngủ Gateway Thảo Điền",
    price: 6000000,
    address: "Quận 2, TP.HCM",
    image: "https://picsum.photos/100/100?random=3"
  }
];

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Xin chào! Tôi là trợ lý ảo của hệ thống quản lý căn hộ. Tôi có thể giúp gì cho bạn?',
      time: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Xử lý gửi tin nhắn
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Thêm tin nhắn người dùng vào danh sách
    const newUserMessage = {
      type: 'user',
      content: inputValue,
      time: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Giả lập bot đang nhập
    setTimeout(() => {
      // Xử lý câu trả lời từ bot
      let botResponse;
      const userInput = inputValue.toLowerCase();

      if (userInput.includes('thuê') || userInput.includes('giá')) {
        botResponse = {
          type: 'bot',
          content: 'Chúng tôi có nhiều căn hộ cho thuê với mức giá đa dạng. Dưới đây là một số căn hộ có thể phù hợp với bạn:',
          time: new Date(),
          suggestions: suggestedApartments
        };
      } else if (userInput.includes('đặt cọc') || userInput.includes('quy trình')) {
        botResponse = {
          type: 'bot',
          content: 'Quy trình đặt cọc như sau: 1) Tham quan căn hộ 2) Đặt cọc 30% giá trị hợp đồng 3) Ký hợp đồng chính thức trong vòng 7 ngày 4) Thanh toán đủ và nhận nhà',
          time: new Date()
        };
      } else if (userInput.includes('tham quan') || userInput.includes('xem nhà')) {
        botResponse = {
          type: 'bot',
          content: 'Bạn có thể đặt lịch tham quan căn hộ vào tất cả các ngày trong tuần, từ 8h00 đến 18h00. Vui lòng đặt lịch trước ít nhất 1 ngày để chúng tôi sắp xếp nhân viên hỗ trợ.',
          time: new Date()
        };
      } else if (userInput.includes('chi phí') || userInput.includes('phí dịch vụ')) {
        botResponse = {
          type: 'bot',
          content: 'Chi phí dịch vụ hàng tháng tùy thuộc vào từng tòa nhà, thông thường dao động từ 10.000 đến 15.000 VNĐ/m². Đã bao gồm phí quản lý, bảo vệ, vệ sinh và bảo trì cơ sở vật chất.',
          time: new Date()
        };
      } else {
        botResponse = {
          type: 'bot',
          content: 'Cảm ơn bạn đã liên hệ. Nhân viên tư vấn của chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất. Bạn có thể để lại số điện thoại hoặc email để được hỗ trợ tốt hơn.',
          time: new Date()
        };
      }

      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  // Xử lý khi người dùng nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Xử lý khi chọn câu hỏi thường gặp
  const handleSelectQuestion = (question) => {
    setInputValue(question);
    setMessages(prevMessages => [...prevMessages, {
      type: 'user',
      content: question,
      time: new Date()
    }]);
    
    setIsTyping(true);
    
    // Giả lập bot đang nhập
    setTimeout(() => {
      let botResponse;
      
      if (question.includes('thuê') || question.includes('quận 2')) {
        botResponse = {
          type: 'bot',
          content: 'Chúng tôi có nhiều căn hộ tại quận 2 với mức giá từ 3.5 triệu đến 15 triệu/tháng. Dưới đây là một số căn hộ có thể phù hợp với bạn:',
          time: new Date(),
          suggestions: suggestedApartments.filter(apt => apt.address.includes('Quận 2'))
        };
      } else if (question.includes('đặt cọc')) {
        botResponse = {
          type: 'bot',
          content: 'Quy trình đặt cọc như sau: 1) Tham quan căn hộ 2) Đặt cọc 30% giá trị hợp đồng 3) Ký hợp đồng chính thức trong vòng 7 ngày 4) Thanh toán đủ và nhận nhà',
          time: new Date()
        };
      } else if (question.includes('tham quan')) {
        botResponse = {
          type: 'bot',
          content: 'Bạn có thể đặt lịch tham quan căn hộ vào tất cả các ngày trong tuần, từ 8h00 đến 18h00. Vui lòng đặt lịch trước ít nhất 1 ngày để chúng tôi sắp xếp nhân viên hỗ trợ.',
          time: new Date()
        };
      } else if (question.includes('chi phí')) {
        botResponse = {
          type: 'bot',
          content: 'Chi phí dịch vụ hàng tháng tùy thuộc vào từng tòa nhà, thông thường dao động từ 10.000 đến 15.000 VNĐ/m². Đã bao gồm phí quản lý, bảo vệ, vệ sinh và bảo trì cơ sở vật chất.',
          time: new Date()
        };
      }
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  // Xử lý khi người dùng chọn căn hộ đề xuất
  const handleSelectApartment = (apartmentId) => {
    console.log(`Chuyển đến trang chi tiết căn hộ ID: ${apartmentId}`);
    // Ở đây có thể thêm chức năng chuyển đến trang chi tiết căn hộ
    // window.location.href = `/apartment/${apartmentId}`;
  };

  // Xử lý mở/đóng cửa sổ chat
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setUnreadCount(0);
    }
  };

  // Định dạng thời gian
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Định dạng tiền tệ
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + " VNĐ/tháng";
  };

  return (
    <>
      {/* Nút chat */}
      <div 
        style={{ 
          position: 'fixed', 
          bottom: '20px', 
          right: '20px', 
          zIndex: 1000 
        }}
      >
        <Badge count={unreadCount}>
          <Button 
            type="primary" 
            shape="circle" 
            size="large"
            icon={isChatOpen ? <CloseOutlined /> : <MessageOutlined />}
            onClick={toggleChat}
            style={{ 
              width: '60px', 
              height: '60px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)' 
            }}
          />
        </Badge>
      </div>

      {/* Cửa sổ chat */}
      {isChatOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            bottom: '90px', 
            right: '20px', 
            width: '350px', 
            height: '500px', 
            zIndex: 999,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div 
            style={{
              background: '#1890ff',
              color: 'white',
              padding: '10px 15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Space>
              <Avatar icon={<RobotOutlined />} />
              <div>
                <Title level={5} style={{ color: 'white', margin: 0 }}>Trợ lý Bất động sản</Title>
                <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px' }}>Trực tuyến</Text>
              </div>
            </Space>
            <Button 
              type="text" 
              icon={<CloseOutlined />} 
              onClick={toggleChat}
              style={{ color: 'white' }}
            />
          </div>

          {/* Body */}
          <div 
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '15px',
              backgroundColor: '#f5f5f5'
            }}
          >
            {messages.map((message, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                  marginBottom: '15px'
                }}
              >
                <Avatar 
                  icon={message.type === 'user' ? <UserOutlined /> : <RobotOutlined />}
                  style={{
                    backgroundColor: message.type === 'user' ? '#1890ff' : '#52c41a',
                    marginRight: message.type === 'user' ? 0 : '10px',
                    marginLeft: message.type === 'user' ? '10px' : 0
                  }}
                />
                <div 
                  style={{
                    maxWidth: '70%',
                    backgroundColor: message.type === 'user' ? '#1890ff' : 'white',
                    color: message.type === 'user' ? 'white' : 'rgba(0,0,0,0.85)',
                    borderRadius: '8px',
                    padding: '10px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <Paragraph style={{ margin: 0 }}>{message.content}</Paragraph>
                  
                  {/* Hiển thị đề xuất căn hộ nếu có */}
                  {message.suggestions && (
                    <div style={{ marginTop: '10px' }}>
                      {message.suggestions.map(apt => (
                        <Card 
                        key={apt.id}
                        size="small" 
                        style={{ marginBottom: '10px', cursor: 'pointer' }}
                        onClick={() => handleSelectApartment(apt.id)}
                      >
                        <div style={{ display: 'flex' }}>
                          <Avatar 
                            shape="square" 
                            size={64} 
                            src={apt.image} 
                            icon={<PictureOutlined />} 
                          />
                          <div style={{ marginLeft: '10px', flex: 1 }}>
                            <Text strong>{apt.title}</Text>
                            <div>
                              <Text type="secondary" style={{ fontSize: '12px' }}>
                                <EnvironmentOutlined /> {apt.address}
                              </Text>
                            </div>
                            <div>
                              <Text type="danger" style={{ fontSize: '14px' }}>
                                <DollarOutlined /> {formatPrice(apt.price)}
                              </Text>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
                
                <div style={{ textAlign: 'right', marginTop: '5px' }}>
                  <Text type="secondary" style={{ fontSize: '10px' }}>
                    {formatTime(message.time)}
                  </Text>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div style={{ display: 'flex', marginBottom: '15px' }}>
              <Avatar 
                icon={<RobotOutlined />}
                style={{
                  backgroundColor: '#52c41a',
                  marginRight: '10px'
                }}
              />
              <div 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '10px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <Text>. . .</Text>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Câu hỏi thường gặp */}
        <div style={{ padding: '10px', backgroundColor: '#f0f0f0', borderTop: '1px solid #e8e8e8' }}>
          <Text strong style={{ display: 'block', marginBottom: '5px' }}>
            <QuestionCircleOutlined /> Câu hỏi thường gặp:
          </Text>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {commonQuestions.map((q, i) => (
              <Button 
                key={i} 
                size="small" 
                onClick={() => handleSelectQuestion(q)}
                style={{ marginBottom: '5px' }}
              >
                {q.length > 20 ? q.substring(0, 20) + '...' : q}
              </Button>
            ))}
          </div>
        </div>

        {/* Footer - Input */}
        <div style={{ padding: '10px', backgroundColor: 'white', borderTop: '1px solid #e8e8e8' }}>
          <div style={{ display: 'flex' }}>
            <Input 
              placeholder="Nhập tin nhắn..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              suffix={
                <Tooltip title="Gửi tin nhắn">
                  <Button 
                    type="primary" 
                    icon={<SendOutlined />} 
                    onClick={handleSendMessage}
                    disabled={inputValue.trim() === ''}
                  />
                </Tooltip>
              }
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '5px' }}>
            <Text type="secondary" style={{ fontSize: '10px' }}>
              <InfoCircleOutlined /> Trợ lý ảo đang trong giai đoạn thử nghiệm
            </Text>
          </div>
        </div>
      </div>
    )}
  </>
);
};

export default Chatbot;