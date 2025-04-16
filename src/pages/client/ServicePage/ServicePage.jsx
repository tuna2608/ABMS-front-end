import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Space,
  Input,
  Select,
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
  message
} from "antd";
import {
  HomeOutlined,
  DollarOutlined,
  SearchOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  ArrowRightOutlined,
  BuildOutlined,
  ShopOutlined,
  PlusOutlined,
  IdcardOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  CoffeeOutlined,
  ShoppingOutlined,
  MedicineBoxOutlined,
  ReadOutlined,
  GiftOutlined,
  CustomerServiceOutlined,
  ToolOutlined,
  ClearOutlined,
  SafetyOutlined,
  StarOutlined
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

// Danh mục dịch vụ liên kết
const partnerCategories = ["Tất cả", "Ăn uống", "Mua sắm", "Y tế", "Giải trí", "Giáo dục", "Khác"];

// Danh mục dịch vụ toà nhà
const buildingCategories = ["Tất cả", "Vệ sinh", "Sửa chữa", "An ninh", "Tiện ích", "Bảo trì"];

// Các loại thẻ
const cardTypes = ["Thẻ cư dân", "Thẻ gửi xe", "Thẻ ra vào", "Thẻ sử dụng tiện ích"];

const ServicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("partnerServices"); // Default to partner services
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isCardRequestModalVisible, setIsCardRequestModalVisible] = useState(false);
  
  const pageSize = 8;

  const onSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const onCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const goToServiceDetails = (serviceId) => {
    navigate(`/service-detail/${serviceId}`);
    console.log(`Đang chuyển đến trang chi tiết dịch vụ ID: ${serviceId}`);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const showCreateServiceModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateService = (values) => {
    console.log("Tạo dịch vụ mới:", values);
    message.success("Đã tạo bài viết dịch vụ mới thành công!");
    setIsCreateModalVisible(false);
  };

  const showCardRequestModal = () => {
    setIsCardRequestModalVisible(true);
  };

  const handleCardRequest = (values) => {
    console.log("Yêu cầu cấp thẻ:", values);
    message.success("Đã gửi yêu cầu cấp thẻ thành công!");
    setIsCardRequestModalVisible(false);
  };

  // Data mẫu cho Dịch vụ liên kết
  const partnerServices = [
    {
      id: 1,
      title: "Highland Coffee - Tầng 1",
      content: "Thưởng thức cà phê, trà và bánh ngọt cao cấp trong không gian hiện đại. Đặc biệt giảm 10% cho cư dân.",
      provider: "Highland Coffee",
      category: "Ăn uống",
      image: "https://via.placeholder.com/500x300",
      floor: "Tầng 1, Block A",
      hours: "07:00 - 22:00",
      contact: "0912345678",
      rating: 4.5,
      views: 156
    },
    {
      id: 2,
      title: "VinMart - Siêu thị mini",
      content: "Siêu thị tiện lợi cung cấp đầy đủ nhu yếu phẩm, thực phẩm tươi sống và các mặt hàng thiết yếu cho cư dân.",
      provider: "VinMart",
      category: "Mua sắm",
      image: "https://via.placeholder.com/500x300",
      floor: "Tầng 1, Block B",
      hours: "06:00 - 22:30",
      contact: "0923456789",
      rating: 4.3,
      views: 203
    },
    {
      id: 3,
      title: "Pharmacity - Nhà thuốc",
      content: "Nhà thuốc uy tín cung cấp đầy đủ các loại thuốc, thực phẩm chức năng và sản phẩm chăm sóc sức khỏe.",
      provider: "Pharmacity",
      category: "Y tế",
      image: "https://via.placeholder.com/500x300",
      floor: "Tầng 1, Block A",
      hours: "07:30 - 21:00",
      contact: "0934567890",
      rating: 4.7,
      views: 142
    },
    {
      id: 4,
      title: "Trung tâm Anh ngữ New Stars",
      content: "Chương trình học tiếng Anh chất lượng cao dành cho mọi lứa tuổi, giảm 15% học phí cho cư dân.",
      provider: "New Stars English Center",
      category: "Giáo dục",
      image: "https://via.placeholder.com/500x300",
      floor: "Tầng 3, Block C",
      hours: "08:00 - 20:00",
      contact: "0945678901",
      rating: 4.8,
      views: 89
    },
    {
      id: 5,
      title: "Nhà hàng Nhật Bản Sakura",
      content: "Thưởng thức các món ăn Nhật Bản chính thống với đầu bếp từ Tokyo, không gian sang trọng và yên tĩnh.",
      provider: "Sakura Restaurant",
      category: "Ăn uống",
      image: "https://via.placeholder.com/500x300",
      floor: "Tầng 2, Block B",
      hours: "10:00 - 22:00",
      contact: "0956789012",
      rating: 4.6,
      views: 176
    },
    {
      id: 6,
      title: "CGV Cinema Mini",
      content: "Rạp chiếu phim mini với 2 phòng chiếu, công nghệ âm thanh Dolby Atmos, giảm 20% giá vé cho cư dân.",
      provider: "CGV Cinemas",
      category: "Giải trí",
      image: "https://via.placeholder.com/500x300",
      floor: "Tầng 4, Block A",
      hours: "09:00 - 23:00",
      contact: "0967890123",
      rating: 4.5,
      views: 225
    },
    {
      id: 7,
      title: "Family Mart 24h",
      content: "Cửa hàng tiện lợi hoạt động 24/7, cung cấp đồ ăn nhanh, đồ uống và các vật dụng thiết yếu.",
      provider: "Family Mart",
      category: "Mua sắm",
      image: "https://via.placeholder.com/500x300",
      floor: "Tầng 1, Block D",
      hours: "24/7",
      contact: "0978901234",
      rating: 4.2,
      views: 143
    },
    {
      id: 8,
      title: "Phòng tập Gym Elite Fitness",
      content: "Phòng tập hiện đại với đầy đủ thiết bị, HLV chuyên nghiệp và các lớp yoga, zumba hàng ngày.",
      provider: "Elite Fitness",
      category: "Giải trí",
      image: "https://via.placeholder.com/500x300",
      floor: "Tầng 5, Block C",
      hours: "05:30 - 22:00",
      contact: "0989012345",
      rating: 4.8,
      views: 165
    }
  ];

  // Data mẫu cho Dịch vụ toà nhà
  const buildingServices = [
    {
      id: 101,
      title: "Dịch vụ vệ sinh căn hộ chuyên nghiệp",
      content: "Cung cấp dịch vụ vệ sinh căn hộ với đội ngũ nhân viên chuyên nghiệp, sử dụng thiết bị và hóa chất thân thiện với môi trường.",
      provider: "Ban quản lý tòa nhà",
      category: "Vệ sinh",
      image: "https://via.placeholder.com/500x300",
      price: 350000,
      contact: "0912345678",
      rating: 4.5,
      views: 156
    },
    {
      id: 102,
      title: "Sửa chữa điện nước 24/7",
      content: "Dịch vụ sửa chữa điện nước khẩn cấp, hoạt động 24/7, đảm bảo khắc phục sự cố trong vòng 2 giờ.",
      provider: "Ban quản lý tòa nhà",
      category: "Sửa chữa",
      image: "https://via.placeholder.com/500x300",
      price: 200000,
      contact: "0923456789",
      rating: 4.8,
      views: 203
    },
    {
      id: 103,
      title: "Dịch vụ bảo vệ 24/7",
      content: "Đảm bảo an ninh tòa nhà với đội ngũ bảo vệ chuyên nghiệp hoạt động 24/7, camera giám sát và hệ thống báo động.",
      provider: "Ban quản lý tòa nhà",
      category: "An ninh",
      image: "https://via.placeholder.com/500x300",
      price: 0,
      contact: "0934567890",
      rating: 4.9,
      views: 312
    },
    {
      id: 104,
      title: "Bảo trì định kỳ căn hộ",
      content: "Dịch vụ kiểm tra và bảo trì định kỳ các hệ thống trong căn hộ: điện, nước, điều hòa, chống thấm.",
      provider: "Ban quản lý tòa nhà",
      category: "Bảo trì",
      image: "https://via.placeholder.com/500x300",
      price: 500000,
      contact: "0945678901",
      rating: 4.7,
      views: 89
    },
    {
      id: 105,
      title: "Vệ sinh kính và ban công",
      content: "Dịch vụ vệ sinh chuyên nghiệp cho kính cửa sổ và ban công căn hộ, đảm bảo an toàn và sạch sẽ.",
      provider: "Ban quản lý tòa nhà",
      category: "Vệ sinh",
      image: "https://via.placeholder.com/500x300",
      price: 450000,
      contact: "0956789012",
      rating: 4.6,
      views: 76
    },
    {
      id: 106,
      title: "Sửa chữa và bảo trì điều hòa",
      content: "Dịch vụ vệ sinh, sửa chữa và bảo trì điều hòa định kỳ, giúp tiết kiệm điện và kéo dài tuổi thọ thiết bị.",
      provider: "Ban quản lý tòa nhà",
      category: "Sửa chữa",
      image: "https://via.placeholder.com/500x300",
      price: 300000,
      contact: "0967890123",
      rating: 4.3,
      views: 125
    },
    {
      id: 107,
      title: "Dịch vụ đưa đón sân bay",
      content: "Dịch vụ đặt xe đưa đón sân bay, ga tàu với giá ưu đãi dành riêng cho cư dân.",
      provider: "Ban quản lý tòa nhà",
      category: "Tiện ích",
      image: "https://via.placeholder.com/500x300",
      price: 250000,
      contact: "0978901234",
      rating: 4.7,
      views: 143
    },
    {
      id: 108,
      title: "Lắp đặt camera an ninh",
      content: "Tư vấn, lắp đặt và bảo trì hệ thống camera an ninh cho căn hộ với công nghệ AI phát hiện chuyển động.",
      provider: "Ban quản lý tòa nhà",
      category: "An ninh",
      image: "https://via.placeholder.com/500x300",
      price: 2500000,
      contact: "0989012345",
      rating: 4.8,
      views: 65
    }
  ];

  const formatPrice = (price) => {
    if (price === 0) return "Miễn phí";
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  };

  const getCategoryIcon = (category, isPartner = true) => {
    if (isPartner) {
      // Icons for partner services
      switch (category) {
        case "Ăn uống":
          return <CoffeeOutlined />;
        case "Mua sắm":
          return <ShoppingOutlined />;
        case "Y tế":
          return <MedicineBoxOutlined />;
        case "Giải trí":
          return <GiftOutlined />;
        case "Giáo dục":
          return <ReadOutlined />;
        default:
          return <ShopOutlined />;
      }
    } else {
      // Icons for building services
      switch (category) {
        case "Vệ sinh":
          return <ClearOutlined />;
        case "Sửa chữa":
          return <ToolOutlined />;
        case "An ninh":
          return <SafetyOutlined />;
        case "Tiện ích":
          return <CustomerServiceOutlined />;
        case "Bảo trì":
          return <BuildOutlined />;
        default:
          return <HomeOutlined />;
      }
    }
  };

  const renderPartnerServices = () => (
    <>
      <Flex justify="space-between" align="center" wrap="wrap" gap={16} style={{ marginBottom: 24 }}>
        <Search
          placeholder="Tìm kiếm dịch vụ liên kết..."
          onSearch={onSearch}
          style={{ width: 320 }}
          prefix={<SearchOutlined />}
          allowClear
          size="large"
        />

        <Flex gap={16} wrap="wrap">
          <Flex align="center" gap={8}>
            <ShopOutlined style={{ color: '#4b7bec' }} />
            <Select
              defaultValue="Tất cả"
              style={{ width: 150 }}
              onChange={onCategoryChange}
              size="large"
            >
              {partnerCategories.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </Flex>
          
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            size="large"
            onClick={showCreateServiceModal}
          >
            Tạo bài viết
          </Button>
        </Flex>
      </Flex>

      <Row gutter={[24, 24]}>
        {loading
          ? Array(4)
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
          : partnerServices.map((service) => (
              <Col xs={24} sm={12} md={8} lg={6} key={service.id}>
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
                      <img
                        alt={service.title}
                        src={service.image}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: 'transform 0.3s',
                        }}
                      />
                      <Tag 
                        color="blue"
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 10,
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        {getCategoryIcon(service.category, true)}
                        <span style={{ marginLeft: 4 }}>{service.category}</span>
                      </Tag>
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
                          {service.provider}
                        </Text>
                      </div>
                    </div>
                  }
                  onClick={() => goToServiceDetails(service.id)}
                  actions={[
                    <Tooltip title="Địa điểm">
                      <Space>
                        <EnvironmentOutlined key="location" style={{ color: '#4b7bec' }} />
                        {service.floor}
                      </Space>
                    </Tooltip>,
                    <Tooltip title="Giờ mở cửa">
                      <Space>
                        <ClockCircleOutlined key="hours" />
                        {service.hours}
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
                      <Tooltip title={service.title}>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#4b7bec' }}>
                          {service.title.length > 28
                            ? `${service.title.substring(0, 28)}...`
                            : service.title}
                        </div>
                      </Tooltip>
                    }
                    description={
                      <>
                        <Paragraph
                          ellipsis={{ rows: 2 }}
                          style={{ height: 40, color: '#666', marginBottom: 12 }}
                        >
                          {service.content}
                        </Paragraph>
                        <Space direction="vertical" style={{ width: "100%" }}>
                          <div>
                            <Flex align="center" justify="space-between">
                              <Flex align="center">
                                <StarOutlined style={{ color: '#faad14', marginRight: 5 }} />
                                <Text strong>{service.rating}/5.0</Text>
                              </Flex>
                              <Flex align="center">
                                <EyeOutlined style={{ marginRight: 5 }} />
                                <Text type="secondary">{service.views}</Text>
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
                                goToServiceDetails(service.id);
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
          total={partnerServices.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          showTotal={(total) => `Tổng cộng ${total} dịch vụ liên kết`}
        />
      </div>
    </>
  );

  const renderBuildingServices = () => (
    <>
      <Flex justify="space-between" align="center" wrap="wrap" gap={16} style={{ marginBottom: 24 }}>
        <Search
          placeholder="Tìm kiếm dịch vụ toà nhà..."
          onSearch={onSearch}
          style={{ width: 320 }}
          prefix={<SearchOutlined />}
          allowClear
          size="large"
        />

        <Flex gap={16} wrap="wrap">
          <Flex align="center" gap={8}>
            <BuildOutlined style={{ color: '#4b7bec' }} />
            <Select
              defaultValue="Tất cả"
              style={{ width: 150 }}
              onChange={onCategoryChange}
              size="large"
            >
              {buildingCategories.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </Flex>
          
          <Button 
            type="primary" 
            icon={<IdcardOutlined />}
            size="large"
            onClick={showCardRequestModal}
            style={{ background: '#52c41a' }}
          >
            Yêu cầu cấp thẻ
          </Button>
        </Flex>
      </Flex>

      <Row gutter={[24, 24]}>
        {loading
          ? Array(4)
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
          : buildingServices.map((service) => (
              <Col xs={24} sm={12} md={8} lg={6} key={service.id}>
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
                      <img
                        alt={service.title}
                        src={service.image}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: 'transform 0.3s',
                        }}
                      />
                      <Tag 
                        color="green"
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 10,
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        {getCategoryIcon(service.category, false)}
                        <span style={{ marginLeft: 4 }}>{service.category}</span>
                      </Tag>
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
                          {service.provider}
                        </Text>
                      </div>
                    </div>
                  }
                  onClick={() => goToServiceDetails(service.id)}
                  actions={[
                    <Tooltip title="Đánh giá">
                      <Space>
                        <StarOutlined key="rating" style={{ color: '#faad14' }} />
                        {service.rating}
                      </Space>
                    </Tooltip>,
                    <Tooltip title="Lượt xem">
                      <Space>
                        <EyeOutlined key="view" />
                        {service.views}
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
                      <Tooltip title={service.title}>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#4b7bec' }}>
                          {service.title.length > 28
                            ? `${service.title.substring(0, 28)}...`
                            : service.title}
                        </div>
                      </Tooltip>
                    }
                    description={
                      <>
                        <Paragraph
                          ellipsis={{ rows: 2 }}
                          style={{ height: 40, color: '#666', marginBottom: 12 }}
                        >
                          {service.content}
                        </Paragraph>
                        <Space direction="vertical" style={{ width: "100%" }}>
                          <div>
                            <DollarOutlined style={{ color: '#ff4d4f', marginRight: 5 }} />
                            <Text strong style={{ color: '#ff4d4f', fontSize: '16px' }}>
                              {formatPrice(service.price)}
                            </Text>
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
                                goToServiceDetails(service.id);
                              }}
                            >
                              Đặt dịch vụ <ArrowRightOutlined />
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
          total={buildingServices.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          showTotal={(total) => `Tổng cộng ${total} dịch vụ tòa nhà`}
        />
      </div>
    </>
  );

  const CreateServiceModal = () => (
    <Modal
      title="Tạo bài viết dịch vụ mới"
      visible={isCreateModalVisible}
      onCancel={() => setIsCreateModalVisible(false)}
      footer={null}
      width={700}
    >
      <Form layout="vertical" onFinish={handleCreateService}>
        <Form.Item
          name="title"
          label="Tiêu đề dịch vụ"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề dịch vụ!" }]}
        >
          <Input placeholder="Nhập tiêu đề dịch vụ" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Loại dịch vụ"
          rules={[{ required: true, message: "Vui lòng chọn loại dịch vụ!" }]}
        >
          <Select placeholder="Chọn loại dịch vụ">
            {partnerCategories
              .filter(cat => cat !== "Tất cả")
              .map(cat => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="provider"
          label="Nhà cung cấp"
          rules={[{ required: true, message: "Vui lòng nhập tên nhà cung cấp!" }]}
        >
          <Input placeholder="Nhập tên nhà cung cấp" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Nội dung"
          rules={[{ required: true, message: "Vui lòng nhập nội dung dịch vụ!" }]}
        >
          <TextArea rows={4} placeholder="Mô tả chi tiết về dịch vụ" />
        </Form.Item>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="floor"
              label="Vị trí"
              rules={[{ required: true, message: "Vui lòng nhập vị trí!" }]}
            >
              <Input placeholder="Ví dụ: Tầng 1, Block A" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="hours"
              label="Giờ mở cửa"
              rules={[{ required: true, message: "Vui lòng nhập giờ mở cửa!" }]}
            >
              <Input placeholder="Ví dụ: 07:00 - 22:00" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="contact"
          label="Số điện thoại liên hệ"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input placeholder="Nhập số điện thoại liên hệ" />
        </Form.Item>

        <Form.Item
          name="images"
          label="Hình ảnh"
          rules={[{ required: true, message: "Vui lòng tải lên ít nhất 1 hình ảnh!" }]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            maxCount={5}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải ảnh</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <div style={{ textAlign: "right" }}>
            <Button style={{ marginRight: 8 }} onClick={() => setIsCreateModalVisible(false)}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Đăng bài
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );

  const CardRequestModal = () => (
    <Modal
      title="Yêu cầu cấp thẻ"
      visible={isCardRequestModalVisible}
      onCancel={() => setIsCardRequestModalVisible(false)}
      footer={null}
      width={600}
    >
      <Form layout="vertical" onFinish={handleCardRequest}>
        <Form.Item
          name="cardType"
          label="Loại thẻ"
          rules={[{ required: true, message: "Vui lòng chọn loại thẻ!" }]}
        >
          <Select placeholder="Chọn loại thẻ cần cấp">
            {cardTypes.map(type => (
              <Option key={type} value={type}>{type}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="apartmentNumber"
          label="Số căn hộ"
          rules={[{ required: true, message: "Vui lòng nhập số căn hộ!" }]}
        >
          <Input placeholder="Ví dụ: A1203" />
        </Form.Item>

        <Form.Item
          name="idCard"
          label="CMND/CCCD"
          rules={[{ required: true, message: "Vui lòng nhập số CMND/CCCD!" }]}
        >
          <Input placeholder="Nhập số CMND/CCCD" />
        </Form.Item>

        <Form.Item
          name="photo"
          label="Ảnh chân dung"
          rules={[{ required: true, message: "Vui lòng tải lên ảnh chân dung!" }]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            maxCount={1}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải ảnh</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          name="note"
          label="Ghi chú (nếu có)"
        >
          <TextArea rows={3} placeholder="Nhập ghi chú nếu có" />
        </Form.Item>

        <Form.Item>
          <div style={{ textAlign: "right" }}>
            <Button style={{ marginRight: 8 }} onClick={() => setIsCardRequestModalVisible(false)}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" style={{ background: '#52c41a' }}>
              Gửi yêu cầu
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );

  return (
    <>
      <div style={{ padding: "24px" }}>
        <Flex align="center" style={{ marginBottom: 24 }}>
          <HomeOutlined style={{ fontSize: 24, marginRight: 12, color: '#4b7bec' }} />
          <Title level={2} style={{ margin: 0 }}>Dịch vụ & Tiện ích</Title>
        </Flex>

        <Tabs 
          activeKey={activeTab} 
          onChange={handleTabChange}
          type="card"
          tabBarStyle={{ marginBottom: 24 }}
          size="large"
        >
          <TabPane
            tab={
              <span>
                <ShopOutlined />
                Dịch vụ liên kết
              </span>
            }
            key="partnerServices"
          >
            {renderPartnerServices()}
          </TabPane>
          <TabPane
            tab={
              <span>
                <BuildOutlined />
                Dịch vụ tòa nhà
              </span>
            }
            key="buildingServices"
          >
            {renderBuildingServices()}
          </TabPane>
        </Tabs>
      </div>

      {/* Modals */}
      {CreateServiceModal()}
      {CardRequestModal()}
    </>
  );
};

export default ServicePage;