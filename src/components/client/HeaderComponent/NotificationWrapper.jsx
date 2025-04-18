import React, { useState, useEffect, useCallback } from 'react';
import { Dropdown, Badge, List, Empty, Card, Button, message, Spin } from 'antd';
import {
    BellOutlined,
    CheckCircleOutlined,
    MessageOutlined,
    InfoCircleOutlined,
    LoadingOutlined,
    DollarOutlined,
    WarningOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { fetchNotifications } from '../../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import webSocketService from '../../../services/WebSocketService'; 

// Improved styled components
const NotificationCard = styled(Card)`
  width: 400px;
  max-height: 500px;
  overflow-y: auto;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 0;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 3px;
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fafafa;
  border-radius: 12px 12px 0 0;
`;

const NotificationTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
`;

const NotificationListItem = styled(List.Item)`
  padding: 16px 20px !important;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
  
  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const NotificationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-right: 16px;
  flex-shrink: 0;
`;

const NotificationContent = styled.div`
  flex-grow: 1;
  line-height: 1.5;
`;

const NotificationMessage = styled.div`
  margin-bottom: 6px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
`;

const NotificationTime = styled.span`
  color: #8c8c8c;
  font-size: 12px;
  display: block;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  height: 200px;
`;

const MarkAsReadButton = styled(Button)`
  color: #1890ff;
  font-weight: 500;
  padding: 4px 8px;
  
  &:disabled {
    color: #d9d9d9;
  }
`;

const UnreadIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #1890ff;
  transform: translateY(-50%);
`;

const NotificationBadge = styled(Badge)`
  .ant-badge-count {
    box-shadow: 0 0 0 1px #fff;
  }
`;

const NotificationButton = styled(Button)`
  width: 250px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: var(--cheadline);
  border: none;
`;

// Helper functions (keep unchanged)
const getNotificationIcon = (type) => {
    switch (type?.toLowerCase()) {
        case 'deposit':
            return { icon: <DollarOutlined />, color: '#52c41a' };
        case 'message':
            return { icon: <MessageOutlined />, color: '#1890ff' };
        case 'info':
            return { icon: <InfoCircleOutlined />, color: '#1890ff' };
        case 'warning':
            return { icon: <WarningOutlined />, color: '#faad14' };
        default:
            return { icon: <InfoCircleOutlined />, color: '#1890ff' };
    }
};

const formatTime = (timestamp) => {
    if (!timestamp) return '';

    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ngày trước`;

    return notificationTime.toLocaleDateString('vi-VN');
};

const NotificationWrapper = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false); // Changed from 'visible' to 'open'
    const [unreadCount, setUnreadCount] = useState(0);

    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    // Hàm tải thông báo ban đầu
    const loadNotifications = useCallback(async () => {
        if (!currentUser?.userId) {
            setError('Vui lòng đăng nhập để xem thông báo');
            return;
        }

        setLoading(true);
        try {
            const response = await fetchNotifications(currentUser.userId);
            if (response.success) {
                const sortedNotifications = response.data.sort((a, b) =>
                    new Date(b.date) - new Date(a.date)
                );
                setNotifications(sortedNotifications);
                setUnreadCount(sortedNotifications.filter(n => !n.status).length);
                setError(null);
            } else {
                setError(response.message || 'Không thể tải thông báo');
                message.error(response.message);
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi tải thông báo');
            console.error('Error loading notifications:', err);
        } finally {
            setLoading(false);
        }
    }, [currentUser?.userId]);

    // Kết nối WebSocket khi component mount và đăng ký listener
    useEffect(() => {
        if (currentUser?.userId) {
            // Đảm bảo kết nối WebSocket
            webSocketService.connect(currentUser.userId);
            
            // Lắng nghe sự kiện thông báo mới 
            const handleNewNotification = (event) => {
                const notification = event.detail.notification;
                // Thêm thông báo mới vào danh sách
                setNotifications(prev => {
                    // Kiểm tra xem thông báo đã tồn tại chưa
                    const exists = prev.some(n => n.id === notification.id);
                    if (!exists) {
                        // Thêm thông báo mới vào đầu danh sách
                        const newNotifications = [notification, ...prev];
                        // Cập nhật số lượng chưa đọc
                        setUnreadCount(newNotifications.filter(n => !n.status).length);
                        return newNotifications;
                    }
                    return prev;
                });
            };
            
            // Đăng ký lắng nghe các sự kiện
            document.addEventListener('new-notification', handleNewNotification);
            document.addEventListener('global-notification', handleNewNotification);
            
            // Cleanup listener khi component unmount
            return () => {
                document.removeEventListener('new-notification', handleNewNotification);
                document.removeEventListener('global-notification', handleNewNotification);
            };
        }
    }, [currentUser?.userId]);

    // Tải thông báo khi hiển thị dropdown
    useEffect(() => {
        if (open && currentUser?.userId) {
            loadNotifications();
        }
    }, [open, currentUser?.userId, loadNotifications]);

    const handleMarkAllAsRead = async () => {
        try {
            setLoading(true);
            // Lặp qua tất cả thông báo chưa đọc và đánh dấu đã đọc
            const unreadNotifications = notifications.filter(n => !n.status);
            
            for (const notification of unreadNotifications) {
                webSocketService.markNotificationAsRead(notification.id);
            }
            
            // Cập nhật state local
            setNotifications(notifications.map(n => ({ ...n, status: true })));
            setUnreadCount(0);
            
            message.success('Đã đánh dấu tất cả là đã đọc');
        } catch (error) {
            console.error('Error marking notifications as read:', error);
            message.error('Không thể đánh dấu thông báo là đã đọc');
        } finally {
            setLoading(false);
        }
    };

    const handleNotificationClick = (notification) => {
        // Đánh dấu thông báo này là đã đọc
        if (!notification.status) {
            webSocketService.markNotificationAsRead(notification.id);
            
            // Cập nhật state local
            setNotifications(notifications.map(n => 
                n.id === notification.id ? { ...n, status: true } : n
            ));
            setUnreadCount(prev => Math.max(0, prev - 1));
        }
        
        // Xử lý điều hướng hoặc hành động khác dựa vào loại thông báo
        console.log('Notification clicked:', notification);
    };

    const handleOpenChange = (flag) => {
        setOpen(flag);
    };

    // Create menu items for dropdown
    const notificationMenu = {
        items: [
            {
                key: 'notifications',
                label: (
                    <NotificationCard>
                        <NotificationHeader>
                            <NotificationTitle>Thông Báo</NotificationTitle>
                            <MarkAsReadButton
                                type="text"
                                size="small"
                                onClick={handleMarkAllAsRead}
                                disabled={loading || unreadCount === 0}
                            >
                                Đánh dấu đã đọc
                            </MarkAsReadButton>
                        </NotificationHeader>

                        {loading ? (
                            <LoadingContainer>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 28 }} spin />} />
                            </LoadingContainer>
                        ) : error ? (
                            <Empty
                                description={error}
                                style={{ padding: '32px' }}
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        ) : notifications.length > 0 ? (
                            <List
                                dataSource={notifications}
                                renderItem={(item) => {
                                    const { icon, color } = getNotificationIcon(item.notificationType);
                                    return (
                                        <NotificationListItem 
                                            onClick={() => handleNotificationClick(item)}
                                            style={{ 
                                                backgroundColor: !item.status ? 'rgba(24, 144, 255, 0.05)' : 'transparent',
                                                position: 'relative'
                                            }}
                                        >
                                            {!item.status && <UnreadIndicator />}
                                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                                <NotificationIcon style={{ backgroundColor: `${color}1A` }}>
                                                    {React.cloneElement(icon, {
                                                        style: { color: color, fontSize: '20px' }
                                                    })}
                                                </NotificationIcon>
                                                <NotificationContent>
                                                    <NotificationMessage>
                                                        {item.notificationContent}
                                                    </NotificationMessage>
                                                    <NotificationTime>{formatTime(item.date)}</NotificationTime>
                                                </NotificationContent>
                                            </div>
                                        </NotificationListItem>
                                    );
                                }}
                            />
                        ) : (
                            <Empty
                                description="Không có thông báo mới"
                                style={{ padding: '32px' }}
                            />
                        )}
                    </NotificationCard>
                ),
            },
        ],
    };

    return (
        <Dropdown
            menu={notificationMenu} // Replaced 'overlay' with 'menu'
            trigger={['click']}
            placement="bottomRight"
            onOpenChange={handleOpenChange} // Replaced 'onVisibleChange' with 'onOpenChange'
            open={open} // Replaced 'visible' with 'open'
            destroyPopupOnHide={true}
        >
            <NotificationBadge
                count={unreadCount}
                overflowCount={10}
                offset={[-5, 5]}
            >
                <NotificationButton
                    type="text"
                    icon={<BellOutlined style={{ fontSize: '20px' }} />}
                />
            </NotificationBadge>
        </Dropdown>
    );
};

export default NotificationWrapper;