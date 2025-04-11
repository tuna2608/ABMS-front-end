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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllBillRentor, paymentBill } from "../../redux/apiCalls";

const MyBillsPage = () => {
  const [currentUser] = useState(
    useSelector((state) => state.user.currentUser)
  );
  const navigate = useNavigate();

  const defaultValue = moment().subtract(1, "months");
  const [selectedDate, setSelectedDate] = useState(defaultValue);
  const [billModalVisible, setBillModalVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Mock data for bills
  const [bills, setBills] = useState([
    // {
    //   billId: 1,
    //   billContent: "Hóa đơn tháng 3",
    //   amount: 15000.0,
    //   lastMonthWaterConsumption: 40.0,
    //   waterConsumption: 41.5,
    //   billDate: "2025-04-06T04:54:00.588012",
    //   status: "unpaid",
    //   username: "Chủ căn hộ Tú1",
    //   apartmentName: "A201",
    //   billType: "water",
    //   surcharge: 0.0,
    //   createBillUserId: 5,
    //   apartmentStatus: "rented",
    // },
  ]);

  // Function to fetch bills data
  useEffect(() => {
    callGetAllBillRentor(currentUser.userId);
  }, [currentUser]);

  async function callGetAllBillRentor(userId) {
    setLoading(true);
    try {
      const res = await getAllBillRentor(dispatch, userId);
      // console.log(res.data.length === 0);
      if (res.success) {
        setBills(res.data);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message("Không thể lấy danh sách hóa đơn!");
    } finally {
      setLoading(false);
    }
  }

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

  const handlePayment = async (record) => {
    const formData = {
      billId: record.billId,
      productName: record.billContent,
      description: (record.billType === "monthPaid") ? "Bill thue nha" : record.billContent,
      returnUrl: "http://localhost:3000/payment/success",
      cancelUrl: "http://localhost:3000/payment/cancel",
      price: record.amount,
    };
    try {
      const res = await paymentBill(formData);
      if (res.success) {
        localStorage.setItem("paymentBillRequest", JSON.stringify(formData));
        const url = res?.data?.checkoutUrl;
        window.location.href = url;
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Không thể thực hiện thanh toán hóa đơn!");
    } finally {
    }
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
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${amount} VND`,
    },
    {
      title: "Loại Hóa Đơn",
      dataIndex: "billType",
      key: "billType",
      render: (billType) => {
        const colorMap = {
          water: "blue",
          monthPaid: "purple",
          Rent: "green",
        };
        return <Tag color={colorMap[billType] || "default"}>{billType}</Tag>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "paid" ? "green" : "volcano"}>{status}</Tag>
      ),
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
          {record.status === "unpaid" && (
            <Button
              type="primary"
              style={{ backgroundColor: "green" }}
              icon={<CheckOutlined />}
              onClick={() => handlePayment(record)}
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
        <Button onClick={handleFilter}>Lọc</Button>
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
                // handlePay(selectedBill.id);
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
                <Tag
                  color={
                    selectedBill.status === "Đã thanh toán"
                      ? "green"
                      : "volcano"
                  }
                >
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
