import React, { useState, useEffect } from "react";
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Tag, 
  Button, 
  Space, 
  Divider, 
  Carousel, 
  Descriptions, 
  Avatar, 
  Statistic, 
  Badge, 
  Breadcrumb,
  Modal,
  Form,
  Input,
  message,
  Tabs
} from "antd";
import { 
  HomeOutlined, 
  EnvironmentOutlined, 
  UserOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  AreaChartOutlined, 
  DollarOutlined, 
  CalendarOutlined, 
  HeartOutlined, 
  ShareAltOutlined, 
  EyeOutlined, 
  BankOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  LeftOutlined,
  RightOutlined
} from "@ant-design/icons";


const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Màu trạng thái
const statusColors = {
  "Còn trống": "green",
  "Đã cho thuê": "red",
  "Đang đặt cọc": "orange"
};

// Dữ liệu mẫu chi tiết căn hộ
const postDetails = {
  id: 1,
  title: "Căn hộ cao cấp Vinhomes Central Park",
  description: "Căn hộ ban công rộng, view sông, nội thất cao cấp, an ninh 24/7, thiết kế hiện đại, đầy đủ tiện nghi. Khu dân cư văn minh, gần trung tâm thương mại, trường học quốc tế và công viên. Phù hợp với gia đình hoặc người nước ngoài làm việc tại Việt Nam.",
  address: "Số 208 Nguyễn Hữu Cảnh, Phường 22, Quận Bình Thạnh, TP.HCM",
  price: 5800000,
  area: 70,
  bedrooms: 2,
  bathrooms: 2,
  floor: 15,
  direction: "Đông Nam",
  furnishing: "Đầy đủ nội thất",
  buildingName: "Landmark 81",
  owner: "Văn Phú Invest",
  contactName: "Nguyễn Thị Hồng",
  contactPhone: "0912345678",
  contactEmail: "hongnt@gmail.com",
  avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
  date: "2025-03-12",
  category: "Cho thuê",
  tags: ["Cao cấp", "Đầy đủ nội thất", "View sông", "An ninh 24/7", "Gần trung tâm"],
  views: 145,
  status: "Còn trống",
  depositAmount: "11.600.000 VNĐ",
  contractTerm: "12 tháng",
  utilities: [
    "Hồ bơi", "Phòng gym", "Sân tennis", "Siêu thị", "Nhà trẻ", "Bảo vệ 24/7",
    "Thang máy", "Máy lạnh", "Máy giặt", "Tủ lạnh", "Bếp điện", "Nước nóng"
  ],
  images: [
    "https://picsum.photos/800/600?random=1",
    "https://picsum.photos/800/600?random=2",
    "https://picsum.photos/800/600?random=3",
    "https://picsum.photos/800/600?random=4",
    "https://picsum.photos/800/600?random=5"
  ],
  similar: [
    {
      id: 2,
      title: "Studio căn hộ The Sun Avenue",
      price: 3500000,
      area: 35,
      address: "Quận 2, TP.HCM",
      image: "https://picsum.photos/200/150?random=6"
    },
    {
      id: 3,
      title: "Căn hộ 2 phòng ngủ Gateway Thảo Điền",
      price: 6000000,
      area: 65,
      address: "Quận 2, TP.HCM",
      image: "https://picsum.photos/200/150?random=7"
    },
    {
      id: 5,
      title: "Căn hộ 1 phòng ngủ Sunrise City",
      price: 4200000,
      area: 50,
      address: "Quận 7, TP.HCM",
      image: "https://picsum.photos/200/150?random=8"
    }
  ]
};

const PostDetail = () => {
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  // Lấy id từ params URL
  // const { id } = useParams();
  // const navigate = useNavigate();
  
  // Trong môi trường thực tế, sẽ lấy id từ URL
  // Ở đây giả định id = 1 cho demo
  const id = 1;

  // Giả lập việc lấy dữ liệu từ API
  useEffect(() => {
    // Trong thực tế, sẽ gọi API với id
    // fetch(`/api/apartments/${id}`)...
    setTimeout(() => {
      setApartment(postDetails);
      setLoading(false);
    }, 1000);
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + " VNĐ/tháng";
  };

  const handleContactSubmit = (values) => {
    console.log('Form values:', values);
    message.success('Yêu cầu liên hệ đã được gửi thành công!');
    setContactModalVisible(false);
    form.resetFields();
  };

  const goBack = () => {
    // navigate(-1);
    // Hoặc sử dụng
    window.history.back();
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <Card loading={true}>
          <Card.Meta
            title="Đang tải thông tin..."
            description="Vui lòng đợi trong giây lát"
          />
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <HomeOutlined />
          <span>Trang chủ</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách căn hộ</Breadcrumb.Item>
        <Breadcrumb.Item>{apartment.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Button 
        type="default" 
        icon={<LeftOutlined />} 
        onClick={goBack}
        style={{ marginBottom: 16 }}
      >
        Quay lại danh sách
      </Button>

      <Card>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <div style={{ position: 'relative' }}>
              <Carousel 
                autoplay 
                arrows 
                prevArrow={<LeftOutlined />}
                nextArrow={<RightOutlined />}
              >
                {apartment.images.map((image, index) => (
                  <div key={index}>
                    <div style={{ height: 500, position: 'relative' }}>
                      <img 
                        src={image} 
                        alt={`Ảnh ${index + 1}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                ))}
              </Carousel>
              <Badge 
                count={apartment.status}
                style={{ 
                  position: 'absolute', 
                  top: 10, 
                  right: 10,
                  backgroundColor: statusColors[apartment.status],
                  zIndex: 1
                }}
              />
            </div>

            <Title level={2} style={{ marginTop: 16 }}>{apartment.title}</Title>
            <Space size="large" wrap>
              <Text><EnvironmentOutlined /> {apartment.address}</Text>
              <Text><EyeOutlined /> {apartment.views} lượt xem</Text>
              <Text><CalendarOutlined /> Đăng ngày: {new Date(apartment.date).toLocaleDateString('vi-VN')}</Text>
            </Space>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col xs={12} sm={8} md={6}>
                <Statistic 
                  title="Giá thuê" 
                  value={formatPrice(apartment.price)} 
                  prefix={<DollarOutlined />} 
                  valueStyle={{ color: '#cf1322', fontSize: 18 }}
                />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic 
                  title="Diện tích" 
                  value={`${apartment.area} m²`} 
                  prefix={<AreaChartOutlined />} 
                  valueStyle={{ fontSize: 18 }}
                />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic 
                  title="Phòng ngủ" 
                  value={apartment.bedrooms} 
                  prefix={<UserOutlined />} 
                  valueStyle={{ fontSize: 18 }}
                />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic 
                  title="Phòng tắm" 
                  value={apartment.bathrooms} 
                  valueStyle={{ fontSize: 18 }}
                />
              </Col>
            </Row>

            <Divider />

            <Tabs defaultActiveKey="1">
              <TabPane tab="Thông tin chi tiết" key="1">
                <Paragraph>{apartment.description}</Paragraph>
                <Space wrap>
                  {apartment.tags.map(tag => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </Space>

                <Divider orientation="left">Thông tin cơ bản</Divider>
                <Descriptions bordered column={{ xs: 1, sm: 2, md: 3 }}>
                  <Descriptions.Item label="Loại căn hộ">{apartment.category}</Descriptions.Item>
                  <Descriptions.Item label="Tình trạng">
                    <Badge status={statusColors[apartment.status] === 'green' ? 'success' : statusColors[apartment.status] === 'red' ? 'error' : 'warning'} text={apartment.status} />
                  </Descriptions.Item>
                  <Descriptions.Item label="Hướng nhà">{apartment.direction}</Descriptions.Item>
                  <Descriptions.Item label="Nội thất">{apartment.furnishing}</Descriptions.Item>
                  <Descriptions.Item label="Tầng số">{apartment.floor}</Descriptions.Item>
                  <Descriptions.Item label="Tòa nhà">{apartment.buildingName}</Descriptions.Item>
                  <Descriptions.Item label="Tiền cọc">{apartment.depositAmount}</Descriptions.Item>
                  <Descriptions.Item label="Thời hạn hợp đồng">{apartment.contractTerm}</Descriptions.Item>
                </Descriptions>

                <Divider orientation="left">Tiện ích</Divider>
                <Row gutter={[16, 16]}>
                  {apartment.utilities.map((utility, index) => (
                    <Col span={8} key={index}>
                      <Space>
                        <CheckCircleOutlined style={{ color: 'green' }} />
                        <Text>{utility}</Text>
                      </Space>
                    </Col>
                  ))}
                </Row>
              </TabPane>
              <TabPane tab="Bản đồ" key="2">
                <div style={{ background: '#f0f0f0', height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Text type="secondary">Bản đồ vị trí căn hộ</Text>
                  {/* Trong thực tế, sẽ nhúng Google Maps hoặc các bản đồ khác ở đây */}
                </div>
              </TabPane>
              <TabPane tab="Đánh giá" key="3">
                <div style={{ padding: '20px 0' }}>
                  <Text>Chưa có đánh giá nào cho căn hộ này.</Text>
                </div>
              </TabPane>
            </Tabs>

            <Divider />

            <Title level={4}>Các căn hộ tương tự</Title>
            <Row gutter={[16, 16]}>
              {apartment.similar.map(item => (
                <Col xs={24} sm={12} md={8} key={item.id}>
                  <Card
                    hoverable
                    cover={
                      <img 
                        alt={item.title}
                        src={item.image}
                        style={{ width: '100%', height: 150, objectFit: 'cover' }}
                      />
                    }
                    onClick={() => {
                      // navigate(`/apartment/${item.id}`);
                      console.log(`Chuyển đến trang chi tiết của căn hộ ID: ${item.id}`);
                    }}
                  >
                    <Card.Meta
                      title={item.title}
                      description={
                        <>
                          <div>
                            <EnvironmentOutlined style={{ marginRight: 5 }} />
                            <Text type="secondary">{item.address}</Text>
                          </div>
                          <div>
                            <DollarOutlined style={{ marginRight: 5 }} />
                            <Text strong>{formatPrice(item.price)}</Text>
                          </div>
                          <div>
                            <AreaChartOutlined style={{ marginRight: 5 }} />
                            <Text>{item.area} m²</Text>
                          </div>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          
          <Col xs={24} lg={8}>
            <Card style={{ marginBottom: 16 }}>
              <Space align="center" style={{ marginBottom: 16 }}>
                <Avatar size={64} src={apartment.avatar} icon={<UserOutlined />} />
                <div>
                  <Text strong style={{ fontSize: 16 }}>{apartment.contactName}</Text>
                  <div>
                    <SafetyCertificateOutlined style={{ color: 'green', marginRight: 8 }} />
                    <Text type="secondary">Đã xác thực</Text>
                  </div>
                  <div>
                    <BankOutlined style={{ marginRight: 8 }} />
                    <Text type="secondary">{apartment.owner}</Text>
                  </div>
                </div>
              </Space>
              
              <Divider style={{ margin: '12px 0' }} />
              
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button 
                  type="primary" 
                  icon={<PhoneOutlined />} 
                  block
                  onClick={() => message.info(`Số điện thoại: ${apartment.contactPhone}`)}
                >
                  Xem số điện thoại
                </Button>
                <Button 
                  type="default" 
                  icon={<MailOutlined />} 
                  block
                  onClick={() => setContactModalVisible(true)}
                >
                  Gửi email liên hệ
                </Button>
                <Button 
                  type="text" 
                  icon={<HeartOutlined />} 
                  block
                  onClick={() => message.success('Đã lưu vào danh sách yêu thích')}
                >
                  Lưu tin
                </Button>
                <Button 
                  type="text" 
                  icon={<ShareAltOutlined />} 
                  block
                  onClick={() => message.info('Chức năng chia sẻ đang được phát triển')}
                >
                  Chia sẻ
                </Button>
              </Space>
            </Card>
            
            <Card title="Thông tin liên hệ" style={{ marginBottom: 16 }}>
              <Descriptions column={1}>
                <Descriptions.Item label="Người liên hệ">
                  <Space>
                    <UserOutlined />
                    <Text>{apartment.contactName}</Text>
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                  <Space>
                    <PhoneOutlined />
                    <Text>{apartment.contactPhone}</Text>
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  <Space>
                    <MailOutlined />
                    <Text>{apartment.contactEmail}</Text>
                  </Space>
                </Descriptions.Item>
              </Descriptions>
            </Card>
            
            <Card title="Hướng dẫn liên hệ">
              <Paragraph>
                <ul>
                  <li>Vui lòng gọi điện trước khi đến xem căn hộ</li>
                  <li>Chuẩn bị CMND/CCCD và đặt cọc nếu có nhu cầu thuê</li>
                  <li>Thời gian xem nhà: 8:00 - 20:00 hàng ngày</li>
                  <li>Có thể thương lượng giá với chủ nhà</li>
                </ul>
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Card>
      
      <Modal
        title="Gửi yêu cầu liên hệ"
        visible={contactModalVisible}
        onCancel={() => setContactModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleContactSubmit}>
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: 'email', message: 'Email không hợp lệ' },
              { required: true, message: 'Vui lòng nhập email' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            name="message"
            label="Nội dung"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
          >
            <Input.TextArea
              placeholder="Nhập nội dung cần liên hệ"
              rows={4}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Gửi yêu cầu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PostDetail;