import React from 'react';
import { Dropdown, Badge, List, Empty, Card, Button } from 'antd';
import { 
  BellOutlined, 
  CheckCircleOutlined, 
  MessageOutlined, 
  InfoCircleOutlined 
} from '@ant-design/icons';
import styled from 'styled-components';

// Styled components for enhanced notification styling
const NotificationCard = styled(Card)`
  width: 350px;
  max-height: 450px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
`;

const NotificationTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
`;

const NotificationListItem = styled(List.Item)`
  padding: 12px 16px !important;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

const NotificationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

const NotificationContent = styled.div`
  flex-grow: 1;
`;

const NotificationTime = styled.span`
  color: #8c8c8c;
  font-size: 12px;
`;

const NotificationWrapper = () => {
  // Mock notification data (replace with actual data from your backend)
  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: <CheckCircleOutlined />,
      iconColor: '#52c41a',
      title: 'Hợp đồng mới',
      description: 'Bạn có hợp đồng mới chờ xử lý',
      time: '5 phút trước'
    },
    {
      id: 2,
      type: 'message',
      icon: <MessageOutlined />,
      iconColor: '#1890ff',
      title: 'Tin nhắn mới',
      description: 'Bạn có tin nhắn mới từ Nguyễn Văn A',
      time: '30 phút trước'
    },
    {
      id: 3,
      type: 'info',
      icon: <InfoCircleOutlined />,
      iconColor: '#faad14',
      title: 'Thông báo hệ thống',
      description: 'Cập nhật mới về quản lý căn hộ',
      time: '2 giờ trước'
    }
  ];

  const notificationDropdownContent = (
    <NotificationCard>
      <NotificationHeader>
        <NotificationTitle>Thông Báo</NotificationTitle>
        <Button type="text" size="small">Đánh dấu đã đọc</Button>
      </NotificationHeader>
      {notifications.length > 0 ? (
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <NotificationListItem>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <NotificationIcon style={{ backgroundColor: `${item.iconColor}1A` }}>
                  {React.cloneElement(item.icon, { 
                    style: { color: item.iconColor, fontSize: '18px' } 
                  })}
                </NotificationIcon>
                <NotificationContent>
                  <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: 'rgba(0,0,0,0.65)' }}>{item.description}</div>
                  <NotificationTime>{item.time}</NotificationTime>
                </NotificationContent>
              </div>
            </NotificationListItem>
          )}
        />
      ) : (
        <Empty 
          description="Không có thông báo mới" 
          style={{ padding: '24px' }} 
        />
      )}
    </NotificationCard>
  );

  return (
    <Dropdown 
      overlay={notificationDropdownContent} 
      trigger={['click']}
      placement="bottomRight"
    >
      <Badge count={notifications.length} overflowCount={10}>
        <Button 
          type="text" 
          icon={<BellOutlined />} 
          style={{ 
            width: '50px', 
            height: '50px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            color: 'var(--cheadline)',
            fontSize: '20px' 
          }} 
        />
      </Badge>
    </Dropdown>
  );
};

export default NotificationWrapper;