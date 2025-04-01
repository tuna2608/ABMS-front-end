import React, { useState } from "react";
import {
  Card,
  Space,
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Flex,
} from "antd";
import {
  DollarOutlined,
  PlusOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";

const UtilityManagement = () => {
  const defaultValue = moment().subtract(1, "months");
  const [selectedDate, setSelectedDate] = useState(defaultValue);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Combined data for electricity and water with user details
  const [utilityRecords] = useState([
    {
      id: "1",
      apartmentId: "A101",
      apartmentName: "Chung cư Sunrise",
      users: ["Huỳnh Lê Phương Nam"],
      electricityConsumption: 250,
      waterConsumption: 15,
      recordDate: "2024-03-15",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUtilityType, setCurrentUtilityType] = useState("combined");

  // Combined utility columns
  const utilityColumns = [
    {
      title: "Số Căn hộ",
      dataIndex: "apartmentId",
      key: "apartmentId",
    },
    {
      title: "Người dùng",
      dataIndex: "users",
      key: "users",
      render: (users) => (
        <Space direction="vertical">
          {users.map((user, index) => (
            <div key={index}>
              <UserOutlined style={{ marginRight: 8 }} />
              {user}
            </div>
          ))}
        </Space>
      ),
    },
    {
      title: "Chỉ Số Nước (m³)",
      dataIndex: "waterConsumption",
      key: "waterConsumption",
      render: (value) => `${value} m³`,
    },
    {
      title: "Ngày Ghi Nhận",
      dataIndex: "recordDate",
      key: "recordDate",
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showCreateBillModal("combined")}
        >
          Tạo Hóa Đơn
        </Button>
      ),
    },

  ];

  const handleEditBill = (type,record) => {
    console.log(record);
    // setCurrentUtilityType(type);
    // setIsModalVisible(true);
  };

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
    console.log("Bill created:", values);
    setIsModalVisible(false);
  };

  const [date, setDate] = useState(null);

  const handleChange = (value) => {
    setDate(value);
  };

  const handleFilter = () => {
    console.log(selectedDate.format("YYYY-MM"));
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
      <Flex style={{ marginBottom: "16px" }} justify="space-between">
        <Flex align="center" style={{ gap: "20px" }}>
          <DatePicker
            picker="month"
            value={defaultValue}
            onChange={handleChange}
            placeholder="Chọn tháng và năm"
          />
          <Button style={{}} onClick={handleFilter}>
            Loc
          </Button>
        </Flex>
        <Button style={{backgroundColor: 'var(--fgreen)', color:'white'}}>Import CSV</Button>
      </Flex>

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
            billType: currentUtilityType,
          }}
        >
          <Form.Item name="billType" label="Loại Hóa Đơn" hidden>
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="users"
            label="Người Dùng"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng" },
            ]}
          >
            <Input placeholder="Nhập tên người dùng (ngăn cách bằng dấu phẩy)" />
          </Form.Item>

          <Form.Item
            name="waterConsumption"
            label="Chỉ Số Nước (m³)"
            rules={[{ required: true, message: "Vui lòng nhập chỉ số nước" }]}
          >
            <Input type="number" placeholder="Nhập chỉ số nước" suffix="m³" />
          </Form.Item>

          <Form.Item
            name="billDate"
            label="Ngày Ghi Nhận"
            rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Tạo Hóa Đơn
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default UtilityManagement;
