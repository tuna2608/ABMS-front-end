import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Tag, Button, Typography, Divider, Space } from 'antd';
import { FileTextOutlined, PrinterOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Function to format currency without using toLocaleString
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount) + ' VND';
};

const BillDetailsPage = ({ billId }) => {
  const [billDetails, setBillDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data fetch - replace with actual API call
    const fetchBillDetails = async () => {
      try {
        // This would typically be an API call to fetch bill details
        const mockBillDetails = {
          bill_id: billId,
          bill_content: 'Hóa đơn tiền nhà tháng 4/2025',
          bill_date: '2025-04-01',
          create_bill_us: 'Hệ thống tự động',
          management_fee: 500000,
          monthly_paid: 5000000,
          others: 200000,
          status: 'Chưa thanh toán',
          total: 5700000,
          water_bill: 150000,
          apartment_id: 'A101',
          consumption_id: 'CONS2504',
          payment_id: null,
          user_id: 'USER123'
        };

        setBillDetails(mockBillDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bill details:', error);
        setLoading(false);
      }
    };

    fetchBillDetails();
  }, [billId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement PDF download logic
    alert('Chức năng tải xuống đang được phát triển');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Chưa thanh toán':
        return 'red';
      case 'Đã thanh toán':
        return 'green';
      default:
        return 'default';
    }
  };

  if (loading) {
    return <Card loading={true}>Đang tải thông tin hóa đơn...</Card>;
  }

  return (
    <Card 
      title={
        <Space>
          <FileTextOutlined />
          <Title level={4} style={{ margin: 0 }}>
            Chi Tiết Hóa Đơn - {billDetails.bill_id}
          </Title>
        </Space>
      }
      extra={
        <Space>
          <Button 
            icon={<PrinterOutlined />} 
            onClick={handlePrint}
          >
            In hóa đơn
          </Button>
          <Button 
            icon={<DownloadOutlined />} 
            onClick={handleDownload}
          >
            Tải xuống
          </Button>
        </Space>
      }
    >
      <Descriptions 
        bordered 
        column={2} 
        size="small"
      >
        <Descriptions.Item label="Mã Hóa Đơn">
          {billDetails.bill_id}
        </Descriptions.Item>
        <Descriptions.Item label="Nội Dung">
          {billDetails.bill_content}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày Tạo">
          {billDetails.bill_date}
        </Descriptions.Item>
        <Descriptions.Item label="Người Tạo">
          {billDetails.create_bill_us}
        </Descriptions.Item>
        <Descriptions.Item label="Mã Căn Hộ">
          {billDetails.apartment_id}
        </Descriptions.Item>
        <Descriptions.Item label="Mã Người Dùng">
          {billDetails.user_id}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Chi Tiết Thanh Toán</Divider>

      <Descriptions 
        bordered 
        column={2} 
        size="small"
      >
        <Descriptions.Item label="Tiền Thuê Nhà">
          {formatCurrency(billDetails.monthly_paid)}
        </Descriptions.Item>
        <Descriptions.Item label="Phí Quản Lý">
          {formatCurrency(billDetails.management_fee)}
        </Descriptions.Item>
        <Descriptions.Item label="Tiền Nước">
          {formatCurrency(billDetails.water_bill)}
        </Descriptions.Item>
        <Descriptions.Item label="Các Khoản Khác">
          {formatCurrency(billDetails.others)}
        </Descriptions.Item>
        <Descriptions.Item label="Tổng Cộng" span={2}>
          <Text strong style={{ color: 'red', fontSize: '1.2em' }}>
            {formatCurrency(billDetails.total)}
          </Text>
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Trạng Thái</Divider>

      <Descriptions 
        bordered 
        column={1} 
        size="small"
      >
        <Descriptions.Item label="Trạng Thái Thanh Toán">
          <Tag color={getStatusColor(billDetails.status)}>
            {billDetails.status}
          </Tag>
        </Descriptions.Item>
        {billDetails.payment_id && (
          <Descriptions.Item label="Mã Thanh Toán">
            {billDetails.payment_id}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Mã Tiêu Thụ">
          {billDetails.consumption_id}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default BillDetailsPage;