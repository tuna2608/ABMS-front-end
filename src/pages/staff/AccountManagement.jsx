import React from "react";
import { 
  Card, 
  Space, 
  Input, 
  Form, 
  Select, 
  Button,
  message // Correct import of message
} from "antd";
import { 
  UserOutlined 
} from "@ant-design/icons";

const { Option } = Select;

const AccountManagement = () => {
  const [accountForm] = Form.useForm();

  const handleAccountFormSubmit = (values) => {
    try {
      // Implement account submission logic
      console.log("Account form submitted:", values);
      
      // Validate and process account information
      if (values) {
        message.success("Đã gửi thông tin tài khoản cho admin!");
        accountForm.resetFields();
      }
    } catch (error) {
      // Error handling
      console.error('Submission error:', error);
      message.error("Có lỗi xảy ra khi gửi thông tin!");
    }
  };

  return (
    <Card 
      title={
        <Space>
          <UserOutlined /> 
          <span>Quản lý tài khoản</span>
        </Space>
      } 
    >
      <Form
        form={accountForm}
        layout="vertical"
        onFinish={handleAccountFormSubmit}
      >
        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
        </Form.Item>
        
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
        
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        
        <Form.Item
          name="position"
          label="Vị trí công việc"
          rules={[{ required: true, message: 'Vui lòng chọn vị trí công việc!' }]}
        >
          <Select placeholder="Chọn vị trí công việc">
            <Option value="staff">Nhân viên quản lý</Option>
            <Option value="manager">Quản lý toà nhà</Option>
            <Option value="accountant">Kế toán</Option>
            <Option value="technician">Kỹ thuật viên</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="note"
          label="Ghi chú"
        >
          <Input.TextArea rows={4} placeholder="Nhập ghi chú" />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Gửi thông tin cho admin
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AccountManagement;