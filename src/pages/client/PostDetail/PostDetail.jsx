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
  const [post, setPost] = useState(null);
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
      setPost(res.data);
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
          <Paragraph>{post?.content}</Paragraph>
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
                  statusColors[post?.status] === "green"
                    ? "success"
                    : statusColors[post?.status] === "red"
                    ? "error"
                    : "warning"
                }
                text={post?.apartment.note}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Hướng nhà">
              {post?.apartment.direction}
            </Descriptions.Item>
            <Descriptions.Item label="Nội thất">
              {post?.apartment.furnishing || `Không có`}
            </Descriptions.Item>
            <Descriptions.Item label="Tầng số">
              {post?.apartment?.floor}
            </Descriptions.Item>
            <Descriptions.Item label="Tiền cọc">
              {`${post?.depositPrice} VND`}
            </Descriptions.Item>
            {/* <Descriptions.Item label="Thời hạn hợp đồng">
              {apartment?.contractTerm}
            </Descriptions.Item> */}
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
    if (!post) return null;
    return (
      <Drawer
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={post.avatar} style={{ marginRight: 12 }} />
            <div>
              <div style={{ fontWeight: "bold" }}>{post.contactName}</div>
              <div style={{ fontSize: 12, color: "#8c8c8c" }}>
                {post.userName}
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
                {post.postImages.map((image, index) => (
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
                count={post.status}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: statusColors[post.status],
                  zIndex: 1,
                }}
              />
            </div>

            <Title level={2} style={{ marginTop: 16 }}>
              {post.title}
            </Title>
            <Space size="large" wrap>
              <Text>
                <EnvironmentOutlined /> {post.apartment.apartmentName}
              </Text>
              {/* <Text><EyeOutlined /> {apartment.views} lượt xem</Text> */}
              <Text>
                <CalendarOutlined /> Đăng ngày:{" "}
                {new Date(post.postDate).toLocaleDateString("vi-VN")}
              </Text>
            </Space>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col xs={16} sm={12} md={8}>
                <Statistic
                  title="Giá thuê"
                  value={formatPrice(post.price)}
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: "#cf1322", fontSize: 18 }}
                />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic
                  title="Diện tích"
                  value={`${post.apartment.area} m²`}
                  prefix={<AreaChartOutlined />}
                  valueStyle={{ fontSize: 18 }}
                />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic
                  title="Phòng ngủ"
                  value={post.apartment.numberOfBedrooms}
                  prefix={<UserOutlined />}
                  valueStyle={{ fontSize: 18 }}
                />
              </Col>
              <Col xs={12} sm={8} md={4}>
                <Statistic
                  title="Phòng tắm"
                  value={post.apartment.numberOfBathrooms}
                  valueStyle={{ fontSize: 18 }}
                />
              </Col>
            </Row>

            <Divider />
            {/* Updated Tabs implementation using items */}
            <Tabs defaultActiveKey="1" items={tabItems} />

            <Divider />
          </Col>

          <Col xs={24} lg={8}>
            <Card style={{ marginBottom: 16 }}>
              <Space align="center" style={{ marginBottom: 16 }}>
                <Avatar size={64} src={post.avatar} icon={<UserOutlined />} />
                <div>
                  <Text strong style={{ fontSize: 16 }}>
                    {post.contactName}
                  </Text>
                  <div>
                    <SafetyCertificateOutlined
                      style={{ color: "green", marginRight: 8 }}
                    />
                    <Text type="secondary">Đã xác thực</Text>
                  </div>
                  <div>
                    <BankOutlined style={{ marginRight: 8 }} />
                    <Text type="secondary">{post.userName}</Text>
                  </div>
                </div>
              </Space>

              <Divider style={{ margin: "12px 0" }} />

              <Space direction="vertical" style={{ width: "100%" }}>
                {userCurrent &&
                  post.apartment.householder !== null &&
                  post.userId !== userCurrent.userId && (
                    <Button
                      type="primary"
                      block
                      onClick={() =>
                        userCurrent ? setIsChatOpen(true) : navigate("/login")
                      }
                      style={{
                        background: "#4b7bec",
                      }}
                    >
                      Nhắn tin liên hệ
                    </Button>
                  )}
                {userCurrent &&
                  post.apartment.householder !== null &&
                  post.userId !== userCurrent.userId &&
                  post.postType === "Cho thuê" && (
                    <Button
                      style={{ background: "var(--forange)", color: "white" }}
                      icon={<MoneyCollectOutlined />}
                      disabled={post.depositCheck === "done" ? true : false}
                      onClick={() => setIsDepositeOpen(true)}
                      block
                    >
                      Đặt cọc
                    </Button>
                  )}
                {userCurrent &&
                  post.apartment.householder !== null &&
                  post.userId !== userCurrent.userId &&
                  post.postType === "Cho thuê" &&
                  post.depositUserId === userCurrent.userId &&
                  post.depositCheck === "done" && (
                    <Button
                      style={{ background: "var(--fred)", color: "white" }}
                      icon={<MoneyCollectOutlined />}
                      block
                    >
                      Hủy cọc
                    </Button>
                  )}
                {userCurrent &&
                  post.apartment.householder !== null &&
                  post.userId !== userCurrent.userId &&
                  post.postType === "Cho thuê" &&
                  post.depositUserId === userCurrent.userId &&
                  post.depositCheck === "ongoing" && (
                    <Button
                      style={{ background: "var(--fred)", color: "white" }}
                      icon={<MoneyCollectOutlined />}
                      block
                    >
                      Đang có người đặt cọc
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
                    <Text>{post.contactName}</Text>
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                  <Space>
                    <PhoneOutlined />
                    <Text>{post.contactPhone}</Text>
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  <Space>
                    <MailOutlined />
                    <Text>{post.contactEmail}</Text>
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
        postDetail={post}
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
