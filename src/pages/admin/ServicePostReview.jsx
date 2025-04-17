import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  message, 
  Typography,
  Tag,
  Modal,
  Space,
  Table,
  Drawer,
  Descriptions,
  Divider,
  Input,
  Select,
  Form,
  Tabs,
  Image,
  Avatar,
  Alert
} from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  EyeOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  TagOutlined,
  CommentOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';

const { Text, Title, Paragraph } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

// Sample data for service posts
const sampleServicePosts = [
  {
    id: 1,
    title: "Dịch vụ thiết kế website chuyên nghiệp",
    category: "Thiết kế web",
    provider: {
      id: "U001",
      name: "Trần Minh",
      avatar: "/api/placeholder/40/40",
      rating: 4.8,
      totalServices: 27
    },
    description: "Thiết kế website chuyên nghiệp, tối ưu SEO và responsive trên mọi thiết bị. Hỗ trợ bảo trì 6 tháng sau khi bàn giao.",
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    location: "TP. Hồ Chí Minh",
    submittedDate: "2024-04-12",
    status: "pending",
    rejectionReason: "",
    tags: ["web design", "responsive", "SEO"]
  },
  {
    id: 2,
    title: "Dịch vụ chụp ảnh sản phẩm đẹp, chuyên nghiệp",
    category: "Nhiếp ảnh",
    provider: {
      id: "U002",
      name: "Lê Thảo",
      avatar: "/api/placeholder/40/40",
      rating: 4.9,
      totalServices: 42
    },
    description: "Chụp ảnh sản phẩm chuyên nghiệp với studio đầy đủ thiết bị. Chỉnh sửa hậu kỳ tỉ mỉ, giao ảnh nhanh chóng.",
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    location: "Hà Nội",
    submittedDate: "2024-04-11",
    status: "pending",
    rejectionReason: "",
    tags: ["photography", "product", "studio"]
  },
  {
    id: 3,
    title: "Dịch vụ viết content marketing chất lượng cao",
    category: "Marketing",
    provider: {
      id: "U003",
      name: "Nguyễn Hà",
      avatar: "/api/placeholder/40/40",
      rating: 4.7,
      totalServices: 33
    },
    description: "Viết content marketing, bài PR, quảng cáo cho doanh nghiệp. Đội ngũ copywriter có kinh nghiệm trên 5 năm trong ngành.",
    images: ["/api/placeholder/400/300"],
    location: "Đà Nẵng",
    submittedDate: "2024-04-10",
    status: "approved",
    rejectionReason: "",
    tags: ["content", "marketing", "copywriting"]
  },
  {
    id: 4,
    title: "Dịch vụ sửa chữa điện thoại tận nơi",
    category: "Sửa chữa",
    provider: {
      id: "U004",
      name: "Phạm Tùng",
      avatar: "/api/placeholder/40/40",
      rating: 4.5,
      totalServices: 18
    },
    description: "Dịch vụ sửa chữa điện thoại tận nơi, thay màn hình, pin, các linh kiện chính hãng. Bảo hành 3 tháng.",
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    location: "TP. Hồ Chí Minh",
    submittedDate: "2024-04-09",
    status: "rejected",
    rejectionReason: "Thiếu thông tin về thời gian phục vụ và khu vực hoạt động cụ thể. Vui lòng bổ sung thêm thông tin về giờ làm việc, các quận/huyện có thể phục vụ và thời gian dự kiến để sửa chữa.",
    tags: ["repair", "phone", "mobile"]
  },
];

const ServicePostReview = () => {
  const [servicePosts, setServicePosts] = useState(sampleServicePosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  
  // Filter options
  const [filters, setFilters] = useState({
    searchText: '',
    category: 'all',
    dateRange: 'all',
  });

  // Status tag renderer
  const renderStatus = (status) => {
    const statusMap = {
      pending: { color: 'orange', text: 'Chờ duyệt', icon: <ExclamationCircleOutlined /> },
      approved: { color: 'green', text: 'Đã duyệt', icon: <CheckCircleOutlined /> },
      rejected: { color: 'red', text: 'Đã từ chối', icon: <CloseCircleOutlined /> }
    };
    
    const { color, text, icon } = statusMap[status] || { color: 'default', text: status };
    return <Tag color={color} icon={icon}>{text}</Tag>;
  };

  // Handle viewing post details
  const viewPostDetails = (record) => {
    setSelectedPost(record);
    setDrawerVisible(true);
  };

  // Handle post approval
  const handleApprove = (post) => {
    Modal.confirm({
      title: 'Xác nhận duyệt bài đăng',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      content: `Bạn có chắc chắn muốn duyệt bài đăng "${post.title}" không?`,
      okText: 'Xác nhận duyệt',
      cancelText: 'Hủy',
      onOk() {
        // Update the post status
        const updatedPosts = servicePosts.map(item => 
          item.id === post.id ? { ...item, status: 'approved' } : item
        );
        setServicePosts(updatedPosts);
        
        // Update selected post if in drawer
        if (selectedPost && selectedPost.id === post.id) {
          setSelectedPost({ ...selectedPost, status: 'approved' });
        }
        
        // Show success message
        message.success(`Đã duyệt bài đăng "${post.title}"`);
      }
    });
  };

  // Open rejection modal
  const openRejectModal = (post) => {
    setSelectedPost(post);
    setRejectModalVisible(true);
    setRejectionReason('');
  };

  // Handle post rejection
  const handleReject = () => {
    if (!selectedPost) return;
    
    if (!rejectionReason.trim()) {
      message.error('Vui lòng nhập lý do từ chối');
      return;
    }
    
    // Update the post status
    const updatedPosts = servicePosts.map(item => 
      item.id === selectedPost.id 
        ? { ...item, status: 'rejected', rejectionReason } 
        : item
    );
    setServicePosts(updatedPosts);
    
    // Update selected post if in drawer
    setSelectedPost({ 
      ...selectedPost, 
      status: 'rejected', 
      rejectionReason 
    });
    
    // Show success message
    message.success(`Đã từ chối bài đăng "${selectedPost.title}"`);
    
    // Close rejection modal
    setRejectModalVisible(false);
  };

  // Filter posts based on current filters and active tab
  const getFilteredPosts = () => {
    return servicePosts.filter(post => {
      // Filter by tab (status)
      if (activeTab !== 'all' && post.status !== activeTab) return false;
      
      // Filter by search text
      if (filters.searchText && 
          !post.title.toLowerCase().includes(filters.searchText.toLowerCase()) &&
          !post.description.toLowerCase().includes(filters.searchText.toLowerCase())) {
        return false;
      }
      
      // Filter by category
      if (filters.category !== 'all' && post.category !== filters.category) {
        return false;
      }
      
      // More filters can be added here
      
      return true;
    });
  };

  // Get unique categories for filter dropdown
  const getCategories = () => {
    const categories = new Set(servicePosts.map(post => post.category));
    return ['all', ...Array.from(categories)];
  };

  // Update filter values
  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value
    });
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Bài đăng',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          <Avatar 
            src={record.provider.avatar} 
            size="small"
          />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary">{record.provider.name}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <Tag>{category}</Tag>,
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'submittedDate',
      key: 'submittedDate',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <div>
          {renderStatus(status)}
          {status === 'rejected' && (
            <div style={{ marginTop: 4 }}>
              <Text type="danger" ellipsis style={{ maxWidth: 150 }} title={record.rejectionReason}>
                Lý do: {record.rejectionReason}
              </Text>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => viewPostDetails(record)} 
            title="Xem chi tiết"
          />
          {record.status === 'pending' && (
            <>
              <Button 
                type="primary" 
                icon={<CheckCircleOutlined />} 
                onClick={() => handleApprove(record)} 
                title="Duyệt"
              />
              <Button 
                danger 
                icon={<CloseCircleOutlined />} 
                onClick={() => openRejectModal(record)} 
                title="Từ chối"
              />
            </>
          )}
          {record.status === 'rejected' && (
            <Button 
              type="primary" 
              icon={<CheckCircleOutlined />} 
              onClick={() => handleApprove(record)} 
              title="Duyệt lại"
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card title="Quản lý bài đăng dịch vụ">
      {/* Filter section */}
      <Card style={{ marginBottom: 16 }} size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space wrap>
            <Input
              placeholder="Tìm kiếm tiêu đề hoặc mô tả"
              allowClear
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
              onChange={(e) => handleFilterChange('searchText', e.target.value)}
              value={filters.searchText}
            />
            
            <Select
              placeholder="Danh mục"
              style={{ width: 200 }}
              onChange={(value) => handleFilterChange('category', value)}
              value={filters.category}
            >
              <Option value="all">Tất cả danh mục</Option>
              {getCategories().filter(cat => cat !== 'all').map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
            
            <Select
              placeholder="Thời gian"
              style={{ width: 200 }}
              onChange={(value) => handleFilterChange('dateRange', value)}
              value={filters.dateRange}
            >
              <Option value="all">Tất cả thời gian</Option>
              <Option value="today">Hôm nay</Option>
              <Option value="this_week">Tuần này</Option>
              <Option value="this_month">Tháng này</Option>
            </Select>
          </Space>
        </Space>
      </Card>

      {/* Tabs for different status */}
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        style={{ marginBottom: 16 }}
      >
        <TabPane 
          tab={
            <span>
              <ExclamationCircleOutlined />
              Chờ duyệt
            </span>
          } 
          key="pending"
        />
        <TabPane 
          tab={
            <span>
              <CheckCircleOutlined />
              Đã duyệt
            </span>
          } 
          key="approved"
        />
        <TabPane 
          tab={
            <span>
              <CloseCircleOutlined />
              Đã từ chối
            </span>
          } 
          key="rejected"
        />
        <TabPane 
          tab="Tất cả" 
          key="all"
        />
      </Tabs>
      
      {/* Table of service posts */}
      <Table 
        dataSource={getFilteredPosts()} 
        columns={columns} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
        expandable={{
          expandedRowRender: record => 
            record.status === 'rejected' ? (
              <div style={{ padding: '12px 12px 12px 48px' }}>
                <Text type="secondary" strong>Lý do từ chối:</Text>
                <Paragraph type="danger" style={{ marginTop: 4 }}>
                  {record.rejectionReason}
                </Paragraph>
              </div>
            ) : null,
          expandRowByClick: true,
          expandIcon: ({ expanded, onExpand, record }) =>
            record.status === 'rejected' ? (
              expanded ? (
                <Button type="text" icon={<EditOutlined />} onClick={e => onExpand(record, e)} />
              ) : (
                <Button type="text" icon={<EditOutlined />} onClick={e => onExpand(record, e)} />
              )
            ) : null,
        }}
      />

      {/* Post Details Drawer */}
      <Drawer
        title="Chi tiết bài đăng dịch vụ"
        placement="right"
        width={600}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        extra={
          selectedPost?.status === 'pending' && (
            <Space>
              <Button 
                type="primary" 
                icon={<CheckCircleOutlined />}
                onClick={() => handleApprove(selectedPost)}
              >
                Duyệt
              </Button>
              <Button 
                danger 
                icon={<CloseCircleOutlined />}
                onClick={() => {
                  setDrawerVisible(false);
                  openRejectModal(selectedPost);
                }}
              >
                Từ chối
              </Button>
            </Space>
          )
        }
      >
        {selectedPost && (
          <>
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                {renderStatus(selectedPost.status)}
              </div>
              
              <div style={{ display: 'flex', overflowX: 'auto', gap: 10 }}>
                {selectedPost.images.map((img, index) => (
                  <Image 
                    key={index}
                    src={img}
                    alt={`Service image ${index + 1}`}
                    style={{ 
                      width: 250, 
                      height: 180, 
                      objectFit: 'cover',
                      borderRadius: 8 
                    }}
                  />
                ))}
              </div>
            </div>

            <Title level={4}>{selectedPost.title}</Title>
            
            <Space align="center" style={{ marginBottom: 16 }}>
              <Avatar src={selectedPost.provider.avatar} />
              <Text strong>{selectedPost.provider.name}</Text>
              <Tag color="blue">{selectedPost.provider.rating} ★</Tag>
              <Text type="secondary">{selectedPost.provider.totalServices} dịch vụ</Text>
            </Space>

            <Descriptions column={2} bordered size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item 
                label={<><TagOutlined /> Danh mục</>}
                span={1}
              >
                {selectedPost.category}
              </Descriptions.Item>
              <Descriptions.Item 
                label={<><EnvironmentOutlined /> Địa điểm</>}
                span={1}
              >
                {selectedPost.location}
              </Descriptions.Item>
              <Descriptions.Item 
                label={<><CalendarOutlined /> Ngày đăng</>}
                span={1}
              >
                {selectedPost.submittedDate}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">Mô tả dịch vụ</Divider>
            <Paragraph>{selectedPost.description}</Paragraph>

            <Divider orientation="left">Thẻ tag</Divider>
            <div>
              {selectedPost.tags.map(tag => (
                <Tag key={tag} color="blue">{tag}</Tag>
              ))}
            </div>

            {selectedPost.status === 'rejected' && selectedPost.rejectionReason && (
              <>
                <Divider orientation="left">Lý do từ chối</Divider>
                <Alert
                  message="Lý do từ chối bài đăng:"
                  description={selectedPost.rejectionReason}
                  type="error"
                  showIcon
                />
              </>
            )}
          </>
        )}
      </Drawer>

      {/* Rejection Modal */}
      <Modal
        title="Từ chối bài đăng dịch vụ"
        open={rejectModalVisible}
        onOk={handleReject}
        onCancel={() => setRejectModalVisible(false)}
        okText="Xác nhận từ chối"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <Form layout="vertical">
          <Form.Item
            label="Lý do từ chối"
            required
            rules={[{ required: true, message: 'Vui lòng nhập lý do từ chối' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Nhập lý do từ chối bài đăng" 
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </Form.Item>
          <Alert
            message="Lưu ý:"
            description="Lý do từ chối sẽ được gửi đến người đăng bài. Vui lòng cung cấp lý do cụ thể và hướng dẫn cách họ có thể chỉnh sửa để đăng lại."
            type="warning"
            showIcon
          />
        </Form>
      </Modal>
    </Card>
  );
};

export default ServicePostReview;