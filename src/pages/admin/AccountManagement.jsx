import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Button, Table, Space, Modal, Switch, Row, Col, message } from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  UserOutlined,
  CheckOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

const AccountManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accountForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('accountList');
  const [accountData, setAccountData] = useState([]);
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dữ liệu mẫu tối ưu với một bản ghi duy nhất cho mỗi loại
  useEffect(() => {
    // Một mẫu dữ liệu duy nhất cho danh sách tài khoản
    setAccountData([
      {
        key: '1',
        accountId: 'ACC001',
        username: 'nguyenvana',
        email: 'nguyenvana@example.com',
        status: 'active',
      }
    ]);

    // Một mẫu dữ liệu duy nhất cho tài khoản chờ duyệt
    setPendingAccounts([
      {
        key: '2',
        accountId: 'ACC002',
        username: 'tranvanb',
        email: 'tranvanb@example.com',
      }
    ]);
  }, []);

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
      render: (status, record) => (
        <Switch 
          checked={status === 'active'} 
          checkedChildren="Hoạt Động" 
          unCheckedChildren="Khóa"
          onChange={(checked) => handleStatusChange(record.key, checked)}
        />
      )
    },
    {
      title: 'Hành Động',
      key: 'actions',
      render: (_, record) => (
        <Button 
          icon={<DeleteOutlined />} 
          danger
          onClick={() => handleDeleteAccount(record.key)}
        >
          Xóa
        </Button>
      )
    }
  ];

  const reviewColumns = [
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
      title: 'Hành Động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<CheckOutlined />} 
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a', color: '#fff' }}
            onClick={() => handleApproveAccount(record.key)}
          >
            Duyệt
          </Button>
          <Button 
            icon={<CloseCircleOutlined />} 
            danger
            onClick={() => handleDeclineAccount(record.key)}
          >
            Từ Chối
          </Button>
        </Space>
      )
    }
  ];

  const handleStatusChange = (key, checked) => {
    setAccountData(prevData => 
      prevData.map(account => 
        account.key === key 
          ? { ...account, status: checked ? 'active' : 'inactive' } 
          : account
      )
    );
    message.success(`Đã ${checked ? 'kích hoạt' : 'khóa'} tài khoản`);
  };

  const handleDeleteAccount = (key) => {
    Modal.confirm({
      title: 'Xác nhận xóa tài khoản',
      content: 'Bạn có chắc chắn muốn xóa tài khoản này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setAccountData(prevData => prevData.filter(account => account.key !== key));
        message.success('Đã xóa tài khoản thành công');
      },
    });
  };

  const handleApproveAccount = (key) => {
    setLoading(true);
    
    // Find the account to approve
    const accountToApprove = pendingAccounts.find(account => account.key === key);
    
    // Remove from pending accounts
    setPendingAccounts(prevData => prevData.filter(account => account.key !== key));
    
    // Add to account list with active status
    if (accountToApprove) {
      setAccountData(prevData => [
        ...prevData, 
        { ...accountToApprove, status: 'active' }
      ]);
    }
    
    setLoading(false);
    message.success('Tài khoản đã được duyệt thành công');
  };

  const handleDeclineAccount = (key) => {
    Modal.confirm({
      title: 'Xác nhận từ chối tài khoản',
      content: 'Bạn có chắc chắn muốn từ chối tài khoản này không?',
      okText: 'Từ chối',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setPendingAccounts(prevData => prevData.filter(account => account.key !== key));
        message.success('Đã từ chối tài khoản thành công');
      },
    });
  };

  const showAccountModal = () => {
    accountForm.resetFields();
    setIsModalVisible(true);
  };

  const handleAddAccount = (values) => {
    const newAccount = {
      key: `ACC${accountData.length + pendingAccounts.length + 1}`.padStart(6, '0'),
      accountId: `ACC${accountData.length + pendingAccounts.length + 1}`.padStart(6, '0'),
      username: values.username,
      email: values.email,
      status: 'active',
    };
    
    setAccountData(prevData => [...prevData, newAccount]);
    setIsModalVisible(false);
    message.success('Thêm tài khoản mới thành công');
  };

  const extraButton = activeTab === 'accountList' ? (
    <Button 
      type="primary" 
      icon={<PlusOutlined />} 
      onClick={showAccountModal}
    >
      Thêm Tài Khoản
    </Button>
  ) : null;

  return (
    <Card 
      tabList={[
        {
          key: 'accountList',
          tab: (
            <span>
              <UserOutlined />
              Danh Sách Tài Khoản
            </span>
          ),
        },
        {
          key: 'accountReview',
          tab: (
            <span>
              <CheckOutlined />
              Duyệt Tài Khoản
            </span>
          )
        }
      ]}
      activeTabKey={activeTab}
      onTabChange={(key) => setActiveTab(key)}
      extra={extraButton}
    >
      {activeTab === 'accountList' && (
        <Table 
          columns={accountColumns} 
          dataSource={accountData}
          loading={loading}
          rowKey="key"
          pagination={{ pageSize: 10 }}
        />
      )}

      {activeTab === 'accountReview' && (
        <Table 
          columns={reviewColumns} 
          dataSource={pendingAccounts}
          loading={loading}
          rowKey="key"
          pagination={{ pageSize: 10 }}
        />
      )}

      <Modal
        title="Thêm Tài Khoản Mới"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form 
          form={accountForm} 
          layout="vertical"
          onFinish={handleAddAccount}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="username" 
                label="Tên Người Dùng" 
                rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
              >
                <Input placeholder="Nhập tên người dùng" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="email" 
                label="Email" 
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  { type: 'email', message: 'Email không hợp lệ' }
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item 
            name="role" 
            label="Vai Trò" 
            rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
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