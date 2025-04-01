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
  Modal,
  Form,
  Input,
  message,
  Tabs,
  Drawer,
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
  RightOutlined,
  MessageOutlined,
  SendOutlined,
  TeamOutlined,
  ExpandAltOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPostById, getUserByUserName } from "../../../redux/apiCalls";
import { useDispatch } from "react-redux";
import ChatBox from "../../../components/common/Chatbot/Chatbot";
import { useSelector } from "react-redux";
import DepositPage from "../DepositPage/DepositPage";

const { Title, Text, Paragraph } = Typography;

// Màu trạng thái
const statusColors = {
  "Còn trống": "green",
  "Đã cho thuê": "red",
  "Đang đặt cọc": "orange",
};

// Dữ liệu mẫu tin nhắn
const sampleMessages = [
  {
    id: 1,
    sender: "user",
    content: "Xin chào, tôi muốn hỏi thêm về căn hộ Vinhomes Central Park.",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "owner",
    content: "Chào bạn, tôi có thể giúp gì cho bạn?",
    time: "10:32 AM",
  },
  {
    id: 3,
    sender: "user",
    content: "Căn hộ này còn trống không? Tôi muốn thuê vào đầu tháng sau.",
    time: "10:35 AM",
  },
  {
    id: 4,
    sender: "owner",
    content:
      "Vâng, căn hộ vẫn còn trống. Bạn có thể cho tôi biết thêm thông tin về nhu cầu thuê của bạn không?",
    time: "10:40 AM",
  },
];

// Dữ liệu mẫu chi tiết căn hộ
const apartmentDetails = {
  id: 1,
  title: "Căn hộ cao cấp Vinhomes Central Park",
  description:
    "Căn hộ ban công rộng, view sông, nội thất cao cấp, an ninh 24/7, thiết kế hiện đại, đầy đủ tiện nghi. Khu dân cư văn minh, gần trung tâm thương mại, trường học quốc tế và công viên. Phù hợp với gia đình hoặc người nước ngoài làm việc tại Việt Nam.",
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
  tags: [
    "Cao cấp",
    "Đầy đủ nội thất",
    "View sông",
    "An ninh 24/7",
    "Gần trung tâm",
  ],
  views: 145,
  status: "Còn trống",
  depositAmount: "11.600.000 VNĐ",
  contractTerm: "12 tháng",
  utilities: [
    "Hồ bơi",
    "Phòng gym",
    "Sân tennis",
    "Siêu thị",
    "Nhà trẻ",
    "Bảo vệ 24/7",
    "Thang máy",
    "Máy lạnh",
    "Máy giặt",
    "Tủ lạnh",
    "Bếp điện",
    "Nước nóng",
  ],
  images: [
    "https://picsum.photos/800/600?random=1",
    "https://picsum.photos/800/600?random=2",
    "https://picsum.photos/800/600?random=3",
    "https://picsum.photos/800/600?random=4",
    "https://picsum.photos/800/600?random=5",
  ],
  similar: [
    {
      id: 2,
      title: "Studio căn hộ The Sun Avenue",
      price: 3500000,
      area: 35,
      address: "Quận 2, TP.HCM",
      image: "https://picsum.photos/200/150?random=6",
    },
    {
      id: 3,
      title: "Căn hộ 2 phòng ngủ Gateway Thảo Điền",
      price: 6000000,
      area: 65,
      address: "Quận 2, TP.HCM",
      image: "https://picsum.photos/200/150?random=7",
    },
    {
      id: 5,
      title: "Căn hộ 1 phòng ngủ Sunrise City",
      price: 4200000,
      area: 50,
      address: "Quận 7, TP.HCM",
      image: "https://picsum.photos/200/150?random=8",
    },
  ],
};

// Custom arrow components for Carousel that don't pass down DOM props
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <RightOutlined
      className={className}
      style={{ ...style, display: "block", fontSize: "16px", color: "#fff" }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <LeftOutlined
      className={className}
      style={{ ...style, display: "block", fontSize: "16px", color: "#fff" }}
      onClick={onClick}
    />
  );
};

const PostDetail = () => {
  const [apartment, setApartment] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [chatDrawerVisible, setChatDrawerVisible] = useState(false);
  const [messages, setMessages] = useState(sampleMessages);
  const [messageInput, setMessageInput] = useState("");
  const [showAdminRoleModal, setShowAdminRoleModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDepositeOpen, setIsDepositeOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const userCurrent = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  const postData = useSelector((state) => state.post.post?.data);
  const userIdFromPost = postData?.userId;
  const userNameFromPost = postData?.apartment?.householder;
  //  console.log("User ID của người đăng bài:", userNameFromPost);

  const postId = useParams().postId;
  // console.log(postId);

  // Giả lập việc lấy dữ liệu từ API
  useEffect(() => {
    
    async function getPostDetail() {
      setLoading(true);
      const res = await getPostById(dispatch, postId);
      // res.data.postImages.map((image)=>console.log(image))
      const resUser = await getUserByUserName(dispatch, res.data.userName);
      setApartment(res.data);
      // console.log(resUser.data[0]);
      setOwner(resUser.data[0]);
      setLoading(false);
    }
    getPostDetail();
  }, [postId]);

  // console.log(owner);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ/tháng";
  };

  const handleContactSubmit = (values) => {
    console.log("Form values:", values);
    message.success("Yêu cầu liên hệ đã được gửi thành công!");
    setContactModalVisible(false);
    form.resetFields();
  };

  // Mở chat drawer
  const openChatDrawer = () => {
    setChatDrawerVisible(true);
  };

  // Đóng chat drawer
  const closeChatDrawer = () => {
    setChatDrawerVisible(false);
  };

  // Gửi tin nhắn
  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "user",
        content: messageInput,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages([...messages, newMessage]);
      setMessageInput("");

      // Giả lập phản hồi từ chủ nhà
      setTimeout(() => {
        const ownerReply = {
          id: messages.length + 2,
          sender: "owner",
          content:
            "Cảm ơn bạn đã quan tâm. Tôi sẽ liên hệ lại với bạn sớm nhất có thể.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, ownerReply]);
      }, 1000);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const handleButtonDeposite = () => {
    setIsDepositeOpen(true);
  };

  // Xử lý chuyển đến trang ChatPage
  const handleGotoChatPage = () => {
    message.success("Đang chuyển đến trang quản lý chat");
    // Giả lập điều hướng đến trang chat
    window.location.href = "/chat-page";

    setShowAdminRoleModal(false);
  };

  // Create tab items for the new Tabs API
  const tabItems = [
    {
      key: "1",
      label: "Thông tin chi tiết",
      children: (
        <>
          <Paragraph>{apartment?.content}</Paragraph>
          {/* <Space wrap>
            {apartment?.tags.map(tag => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </Space> */}
          <Divider orientation="left">Thông tin cơ bản</Divider>
          <Descriptions bordered column={{ xs: 1, sm: 2, md: 3 }}>
            {/* <Descriptions.Item label="Loại căn hộ">{apartment?.category}</Descriptions.Item> */}
            <Descriptions.Item label="Tình trạng">
              <Badge
                status={
                  statusColors[apartment?.status] === "green"
                    ? "success"
                    : statusColors[apartment?.status] === "red"
                    ? "error"
                    : "warning"
                }
                text={apartment?.status}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Hướng nhà">
              {apartment?.direction}
            </Descriptions.Item>
            <Descriptions.Item label="Nội thất">
              {apartment?.furnishing}
            </Descriptions.Item>
            <Descriptions.Item label="Tầng số">
              {apartment?.floor}
            </Descriptions.Item>
            <Descriptions.Item label="Tòa nhà">
              {apartment?.buildingName}
            </Descriptions.Item>
            <Descriptions.Item label="Tiền cọc">
              {apartment?.depositAmount}
            </Descriptions.Item>
            <Descriptions.Item label="Thời hạn hợp đồng">
              {apartment?.contractTerm}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">Tiện ích</Divider>
          {/* <Row gutter={[16, 16]}>
            {apartment?.utilities.map((utility, index) => (
              <Col span={8} key={index}>
                <Space>
                  <CheckCircleOutlined style={{ color: 'green' }} />
                  <Text>{utility}</Text>
                </Space>
              </Col>
            ))}
          </Row> */}
        </>
      ),
    },
    {
      key: "2",
      label: "Bản đồ",
      children: (
        <div
          style={{
            background: "#f0f0f0",
            height: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text type="secondary">Bản đồ vị trí căn hộ</Text>
        </div>
      ),
    },
    {
      key: "3",
      label: "Đánh giá",
      children: (
        <div style={{ padding: "20px 0" }}>
          <Text>Chưa có đánh giá nào cho căn hộ này.</Text>
        </div>
      ),
    },
  ];

  // Render chat drawer
  const renderChatDrawer = () => {
    if (!apartment) return null;
    return (
      <Drawer
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={apartment.avatar} style={{ marginRight: 12 }} />
            <div>
              <div style={{ fontWeight: "bold" }}>{apartment.contactName}</div>
              <div style={{ fontSize: 12, color: "#8c8c8c" }}>
                {apartment.userName}
              </div>
            </div>
          </div>
        }
        placement="right"
        width={380}
        onClose={closeChatDrawer}
        open={chatDrawerVisible}
        styles={{
          body: {
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            height: "calc(100% - 55px)",
          },
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0 4px",
            marginBottom: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                alignSelf:
                  message.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor:
                  message.sender === "user" ? "#1890ff" : "#f0f0f0",
                color: message.sender === "user" ? "white" : "black",
                padding: "8px 12px",
                borderRadius: 16,
                marginBottom: 8,
                maxWidth: "80%",
                wordWrap: "break-word",
              }}
            >
              <div>{message.content}</div>
              <div
                style={{
                  fontSize: 10,
                  textAlign: message.sender === "user" ? "right" : "left",
                  marginTop: 4,
                  opacity: 0.7,
                }}
              >
                {message.time}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", marginTop: "auto" }}>
          <Input
            placeholder="Nhập tin nhắn..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onPressEnter={handleSendMessage}
            style={{ flex: 1, borderRadius: "20px 0 0 20px" }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            style={{ borderRadius: "0 20px 20px 0" }}
          />
        </div>
      </Drawer>
    );
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

  // Carousel settings with custom arrow components
  const carouselSettings = {
    autoplay: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div style={{ padding: "20px" }}>
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
            <div style={{ position: "relative" }}>
              <Carousel {...carouselSettings}>
                {apartment.postImages.map((image, index) => (
                  <div key={index}>
                    <div style={{ height: 500, position: "relative" }}>
                      <img
                        src={image}
                        alt={`Ảnh ${index + 1}`}
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
              <Badge
                count={apartment.status}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: statusColors[apartment.status],
                  zIndex: 1,
                }}
              />
            </div>

            <Title level={2} style={{ marginTop: 16 }}>
              {apartment.title}
            </Title>
            <Space size="large" wrap>
              <Text>
                <EnvironmentOutlined /> {apartment.apartment.apartmentName}
              </Text>
              {/* <Text><EyeOutlined /> {apartment.views} lượt xem</Text> */}
              <Text>
                <CalendarOutlined /> Đăng ngày:{" "}
                {new Date(apartment.postDate).toLocaleDateString("vi-VN")}
              </Text>
            </Space>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col xs={16} sm={12} md={8}>
                <Statistic
                  title="Giá thuê"
                  value={formatPrice(apartment.price)}
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: "#cf1322", fontSize: 18 }}
                />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic
                  title="Diện tích"
                  value={`200 m²`}
                  prefix={<AreaChartOutlined />}
                  valueStyle={{ fontSize: 18 }}
                />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic
                  title="Phòng ngủ"
                  value={apartment.apartment.numberOfBedrooms}
                  prefix={<UserOutlined />}
                  valueStyle={{ fontSize: 18 }}
                />
              </Col>
              <Col xs={12} sm={8} md={4}>
                <Statistic
                  title="Phòng tắm"
                  value={apartment.apartment.numberOfBathrooms}
                  valueStyle={{ fontSize: 18 }}
                />
              </Col>
            </Row>

            <Divider />

            {/* Updated Tabs implementation using items */}
            <Tabs defaultActiveKey="1" items={tabItems} />

            <Divider />

            {/* <Title level={4}>Các căn hộ tương tự</Title> */}
            {/* <Row gutter={[16, 16]}>
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
            </Row> */}
          </Col>

          <Col xs={24} lg={8}>
            <Card style={{ marginBottom: 16 }}>
              <Space align="center" style={{ marginBottom: 16 }}>
                <Avatar
                  size={64}
                  src={apartment.avatar}
                  icon={<UserOutlined />}
                />
                <div>
                  <Text strong style={{ fontSize: 16 }}>
                    {apartment.contactName}
                  </Text>
                  <div>
                    <SafetyCertificateOutlined
                      style={{ color: "green", marginRight: 8 }}
                    />
                    <Text type="secondary">Đã xác thực</Text>
                  </div>
                  <div>
                    <BankOutlined style={{ marginRight: 8 }} />
                    <Text type="secondary">{apartment.userName}</Text>
                  </div>
                </div>
              </Space>

              <Divider style={{ margin: "12px 0" }} />

              <Space direction="vertical" style={{ width: "100%" }}>
                {userCurrent && apartment.userId !== userCurrent.userId && (
                  <Button
                    type="primary"
                    block
                    onClick={() =>
                      userCurrent ? setIsChatOpen(true) : navigate("/login")
                    }
                  >
                    Nhắn tin liên hệ
                  </Button>
                )}
                {userCurrent && apartment.depositUserId !== userCurrent.userId && (
                  <Button
                    style={{ background: "var(--forange)", color: "white" }}
                    icon={<MoneyCollectOutlined />}
                    disabled={apartment.depositCheck === 'done'}
                    onClick={()=>setIsDepositeOpen(true)}
                    block
                  >
                    Đặt cọc
                  </Button>
                )}
                {userCurrent && apartment.depositUserId === userCurrent.userId && (
                  <Button
                    style={{ background: "var(--fred)", color: "white" }}
                    icon={<MoneyCollectOutlined />}
                    block
                  >
                    Hủy cọc
                  </Button>
                )}

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
                  onClick={() =>
                    message.success("Đã lưu vào danh sách yêu thích")
                  }
                >
                  Lưu tin
                </Button>
                <Button
                  type="text"
                  icon={<ShareAltOutlined />}
                  block
                  onClick={() =>
                    message.info("Chức năng chia sẻ đang được phát triển")
                  }
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
                  <li>Vui lòng nhắn tin trước khi đến xem căn hộ</li>
                  <li>Chuẩn bị CMND/CCCD và đặt cọc nếu có nhu cầu thuê</li>
                  <li>Thời gian xem nhà: 8:00 - 20:00 hàng ngày</li>
                  <li>Có thể thương lượng giá với chủ nhà</li>
                </ul>
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Card>

      <DepositPage
        postDetail={apartment}
        isOpen={isDepositeOpen}
        onCancel={() => setIsDepositeOpen(false)}
      />

      {/* Modal gửi email liên hệ */}
      <Modal
        title="Gửi yêu cầu liên hệ"
        open={contactModalVisible}
        onCancel={() => setContactModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleContactSubmit}>
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: "email", message: "Email không hợp lệ" },
              { required: true, message: "Vui lòng nhập email" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            name="message"
            label="Nội dung"
            rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
          >
            <Input.TextArea placeholder="Nhập nội dung cần liên hệ" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Gửi yêu cầu
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal xác nhận chuyển đến trang ChatPage */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <TeamOutlined style={{ marginRight: 8, color: "#52c41a" }} />
            <span>Chuyển đến giao diện Admin/Owner</span>
          </div>
        }
        open={showAdminRoleModal}
        onCancel={() => setShowAdminRoleModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowAdminRoleModal(false)}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            icon={<ExpandAltOutlined />}
            onClick={handleGotoChatPage}
          >
            Chuyển đến trang Chat
          </Button>,
        ]}
      >
        <div style={{ padding: "10px 0" }}>
          <p>
            Bạn muốn chuyển đến giao diện Admin/Owner để quản lý tin nhắn từ
            nhiều người dùng?
          </p>
          <p style={{ fontStyle: "italic", color: "#888" }}>
            Giao diện Admin/Owner cho phép bạn theo dõi và phản hồi tất cả các
            cuộc trò chuyện từ một nơi duy nhất.
          </p>
        </div>
      </Modal>

      {/* Chat Drawer */}
      {/* {renderChatDrawer()} */}
      {isChatOpen && (
        <ChatBox
          receiverId={userIdFromPost}
          receiverName={userNameFromPost}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </div>
  );
};

export default PostDetail;
