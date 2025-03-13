import React, { useState } from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Input, Layout, Menu, Table, Modal, Form, Select, message } from "antd";

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const AdminHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [accounts, setAccounts] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  const [isResidentModalOpen, setResidentModalOpen] = useState(false);
  const [isCreateAccountModalOpen, setCreateAccountModalOpen] = useState(false);
  const [form] = Form.useForm();

  const residentData = {
    verificationFormName: "Hợp đồng mua căn hộ",
    fullName: "Đặng Đức Hoàng",
    email: "duchoang@gmail.com",
    phoneNumber: "0909219432",
    contractStartDate: "2024-03-01T08:00:00",
    contractEndDate: "2024-08-01T08:00:00",
    imageFiles: [
      "http://res.cloudinary.com/dct0qbbjc/image/upload/v1741776225/yfnkdf8adtvfato4chmq.png",
      "http://res.cloudinary.com/dct0qbbjc/image/upload/v1741776228/jr0afrbzdpitat9s5r2e.png",
    ],
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter((account) => account.id !== id));
    message.success("Account deleted successfully!");
  };

  const handleCreateAccount = async (values) => {
    try {
      const response = await fetch("http://localhost:8080/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Account created successfully!");
        setCreateAccountModalOpen(false);
        form.resetFields();
      } else {
        message.error("Failed to create account.");
      }
    } catch (error) {
      message.error("Error connecting to server.");
    }
  };

  const menuItems = [
    { key: "1", icon: <AppstoreOutlined />, label: "Dashboard" },
    { key: "2", icon: <UserOutlined />, label: "Accounts" },
  ];

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="danger" icon={<DeleteOutlined />} onClick={() => deleteAccount(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={menuItems} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 10,
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={toggleCollapsed} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
          <Input placeholder="Search..." prefix={<SearchOutlined />} style={{ width: 200 }} />
          <div style={{ display: "flex", gap: "10px" }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateAccountModalOpen(true)}>
              New Account
            </Button>
            <Button type="default" icon={<EyeOutlined />} onClick={() => setResidentModalOpen(true)}>
              View New Resident
            </Button>
          </div>
        </Header>
        <Content style={{ margin: "16px" }}>
          <h2>List of Accounts</h2>
          <Table dataSource={accounts} columns={columns} rowKey="id" />
        </Content>
      </Layout>

      {/* Modal View Resident */}
      <Modal
        title="New Resident Details"
        open={isResidentModalOpen}
        onCancel={() => setResidentModalOpen(false)}
        footer={null}
      >
        <p><strong>Verification Form:</strong> {residentData.verificationFormName}</p>
        <p><strong>Full Name:</strong> {residentData.fullName}</p>
        <p><strong>Email:</strong> {residentData.email}</p>
        <p><strong>Phone:</strong> {residentData.phoneNumber}</p>
        <p><strong>Contract Start:</strong> {new Date(residentData.contractStartDate).toLocaleDateString()}</p>
        <p><strong>Contract End:</strong> {new Date(residentData.contractEndDate).toLocaleDateString()}</p>
        <div>
          <strong>Images:</strong>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {residentData.imageFiles.map((img, index) => (
              <img key={index} src={img} alt="Resident" width={100} />
            ))}
          </div>
        </div>
      </Modal>

      {/* Modal Create Account */}
      <Modal
        title="Create New Account"
        open={isCreateAccountModalOpen}
        onCancel={() => setCreateAccountModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateAccount}>
          <Form.Item
            label="Username"
            name="userName"
            rules={[{ required: true, message: "Please enter username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select placeholder="Select role">
              <Option value="Chủ căn hộ">Chủ căn hộ</Option>
              <Option value="Người ở">Người ở</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AdminHome;
