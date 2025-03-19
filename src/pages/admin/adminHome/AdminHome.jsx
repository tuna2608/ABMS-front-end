import React, { useState } from "react";
import {
  UserOutlined,
  HomeOutlined,
  FileAddOutlined,
  SearchOutlined,
  DeleteOutlined,
  EyeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  BellOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Form,
  Input,
  Button,
  Table,
  Typography,
  Space,
  Row,
  Col,
  Modal,
  List,
  Divider,
  Badge,
  Avatar,
  Card,
  Tag,
  Select,
  Upload,
  DatePicker,
} from "antd";

const { Title, Text, Paragraph } = Typography;
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const AdminHome = () => {
  // State for sidebar collapse
  const [collapsed, setCollapsed] = useState(false);
  // State for active tab
  const [activeTab, setActiveTab] = useState("accounts");
  // Form instance
  const [form] = Form.useForm();
  // State for selected resident
  const [selectedResident, setSelectedResident] = useState(null);
  // State for modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State for post creation modal visibility
  const [isPostModalVisible, setIsPostModalVisible] = useState(false);
  // State for selected apartment for post creation
  const [selectedApartment, setSelectedApartment] = useState(null);
  // State for new apartment modal visibility
  const [isNewApartmentModalVisible, setIsNewApartmentModalVisible] = useState(false);
  // Form for new apartment
  const [apartmentForm] = Form.useForm();

  // Handle menu click
  const handleMenuClick = (e) => {
    setActiveTab(e.key);
  };

  // Toggle sidebar collapse
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Show resident details modal
  const showResidentDetails = (resident) => {
    setSelectedResident(resident);
    setIsModalVisible(true);
  };

  // Close resident modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  // Show post creation modal
  const showPostCreationModal = (apartment) => {
    setSelectedApartment(apartment);
    setIsPostModalVisible(true);
    form.resetFields();
  };
  
  // Close post creation modal
  const handlePostModalCancel = () => {
    setIsPostModalVisible(false);
  };

  // Show new apartment modal
  const showNewApartmentModal = () => {
    setIsNewApartmentModalVisible(true);
    apartmentForm.resetFields();
  };

  // Close new apartment modal
  const handleNewApartmentModalCancel = () => {
    setIsNewApartmentModalVisible(false);
  };

  // Mock data for accounts
  const accountData = [
    { key: "1", name: "Nguyen Van A", role: "Admin", status: "Active", email: "nguyenvana@example.com" },
    { key: "2", name: "Tran Thi B", role: "User", status: "Inactive", email: "tranthib@example.com" },
    { key: "3", name: "Hoang Van C", role: "User", status: "Active", email: "hoangvanc@example.com" },
    { key: "4", name: "Le Minh D", role: "Editor", status: "Active", email: "leminhd@example.com" },
  ];

  // Mock data for residents
  const residentData = [
    {
      key: "1",
      name: "Đặng Đức Hoàng",
      email: "duchoang@gmail.com",
      phone: "0909219432",
      contractStart: "01/03/2024",
      contractEnd: "01/08/2024",
      images: [
        "http://res.cloudinary.com/dct0qbbjc/image/upload/v1741776225/yfnkdf8adtvfato4chmq.png",
        "http://res.cloudinary.com/dct0qbbjc/image/upload/v1741776228/jr0afrbzdpitat9s5r2e.png",
      ],
      contractType: "Hợp đồng mua căn hộ",
      apartment: "A-1203",
    },
    {
      key: "2",
      name: "Lê Minh Anh",
      email: "minhanh@gmail.com",
      phone: "0912345678",
      contractStart: "15/02/2024",
      contractEnd: "15/07/2024",
      images: [
        "http://res.cloudinary.com/dct0qbbjc/image/upload/v1741776225/yfnkdf8adtvfato4chmq.png",
      ],
      contractType: "Hợp đồng thuê căn hộ",
      apartment: "B-0512",
    },
    {
      key: "3",
      name: "Trần Văn Bình",
      email: "tranbinh@gmail.com",
      phone: "0987654321",
      contractStart: "10/01/2024",
      contractEnd: "10/01/2025",
      images: [
        "http://res.cloudinary.com/dct0qbbjc/image/upload/v1741776228/jr0afrbzdpitat9s5r2e.png",
      ],
      contractType: "Hợp đồng mua căn hộ",
      apartment: "C-0708",
    },
  ];

  // Mock data for posts
  const postData = [
    {
      key: "1",
      title: "Thông báo bảo trì hệ thống điện",
      author: "Nguyen Van A",
      date: "12/03/2024",
      summary: "Kính gửi quý cư dân, ngày 15/03/2024 chúng tôi sẽ tiến hành bảo trì hệ thống điện từ 8h-11h...",
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    },
    {
      key: "2",
      title: "Thông báo cuộc họp cư dân quý 1/2024",
      author: "Tran Thi B",
      date: "05/03/2024",
      summary: "Trân trọng kính mời quý cư dân tham dự cuộc họp định kỳ quý 1 năm 2024 vào ngày 20/03/2024...",
      avatar: "https://joeschmoe.io/api/v1/random",
    },
    {
      key: "3",
      title: "Hướng dẫn sử dụng khu vực tiện ích",
      author: "Hoang Van C",
      date: "01/03/2024",
      summary: "Để đảm bảo trải nghiệm tốt nhất cho tất cả cư dân, ban quản lý xin thông báo quy định sử dụng khu vực tiện ích...",
      avatar: "https://joeschmoe.io/api/v1/male/random",
    },
  ];

  // Column configuration for accounts table
  const accountColumns = [
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
      render: (text) => <Button type="link" style={{ padding: 0, height: 'auto', lineHeight: 'inherit' }}>{text}</Button>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        let color = role === 'Admin' ? 'red' : (role === 'Editor' ? 'blue' : 'green');
        return (
          <Tag color={color}>
            {role.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Text type={status === "Active" ? "success" : "danger"}>{status}</Text>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => {
              const resident = residentData.find(res => res.name === record.name) || residentData[0];
              showResidentDetails(resident);
            }}
          >
            Xem
          </Button>
          <Button icon={<DeleteOutlined />} danger size="small">
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Column configuration for apartments table
  const apartmentColumns = [
    {
      title: "Mã căn hộ",
      dataIndex: "apartment",
      key: "apartment",
    },
    {
      title: "Chủ hộ",
      dataIndex: "name",
      key: "name",
      render: (text) => <Button type="link" style={{ padding: 0, height: 'auto', lineHeight: 'inherit' }}>{text}</Button>,
    },
    {
      title: "Loại hợp đồng",
      dataIndex: "contractType",
      key: "contractType",
      render: (type) => {
        const color = type.includes("mua") ? "green" : "blue";
        return <Tag color={color}>{type}</Tag>;
      },
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "contractStart",
      key: "contractStart",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "contractEnd",
      key: "contractEnd",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => showResidentDetails(record)}
          >
            Xem
          </Button>
          <Button
            type="default"
            icon={<FileAddOutlined />}
            size="small"
            onClick={() => showPostCreationModal(record)}
          >
            Tạo bài viết
          </Button>
          <Button icon={<DeleteOutlined />} danger size="small">
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="dark"
        width={250}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Title level={5} style={{ color: "white", margin: 0 }}>
            {collapsed ? "QL" : "ADMIN"}
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeTab]}
          onClick={handleMenuClick}
          style={{ borderRight: 0 }}
        >
          <Menu.Item key="accounts" icon={<UserOutlined />}>
            Quản lý tài khoản
          </Menu.Item>
          <SubMenu key="apartments" icon={<HomeOutlined />} title="Quản lý căn hộ">
            <Menu.Item key="apartmentList">
              Danh sách căn hộ
              
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="posts" icon={<BellOutlined />}>
            Danh sách bài viết
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Cài đặt hệ thống
          </Menu.Item>
        </Menu>
      </Sider>

      {/* CONTENT AREA */}
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.09)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
              style={{ fontSize: "16px", marginRight: 16 }}
            />
            <Title level={4} style={{ margin: 0 }}>
              {activeTab === "accounts"
                ? "Quản lý tài khoản"
                : activeTab === "apartmentList"
                ? "Danh sách căn hộ"
                : activeTab === "createPost"
                ? "Tạo bài viết mới"
                : activeTab === "posts"
                ? "Danh sách bài viết"
                : "Cài đặt hệ thống"}
            </Title>
          </div>
          <div>
            <Badge count={5} style={{ marginRight: 24 }}>
              <Avatar icon={<BellOutlined />} />
            </Badge>
            <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
          </div>
        </Header>
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff", borderRadius: 4, minHeight: 280 }}>
          {/* ACCOUNT MANAGEMENT */}
          {activeTab === "accounts" && (
            <>
              <div style={{ marginBottom: 16 }}>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Tìm tài khoản theo tên hoặc email"
                  style={{ width: 300 }}
                />
              </div>
              <Table
                dataSource={accountData}
                columns={accountColumns}
                pagination={{ pageSize: 5 }}
                bordered
                rowKey="key"
              />
            </>
          )}

          {/* APARTMENT LIST */}
          {activeTab === "apartmentList" && (
            <>
              <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Tìm căn hộ theo mã hoặc chủ hộ"
                  style={{ width: 300 }}
                />
                <Button type="primary" icon={<HomeOutlined />} onClick={showNewApartmentModal}>
                  Thêm căn hộ mới
                </Button>
              </div>
              <Table
                dataSource={residentData}
                columns={apartmentColumns}
                pagination={{ pageSize: 5 }}
                bordered
                rowKey="key"
              />
            </>
          )}

          {/* POST LIST */}
          {activeTab === "posts" && (
            <>
              <div style={{ marginBottom: 16 }}>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Tìm bài viết theo tiêu đề"
                  style={{ width: 300 }}
                />
              </div>
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 3,
                }}
                dataSource={postData}
                renderItem={(item) => (
                  <List.Item
                    key={item.key}
                    actions={[
                      <Button type="link" icon={<EyeOutlined />}>
                        Xem chi tiết
                      </Button>,
                      <Button type="link" danger icon={<DeleteOutlined />}>
                        Xóa
                      </Button>,
                    ]}
                    extra={
                      <div style={{ width: 120, textAlign: "center" }}>
                        <Badge.Ribbon text="Mới" color="green">
                          <div style={{ padding: "20px 0", background: "#f5f5f5", borderRadius: 4 }}>
                            {item.date}
                          </div>
                        </Badge.Ribbon>
                      </div>
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<Button type="link" style={{ padding: 0, height: 'auto', lineHeight: 'inherit' }}>{item.title}</Button>}
                      description={`Đăng bởi: ${item.author}`}
                    />
                    <Paragraph ellipsis={{ rows: 2 }}>{item.summary}</Paragraph>
                  </List.Item>
                )}
              />
            </>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title="Cài đặt hệ thống" bordered={false}>
                  <p>Phần này sẽ được cập nhật sau.</p>
                </Card>
              </Col>
            </Row>
          )}
        </Content>
      </Layout>

      {/* RESIDENT DETAIL MODAL */}
      <Modal
        title="Thông tin chi tiết cư dân"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Đóng
          </Button>,
          <Button key="post" icon={<FileAddOutlined />} onClick={() => {
            handleCancel();
            showPostCreationModal(selectedResident);
          }}>
            Tạo bài viết
          </Button>,
          <Button key="edit" type="primary">
            Chỉnh sửa
          </Button>,
        ]}
        width={700}
      >
        {selectedResident && (
          <Row gutter={16}>
            <Col span={24}>
              <Divider orientation="left">Thông tin cơ bản</Divider>
            </Col>
            <Col span={12}>
              <p>
                <strong>Họ và Tên:</strong> {selectedResident.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedResident.email}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {selectedResident.phone}
              </p>
              <p>
                <strong>Mã căn hộ:</strong> {selectedResident.apartment}
              </p>
            </Col>
            <Col span={12}>
              <p>
                <strong>Loại hợp đồng:</strong> {selectedResident.contractType}
              </p>
              <p>
                <strong>Ngày bắt đầu:</strong> {selectedResident.contractStart}
              </p>
              <p>
                <strong>Ngày kết thúc:</strong> {selectedResident.contractEnd}
              </p>
            </Col>
            <Col span={24}>
              <Divider orientation="left">Hình ảnh</Divider>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {selectedResident.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Hình ảnh ${index + 1}`}
                    style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: 4 }}
                  />
                ))}
              </div>
            </Col>
          </Row>
        )}
      </Modal>

      {/* POST CREATION MODAL */}
      <Modal
        title={`Tạo bài viết cho căn hộ ${selectedApartment?.apartment || ''}`}
        visible={isPostModalVisible}
        onCancel={handlePostModalCancel}
        footer={null}
        width={700}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Tiêu đề bài viết"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input placeholder="Nhập tiêu đề bài viết..." />
          </Form.Item>
          <Form.Item
            label="Loại bài viết"
            name="postType"
            rules={[{ required: true, message: "Vui lòng chọn loại bài viết" }]}
          >
            <Select placeholder="Chọn loại bài viết">
              <Select.Option value="announcement">Thông báo</Select.Option>
              <Select.Option value="news">Tin tức</Select.Option>
              <Select.Option value="event">Sự kiện</Select.Option>
              <Select.Option value="guide">Hướng dẫn</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Nội dung bài viết"
            name="content"
            rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
          >
            <Input.TextArea rows={8} placeholder="Nhập nội dung bài viết..." />
          </Form.Item>
          <Form.Item
            label="Hình ảnh đính kèm"
            name="images"
          >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              maxCount={5}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            </Upload>
          </Form.Item>
          <Divider />
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<FileAddOutlined />}>
                Đăng bài
              </Button>
              <Button icon={<EyeOutlined />}>Xem trước</Button>
              <Button onClick={handlePostModalCancel}>Hủy</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      
      {/* NEW APARTMENT MODAL */}
      <Modal
        title="Thêm căn hộ mới"
        visible={isNewApartmentModalVisible}
        onCancel={handleNewApartmentModalCancel}
        footer={null}
        width={700}
      >
        <Form layout="vertical" form={apartmentForm}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Mã căn hộ"
                name="apartment"
                rules={[{ required: true, message: "Vui lòng nhập mã căn hộ" }]}
              >
                <Input placeholder="Ví dụ: A-1203" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Loại hợp đồng"
                name="contractType"
                rules={[{ required: true, message: "Vui lòng chọn loại hợp đồng" }]}
              >
                <Select placeholder="Chọn loại hợp đồng">
                  <Select.Option value="Hợp đồng mua căn hộ">Hợp đồng mua căn hộ</Select.Option>
                  <Select.Option value="Hợp đồng thuê căn hộ">Hợp đồng thuê căn hộ</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Họ và tên chủ hộ"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên chủ hộ" }]}
              >
                <Input placeholder="Nhập họ và tên chủ hộ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" }
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ngày bắt đầu hợp đồng"
                name="contractStart"
                rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
              >
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Chọn ngày bắt đầu" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ngày kết thúc hợp đồng"
                name="contractEnd"
                rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
              >
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Chọn ngày kết thúc" />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            label="Hình ảnh giấy tờ"
            name="images"
          >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              maxCount={5}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            </Upload>
          </Form.Item>
          
          <Divider />
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<HomeOutlined />}>
                Thêm căn hộ
              </Button>
              <Button onClick={handleNewApartmentModalCancel}>Hủy</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AdminHome;