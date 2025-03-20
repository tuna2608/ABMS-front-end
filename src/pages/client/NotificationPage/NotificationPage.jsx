import React, { useState, useEffect } from 'react';
import {
  Layout,
  Typography,
  List,
  Card,
  Badge,
  Avatar,
  Space,
  Button,
  Divider,
  Menu,
  Dropdown,
  Tabs,
  Tag,
  Empty,
  Skeleton,
  Tooltip,
  Checkbox,
  Input,
  Pagination
} from 'antd';
import {
  BellOutlined,
  CheckOutlined,
  DeleteOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  MessageOutlined,
  DollarOutlined,
  SettingOutlined,
  UserOutlined,
  StarOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  SearchOutlined,
  LeftOutlined,
  MoreOutlined,
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
// Dữ liệu mẫu thông báo
const sampleNotifications = [
  {
    id: 1,
    title: 'Cập nhật trạng thái căn hộ',
    content: 'Căn hộ Vinhomes Central Park #A1203 đã được đánh dấu là "Đã cho thuê".',
    time: '2025-03-15T09:30:00',
    timeDisplay: '15 phút trước',
    type: 'apartment',
    isRead: false,
    isImportant: true,
    icon: <HomeOutlined style={{ color: '#1890ff' }} />,
    link: '/apartment/1',
    relatedItem: 'Vinhomes Central Park #A1203'
  },
  {
    id: 2,
    title: 'Tin nhắn mới',
    content: 'Nguyễn Văn A đã gửi tin nhắn hỏi thông tin về căn hộ The Sun Avenue.',
    time: '2025-03-15T08:45:00',
    timeDisplay: '1 giờ trước',
    type: 'message',
    isRead: false,
    isImportant: true,
    icon: <MessageOutlined style={{ color: '#52c41a' }} />,
    link: '/chat-page',
    relatedItem: 'Nguyễn Văn A'
  },
  {
    id: 3,
    title: 'Thanh toán thành công',
    content: 'Giao dịch #TT23458 đã được xác nhận thành công cho dịch vụ đăng tin Premium.',
    time: '2025-03-14T16:20:00',
    timeDisplay: '17 giờ trước',
    type: 'payment',
    isRead: true,
    isImportant: false,
    icon: <DollarOutlined style={{ color: '#faad14' }} />,
    link: '/payments/TT23458',
    relatedItem: 'Gói Premium'
  },
  {
    id: 4,
    title: 'Bảo trì hệ thống',
    content: 'Hệ thống sẽ được bảo trì từ 23:00 ngày 16/03/2025 đến 02:00 ngày 17/03/2025.',
    time: '2025-03-14T10:00:00',
    timeDisplay: '1 ngày trước',
    type: 'system',
    isRead: true,
    isImportant: true,
    icon: <SettingOutlined style={{ color: '#ff4d4f' }} />,
    link: '/announcements/system',
    relatedItem: 'Bảo trì hệ thống'
  },
  {
    id: 5,
    title: 'Đánh giá mới',
    content: 'Căn hộ Gateway Thảo Điền vừa nhận được đánh giá 5 sao từ khách hàng.',
    time: '2025-03-13T14:30:00',
    timeDisplay: '2 ngày trước',
    type: 'review',
    isRead: true,
    isImportant: false,
    icon: <StarOutlined style={{ color: '#722ed1' }} />,
    link: '/apartment/3',
    relatedItem: 'Gateway Thảo Điền'
  },
  {
    id: 6,
    title: 'Cập nhật thông tin người dùng',
    content: 'Thông tin cá nhân của bạn đã được cập nhật thành công.',
    time: '2025-03-12T09:15:00',
    timeDisplay: '3 ngày trước',
    type: 'account',
    isRead: true,
    isImportant: false,
    icon: <UserOutlined style={{ color: '#13c2c2' }} />,
    link: '/profile',
    relatedItem: 'Thông tin cá nhân'
  },
  {
    id: 7,
    title: 'Tin nhắn mới',
    content: 'Trần Thị B quan tâm đến căn hộ Penthouse Saigon Pearl của bạn.',
    time: '2025-03-11T17:45:00',
    timeDisplay: '4 ngày trước',
    type: 'message',
    isRead: true,
    isImportant: false,
    icon: <MessageOutlined style={{ color: '#52c41a' }} />,
    link: '/chat-page',
    relatedItem: 'Trần Thị B'
  },
  {
    id: 8,
    title: 'Tin đăng sắp hết hạn',
    content: 'Tin đăng căn hộ Studio The Sun Avenue sẽ hết hạn vào ngày 20/03/2025.',
    time: '2025-03-10T11:20:00',
    timeDisplay: '5 ngày trước',
    type: 'apartment',
    isRead: true,
    isImportant: true,
    icon: <ClockCircleOutlined style={{ color: '#fa8c16' }} />,
    link: '/apartment/2',
    relatedItem: 'Studio The Sun Avenue'
  },
  {
    id: 9,
    title: 'Cập nhật chính sách bảo mật',
    content: 'Chính sách bảo mật của chúng tôi đã được cập nhật. Vui lòng xem lại để biết thêm chi tiết.',
    time: '2025-03-09T14:00:00',
    timeDisplay: '6 ngày trước',
    type: 'system',
    isRead: true,
    isImportant: false,
    icon: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
    link: '/privacy-policy',
    relatedItem: 'Chính sách bảo mật'
  },
  {
    id: 10,
    title: 'Khuyến mãi đăng tin',
    content: 'Giảm 30% khi đăng tin Premium từ ngày 20/03/2025 đến 30/03/2025.',
    time: '2025-03-08T09:30:00',
    timeDisplay: '1 tuần trước',
    type: 'promotion',
    isRead: true,
    isImportant: true,
    icon: <ExclamationCircleOutlined style={{ color: '#eb2f96' }} />,
    link: '/promotions',
    relatedItem: 'Khuyến mãi tháng 3'
  },
  {
    id: 11,
    title: 'Chào mừng bạn đến với hệ thống',
    content: 'Cảm ơn bạn đã đăng ký tài khoản. Khám phá các tính năng ngay!',
    time: '2025-03-01T10:00:00',
    timeDisplay: '2 tuần trước',
    type: 'account',
    isRead: true,
    isImportant: false,
    icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    link: '/dashboard',
    relatedItem: 'Chào mừng'
  }
];

// Các loại thông báo và màu sắc tương ứng
const notificationTypes = {
  all: { label: 'Tất cả', color: '' },
  system: { label: 'Hệ thống', color: '#ff4d4f' },
  apartment: { label: 'Căn hộ', color: '#1890ff' },
  message: { label: 'Tin nhắn', color: '#52c41a' },
  payment: { label: 'Thanh toán', color: '#faad14' },
  account: { label: 'Tài khoản', color: '#13c2c2' },
  review: { label: 'Đánh giá', color: '#722ed1' },
  promotion: { label: 'Khuyến mãi', color: '#eb2f96' }
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Giả lập lấy dữ liệu từ API
  useEffect(() => {
    setTimeout(() => {
      setNotifications(sampleNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  // Lọc thông báo theo loại và tìm kiếm
  const filteredNotifications = notifications.filter(notification => {
    const matchType = selectedType === 'all' || notification.type === selectedType;
    const matchSearch = searchText.trim() === '' || 
                        notification.title.toLowerCase().includes(searchText.toLowerCase()) ||
                        notification.content.toLowerCase().includes(searchText.toLowerCase()) ||
                        notification.relatedItem.toLowerCase().includes(searchText.toLowerCase());
    return matchType && matchSearch;
  });

  // Phân trang
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * pageSize, 
    currentPage * pageSize
  );

  // Đánh dấu thông báo đã đọc
  const markAsRead = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };
 // Đánh dấu nhiều thông báo đã đọc
  const markSelectedAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        selectedItems.includes(notification.id) ? { ...notification, isRead: true } : notification
      )
    );
    setSelectedItems([]);
  };

  // Đánh dấu tất cả thông báo đã đọc
  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, isRead: true }))
    );
  };

  // Xóa thông báo
  const deleteNotification = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  // Xóa nhiều thông báo
  const deleteSelected = () => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => !selectedItems.includes(notification.id))
    );
    setSelectedItems([]);
  };


  // Xử lý chọn thông báo
  const handleSelectItem = (id) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  // Xử lý chọn tất cả thông báo trên trang hiện tại
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(paginatedNotifications.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  // Menu dropdown cho các tùy chọn lọc
  const filterMenu = (
    <Menu>
      <Menu.Item key="all" onClick={() => setSelectedType('all')}>Tất cả thông báo</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="unread" onClick={() => setSelectedType('all')}>
        <Badge status="processing" text="Chưa đọc" />
      </Menu.Item>
      <Menu.Item key="read" onClick={() => setSelectedType('all')}>
        <Badge status="default" text="Đã đọc" />
      </Menu.Item>
      <Menu.Divider />
      <Menu.ItemGroup title="Loại thông báo">
        {Object.entries(notificationTypes).map(([key, { label, color }]) => (
          key !== 'all' && (
            <Menu.Item key={key} onClick={() => setSelectedType(key)}>
              <Badge color={color} text={label} />
            </Menu.Item>
          )
        ))}
      </Menu.ItemGroup>
    </Menu>
  );

  // Render icon thông báo theo loại
  const renderNotificationIcon = (type) => {
    switch (type) {
      case 'system':
        return <SettingOutlined style={{ color: notificationTypes.system.color }} />;
      case 'apartment':
        return <HomeOutlined style={{ color: notificationTypes.apartment.color }} />;
      case 'message':
        return <MessageOutlined style={{ color: notificationTypes.message.color }} />;
      case 'payment':
        return <DollarOutlined style={{ color: notificationTypes.payment.color }} />;
      case 'account':
        return <UserOutlined style={{ color: notificationTypes.account.color }} />;
      case 'review':
        return <StarOutlined style={{ color: notificationTypes.review.color }} />;
      case 'promotion':
        return <ExclamationCircleOutlined style={{ color: notificationTypes.promotion.color }} />;
      default:
        return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ background: '#fff', padding: '0 24px', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <Space>
            <Button icon={<LeftOutlined />} onClick={() => window.history.back()}>Quay lại</Button>
            <Title level={4} style={{ margin: 0 }}>
              <BellOutlined style={{ marginRight: 10 }} />
              Thông báo của tôi
            </Title>
          </Space>
          <Space>
            <Button icon={<CheckOutlined />} onClick={markAllAsRead} disabled={!notifications.some(n => !n.isRead)}>
              Đánh dấu tất cả đã đọc
            </Button>
            <Dropdown overlay={filterMenu} placement="bottomRight">
              <Button icon={<FilterOutlined />}>
                Lọc
              </Button>
            </Dropdown>
          </Space>
        </div>
      </Header>

      <Content style={{ padding: '24px', maxWidth: 1000, margin: '0 auto' }}>
        <Card
          style={{ marginBottom: 24 }}
          bodyStyle={{ padding: '12px 24px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <Checkbox 
                checked={selectedItems.length === paginatedNotifications.length && paginatedNotifications.length > 0}
                indeterminate={selectedItems.length > 0 && selectedItems.length < paginatedNotifications.length}
                onChange={handleSelectAll}
                disabled={paginatedNotifications.length === 0}
              />
              <Text>
                {selectedItems.length > 0 ? (
                  <b>{selectedItems.length} thông báo đã chọn</b>
                ) : (
                  `${filteredNotifications.length} thông báo`
                )}
              </Text>
            </Space>

            <Space>
              {selectedItems.length > 0 && (
                <>
                  <Button type="primary" onClick={markSelectedAsRead} disabled={!selectedItems.some(id => {
                    const notification = notifications.find(n => n.id === id);
                    return notification && !notification.isRead;
                  })}>
                    <EyeOutlined /> Đánh dấu đã đọc
                  </Button>
                  <Button danger onClick={deleteSelected}>
                    <DeleteOutlined /> Xóa
                  </Button>
                </>
              )}
              <Input
                placeholder="Tìm kiếm thông báo"
                prefix={<SearchOutlined />}
                style={{ width: 250 }}
                value={searchText}
                onChange={e => {
                  setSearchText(e.target.value);
                  setCurrentPage(1);
                }}
                allowClear
              />
            </Space>
          </div>
        </Card>

        <Tabs 
          activeKey={selectedType} 
          onChange={setSelectedType}
          tabBarStyle={{ marginBottom: 16, background: '#fff', padding: '8px 16px', borderRadius: 2 }}
        >
          <TabPane 
            tab={<Badge count={notifications.filter(n => !n.isRead).length} overflowCount={99} size="small">
              <span style={{ paddingRight: 8 }}>Tất cả</span>
            </Badge>} 
            key="all" 
          />
          {Object.entries(notificationTypes).map(([key, { label, color }]) => (
            key !== 'all' && (
              <TabPane 
                tab={
                  <Badge 
                    count={notifications.filter(n => !n.isRead && n.type === key).length} 
                    size="small" 
                    overflowCount={99}
                  >
                    <span style={{ paddingRight: 8 }}>{label}</span>
                  </Badge>
                } 
                key={key} 
              />
            )
          ))}
        </Tabs>

        {loading ? (
          <Card>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ padding: 16 }}>
                <Skeleton avatar paragraph={{ rows: 2 }} active />
                <Divider style={{ margin: '12px 0' }} />
              </div>
            ))}
          </Card>
        ) : filteredNotifications.length === 0 ? (
          <Card>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                searchText ? (
                  <span>Không tìm thấy thông báo phù hợp</span>
                ) : (
                  <span>Không có thông báo nào</span>
                )
              }
            />
          </Card>
        ) : (
          <Card bodyStyle={{ padding: 0 }}>
            <List
              itemLayout="horizontal"
              dataSource={paginatedNotifications}
              renderItem={notification => (
                <List.Item
                  key={notification.id}
                  style={{ 
                    borderBottom: '1px solid #f0f0f0', 
                    padding: '16px 24px',
                    background: notification.isRead ? '#fff' : 'rgba(24, 144, 255, 0.05)'
                  }}
                  actions={[
                    <Tooltip title={notification.isRead ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}>
                      <Button
                        type="text"
                        icon={notification.isRead ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          setNotifications(prevNotifications => 
                            prevNotifications.map(item => 
                              item.id === notification.id ? { ...item, isRead: !item.isRead } : item
                            )
                          );
                        }}
                      />
                    </Tooltip>,
                    <Dropdown 
                      overlay={
                        <Menu>
                          <Menu.Item key="read" onClick={(e) => {
                            e.domEvent.stopPropagation();
                            setNotifications(prevNotifications => 
                              prevNotifications.map(item => 
                                item.id === notification.id ? { ...item, isRead: !item.isRead } : item
                              )
                            );
                          }}>
                            {notification.isRead ? <span><EyeInvisibleOutlined /> Đánh dấu chưa đọc</span> : <span><EyeOutlined /> Đánh dấu đã đọc</span>}
                          </Menu.Item>
                          <Menu.Item key="delete" danger onClick={(e) => {
                            e.domEvent.stopPropagation();
                            deleteNotification(notification.id);
                          }}>
                            <DeleteOutlined /> Xóa thông báo
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={['click']}
                    >
                      <Button
                        type="text"
                        icon={<MoreOutlined />}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Dropdown>
                  ]}
                >
                  <div 
                    style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}
                    onClick={() => {
                      if (!notification.isRead) {
                        markAsRead(notification.id);
                      }
                      // Trong thực tế sẽ điều hướng đến link
                      console.log(`Chuyển hướng đến: ${notification.link}`);
                    }}
                  >
                    <Checkbox
                      checked={selectedItems.includes(notification.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSelectItem(notification.id);
                      }}
                      style={{ marginRight: 12, marginTop: 6 }}
                    />
                    <Badge
                      dot={!notification.isRead}
                      style={{ marginRight: 12 }}
                    >
                      <Avatar 
                        icon={renderNotificationIcon(notification.type)} 
                        shape="square"
                        style={{ 
                          backgroundColor: notification.type === 'system' 
                            ? '#f5f5f5' 
                            : notification.isImportant 
                              ? 'rgba(250, 173, 20, 0.1)' 
                              : 'rgba(24, 144, 255, 0.1)',
                          color: notificationTypes[notification.type]?.color
                        }} 
                      />
                    </Badge>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Text strong={!notification.isRead} style={{ marginRight: 8 }}>
                            {notification.title}
                          </Text>
                          {notification.isImportant && (
                            <Tag color="warning">Quan trọng</Tag>
                          )}
                          <Tag color={notificationTypes[notification.type]?.color}>
                            {notificationTypes[notification.type]?.label}
                          </Tag>
                        </div>
                        <Text type="secondary">{notification.timeDisplay}</Text>
                      </div>
                      <Paragraph 
                        ellipsis={{ rows: 2 }}
                        style={{ margin: 0, marginBottom: 4 }}
                      >
                        {notification.content}
                      </Paragraph>
                      <Text type="secondary">
                        <small>Liên quan đến: {notification.relatedItem}</small>
                      </Text>
                    </div>
                  </div>
                </List.Item>
              )}
            />
            <div style={{ padding: '16px 24px', textAlign: 'right', background: '#fff' }}>
              <Pagination
                current={currentPage}
                total={filteredNotifications.length}
                pageSize={pageSize}
                onChange={setCurrentPage}
                showSizeChanger={false}
                hideOnSinglePage
              />
            </div>
          </Card>
        )}
      </Content>
    </Layout>
  );
};

export default NotificationsPage;