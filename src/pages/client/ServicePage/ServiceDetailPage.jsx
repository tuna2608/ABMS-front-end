import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Space,
  Divider,
  Carousel,
  Rate,
  Avatar,
  Tabs,
  Comment,
  Form,
  Input,
  List,
  message,
  Descriptions,
  Flex,
  Badge,
  Modal,
  Radio
} from "antd";
import {
  HomeOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  ShopOutlined,
  BuildOutlined,
  ArrowLeftOutlined,
  StarOutlined,
  HeartOutlined,
  ShareAltOutlined,
  UserOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  LikeOutlined,
  HistoryOutlined,
  SendOutlined,
  CoffeeOutlined,
  ShoppingOutlined,
  MedicineBoxOutlined,
  ReadOutlined,
  GiftOutlined,
  CustomerServiceOutlined,
  ToolOutlined,
  ClearOutlined,
  SafetyOutlined,
  HeartFilled,
  CommentOutlined
} from "@ant-design/icons";
import { useParams, useNavigate, Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [serviceDetail, setServiceDetail] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [ratingValue, setRatingValue] = useState(5);
  const serviceId = parseInt(id);

  // Simulate fetching data
  useEffect(() => {
    setLoading(true);
    
    // Mock data based on serviceId
    const isPartnerService = serviceId < 100;
    
    if (isPartnerService) {
      // Partner service detail
      setServiceDetail({
        id: serviceId,
        title: "Highland Coffee - Tầng 1",
        content: "Thưởng thức cà phê, trà và bánh ngọt cao cấp trong không gian hiện đại. Đặc biệt giảm 10% cho cư dân.",
        provider: "Highland Coffee",
        category: "Ăn uống",
        images: [
          "https://via.placeholder.com/800x400",
          "https://via.placeholder.com/800x400",
          "https://via.placeholder.com/800x400"
        ],
        floor: "Tầng 1, Block A",
        hours: "07:00 - 22:00",
        contact: "0912345678",
        website: "https://www.highlandscoffee.com.vn",
        rating: 4.5,
        views: 156,
        isPartner: true,
        description: "Highland Coffee là thương hiệu cà phê Việt Nam với lịch sử phát triển từ năm 1999. Tại Highland Coffee - Tầng 1, chúng tôi mang đến cho bạn những trải nghiệm cà phê thơm ngon nhất cùng không gian hiện đại, thoải mái.\n\nCùng với đội ngũ nhân viên chuyên nghiệp, chúng tôi cam kết mang đến cho quý cư dân và khách hàng những sản phẩm chất lượng cao với giá cả hợp lý. Đặc biệt, chúng tôi có chương trình ưu đãi giảm 10% cho tất cả cư dân của tòa nhà khi xuất trình thẻ cư dân.\n\nHãy đến và thưởng thức những ly cà phê thơm ngon, những loại trà đặc biệt và các loại bánh ngọt hấp dẫn tại Highland Coffee - Tầng 1.",
        menu: [
          { name: "Cà phê đen đá", price: 29000 },
          { name: "Cà phê sữa đá", price: 35000 },
          { name: "Bạc xỉu đá", price: 39000 },
          { name: "Trà sen vàng", price: 45000 },
          { name: "Trà thạch đào", price: 49000 },
          { name: "Bánh chuối", price: 35000 },
          { name: "Bánh chocolate", price: 39000 }
        ],
        promotions: [
          "Giảm 10% cho cư dân khi xuất trình thẻ",
          "Tặng 1 bánh ngọt cho hóa đơn trên 200.000đ",
          "Happy Hour: Giảm 15% từ 14:00 - 17:00 các ngày trong tuần"
        ],
        comments: [
          {
            author: "Nguyễn Văn A",
            avatar: "https://via.placeholder.com/60",
            content: "Cà phê rất ngon, không gian thoải mái và yên tĩnh. Nhân viên phục vụ rất lịch sự.",
            datetime: "2023-09-15 09:30",
            rating: 5
          },
          {
            author: "Trần Thị B",
            avatar: "https://via.placeholder.com/60",
            content: "Thức uống đa dạng, giá cả hợp lý. Tuy nhiên vào giờ cao điểm hơi đông và ồn.",
            datetime: "2023-09-12 14:20",
            rating: 4
          },
          {
            author: "Lê Văn C",
            avatar: "https://via.placeholder.com/60",
            content: "Bánh ngọt ở đây rất ngon, đặc biệt là bánh chocolate. Sẽ ghé lại thường xuyên.",
            datetime: "2023-09-08 17:45",
            rating: 5
          }
        ]
      });
    } else {
      // Building service detail
      setServiceDetail({
        id: serviceId,
        title: "Dịch vụ vệ sinh căn hộ chuyên nghiệp",
        content: "Cung cấp dịch vụ vệ sinh căn hộ với đội ngũ nhân viên chuyên nghiệp, sử dụng thiết bị và hóa chất thân thiện với môi trường.",
        provider: "Ban quản lý tòa nhà",
        category: "Vệ sinh",
        images: [
          "https://via.placeholder.com/800x400",
          "https://via.placeholder.com/800x400",
          "https://via.placeholder.com/800x400"
        ],
        price: 350000,
        contact: "0912345678",
        email: "services@building.com",
        rating: 4.5,
        views: 156,
        isPartner: false,
        description: "Dịch vụ vệ sinh căn hộ chuyên nghiệp của Ban quản lý tòa nhà sẽ giúp bạn có một không gian sống sạch sẽ, thoáng mát mà không cần tốn nhiều thời gian và công sức.\n\nĐội ngũ nhân viên được đào tạo bài bản, chuyên nghiệp, có kinh nghiệm trong lĩnh vực vệ sinh cao cấp. Chúng tôi sử dụng các thiết bị hiện đại và hóa chất làm sạch thân thiện với môi trường, an toàn cho sức khỏe của bạn và gia đình.\n\nDịch vụ của chúng tôi bao gồm làm sạch toàn diện: sàn nhà, cửa kính, nội thất, nhà bếp, phòng tắm... mang lại vẻ sáng bóng như mới cho căn hộ của bạn.",
        packages: [
          { 
            name: "Gói cơ bản", 
            price: 350000,
            details: "Vệ sinh sàn nhà, lau kính cửa sổ, vệ sinh phòng tắm, vệ sinh nhà bếp, vệ sinh bụi các bề mặt nội thất"
          },
          { 
            name: "Gói nâng cao", 
            price: 550000,
            details: "Tất cả dịch vụ của gói cơ bản + Giặt sofa, giặt nệm, vệ sinh máy lạnh, vệ sinh tủ lạnh, vệ sinh sâu khe hở nội thất"
          },
          { 
            name: "Gói cao cấp", 
            price: 850000,
            details: "Tất cả dịch vụ của gói nâng cao + Đánh bóng sàn, khử trùng toàn bộ căn hộ, xử lý mùi, vệ sinh chuyên sâu toàn bộ đồ điện tử"
          }
        ],
        process: [
          "Đặt lịch dịch vụ qua ứng dụng hoặc gọi điện",
          "Nhân viên khảo sát và tư vấn gói dịch vụ phù hợp",
          "Thực hiện dịch vụ theo lịch hẹn",
          "Kiểm tra chất lượng và xác nhận hoàn thành",
          "Thanh toán và đánh giá dịch vụ"
        ],
        comments: [
          {
            author: "Nguyễn Văn A",
            avatar: "https://via.placeholder.com/60",
            content: "Dịch vụ rất chuyên nghiệp, nhân viên làm việc cẩn thận và tỉ mỉ. Căn hộ sạch sẽ và thơm tho sau khi hoàn thành.",
            datetime: "2023-09-15 09:30",
            rating: 5
          },
          {
            author: "Trần Thị B",
            avatar: "https://via.placeholder.com/60",
            content: "Giá cả hợp lý, chất lượng tốt. Sẽ tiếp tục sử dụng dịch vụ trong tương lai.",
            datetime: "2023-09-12 14:20",
            rating: 4
          }
        ]
      });
    }
    
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [serviceId]);

  const goBack = () => {
    navigate(-1);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    message.success(isFavorite ? "Đã bỏ dịch vụ khỏi danh sách yêu thích" : "Đã thêm dịch vụ vào danh sách yêu thích");
  };

  const showBookingModal = () => {
    setIsModalVisible(true);
  };

  const handleBookingCancel = () => {
    setIsModalVisible(false);
  };

  const handleBookingSubmit = () => {
    message.success("Đặt dịch vụ thành công!");
    setIsModalVisible(false);
  };

  const handleCommentSubmit = () => {
    if (commentValue.trim() === "") {
      message.error("Vui lòng nhập nội dung đánh giá!");
      return;
    }

    message.success("Đánh giá của bạn đã được gửi!");
    setCommentValue("");
    setRatingValue(5);
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

  const formatPrice = (price) => {
    if (price === 0) return "Miễn phí";
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  };

  if (loading || !serviceDetail) {
    return (
      <div style={{ padding: "24px" }}>
        <Card loading={true} />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      {/* Breadcrumb */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Trang chủ
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/services">
            {serviceDetail.isPartner ? <ShopOutlined /> : <BuildOutlined />} Dịch vụ
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{serviceDetail.title}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Back button */}
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={goBack}
        style={{ marginBottom: 16, padding: 0 }}
      >
        Quay lại danh sách dịch vụ
      </Button>

      {/* Main content */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          {/* Image carousel */}
          <Card
            bodyStyle={{ padding: 0 }}
            style={{ marginBottom: 24, borderRadius: 8, overflow: "hidden" }}
          >
            <Carousel autoplay style={{ backgroundColor: "#f0f0f0" }}>
              {serviceDetail.images.map((image, index) => (
                <div key={index}>
                  <div style={{ height: "400px", position: "relative" }}>
                    <img
                      src={image}
                      alt={`${serviceDetail.title} - Ảnh ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          </Card>

          {/* Service info */}
          <Card style={{ marginBottom: 24, borderRadius: 8 }}>
            <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <Tag 
                  color={serviceDetail.isPartner ? "blue" : "green"} 
                  style={{ marginBottom: 12 }}
                >
                  {getCategoryIcon(serviceDetail.category, serviceDetail.isPartner)}
                  <span style={{ marginLeft: 4 }}>{serviceDetail.category}</span>
                </Tag>
                <Title level={3} style={{ margin: "0 0 8px 0" }}>
                  {serviceDetail.title}
                </Title>
                <Flex align="center" gap={8}>
                  <Text type="secondary">Cung cấp bởi: </Text>
                  <Text strong>{serviceDetail.provider}</Text>
                </Flex>
              </div>
              <Space>
                <Button
                  icon={isFavorite ? <HeartFilled style={{ color: "#ff4d4f" }} /> : <HeartOutlined />}
                  onClick={handleFavoriteToggle}
                >
                  {isFavorite ? "Đã yêu thích" : "Yêu thích"}
                </Button>
                <Button icon={<ShareAltOutlined />}>Chia sẻ</Button>
              </Space>
            </div>

            <Divider style={{ margin: "16px 0" }} />
            
            <Row gutter={16}>
              <Col span={12}>
                <Flex align="center" gap={8}>
                  <StarOutlined style={{ color: "#faad14" }} />
                  <Text>{serviceDetail.rating}/5.0</Text>
                  <Divider type="vertical" />
                  <Text>({serviceDetail.comments?.length || 0} đánh giá)</Text>
                </Flex>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Text type="secondary">
                  <InfoCircleOutlined /> {serviceDetail.views} lượt xem
                </Text>
              </Col>
            </Row>

            {serviceDetail.isPartner ? (
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Flex align="center" gap={8}>
                    <EnvironmentOutlined style={{ color: "#4b7bec" }} />
                    <Text strong>{serviceDetail.floor}</Text>
                  </Flex>
                </Col>
                <Col span={12}>
                  <Flex align="center" gap={8}>
                    <ClockCircleOutlined style={{ color: "#4b7bec" }} />
                    <Text strong>{serviceDetail.hours}</Text>
                  </Flex>
                </Col>
              </Row>
            ) : (
              <Row style={{ marginTop: 16 }}>
                <Col span={24}>
                  <Flex align="center" gap={8}>
                    <DollarOutlined style={{ color: "#ff4d4f" }} />
                    <Text strong style={{ color: "#ff4d4f", fontSize: 18 }}>{formatPrice(serviceDetail.price)}</Text>
                  </Flex>
                </Col>
              </Row>
            )}

            <Row style={{ marginTop: 16 }}>
              <Col span={24}>
                <Flex align="center" gap={8}>
                  <PhoneOutlined style={{ color: "#4b7bec" }} />
                  <Text strong>{serviceDetail.contact}</Text>
                </Flex>
              </Col>
            </Row>

            {!serviceDetail.isPartner && serviceDetail.email && (
              <Row style={{ marginTop: 8 }}>
                <Col span={24}>
                  <Flex align="center" gap={8}>
                    <InfoCircleOutlined style={{ color: "#4b7bec" }} />
                    <Text strong>{serviceDetail.email}</Text>
                  </Flex>
                </Col>
              </Row>
            )}
            
            <Divider style={{ margin: "24px 0" }} />

            <div style={{ marginBottom: 24 }}>
              <Title level={4}>Giới thiệu</Title>
              <Paragraph style={{ whiteSpace: "pre-line" }}>
                {serviceDetail.description}
              </Paragraph>
            </div>

            {/* Dynamic content based on service type */}
            {serviceDetail.isPartner ? (
              <>
                {serviceDetail.menu && serviceDetail.menu.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <Title level={4}>Menu nổi bật</Title>
                    <List
                      itemLayout="horizontal"
                      dataSource={serviceDetail.menu}
                      grid={{ gutter: 16, column: 2 }}
                      renderItem={(item) => (
                        <List.Item>
                          <Flex justify="space-between" style={{ width: "100%" }}>
                            <Text>{item.name}</Text>
                            <Text strong>{formatPrice(item.price)}</Text>
                          </Flex>
                        </List.Item>
                      )}
                    />
                  </div>
                )}

                {serviceDetail.promotions && serviceDetail.promotions.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <Title level={4}>Ưu đãi đặc biệt</Title>
                    <List
                      itemLayout="horizontal"
                      dataSource={serviceDetail.promotions}
                      renderItem={(item) => (
                        <List.Item>
                          <Tag color="volcano" style={{ marginRight: 12 }}>Ưu đãi</Tag>
                          <Text>{item}</Text>
                        </List.Item>
                      )}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                {serviceDetail.packages && serviceDetail.packages.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <Title level={4}>Các gói dịch vụ</Title>
                    <List
                      itemLayout="vertical"
                      dataSource={serviceDetail.packages}
                      renderItem={(item) => (
                        <Card style={{ marginBottom: 12 }}>
                          <Flex justify="space-between" align="center" style={{ marginBottom: 8 }}>
                            <Title level={5} style={{ margin: 0 }}>{item.name}</Title>
                            <Text strong style={{ color: "#ff4d4f", fontSize: 16 }}>{formatPrice(item.price)}</Text>
                          </Flex>
                          <Text type="secondary">{item.details}</Text>
                        </Card>
                      )}
                    />
                  </div>
                )}

                {serviceDetail.process && serviceDetail.process.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <Title level={4}>Quy trình thực hiện</Title>
                    <List
                      itemLayout="horizontal"
                      dataSource={serviceDetail.process}
                      renderItem={(item, index) => (
                        <List.Item>
                          <Badge status="processing" text={
                            <span style={{ fontSize: 15 }}>
                              <Text strong>Bước {index + 1}:</Text> {item}
                            </span>
                          } />
                        </List.Item>
                      )}
                    />
                  </div>
                )}
              </>
            )}
          </Card>

          {/* Reviews */}
          <Card style={{ borderRadius: 8 }}>
            <Title level={4}>Đánh giá dịch vụ</Title>
            <div style={{ marginBottom: 24 }}>
              <Row gutter={24} align="middle">
                <Col span={8}>
                  <div style={{ textAlign: "center" }}>
                    <Title level={2} style={{ margin: 0, color: "#faad14" }}>{serviceDetail.rating}</Title>
                    <Rate disabled defaultValue={serviceDetail.rating} allowHalf />
                    <div style={{ marginTop: 8 }}>
                      <Text>{serviceDetail.comments?.length || 0} đánh giá</Text>
                    </div>
                  </div>
                </Col>
                <Col span={16}>
                  <div>
                    <Row align="middle" style={{ marginBottom: 8 }}>
                      <Col span={3}>
                        <Text>5 sao</Text>
                      </Col>
                      <Col span={16}>
                        <div className="rating-bar" style={{ 
                          height: 8, 
                          backgroundColor: "#f0f0f0", 
                          borderRadius: 4, 
                          overflow: "hidden"
                        }}>
                          <div style={{ 
                            width: "80%", 
                            height: "100%", 
                            backgroundColor: "#faad14" 
                          }}></div>
                        </div>
                      </Col>
                      <Col span={5} style={{ textAlign: "right" }}>
                        <Text type="secondary">80%</Text>
                      </Col>
                    </Row>
                    <Row align="middle" style={{ marginBottom: 8 }}>
                      <Col span={3}>
                        <Text>4 sao</Text>
                      </Col>
                      <Col span={16}>
                        <div className="rating-bar" style={{ 
                          height: 8, 
                          backgroundColor: "#f0f0f0", 
                          borderRadius: 4, 
                          overflow: "hidden"
                        }}>
                          <div style={{ 
                            width: "15%", 
                            height: "100%", 
                            backgroundColor: "#faad14" 
                          }}></div>
                        </div>
                      </Col>
                      <Col span={5} style={{ textAlign: "right" }}>
                        <Text type="secondary">15%</Text>
                      </Col>
                    </Row>
                    <Row align="middle" style={{ marginBottom: 8 }}>
                      <Col span={3}>
                        <Text>3 sao</Text>
                      </Col>
                      <Col span={16}>
                        <div className="rating-bar" style={{ 
                          height: 8, 
                          backgroundColor: "#f0f0f0", 
                          borderRadius: 4, 
                          overflow: "hidden"
                        }}>
                          <div style={{ 
                            width: "5%", 
                            height: "100%", 
                            backgroundColor: "#faad14" 
                          }}></div>
                        </div>
                      </Col>
                      <Col span={5} style={{ textAlign: "right" }}>
                        <Text type="secondary">5%</Text>
                      </Col>
                    </Row>
                    <Row align="middle" style={{ marginBottom: 8 }}>
                      <Col span={3}>
                        <Text>2 sao</Text>
                      </Col>
                      <Col span={16}>
                        <div className="rating-bar" style={{ 
                          height: 8, 
                          backgroundColor: "#f0f0f0", 
                          borderRadius: 4, 
                          overflow: "hidden"
                        }}>
                          <div style={{ 
                            width: "0%", 
                            height: "100%", 
                            backgroundColor: "#faad14" 
                          }}></div>
                        </div>
                      </Col>
                      <Col span={5} style={{ textAlign: "right" }}>
                        <Text type="secondary">0%</Text>
                      </Col>
                    </Row>
                    <Row align="middle">
                      <Col span={3}>
                        <Text>1 sao</Text>
                      </Col>
                      <Col span={16}>
                        <div className="rating-bar" style={{ 
                          height: 8, 
                          backgroundColor: "#f0f0f0", 
                          borderRadius: 4, 
                          overflow: "hidden"
                        }}>
                          <div style={{ 
                            width: "0%", 
                            height: "100%", 
                            backgroundColor: "#faad14" 
                          }}></div>
                        </div>
                      </Col>
                      <Col span={5} style={{ textAlign: "right" }}>
                        <Text type="secondary">0%</Text>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>

            <Divider style={{ margin: "16px 0" }} />

            {/* Review Form */}
            <div style={{ marginBottom: 24 }}>
              <Title level={5}>Viết đánh giá của bạn</Title>
              <Form layout="vertical">
                <Form.Item label="Đánh giá của bạn">
                  <Rate value={ratingValue} onChange={setRatingValue} />
                </Form.Item>
                <Form.Item>
                  <TextArea
                    rows={4}
                    placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ này..."
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleCommentSubmit}
                  >
                    Gửi đánh giá
                  </Button>
                </Form.Item>
              </Form>
            </div>

            {/* User Reviews */}
            <List
              itemLayout="vertical"
              dataSource={serviceDetail.comments}
              renderItem={(item) => (
                <CommentOutlined
                  author={<Text strong>{item.author}</Text>}
                  avatar={<Avatar src={item.avatar} icon={<UserOutlined />} />}
                  content={item.content}
                  datetime={
                    <div>
                      <Rate disabled defaultValue={item.rating} style={{ fontSize: 12 }} />
                      <Text type="secondary" style={{ marginLeft: 8 }}>
                        <CalendarOutlined /> {item.datetime}
                      </Text>
                    </div>
                  }
                />
              )}
            />
          </Card>
        </Col>

        {/* Sidebar */}
        <Col xs={24} md={8}>
          {/* Action Card */}
          <Card style={{ marginBottom: 24, borderRadius: 8 }}>
          {serviceDetail.isPartner ? (
              <div style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  block
                  size="large"
                  icon={<PhoneOutlined />}
                  style={{ marginBottom: 16 }}
                >
                  Liên hệ ngay
                </Button>
                <Button
                  block
                  size="large"
                  icon={<EnvironmentOutlined />}
                  onClick={() => navigate(`/map?location=${serviceDetail.id}`)}
                >
                  Xem vị trí trên bản đồ
                </Button>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  block
                  size="large"
                  icon={<ShopOutlined />}
                  onClick={showBookingModal}
                  style={{ marginBottom: 16, height: 50 }}
                >
                  Đặt dịch vụ ngay
                </Button>
                <Button
                  block
                  size="large"
                  icon={<PhoneOutlined />}
                  style={{ height: 50 }}
                >
                  Liên hệ tư vấn
                </Button>
              </div>
            )}
          </Card>

          {/* Related services */}
          <Card
            title={
              <span>
                <InfoCircleOutlined style={{ marginRight: 8 }} />
                Dịch vụ liên quan
              </span>
            }
            style={{ marginBottom: 24, borderRadius: 8 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  id: serviceDetail.isPartner ? 2 : 101,
                  title: serviceDetail.isPartner ? "Starbucks Coffee - Tầng 2" : "Dịch vụ sửa chữa điện nước",
                  image: "https://via.placeholder.com/120x80",
                  rating: 4.3
                },
                {
                  id: serviceDetail.isPartner ? 3 : 102,
                  title: serviceDetail.isPartner ? "Phúc Long Coffee & Tea - Tầng 1" : "Dịch vụ bảo trì điều hòa",
                  image: "https://via.placeholder.com/120x80",
                  rating: 4.7
                },
                {
                  id: serviceDetail.isPartner ? 4 : 103,
                  title: serviceDetail.isPartner ? "KFC - Tầng G" : "Dịch vụ chuyển nhà nội khu",
                  image: "https://via.placeholder.com/120x80",
                  rating: 4.2
                }
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 4 }}
                      />
                    }
                    title={<Link to={`/services/${item.id}`}>{item.title}</Link>}
                    description={
                      <Rate disabled defaultValue={item.rating} allowHalf style={{ fontSize: 12 }} />
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Service info card */}
          <Card
            title={
              <span>
                <InfoCircleOutlined style={{ marginRight: 8 }} />
                Thông tin dịch vụ
              </span>
            }
            style={{ borderRadius: 8 }}
          >
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="Loại dịch vụ">
                <Tag color={serviceDetail.isPartner ? "blue" : "green"}>
                  {serviceDetail.isPartner ? "Đối tác" : "Nội khu"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Danh mục">
                {getCategoryIcon(serviceDetail.category, serviceDetail.isPartner)}
                <span style={{ marginLeft: 4 }}>{serviceDetail.category}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Nhà cung cấp">{serviceDetail.provider}</Descriptions.Item>
              {serviceDetail.isPartner ? (
                <>
                  <Descriptions.Item label="Vị trí">{serviceDetail.floor}</Descriptions.Item>
                  <Descriptions.Item label="Giờ mở cửa">{serviceDetail.hours}</Descriptions.Item>
                  {serviceDetail.website && (
                    <Descriptions.Item label="Website">
                      <a href={serviceDetail.website} target="_blank" rel="noopener noreferrer">
                        {serviceDetail.website}
                      </a>
                    </Descriptions.Item>
                  )}
                </>
              ) : (
                <>
                  <Descriptions.Item label="Giá dịch vụ">
                    <Text strong style={{ color: "#ff4d4f" }}>
                      {formatPrice(serviceDetail.price)}
                    </Text>
                  </Descriptions.Item>
                  {serviceDetail.email && (
                    <Descriptions.Item label="Email">{serviceDetail.email}</Descriptions.Item>
                  )}
                </>
              )}
              <Descriptions.Item label="Liên hệ">{serviceDetail.contact}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      {/* Booking Modal */}
      <Modal
        title="Đặt dịch vụ"
        visible={isModalVisible}
        onCancel={handleBookingCancel}
        footer={[
          <Button key="back" onClick={handleBookingCancel}>
            Hủy bỏ
          </Button>,
          <Button key="submit" type="primary" onClick={handleBookingSubmit}>
            Xác nhận đặt dịch vụ
          </Button>
        ]}
        width={600}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Họ và tên" required>
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số điện thoại" required>
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Số căn hộ" required>
                <Input placeholder="Nhập số căn hộ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày thực hiện" required>
                <Input type="date" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Chọn gói dịch vụ" required>
            <Radio.Group>
              {serviceDetail.packages?.map((pkg, index) => (
                <Radio key={index} value={pkg.name} style={{ display: "block", marginBottom: 8 }}>
                  <Flex justify="space-between" style={{ width: "100%" }}>
                    <span>{pkg.name}</span>
                    <Text strong>{formatPrice(pkg.price)}</Text>
                  </Flex>
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Ghi chú thêm">
            <TextArea rows={4} placeholder="Nhập yêu cầu hoặc ghi chú thêm nếu có..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceDetailPage;