import React, { useEffect, useState } from "react";
import { Card, Table, Button, Space, Modal, message, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { getAllBill } from "../../redux/apiCalls";

// Sample payment data based on database schema
const initialPaymentData = [
  {
    billId: 1,
    billContent: "Hóa đơn nước tháng 3/2025",
    amount: 17000.008,
    lastMonthWaterConsumption: 47.0,
    waterConsumption: 48.7,
    billDate: "2025-04-27T17:40:34.099453",
    status: "paid",
    username: "Nguyễn Vy Rin",
    apartmentName: "A102",
    billType: "water",
    surcharge: 0.0,
    createBillUserId: 5,
    apartmentStatus: "rented",
    period: null,
    paymentDate: "2025-04-27T18:13:07.696685",
    userPaymentId: 7,
    userPaymentName: "user2",
  },
];

const PaymentManagement = () => {
  const [activeTab, setActiveTab] = useState("paymentList");
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    callGetAllBill();
  }, []);

  async function callGetAllBill() {
    setLoading(true);
    try {
      const res = await getAllBill();
      if (res.success) {
        setPayments(res.data);
        // message.success(res.message)
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message("Không thể thực hiện lấy danh sách đặt cọc!");
    } finally {
      setLoading(false);
    }
  }

  // Delete payment handler
  const handleDelete = (paymentId) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa khoản thanh toán này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        const updatedPayments = payments.filter(
          (payment) => payment.payment_id !== paymentId
        );
        setPayments(updatedPayments);
        message.success("Đã xóa khoản thanh toán");
      },
    });
  };

  // Columns configuration
  const columns = [
    {
      title: "Mã Thanh Toán",
      dataIndex: "billId",
      key: "billId",
    },
    {
      title: "Người thanh toán",
      dataIndex: "userPaymentName",
      key: "userPaymentName",
    },
    {
      title: "Số Tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${amount} VND`,
    },
    {
      title: "Loại hóa đơn",
      dataIndex: "billType",
      key: "billType",
      render: (billType) => {
        const statusMap = {
          water: { color: "blue", text: "Hóa đơn nước" },
          monthPaid: { color: "green", text: "Hóa đơn thuê nhà" },
        };
        const statusInfo = statusMap[billType] || {
          color: "default",
          text: billType,
        };
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
      },
    },
    {
      title: "Ngày Thanh Toán",
      dataIndex: "paymentDate",
      key: "paymentDate",
    },
    // {
    //   title: "Hành Động",
    //   key: "actions",
    //   render: (_, record) => (
    //     <Space>
    //       <Button
    //         icon={<DeleteOutlined />}
    //         danger
    //         onClick={() => handleDelete(record.payment_id)}
    //       >
    //         Xóa
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <Card
      title={
        <Space>
          <DeleteOutlined />
          <span>Danh sách thanh toán</span>
        </Space>
      }
      activeTabKey={activeTab}
      onTabChange={(key) => setActiveTab(key)}
    >
      {payments.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          Không có thanh toán nào
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={payments}
          rowKey="billId"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "Không có thanh toán nào" }}
        />
      )}
    </Card>
  );
};

export default PaymentManagement;
