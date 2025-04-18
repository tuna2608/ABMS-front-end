import React, { useState, useEffect } from 'react';
import { 
  Card, Button, message, Typography, Tag, Modal, Space, 
  Table, Drawer, Input, Tabs, Image, Avatar, Alert, Form 
} from 'antd';
import { 
  CheckCircleOutlined, CloseCircleOutlined, 
  EyeOutlined, ExclamationCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { getUnverifiedFacilities, verifyFacilityPost, rejectFacilityPost } from "../../redux/apiCalls";
import { useSelector } from "react-redux";

const { Text } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

// Update RejectModal implementation and move it outside ServicePostReview
const RejectModal = ({ 
  visible, 
  onCancel, 
  onOk, 
  loading, 
  rejectionReason, 
  setRejectionReason 
}) => (
  <Modal
    title="Từ chối bài đăng"
    open={visible}
    onOk={onOk}
    onCancel={onCancel}
    confirmLoading={loading}
    okText="Xác nhận"
    cancelText="Hủy"
  >
    <Form layout="vertical">
      <Form.Item
        label="Lý do từ chối"
        required
        validateStatus={!rejectionReason.trim() && 'error'}
        help={!rejectionReason.trim() && 'Vui lòng nhập lý do từ chối'}
      >
        <TextArea
          rows={4}
          value={rejectionReason}
          onChange={e => setRejectionReason(e.target.value)}
          placeholder="Nhập lý do từ chối bài đăng..."
          maxLength={500}
          showCount
        />
      </Form.Item>
    </Form>
  </Modal>
);

const ServicePostReview = () => {
  // States
  const [servicePosts, setServicePosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [activeTab, setActiveTab] = useState('unverified');
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Add currentUser from Redux
  const currentUser = useSelector((state) => state.user.currentUser);

  // Move fetchUnverifiedPosts outside useEffect
  const fetchUnverifiedPosts = async () => {
    setLoading(true);
    try {
      const response = await getUnverifiedFacilities();
      if (response.success && response.data) {
        const transformedData = response.data.map(facility => ({
          id: facility.facilityId,
          title: facility.facilityPostContent || 'Không có tiêu đề',
          provider: {
            name: facility.userName || 'Người dùng',
            avatar: facility.userImgUrl
          },
          content: facility.facilityPostContent || 'Không có nội dung',
          images: facility.imageFiles || [],
          status: facility.status || 'unverified',
          rejectionReason: facility.rejectedReason
        }));
        setServicePosts(transformedData);
      }
    } catch (error) {
      message.error('Không thể tải danh sách bài đăng');
    } finally {
      setLoading(false);
    }
  };

  // Update useEffect to use the function
  useEffect(() => {
    fetchUnverifiedPosts();
  }, []);

  // Status renderer
  const renderStatus = (status) => {
    const statusConfig = {
      unverified: { color: 'gold', text: 'Chờ duyệt', icon: <ExclamationCircleOutlined /> },
      verified: { color: 'green', text: 'Đã duyệt', icon: <CheckCircleOutlined /> },
      rejected: { color: 'red', text: 'Từ chối', icon: <CloseCircleOutlined /> }
    };
    const config = statusConfig[status] || statusConfig.unverified;
    return <Tag color={config.color} icon={config.icon}>{config.text}</Tag>;
  };

  // Add handlers for verify and reject
  const handleVerify = async (record) => {
    try {
      setLoading(true);
      const response = await verifyFacilityPost(record.id, currentUser.userId);
      
      if (response.success) {
        message.success('Duyệt bài đăng thành công');
        fetchUnverifiedPosts(); // Can access the function now
      } else {
        message.error(response.message || 'Không thể duyệt bài đăng');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi duyệt bài đăng');
    } finally {
      setLoading(false);
    }
  };

  // Update handleReject function
  const handleReject = async (record) => {
    if (!rejectionReason.trim()) {
      message.error('Vui lòng nhập lý do từ chối');
      return;
    }

    try {
      setLoading(true);
      const response = await rejectFacilityPost(
        record.id,
        currentUser.userId,
        rejectionReason
      );
      
      if (response.success) {
        message.success('Từ chối bài đăng thành công');
        setRejectModalVisible(false);
        setRejectionReason('');
        setSelectedPost(null);
        await fetchUnverifiedPosts();
      } else {
        throw new Error(response.message || 'Không thể từ chối bài đăng');
      }
    } catch (error) {
      console.error('Error rejecting post:', error);
      message.error(error.message || 'Có lỗi xảy ra khi từ chối bài đăng');
    } finally {
      setLoading(false);
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Bài đăng',
      dataIndex: 'title',
      render: (text, record) => (
        <Space>
          <Avatar src={record.provider.avatar} />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary">{record.provider.name}</Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 150,
      render: renderStatus
    },
    {
      title: 'Thao tác',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => setSelectedPost(record)}
          >
            Chi tiết
          </Button>
          {record.status === 'unverified' && (
            <>
              <Button 
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handleVerify(record)}
                loading={loading}
              >
                Duyệt
              </Button>
              <Button 
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => {
                  setSelectedPost(record);
                  setRejectModalVisible(true);
                }}
                loading={loading}
              >
                Từ chối
              </Button>
            </>
          )}
        </Space>
      )
    }
  ];

  // Filtered posts
  const getFilteredPosts = () => {
    return servicePosts.filter(post => {
      const matchesTab = activeTab === 'all' || post.status === activeTab;
      const matchesSearch = !searchText || 
        post.title.toLowerCase().includes(searchText.toLowerCase()) ||
        post.content.toLowerCase().includes(searchText.toLowerCase());
      return matchesTab && matchesSearch;
    });
  };

  return (
    <Card title="Quản lý bài đăng dịch vụ">
      {/* Search */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm bài đăng"
          prefix={<SearchOutlined />}
          allowClear
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </Space>

      {/* Tabs */}
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane 
          tab={<span><ExclamationCircleOutlined /> Chờ duyệt</span>}
          key="unverified"
        />
        <TabPane 
          tab={<span><CheckCircleOutlined /> Đã duyệt</span>}
          key="verified"
        />
        <TabPane 
          tab={<span><CloseCircleOutlined /> Đã từ chối</span>}
          key="rejected"
        />
      </Tabs>

      {/* Posts Table */}
      <Table
        dataSource={getFilteredPosts()}
        columns={columns}
        rowKey="id"
        loading={loading}
      />

      <RejectModal 
        visible={rejectModalVisible}
        onCancel={() => {
          setRejectModalVisible(false);
          setRejectionReason('');
          setSelectedPost(null);
        }}
        onOk={() => handleReject(selectedPost)}
        loading={loading}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
      />
    </Card>
  );
};

export default ServicePostReview;