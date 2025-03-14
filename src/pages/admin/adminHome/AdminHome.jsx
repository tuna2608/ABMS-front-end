import React, { useState } from "react";
import {
  UserOutlined,
  FileAddOutlined,
  SearchOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Button,
  Menu,
  Layout,
  Form,
  Input,
  Table,
  Tag,
  Row,
  Col,
  Card,
  Typography,
  Space,
} from "antd";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const AdminHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("accounts");
  const [form] = Form.useForm();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e) => {
    setActiveTab(e.key);
  };

  const accountData = [
    { key: "1", name: "Nguyen Van A", role: "Admin", status: "Active" },
    { key: "2", name: "Tran Thi B", role: "User", status: "Inactive" },
  ];

  const accountColumns = [
    { title: "Tên tài khoản", dataIndex: "name", key: "name" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
    { title: "Trạng thái", dataIndex: "status", key: "status", render: (status) => <Tag color={status === "Active" ? "green" : "volcano"}>{status}</Tag> },
    { title: "Hành động", key: "action", render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} />
          <Button icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed} style={{ height: "100vh", position: "fixed", left: 0 }}>
        <Menu theme="dark" mode="inline" selectedKeys={[activeTab]} onClick={handleMenuClick}>
          <Menu.Item key="accounts" icon={<UserOutlined />}>Quản lý tài khoản</Menu.Item>
          <Menu.Item key="create" icon={<FileAddOutlined />}>Tạo bài viết</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Content style={{ margin: "16px" }}>
          {activeTab === "accounts" && (
            <Card title="Danh sách tài khoản">
              <Row>
                <Col span={24}>
                  <Input prefix={<SearchOutlined />} placeholder="Tìm tài khoản theo tên" style={{ marginBottom: 16 }} />
                  <Table dataSource={accountData} columns={accountColumns} />
                </Col>
              </Row>
            </Card>
          )}
          {activeTab === "create" && (
            <Card title="Tạo bài viết mới">
              <Form layout="vertical" form={form}>
                <Form.Item label="Tiêu đề bài viết" name="title" rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}> <Input /> </Form.Item>
                <Form.Item label="Nội dung bài viết" name="content" rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}> <Input.TextArea rows={4} /> </Form.Item>
                <Form.Item> <Button type="primary">Đăng bài</Button> </Form.Item>
              </Form>
            </Card>
          )}
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Card title="View New Resident">
                <p><strong>Hợp đồng:</strong> Hợp đồng mua căn hộ</p>
                <p><strong>Họ và Tên:</strong> Đặng Đức Hoàng</p>
                <p><strong>Email:</strong> duchoang@gmail.com</p>
                <p><strong>Số điện thoại:</strong> 0909219432</p>
                <p><strong>Ngày bắt đầu hợp đồng:</strong> 01/03/2024</p>
                <p><strong>Ngày kết thúc hợp đồng:</strong> 01/08/2024</p>
                <p><strong>Hình ảnh:</strong></p>
                <img src="http://res.cloudinary.com/dct0qbbjc/image/upload/v1741776225/yfnkdf8adtvfato4chmq.png" alt="Hình ảnh 1" style={{ width: "100px", marginRight: "10px" }} />
                <img src="http://res.cloudinary.com/dct0qbbjc/image/upload/v1741776228/jr0afrbzdpitat9s5r2e.png" alt="Hình ảnh 2" style={{ width: "100px" }} />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Chức năng mở rộng">
                <p>Phần này sẽ được cập nhật sau.</p>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminHome;