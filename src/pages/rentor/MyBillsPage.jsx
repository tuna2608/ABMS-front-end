import React, { useEffect, useState } from "react";
import {
  Card,
  Space,
  Table,
  Button,
  Modal,
  Flex,
  Tag,
  DatePicker,
  Statistic,
  Descriptions,
  message,
} from "antd";
import {
  DollarOutlined,
  FileOutlined,
  EyeOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import moment from "moment";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyBillsPage = () => {
  const [currentUser] = useState(useSelector((state) => state.user.currentUser));
  const navigate = useNavigate();

  const defaultValue = moment().subtract(1, "months");
  const [selectedDate, setSelectedDate] = useState(defaultValue);
  const [billModalVisible, setBillModalVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  
  // Mock data for bills
  const [bills] = useState([
    {
      id: 1,
      apartmentName: "Căn hộ 2PN Vinhomes Central Park",
      billContent: "Hóa đơn tháng 3",
      billDate: "03/2025",
      waterUsage: 12,
      waterCost: 240000,
      managementFee: 700000,
      others: 100000,
      totalAmount: 1040000,
      status: "Chưa thanh toán",
      dueDate: "15/04/2025"
    },
  ]);

  // Function to fetch bills data
  useEffect(() => {
    // In a real app, this would be an API call like:
    // const fetchBills = async () => {
    //   try {
    //     const response = await getBills(currentUser.userId);
    //     setBills(response.data);
    //   } catch (error) {
    //     console.error("Error fetching bills:", error);
    //     message.error("Không thể tải dữ liệu hóa đơn");
    //   }
    // };
    // fetchBills();
    
    // Mock data is already set in state
  }, [currentUser]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFilter = () => {
    // In a real app, this would filter based on the selected date
    const month = selectedDate.format("MM");
    const year = selectedDate.format("YYYY");
    console.log(`Filtering bills for ${month}/${year}`);
    message.info(`Lọc hóa đơn tháng ${month}/${year}`);
  };

  const handleViewBill = (record) => {
    setSelectedBill(record);
    setBillModalVisible(true);
  };

  const handlePayBill = (billId) => {
    // In a real app, this would trigger a payment process
    message.success(`Chuyển đến trang thanh toán cho hóa đơn #${billId}`);
    navigate("/rentorHome/payment", { state: { billId: billId } });
  };

  // Bill table columns
  const billColumns = [
    {
      title: "Căn hộ",
      dataIndex: "apartmentName",
      key: "apartmentName",
    },
    {
      title: "Nội dung",
      dataIndex: "billContent",
      key: "billContent",
    },
    {
      title: "Tháng",
      dataIndex: "billDate",
      key: "billDate",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value) => `${value.toLocaleString()} VND`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Đã thanh toán" ? "green" : "volcano"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Ngày đến hạn",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Flex gap={12}>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleViewBill(record)}
          >
            Xem chi tiết
          </Button>
          {record.status === "Chưa thanh toán" && (
            <Button
              type="primary"
              style={{ backgroundColor: "green" }}
              icon={<CheckOutlined />}
              onClick={() => handlePayBill(record.id)}
            >
              Thanh toán
            </Button>
          )}
        </Flex>
      ),
    },
  ];

  return (
    <Card
      title={
        <Space>
          <DollarOutlined />
          <span>Hóa đơn của tôi</span>
        </Space>
      }
    >
      {/* Date Filter */}
      <Flex style={{ marginBottom: "16px" }} align="center" gap="20px">
        <DatePicker
          picker="month"
          value={selectedDate}
          onChange={handleDateChange}
          placeholder="Chọn tháng và năm"
        />
        <Button onClick={handleFilter}>
          Lọc
        </Button>
      </Flex>

      {/* Bills Table */}
      <Table
        columns={billColumns}
        dataSource={bills}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Bill Details Modal */}
      <Modal
        title={
          <Space>
            <FileOutlined />
            <span>Chi tiết hóa đơn</span>
          </Space>
        }
        open={billModalVisible}
        onCancel={() => setBillModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setBillModalVisible(false)}>
            Đóng
          </Button>,
          selectedBill?.status === "Chưa thanh toán" && (
            <Button
              key="pay"
              type="primary"
              onClick={() => {
                setBillModalVisible(false);
                handlePayBill(selectedBill.id);
              }}
            >
              Thanh toán ngay
            </Button>
          ),
        ]}
        width={700}
      >
        {selectedBill && (
          <>
            <Descriptions title="Thông tin hóa đơn" bordered column={2}>
              <Descriptions.Item label="Căn hộ" span={2}>
                {selectedBill.apartmentName}
              </Descriptions.Item>
              <Descriptions.Item label="Nội dung">
                {selectedBill.billContent}
              </Descriptions.Item>
              <Descriptions.Item label="Tháng">
                {selectedBill.billDate}
              </Descriptions.Item>
              <Descriptions.Item label="Tiêu thụ nước">
                {selectedBill.waterUsage} m³
              </Descriptions.Item>
              <Descriptions.Item label="Chi phí nước">
                {selectedBill.waterCost.toLocaleString()} VND
              </Descriptions.Item>
              <Descriptions.Item label="Phí quản lý">
                {selectedBill.managementFee.toLocaleString()} VND
              </Descriptions.Item>
              <Descriptions.Item label="Chi phí khác">
                {selectedBill.others.toLocaleString()} VND
              </Descriptions.Item>
              <Descriptions.Item label="Ngày đến hạn">
                {selectedBill.dueDate}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={selectedBill.status === "Đã thanh toán" ? "green" : "volcano"}>
                  {selectedBill.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
            
            <Flex justify="center" style={{ marginTop: "24px" }}>
              <Statistic
                title="Tổng cộng"
                value={selectedBill.totalAmount}
                suffix="VND"
                precision={0}
                valueStyle={{ color: "#cf1322", fontWeight: "bold" }}
              />
            </Flex>
          </>
        )}
      </Modal>
    </Card>
  );
};

export default MyBillsPage;