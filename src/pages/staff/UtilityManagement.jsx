import React, { useState } from "react";
import { 
  Card, 
  Space, 
  Table, 
  Button,
  Modal,
  Form,
  Input,
  DatePicker
} from "antd";
import { 
  DollarOutlined, 
  PlusOutlined,
  UserOutlined
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

const UtilityManagement = () => {
  // Combined data for electricity and water with user details
  const [utilityRecords] = useState([
    {
      id: '1',
      apartmentId: 'A101',
      apartmentName: 'Chung cư Sunrise',
      users: ['Huỳnh Lê Phương Nam'],
      electricityConsumption: 250,
      waterConsumption: 15,
      recordDate: '2024-03-15'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUtilityType, setCurrentUtilityType] = useState('combined');

  // Combined utility columns
  const utilityColumns = [
    {
      title: 'Số Căn hộ',
      dataIndex: 'apartmentId',
      key: 'apartmentId',
    },
    {
      title: 'Tên Căn hộ',
      dataIndex: 'apartmentName',
      key: 'apartmentName',
    },
    {
      title: 'Người dùng',
      dataIndex: 'users',
      key: 'users',
      render: (users) => (
        <Space direction="vertical">
          {users.map((user, index) => (
            <div key={index}>
              <UserOutlined style={{ marginRight: 8 }} />
              {user}
            </div>
          ))}
        </Space>
      )
    },
    {
      title: 'Chỉ Số Điện (kWh)',
      dataIndex: 'electricityConsumption',
      key: 'electricityConsumption',
      render: (value) => `${value} kWh`
    },
    {
      title: 'Chỉ Số Nước (m³)',
      dataIndex: 'waterConsumption',
      key: 'waterConsumption',
      render: (value) => `${value} m³`
    },
    {
      title: 'Ngày Ghi Nhận',
      dataIndex: 'recordDate',
      key: 'recordDate',
    },
    {
      title: 'Hành Động',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showCreateBillModal('combined')}
        >
          Tạo Hóa Đơn
        </Button>
      )
    }
  ];



  // Function to show create bill modal
  const showCreateBillModal = (type) => {
    setCurrentUtilityType(type);
    setIsModalVisible(true);
  };

  // Function to handle modal cancel
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // Function to handle bill creation
  const handleCreateBill = (values) => {
    console.log('Bill created:', values);
    setIsModalVisible(false);
  };

  return (
    <Card 
      title={
        <Space>
          <DollarOutlined /> 
          <span>Chi phí điện nước</span>
        </Space>
      } 
    >
      {/* Date Range Filter */}
      <Space style={{ marginBottom: 16 }}>
        <RangePicker />
        <Button type="primary">Lọc</Button>
      </Space>

      {/* Utility Tabs with new items prop - Only one tab now */}
      <Table 
        columns={utilityColumns} 
        dataSource={utilityRecords} 
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Create Bill Modal with open prop instead of visible */}
      <Modal
        title="Tạo Hóa Đơn Điện & Nước"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleCreateBill}
          initialValues={{
            billType: currentUtilityType
          }}
        >
          <Form.Item 
            name="billType" 
            label="Loại Hóa Đơn"
            hidden
          >
            <Input disabled />
          </Form.Item>

          <Form.Item 
            name="users"
            label="Người Dùng"
            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
          >
            <Input 
              placeholder="Nhập tên người dùng (ngăn cách bằng dấu phẩy)"
            />
          </Form.Item>

          <Form.Item 
            name="electricityConsumption" 
            label="Chỉ Số Điện (kWh)"
            rules={[{ required: true, message: 'Vui lòng nhập chỉ số điện' }]}
          >
            <Input 
              type="number" 
              placeholder="Nhập chỉ số điện" 
              suffix="kWh"
            />
          </Form.Item>

          <Form.Item 
            name="waterConsumption" 
            label="Chỉ Số Nước (m³)"
            rules={[{ required: true, message: 'Vui lòng nhập chỉ số nước' }]}
          >
            <Input 
              type="number" 
              placeholder="Nhập chỉ số nước" 
              suffix="m³"
            />
          </Form.Item>

          <Form.Item 
            name="billDate" 
            label="Ngày Ghi Nhận"
            rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block
            >
              Tạo Hóa Đơn
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default UtilityManagement;