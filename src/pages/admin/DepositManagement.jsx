import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Table, Space, Button, Input, Select } from 'antd';
import { SafetyOutlined, SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const DepositManagement = () => {
  const [depositFilterStatus, setDepositFilterStatus] = useState("all");

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + " VNĐ";
  };

  // Deposit statistics
  const depositStats = {
    total: 3,
    pending: 1,
    confirmed: 1,
    completed: 1,
    cancelled: 0,
    totalAmount: 418200000,
  };

  // Sample data for deposits
  const depositSampleData = [
    // Add your deposit data here
  ];

  // Filter deposits by status
  const filteredDeposits = depositFilterStatus === 'all' 
    ? depositSampleData 
    : depositSampleData.filter(item => item.status === depositFilterStatus);

  // Deposit columns definition
  const depositColumns = [
    // Add your deposit column definitions here
  ];

  return (
    <Card 
      title={
        <Space>
          <SafetyOutlined /> 
          <span>Quản lý đặt cọc</span>
        </Space>
      } 
      extra={
        <Button 
        type="primary" 
        onClick={() => {}}
        >
          Tạo giao dịch đặt cọc mới
        </Button>
      }
    >
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card onClick={() => setDepositFilterStatus('all')} hoverable>
            <Statistic 
              title="Tổng số" 
              value={depositStats.total} 
              valueStyle={{ color: '#1890ff' }}
              suffix="giao dịch"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5}>
          <Card onClick={() => setDepositFilterStatus('pending')} hoverable>
            <Statistic 
              title="Chờ xác nhận" 
              value={depositStats.pending}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5}>
          <Card onClick={() => setDepositFilterStatus('confirmed')} hoverable>
            <Statistic 
              title="Đã xác nhận" 
              value={depositStats.confirmed}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5}>
          <Card onClick={() => setDepositFilterStatus('completed')} hoverable>
            <Statistic 
              title="Hoàn thành" 
              value={depositStats.completed}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5}>
          <Card onClick={() => setDepositFilterStatus('cancelled')} hoverable>
            <Statistic 
              title="Đã hủy" 
              value={depositStats.cancelled}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col span={24}>
          <Card>
            <Statistic 
              title="Tổng giá trị giao dịch" 
              value={formatCurrency(depositStats.totalAmount)}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      <Space style={{ marginBottom: 20 }} size="large" wrap>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm kiếm mã giao dịch, căn hộ"
          style={{ width: 300 }}
          allowClear
        />
        
        <Space>
          <Select 
            value={depositFilterStatus} 
            style={{ width: 150 }}
            onChange={setDepositFilterStatus}
          >
            <Option value="all">Tất cả trạng thái</Option>
            <Option value="pending">Chờ xác nhận</Option>
            <Option value="confirmed">Đã xác nhận</Option>
            <Option value="completed">Hoàn thành</Option>
            <Option value="cancelled">Đã hủy</Option>
          </Select>
        </Space>
      </Space>

      <Table 
        columns={depositColumns} 
        dataSource={filteredDeposits}
        rowKey="id"
        pagination={{ 
          pageSize: 5,
          showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} giao dịch` 
        }}
        scroll={{ x: 1100 }}
      />
    </Card>
  );
};

export default DepositManagement;