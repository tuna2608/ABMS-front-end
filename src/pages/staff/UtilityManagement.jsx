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
  message,
} from "antd";
import {
  DollarOutlined,
  PlusOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { createBill, getAllConsumption } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UtilityManagement = () => {
  const [currentUser,setCurrentUser] = useState(useSelector((state) => state.user.currentUser))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultValue = moment().subtract(1, "months");
  const [selectedDate, setSelectedDate] = useState(defaultValue);
  const [consumptions, setConsumptions] = useState([
    {
      id: "",
      apartmentName: "",
      userName: "Chua co consumption nao ca",
      consumptionDate: "",
      lastMonthWaterConsumption: "",
      waterConsumption: "",
    },
  ]);

  useEffect(() => {
    async function callGetAllConsumption() {
      const res = await getAllConsumption();
      // console.log(res);
      setConsumptions(res.data);
    }
    callGetAllConsumption();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Combined data for electricity and water with user details

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUtilityType, setCurrentUtilityType] = useState("combined");
  const [currentConsumption, setCurrentConsumption] = useState({});

  // Combined utility columns
  const consumptionColumns = [
    {
      title: "Số Căn hộ",
      dataIndex: "apartmentName",
      key: "apartmentName",
      render: (value) => `${value}`,
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
        <Flex gap={20}>
          {record.billCreated === false ? (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleCreateBill(record)}
            >
              Tạo Hóa Đơn
            </Button>
          ) : (
            <Button type="primary" disabled>
              Hóa đơn này đã tạo
            </Button>
          )}
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => showEditConsumptionModal("combined", record)}
          >
          </Button>
        </Flex>
      ),
    },
  ];

  // Function to show create bill modal
  const showEditConsumptionModal = (type, record) => {
    setCurrentUtilityType(type);
    setCurrentConsumption(record);
    setIsModalVisible(true);
  };

  // Function to handle modal cancel
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // Function to handle bill creation
  const handleEditConsumption = (values) => {
    console.log("Bill created:", values);
    setIsModalVisible(false);
  };

  const handleCreateBill = async (record) => {
    // console.log(record);
    // console.log(currentUser);
    const month = selectedDate.month() + 1;
    const formData = {
      apartmentName: record.apartmentName,
      billContent: `Hóa đơn tháng ${month}`,
      lastMonthWaterCons: record.lastMonthWaterConsumption,
      waterCons: record.waterConsumption,
      others: 0,
      managementFee: 0,
      consumptionId: record.id,
      createdUserId: currentUser.userId
    }
    const res = await createBill(dispatch,formData);
    // console.log(res);
    const messageAPI = res.message
    if(res.status === 401 ||res.status === 400||res.status === 403){
      message.error(messageAPI)
      return;
    }else{
      message.success(messageAPI)
      navigate('/bill-management')
    }
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
            onChange={handleDateChange}
            placeholder="Chọn tháng và năm"
          />
          <Button style={{}} onClick={handleFilter}>
            Loc
          </Button>
        </Flex>
        <Button style={{ backgroundColor: "var(--fgreen)", color: "white" }}>
          Import CSV
        </Button>
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
          onFinish={handleEditConsumption}
          initialValues={{
            billType: currentUtilityType,
            consumption: currentConsumption,
          }}
        >
          <Form.Item name="billType" label="Loại Hóa Đơn" hidden>
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={["consumption", "userName"]}
            label="Chu can ho"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={["consumption", "consumptionDate"]}
            label="Tháng Ghi Nhận"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={["consumption", "lastMonthWaterConsumption"]}
            label="Chỉ Số Nước Tháng trước (m³)"
            rules={[{ required: true, message: "Vui lòng nhập chỉ số nước" }]}
          >
            <Input disabled suffix="m³" />
          </Form.Item>
          <Form.Item
            name={["consumption", "waterConsumption"]}
            label="Chỉ Số Nước Mới (m³)"
            rules={[{ required: true, message: "Vui lòng nhập chỉ số nước" }]}
          >
            <Input suffix="m³" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Edit Consumption
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default UtilityManagement;
