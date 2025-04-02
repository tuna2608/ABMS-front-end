import React, { useEffect, useState } from "react";
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
import { getAllConsumption } from "../../redux/apiCalls";

const UtilityManagement = () => {
  const defaultValue = moment().subtract(1, "months");
  const [selectedDate, setSelectedDate] = useState(defaultValue);
  const [consumptions,setConsumptions] = useState([
    {
      id: "1",
      apartmentName: '101',
      userName: 'Nguyen anh Tu',
      consumptionDate: "2024-03-15",
      lastMonthWaterConsumption: 45.2,
      waterConsumption: 47.2,
    },
  ]);

  useEffect(()=>{
    async function callGetAllConsumption(){
      const res = await getAllConsumption();
      console.log(res);
      setConsumptions(res.data);
    }
    callGetAllConsumption();
  },[])

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Combined data for electricity and water with user details
  

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUtilityType, setCurrentUtilityType] = useState("combined");

  // Combined utility columns
  const consumptionColumns = [
    {
      title: "Số Căn hộ",
      dataIndex: "apartmentName",
      key: "apartmentName",
      render: (value) => `${value}`
    },
    {
      title: "Chủ căn hộ",
      dataIndex: "userName",
      key: "userName",
      render: (value) => `${value}`,
    },
    {
      title: "Tháng Ghi Nhận",
      dataIndex: "consumptionDate",
      key: "consumptionDate",
    },
    {
      title: "Chỉ Số Nước Tháng trước (m³)",
      dataIndex: "lastMonthWaterConsumption",
      key: "lastMonthWaterConsumption",
      render: (value) => `${value} m³`,
    },
    {
      title: "Chỉ Số Nước (m³)",
      dataIndex: "waterConsumption",
      key: "waterConsumption",
      render: (value) => `${value} m³`,
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (_, record) => (
        <>
          {record.billCreated === false
          ?(<Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showCreateBillModal("combined")}
          >
            Tạo Hóa Đơn
          </Button>)
          : (
            (<Button
              type="primary"
              disabled
            >
             Hóa đơn này đã tạo
            </Button>)
          )
        }
        
        </>
        
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
            onChange={handleDateChange}
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
        columns={consumptionColumns}
        dataSource={consumptions}
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
            name="electricityConsumption"
            label="Chỉ Số Điện (kWh)"
            rules={[{ required: true, message: "Vui lòng nhập chỉ số điện" }]}
          >
            <Input type="number" placeholder="Nhập chỉ số điện" suffix="kWh" />
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