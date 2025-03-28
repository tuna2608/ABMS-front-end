import React, { useState } from "react";
import { 
  Card, 
  Space, 
  Table, 
  Tabs,
  Button,
  Modal,
  Form,
  Input,
  DatePicker
} from "antd";
import { 
  DollarOutlined, 
  ThunderboltOutlined, 
  HomeOutlined,
  PlusOutlined,
  UserOutlined
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const UtilityManagement = () => {
  // Separate data for electricity and water with user details
  const [electricityRecords] = useState([
    {
      id: '1',
      apartmentId: 'A101',
      apartmentName: 'Chung cư Sunrise',
      users: ['Huỳnh Lê Phương Nam'],
      electricityConsumption: 250,
      recordDate: '2024-03-15'
    }
  ]);

  const [waterRecords] = useState([
    {
      id: '1',
      apartmentId: 'A101',
      apartmentName: 'Chung cư Sunrise',
      users: ['Huỳnh Lê Phương Nam'],
      waterConsumption: 15,
      recordDate: '2024-03-15'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUtilityType, setCurrentUtilityType] = useState('electricity');

  // Electricity-specific columns
  const electricityColumns = [
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
      title: 'Danh Sách Người Dùng',
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
          onClick={() => showCreateBillModal('electricity')}
        >
          Tạo Hóa Đơn
        </Button>
      )
    }
  ];

  // Water-specific columns
  const waterColumns = [
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
          onClick={() => showCreateBillModal('water')}
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
          <span>Quản Lý Tiện Ích</span>
        </Space>
      } 
    >
      {/* Date Range Filter */}
      <Space style={{ marginBottom: 16 }}>
        <RangePicker />
        <Button type="primary">Lọc</Button>
      </Space>

      {/* Utility Tabs */}
      <Tabs defaultActiveKey="electric">
        <TabPane 
          tab={
            <span>
              <ThunderboltOutlined />
              Điện
            </span>
          } 
          key="electric"
        >
          <Table 
            columns={electricityColumns} 
            dataSource={electricityRecords} 
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </TabPane>
        <TabPane 
          tab={
            <span>
              <HomeOutlined />
              Nước
            </span>
          } 
          key="water"
        >
          <Table 
            columns={waterColumns} 
            dataSource={waterRecords} 
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </TabPane>
      </Tabs>

      {/* Create Bill Modal */}
      <Modal
        title={`Tạo Hóa Đơn ${currentUtilityType === 'electricity' ? 'Điện' : 'Nước'}`}
        visible={isModalVisible}
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
            name="consumption" 
            label={`Chỉ Số ${currentUtilityType === 'electricity' ? 'Điện (kWh)' : 'Nước (m³)'}`}
            rules={[{ required: true, message: `Vui lòng nhập chỉ số ${currentUtilityType === 'electricity' ? 'điện' : 'nước'}` }]}
          >
            <Input 
              type="number" 
              placeholder={`Nhập chỉ số ${currentUtilityType === 'electricity' ? 'điện' : 'nước'}`} 
              suffix={currentUtilityType === 'electricity' ? 'kWh' : 'm³'}
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