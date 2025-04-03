import React, { useState} from "react";
import { Card, Space, Table, Button, Modal, Form, Input, Select, DatePicker,  Tag, message, Steps, Result, } from "antd";
import {  CreditCardOutlined, BankOutlined, QrcodeOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;
const { Step } = Steps;

// Hàm format tiền tệ
const formatCurrency = (value) => {
  // Kiểm tra nếu value không phải là số
  if (typeof value !== 'number') return '0 VND';
  
  // Format số tiền theo định dạng Việt Nam
  return new Intl.NumberFormat('vi-VN').format(value) + ' VND';
};

const PaymentView = () => {
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [selectedBill, setSelectedBill] = useState(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [setIsPaymentComplete] = useState(false);
  const [paymentStep, setPaymentStep] = useState(0);
  const [form] = Form.useForm();

  // Mock data for payment history
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      billId: 2,
      apartmentName: "Căn hộ 2PN Vinhomes Central Park",
      billContent: "Hóa đơn tháng 2",
      amount: 950000,
      status: "paid",
      paymentDate: "2024-02-15",
      paymentMethod: "bank",
    },
    {
      id: 2,
      billId: 3,
      apartmentName: "Căn hộ 2PN Vinhomes Central Park",
      billContent: "Hóa đơn tháng 3",
      amount: 980000,
      status: "pending",
      paymentDate: null,
      paymentMethod: null,
    },
    {
      id: 3,
      billId: 4,
      apartmentName: "Căn hộ 2PN Vinhomes Central Park",
      billContent: "Hóa đơn dịch vụ",
      amount: 500000,
      status: "overdue",
      paymentDate: null,
      paymentMethod: null,
    }
  ]);

  // Payment history columns configuration
  const paymentColumns = [
    {
      title: "Căn hộ",
      dataIndex: "apartmentName",
      key: "apartmentName",
    },
    {
      title: "Nội dung hóa đơn",
      dataIndex: "billContent",
      key: "billContent",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => formatCurrency(amount),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusMap = {
          paid: { color: "green", text: "Đã thanh toán" },
          pending: { color: "orange", text: "Chờ thanh toán" },
          overdue: { color: "red", text: "Quá hạn" },
        };
        const statusInfo = statusMap[status] || { color: "default", text: status };
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
      },
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (date) => date ? moment(date).format("DD/MM/YYYY") : "Chưa thanh toán",
    },
    {
      title: "Phương thức",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) => {
        const methodMap = {
          bank: { icon: <BankOutlined />, text: "Chuyển khoản ngân hàng" },
          credit: { icon: <CreditCardOutlined />, text: "Thẻ tín dụng" },
          qr: { icon: <QrcodeOutlined />, text: "Mã QR" },
        };
        const methodInfo = methodMap[method] || { icon: null, text: "Chưa chọn" };
        return method ? (
          <Space>
            {methodInfo.icon}
            {methodInfo.text}
          </Space>
        ) : "Chưa chọn";
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Button 
          type="primary" 
          disabled={record.status !== "pending" && record.status !== "overdue"}
          onClick={() => handlePayBill(record)}
        >
          Thanh toán
        </Button>
      ),
    },
  ];

  // Handle initiating bill payment
  const handlePayBill = (bill) => {
    setSelectedBill(bill);
    setPaymentModalVisible(true);
    setPaymentStep(0);
    setIsPaymentComplete(false);
    setIsPaymentProcessing(false);
    form.resetFields();
  };

  // Handle payment method change
  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  // Simulate payment processing
  const processPayment = () => {
    form.validateFields().then((values) => {
      setIsPaymentProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        // Update payment history
        const updatedHistory = paymentHistory.map(item => 
          item.id === selectedBill.id 
            ? {
                ...item, 
                status: "paid", 
                paymentDate: moment().format("YYYY-MM-DD"),
                paymentMethod: paymentMethod
              }
            : item
        );
        
        setPaymentHistory(updatedHistory);
        
        // Move to next step
        setPaymentStep(1);
        setIsPaymentProcessing(false);
        setIsPaymentComplete(true);
      }, 2000);
    }).catch((errorInfo) => {
      message.error("Vui lòng điền đầy đủ thông tin");
    });
  };

  // Render payment modal content based on current step
  const renderPaymentModalContent = () => {
    if (paymentStep === 0) {
      return (
        <Form form={form} layout="vertical">
          <Form.Item 
            name="cardNumber" 
            label="Số thẻ/Tài khoản"
            rules={[{ required: true, message: "Vui lòng nhập số thẻ/tài khoản" }]}
          >
            <Input placeholder="Nhập số thẻ hoặc số tài khoản" />
          </Form.Item>
          
          <Form.Item 
            name="paymentMethod" 
            label="Phương thức thanh toán"
            initialValue="bank"
          >
            <Select onChange={handlePaymentMethodChange}>
              <Option value="bank">
                <Space>
                  <BankOutlined /> Chuyển khoản ngân hàng
                </Space>
              </Option>
              <Option value="credit">
                <Space>
                  <CreditCardOutlined /> Thẻ tín dụng
                </Space>
              </Option>
              <Option value="qr">
                <Space>
                  <QrcodeOutlined /> Mã QR
                </Space>
              </Option>
            </Select>
          </Form.Item>
          
          {paymentMethod === "credit" && (
            <>
              <Form.Item 
                name="cardName" 
                label="Tên chủ thẻ"
                rules={[{ required: true, message: "Vui lòng nhập tên chủ thẻ" }]}
              >
                <Input placeholder="Nhập tên chủ thẻ" />
              </Form.Item>
              <Form.Item 
                name="expiryDate" 
                label="Ngày hết hạn"
                rules={[{ required: true, message: "Vui lòng nhập ngày hết hạn" }]}
              >
                <DatePicker 
                  placeholder="Chọn ngày hết hạn" 
                  format="MM/YYYY" 
                  picker="month" 
                />
              </Form.Item>
            </>
          )}
        </Form>
      );
    }
    
    // Payment success step
    return (
      <Result
        status="success"
        title="Thanh toán thành công"
        subTitle={`Bạn đã thanh toán ${formatCurrency(selectedBill.amount)} cho ${selectedBill.billContent}`}
        extra={[
          <Button 
            type="primary" 
            key="close"
            onClick={() => setPaymentModalVisible(false)}
          >
            Đóng
          </Button>
        ]}
      />
    );
  };

  return (
    <div>
      <Card title="Lịch sử thanh toán">
        <Table 
          dataSource={paymentHistory} 
          columns={paymentColumns}
          rowKey="id"
        />
      </Card>

      <Modal
        title="Thanh toán hóa đơn"
        open={paymentModalVisible}
        onCancel={() => setPaymentModalVisible(false)}
        footer={
          paymentStep === 0 ? [
            <Button key="cancel" onClick={() => setPaymentModalVisible(false)}>
              Hủy
            </Button>,
            <Button 
              key="submit" 
              type="primary" 
              loading={isPaymentProcessing}
              onClick={processPayment}
            >
              Xác nhận thanh toán
            </Button>
          ] : null
        }
      >
        <Steps current={paymentStep}>
          <Step title="Nhập thông tin" />
          <Step title="Hoàn tất" />
        </Steps>

        <div style={{ marginTop: 20 }}>
          {renderPaymentModalContent()}
        </div>
      </Modal>
    </div>
  );
};

export default PaymentView;