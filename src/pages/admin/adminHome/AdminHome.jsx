import React, { useState } from "react";
import {
  UserOutlined,
  FileAddOutlined,
  SearchOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Menu,
  Form,
  Input,
  Button,
  Table,
  Typography,
  Space,
  Row,
  Col,
} from "antd";
import {
  StyledLayout,
  StyledSider,
  StyledContentWrapper,
  StyledCard,
} from "./style"; // file style.js bạn đưa

const { Title, Text } = Typography;

const AdminHome = () => {
  // Trạng thái sidebar (thu gọn / mở rộng)
  const [collapsed] = useState(false);
  // Trạng thái tab đang chọn
  const [activeTab, setActiveTab] = useState("accounts");
  // Form của Ant Design
  const [form] = Form.useForm();


  // Xử lý chọn menu
  const handleMenuClick = (e) => {
    setActiveTab(e.key);
  };

  // Dữ liệu giả lập cho bảng Tài khoản
  const accountData = [
    { key: "1", name: "Nguyen Van A", role: "Admin", status: "Active" },
    { key: "2", name: "Tran Thi B", role: "User", status: "Inactive" },
  ];

  // Cấu hình cột cho bảng Tài khoản
  const accountColumns = [
    { title: "Tên tài khoản", dataIndex: "name", key: "name" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
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
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} />
          <Button icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  return (
    <StyledLayout>
      {/* SIDEBAR */}
      <StyledSider>
        {/* Nút toggle sidebar */}

        {/* Menu Ant Design */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeTab]}
          onClick={handleMenuClick}
          style={{ marginTop: 10 }}
        >
          <Menu.Item key="accounts" icon={<UserOutlined />}>
            Quản lý tài khoản
          </Menu.Item>
          <Menu.Item key="create" icon={<FileAddOutlined />}>
            Tạo bài viết
          </Menu.Item>
        </Menu>
      </StyledSider>

      {/* NỘI DUNG */}
      <StyledContentWrapper collapsed={collapsed}>
        {/* Nếu chọn Quản lý tài khoản */}
        {activeTab === "accounts" && (
          <StyledCard>
            <Title level={4}>Danh sách tài khoản</Title>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm tài khoản theo tên"
              style={{ marginBottom: 16 }}
            />
            <Table dataSource={accountData} columns={accountColumns} />
          </StyledCard>
        )}

        {/* Nếu chọn Tạo bài viết */}
        {activeTab === "create" && (
          <StyledCard>
            <Title level={4}>Tạo bài viết mới</Title>
            <Form layout="vertical" form={form}>
              <Form.Item
                label="Tiêu đề bài viết"
                name="title"
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Nội dung bài viết"
                name="content"
                rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary">Đăng bài</Button>
              </Form.Item>
            </Form>
          </StyledCard>
        )}

        {/* Hai cột hiển thị thêm thông tin */}
        <Row gutter={16}>
          <Col span={12}>
            <StyledCard>
              <Title level={4}>View New Resident</Title>
              <p>
                <strong>Hợp đồng:</strong> Hợp đồng mua căn hộ
              </p>
              <p>
                <strong>Họ và Tên:</strong> Đặng Đức Hoàng
              </p>
              <p>
                <strong>Email:</strong> duchoang@gmail.com
              </p>
              <p>
                <strong>Số điện thoại:</strong> 0909219432
              </p>
              <p>
                <strong>Ngày bắt đầu hợp đồng:</strong> 01/03/2024
              </p>
              <p>
                <strong>Ngày kết thúc hợp đồng:</strong> 01/08/2024
              </p>
              <p>
                <strong>Hình ảnh:</strong>
              </p>
              <img
                src="http://res.cloudinary.com/dct0qbbjc/image/upload/v1741776225/yfnkdf8adtvfato4chmq.png"
                alt="Hình ảnh 1"
                style={{ width: "100px", marginRight: "10px" }}
              />
              <img
                src="http://res.cloudinary.com/dct0qbbjc/image/upload/v1741776228/jr0afrbzdpitat9s5r2e.png"
                alt="Hình ảnh 2"
                style={{ width: "100px" }}
              />
            </StyledCard>
          </Col>

          <Col span={12}>
            <StyledCard>
              <Title level={4}>Chức năng mở rộng</Title>
              <p>Phần này sẽ được cập nhật sau.</p>
            </StyledCard>
          </Col>
        </Row>
      </StyledContentWrapper>
    </StyledLayout>
  );
};

export default AdminHome;
