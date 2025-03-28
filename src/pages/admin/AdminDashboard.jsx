import React from 'react';
import { Card, Row, Col, Statistic, Table, Space } from 'antd';
import {
  UserOutlined,
  SafetyOutlined,
  ClockCircleOutlined,
  ApartmentOutlined,
  FileDoneOutlined,
  DashboardOutlined
} from "@ant-design/icons";

const AdminDashboard = () => {
  // Dashboard Statistics
  const dashboardStats = {
    totalRevenue: 987654321,
    newDeposits: 12,
    pendingTransactions: 5,
    activeApartments: 45,
    completedTransactions: 23,
    totalUsers: 256
  };

  return (
    <Card 
      title={
        <Space>
          <DashboardOutlined /> 
          <span>Bảng điều khiển</span>
        </Space>
      }
    >
      <Row gutter={[16, 16]}>
        {/* Tổng doanh thu */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card hoverable>
            <Statistic
              title="Tổng doanh thu"
              value={dashboardStats.totalRevenue}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix="VNĐ"
              suffix=""
            />
          </Card>
        </Col>

        {/* Giao dịch đặt cọc mới */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card hoverable>
            <Statistic
              title="Đặt cọc mới"
              value={dashboardStats.newDeposits}
              valueStyle={{ color: '#1890ff' }}
              suffix="giao dịch"
              prefix={<SafetyOutlined />}
            />
          </Card>
        </Col>

        {/* Giao dịch chờ xử lý */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card hoverable>
            <Statistic
              title="Giao dịch chờ"
              value={dashboardStats.pendingTransactions}
              valueStyle={{ color: '#faad14' }}
              suffix="giao dịch"
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>

        {/* Căn hộ đang hoạt động */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card hoverable>
            <Statistic
              title="Căn hộ hoạt động"
              value={dashboardStats.activeApartments}
              valueStyle={{ color: '#52c41a' }}
              suffix="căn hộ"
              prefix={<ApartmentOutlined />}
            />
          </Card>
        </Col>

        {/* Giao dịch hoàn thành */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card hoverable>
            <Statistic
              title="Giao dịch hoàn thành"
              value={dashboardStats.completedTransactions}
              valueStyle={{ color: '#1890ff' }}
              suffix="giao dịch"
              prefix={<FileDoneOutlined />}
            />
          </Card>
        </Col>

        {/* Tổng người dùng */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card hoverable>
            <Statistic
              title="Người dùng"
              value={dashboardStats.totalUsers}
              valueStyle={{ color: '#722ed1' }}
              suffix="tài khoản"
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        {/* Hoạt động gần đây */}
        <Col span={24}>
          <Card title="Hoạt động gần đây">
            <Table 
              columns={[
                { title: 'Loại', dataIndex: 'type', key: 'type' },
                { title: 'Chi tiết', dataIndex: 'details', key: 'details' },
                { title: 'Thời gian', dataIndex: 'time', key: 'time' }
              ]}
              dataSource={[
                { key: '1', type: 'Đặt cọc', details: 'Căn hộ A1202', time: '2 phút trước' },
                { key: '2', type: 'Tạo tài khoản', details: 'Huỳnh Lê Phương Nam', time: '15 phút trước' },
                { key: '3', type: 'Thanh toán', details: 'Hóa đơn dịch vụ', time: '1 giờ trước' }
              ]}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default AdminDashboard;