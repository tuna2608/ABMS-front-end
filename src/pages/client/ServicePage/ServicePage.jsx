import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Space,
  Input,
  Pagination,
  Skeleton,
  Typography,
  Tooltip,
  Flex,
  Tag,
  Button,
  Tabs,
  Modal,
  Form,
  Upload,
  message,
  Image,
  Avatar,
  Divider,
  Statistic,
  Alert,
  Spin,
  Table
} from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  ArrowRightOutlined,
  BuildOutlined,
  ShopOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  StarOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  getVerifiedFacilities,
  createFacility,
  getFacilityByUserId,
  updateFacility
} from "../../../redux/apiCalls";
import { useSelector } from "react-redux";
import { CreateServiceModal } from './CreateServiceModal';
import { UpdateServiceModal } from './UpdateServiceModal';

const { Text, Paragraph } = Typography;

const ServicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentUser = useSelector((state) => state.user.currentUser);
  
  const [activeTab, setActiveTab] = useState("partnerServices"); 
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [facilityDetail, setFacilityDetail] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  
  // Thay đổi pageSize từ 8 xuống 6
  const pageSize = 6;

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      let response;
      if (activeTab === 'partnerServices') {
        response = await getVerifiedFacilities();
      } else {
        response = await getFacilityByUserId(currentUser?.userId);
      }

      if (response?.success && response.data) {
        const transformedData = response.data.map(facility => ({
          id: facility.facilityId,
          title: facility.facilityHeader || 'Không có tiêu đề',       
          content: facility.facilityPostContent || 'Không có nội dung',
          status: facility.status || 'pending',
          provider: facility.userName || 'Chưa có thông tin',
          image: facility.images?.[0] || 'default-image.png',
          images: facility.imageFiles || [],
          rating: facility.rating || 0,
          views: facility.views || 0
        }));
        setFacilities(transformedData);
      }
    } catch (error) {
      console.error("Error fetching facilities:", error);
      message.error('Không thể tải danh sách dịch vụ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
    // Reset về trang đầu tiên khi chuyển tab
    setCurrentPage(1);
  }, [activeTab, currentUser?.userId]);

  const onSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const goToServiceDetails = (serviceId) => {
    message.info('Tính năng xem chi tiết đang được phát triển');
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const showCreateServiceModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateService = async (values) => {
    try {
      // Validate required fields
      if (!values.title || !values.content || !values.images?.fileList?.length) {
        message.error('Vui lòng điền đầy đủ thông tin và tải lên ít nhất 1 ảnh');
        return;
      }

      setLoading(true);
      const formData = new FormData();
      
      // Append basic fields
      formData.append('userId', currentUser.userId);
      formData.append('facilityHeader', values.title);
      formData.append('facilityPostContent', values.content);

      // Handle image uploads
      const fileList = values.images.fileList;
      if (fileList?.length > 0) {
        fileList.forEach(file => {
          // Ensure we're sending the actual file object
          if (file.originFileObj) {
            formData.append('file', file.originFileObj);
          }
        });
      }

      const response = await createFacility(formData);

      if (response.success) {
        message.success(response.message || 'Tạo bài đăng thành công');
        setIsCreateModalVisible(false);
        await fetchFacilities();
      } else {
        throw new Error(response.message || 'Không thể tạo bài đăng');
      }
    } catch (error) {
      console.error("Error creating facility:", error);
      message.error(error.message || 'Có lỗi xảy ra khi tạo bài đăng');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (record) => {
    setSelectedService({
      id: record.id,
      title: record.title,
      content: record.content,
      images: record.images?.map((url, index) => ({
        uid: `-${index}`,
        name: `image-${index}`,
        status: 'done',
        url: url,
        thumbUrl: url,
      })) || [],
      userId: currentUser.userId
    });
    setIsUpdateModalVisible(true);
  };

  const handleUpdateService = async (facilityId, formData) => {
    try {
      setLoading(true);
      const files = Array.from(formData.getAll('file') || []);
      const response = await updateFacility(
        facilityId,
        currentUser.userId,
        formData.get('facilityHeader'),
        formData.get('facilityPostContent'),
        files
      );
      if (response.success) {
        message.success('Cập nhật bài viết thành công');
        setIsUpdateModalVisible(false);
        setSelectedService(null);
        await fetchFacilities();
      } else {
        throw new Error(response.message || 'Có lỗi xảy ra khi cập nhật bài viết');
      }
    } catch (error) {
      console.error("Error updating facility:", error);
      message.error(error.message || 'Có lỗi xảy ra khi cập nhật bài viết');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (price === 0) return "Miễn phí";
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  };

  const getFilteredFacilities = () => {
    if (!facilities || !Array.isArray(facilities)) return [];

    let filtered = [...facilities];

    if (searchText) {
      filtered = filtered.filter(facility => 
        facility.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        facility.content?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  };

  // Tính toán các dịch vụ hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentFacilities = getFilteredFacilities().slice(startIndex, endIndex);

  const renderPartnerServices = () => (
    <>
      <Flex justify="space-between" align="center" wrap="wrap" gap={16} style={{ marginBottom: 24 }}>
        <Input.Search
          placeholder="Tìm kiếm dịch vụ liên kết..."
          onSearch={onSearch}
          style={{ width: 320 }}
          prefix={<SearchOutlined />}
          allowClear
          size="large"
        />
      </Flex>

      <Row gutter={[24, 24]}>
        {loading
          ? Array(6) // Hiển thị 6 skeleton loading thay vì 4
              .fill(null)
              .map((_, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={`loading-${index}`}>
                  <Card style={{ borderRadius: '8px', overflow: 'hidden', height: '100%' }}>
                    <Skeleton.Image
                      style={{ width: "100%", height: 200 }}
                      active
                    />
                    <Skeleton active paragraph={{ rows: 3 }} />
                  </Card>
                </Col>
              ))
          : currentFacilities.map((facility) => ( // Sử dụng currentFacilities thay vì getFilteredFacilities()
              <Col xs={24} sm={12} md={8} lg={6} key={facility.id}>
                <Card
                  hoverable
                  style={{ 
                    borderRadius: '8px', 
                    overflow: 'hidden', 
                    height: '100%',
                    transition: 'all 0.3s',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                  }}
                  cover={
                    <div
                      style={{
                        position: "relative",
                        height: 200,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        alt={facility.title}
                        src={facility.image}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: 'transform 0.3s',
                        }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
                          padding: "16px 12px 8px",
                          color: "white",
                        }}
                      >
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                          {facility.provider}
                        </Text>
                      </div>
                    </div>
                  }
                  onClick={() => goToServiceDetails(facility.id)}
                  actions={[
                    <Tooltip title="Địa điểm">
                      <Space>
                        <EnvironmentOutlined key="location" style={{ color: '#4b7bec' }} />
                        {facility.floor}
                      </Space>
                    </Tooltip>,
                    <Tooltip title="Giờ mở cửa">
                      <Space>
                        <ClockCircleOutlined key="hours" />
                        {facility.hours}
                      </Space>
                    </Tooltip>,
                    <Tooltip title="Liên hệ">
                      <Space>
                        <PhoneOutlined key="contact" style={{ color: '#4b7bec' }} />
                      </Space>
                    </Tooltip>,
                  ]}
                >
                  <Card.Meta
                    title={
                      <Tooltip title={facility.title}>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#4b7bec' }}>
                          {facility.title.length > 28
                            ? `${facility.title.substring(0, 28)}...`
                            : facility.title}
                        </div>
                      </Tooltip>
                    }
                    description={
                      <>
                        <Paragraph
                          ellipsis={{ rows: 2 }}
                          style={{ height: 40, color: '#666', marginBottom: 12 }}
                        >
                          {facility.content}
                        </Paragraph>
                        <Space direction="vertical" style={{ width: "100%" }}>
                          <div>
                            <Flex align="center" justify="space-between">
                              <Flex align="center">
                                <StarOutlined style={{ color: '#faad14', marginRight: 5 }} />
                                <Text strong>{facility.rating}/5.0</Text>
                              </Flex>
                              <Flex align="center">
                                <EyeOutlined style={{ marginRight: 5 }} />
                                <Text type="secondary">{facility.views}</Text>
                              </Flex>
                            </Flex>
                          </div>
                          <div style={{ marginTop: 8 }}>
                            <Button
                              type="primary"
                              size="small"
                              style={{ 
                                borderRadius: '4px', 
                                background: '#4b7bec',
                                width: '100%'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                goToServiceDetails(facility.id);
                              }}
                            >
                              Xem chi tiết <ArrowRightOutlined />
                            </Button>
                          </div>
                        </Space>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
      </Row>

      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={getFilteredFacilities().length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          showTotal={(total) => `Tổng cộng ${total} dịch vụ`}
        />
      </div>
    </>
  );

  const ServiceDetailModal = () => (
    <Modal
      title={null}
      visible={detailModalVisible}
      onCancel={() => {
        setDetailModalVisible(false);
        setFacilityDetail(null);
      }}
      footer={null}
      width={800}
      bodyStyle={{ padding: 0 }}
    >
      {facilityDetail ? (
        <>
          <div style={{ position: 'relative' }}>
            <Image.PreviewGroup>
              <div style={{ 
                display: 'flex',
                overflow: 'auto',
                scrollSnapType: 'x mandatory'
              }}>
                {facilityDetail.imageFiles?.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt={`Image ${index + 1}`}
                    style={{
                      height: '300px',
                      objectFit: 'cover',
                      scrollSnapAlign: 'start',
                      minWidth: '100%'
                    }}
                  />
                ))}
              </div>
            </Image.PreviewGroup>

          </div>

          <div style={{ padding: '24px' }}>
            <Flex gap={16} align="start">
              <Avatar 
                size={64}
                src={facilityDetail.userImgUrl}
              >
                {facilityDetail.userName?.[0]?.toUpperCase()}
              </Avatar>
              <div style={{ flex: 1 }}>
                <Text strong style={{ margin: 0 }}>
                  {facilityDetail.facilityPostContent}
                </Text>
                <Text type="secondary">
                  Đăng bởi: {facilityDetail.userName}
                </Text>
              </div>
            </Flex>

            <Divider />

            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Paragraph>
                {facilityDetail.facilityPostContent}
              </Paragraph>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card size="small">
                    <Statistic
                      title="Lượt xem"
                      value={facilityDetail.views || 0}
                      prefix={<EyeOutlined />}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small">
                    <Statistic
                      title="Đánh giá"
                      value={facilityDetail.rating || 0}
                      prefix={<StarOutlined style={{ color: '#faad14' }} />}
                      suffix="/5.0"
                    />
                  </Card>
                </Col>
              </Row>

              <Space direction="vertical" size="small">
                <Text strong>Thông tin liên hệ:</Text>
                <Space>
                  <PhoneOutlined /> {facilityDetail.phone || 'Chưa cập nhật'}
                </Space>
                <Space>
                  <EnvironmentOutlined /> {facilityDetail.floor || 'Chưa cập nhật'}
                </Space>
                <Space>
                  <ClockCircleOutlined /> {facilityDetail.hours || 'Chưa cập nhật'}
                </Space>
              </Space>

              {activeTab === 'buildingServices' && (
                <Alert
                  message="Giá dịch vụ"
                  description={
                    <Text strong style={{ color: '#ff4d4f', fontSize: '16px' }}>
                      {formatPrice(facilityDetail.price || 0)}
                    </Text>
                  }
                  type="info"
                  showIcon
                />
              )}
            </Space>
          </div>
        </>
      ) : (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center' 
        }}>
          <Spin size="large" />
        </div>
      )}
    </Modal>
  );

  const columns = [
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: status => {
        const statusConfig = {
          pending: { color: 'gold', text: 'Chờ duyệt' },
          verified: { color: 'green', text: 'Đã duyệt' },
          rejected: { color: 'red', text: 'Từ chối' }
        };
        const config = statusConfig[status] || statusConfig.pending;
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => goToServiceDetails(record.id)}
          >
            Chi tiết
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
          >
            Sửa
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Tabs 
        activeKey={activeTab} 
        onChange={handleTabChange}
        type="card"
        tabBarStyle={{ marginBottom: 24 }}
        tabBarExtra={
          activeTab === "buildingServices" && (
            <Button 
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsCreateModalVisible(true)}
            >
              Tạo bài viết
            </Button>
          )
        }
      >
        <Tabs.TabPane
          tab={<span><ShopOutlined /> Dịch vụ liên kết</span>}
          key="partnerServices"
        >
          {renderPartnerServices()}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={<span><BuildOutlined /> Bài viết của bạn</span>}
          key="buildingServices"
        >
          <div style={{ marginBottom: 16 }}>
            <Button 
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsCreateModalVisible(true)}
            >
              Tạo bài viết mới
            </Button>
          </div>
          <Table
            dataSource={facilities}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showTotal: total => `Tổng ${total} bài viết`,
              current: currentPage,
              onChange: (page) => setCurrentPage(page)
            }}
          />
        </Tabs.TabPane>
      </Tabs>

      <CreateServiceModal 
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        onSubmit={handleCreateService}
        loading={loading}
        currentUser={currentUser}  
      />
      
      <UpdateServiceModal 
        visible={isUpdateModalVisible}
        onCancel={() => {
          setIsUpdateModalVisible(false);
          setSelectedService(null);
        }}
        onSubmit={handleUpdateService}
        loading={loading}
        initialValues={selectedService}
      />
      
      {ServiceDetailModal()}
    </div>
  );
};

export default ServicePage;