import React, { useState } from 'react';
import { Card, Form, Input, Select, Button, Table, Space, Modal, Switch, Row, Col } from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  UserOutlined 
} from '@ant-design/icons';

const AccountManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accountForm] = Form.useForm();

  const accountColumns = [
    {
      title: 'Mã Tài Khoản',
      dataIndex: 'accountId',
      key: 'accountId',
    },
    {
      title: 'Tên Người Dùng',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Switch 
          checked={status === 'active'} 
          checkedChildren="Hoạt Động" 
          unCheckedChildren="Khóa" 
        />
      )
    },
    {
      title: 'Hành Động',
      key: 'actions',
      render: () => (
        <Space>
          <Button icon={<EditOutlined />} type="primary" ghost>
            Chỉnh Sửa
          </Button>
          <Button icon={<DeleteOutlined />} danger>
            Xóa
          </Button>
        </Space>
      )
    }
  ];

  const showAccountModal = () => {
    setIsModalVisible(true);
  };

  return (
    <Card 
      title={
        <Space>
          <UserOutlined />
          <span>Danh Sách Tài Khoản</span>
        </Space>
      }
      extra={
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={showAccountModal}
        >
          Thêm Tài Khoản
        </Button>
      }
    >
      <Table columns={accountColumns} dataSource={[]} />

      <Modal
        title="Thêm Tài Khoản Mới"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={accountForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="username" 
                label="Tên Người Dùng" 
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập tên người dùng" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="email" 
                label="Email" 
                rules={[{ required: true, type: 'email' }]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item 
            name="role" 
            label="Vai Trò" 
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn vai trò">
              <Select.Option value="admin">Quản Trị Viên</Select.Option>
              <Select.Option value="staff">Nhân Viên</Select.Option>
              <Select.Option value="user">Người Dùng</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Tạo Tài Khoản
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default AccountManagement;