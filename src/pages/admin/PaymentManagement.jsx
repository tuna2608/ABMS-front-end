import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, message } from 'antd';
import { 
  DeleteOutlined 
} from '@ant-design/icons';

// Sample payment data based on database schema
const initialPaymentData = [
  {
    payment_id: 1,
    payment_check: 'CHK001',
    payment_date: '2024-04-10',
    payment_info: 'Thanh toán tiền thuê tháng 4',
    payment_type: 'Chuyển khoản',
    price: 5000000,
    user_id: 'U001'
  }
];

const PaymentManagement = () => {
  const [activeTab, setActiveTab] = useState('paymentList');
  const [payments, setPayments] = useState(initialPaymentData);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Delete payment handler
  const handleDelete = (paymentId) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa khoản thanh toán này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        const updatedPayments = payments.filter(payment => payment.payment_id !== paymentId);
        setPayments(updatedPayments);
        message.success('Đã xóa khoản thanh toán');
      }
    });
  };

  // Columns configuration
  const columns = [
    {
      title: 'Mã Thanh Toán',
      dataIndex: 'payment_id',
      key: 'payment_id',
    },
    {
      title: 'Mã Kiểm Tra',
      dataIndex: 'payment_check',
      key: 'payment_check',
    },
    {
      title: 'Người Dùng',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'Số Tiền',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price.toLocaleString()} VND`
    },
    {
      title: 'Loại Thanh Toán',
      dataIndex: 'payment_type',
      key: 'payment_type',
    },
    {
      title: 'Ngày Thanh Toán',
      dataIndex: 'payment_date',
      key: 'payment_date',
    },
    {
      title: 'Hành Động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<DeleteOutlined />} 
            danger
            onClick={() => handleDelete(record.payment_id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
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
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Không có thanh toán nào
        </div>
      ) : (
        <Table 
          columns={columns} 
          dataSource={payments}
          rowKey="payment_id"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: 'Không có thanh toán nào' }}
        />
      )}
    </Card>
  );
};

export default PaymentManagement;