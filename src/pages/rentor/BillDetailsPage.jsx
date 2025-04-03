import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Tag, Typography, Divider, Space } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const { Title } = Typography;

const BillDetailsPage = ({ consumptionId }) => {
  const [consumptionData, setConsumptionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data fetch - replace with actual API call
    const fetchConsumptionData = async () => {
      try {
        // Mock data based on your database screenshot
        // In production, this would be replaced with an API call
        const mockData = {
          consumption_id: 5,
          consumption_date: '2025-03-01',
          is_bill_created: 1,
          last_month_water_consumption: 54,
          upload_consumption_user_id: 5,
          water_consumption: 55.9,
          apartment_id: 5
        };

        setConsumptionData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching consumption data:', error);
        setLoading(false);
      }
    };

    fetchConsumptionData();
  }, [consumptionId]);

  const getBillStatus = (isBillCreated) => {
    return isBillCreated === 1 ? 'Đã tạo hóa đơn' : 'Chưa tạo hóa đơn';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Chưa tạo hóa đơn':
        return 'orange';
      case 'Đã tạo hóa đơn':
        return 'blue';
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
            Chi Tiết Hóa Đơn - {consumptionData.consumption_id}
          </Title>
        </Space>
      }
    >
      <Descriptions 
        bordered 
        column={2} 
        size="small"
      >
        <Descriptions.Item label="Mã Tiêu Thụ">
          {consumptionData.consumption_id}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày Ghi Nhận">
          {consumptionData.consumption_date}
        </Descriptions.Item>
        <Descriptions.Item label="Mã Căn Hộ">
          {consumptionData.apartment_id}
        </Descriptions.Item>
        <Descriptions.Item label="Người Tạo">
          {consumptionData.upload_consumption_user_id}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Chi Tiết Tiêu Thụ Nước</Divider>
      
      <Descriptions 
        bordered 
        column={2} 
        size="small"
      >
        <Descriptions.Item label="Chỉ Số Tháng Trước">
          {consumptionData.last_month_water_consumption} m³
        </Descriptions.Item>
        <Descriptions.Item label="Chỉ Số Tháng Này">
          {consumptionData.water_consumption} m³
        </Descriptions.Item>
        <Descriptions.Item label="Lượng Nước Tiêu Thụ">
          {(consumptionData.water_consumption - consumptionData.last_month_water_consumption).toFixed(1)} m³
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Trạng Thái</Divider>

      <Descriptions 
        bordered 
        column={1} 
        size="small"
      >
        <Descriptions.Item label="Trạng Thái Hóa Đơn">
          <Tag color={getStatusColor(getBillStatus(consumptionData.is_bill_created))}>
            {getBillStatus(consumptionData.is_bill_created)}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default BillDetailsPage;