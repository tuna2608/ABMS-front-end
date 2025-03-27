import React from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Row, 
  Col, 
  Statistic,
  Typography 
} from 'antd';
import { 
  DollarOutlined, 
  PieChartOutlined, 
  BarChartOutlined 
} from '@ant-design/icons';

const { Title } = Typography;

const FinancialReports = () => {
  const columns = [
    {
      title: 'Kỳ Báo Cáo',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: 'Tổng Thu',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
    },
    {
      title: 'Tổng Chi',
      dataIndex: 'totalExpenses',
      key: 'totalExpenses',
    },
    {
      title: 'Lợi Nhuận',
      dataIndex: 'profit',
      key: 'profit',
    },
    {
      title: 'Hành Động',
      key: 'actions',
      render: () => (
        <Button type="primary" ghost>
          Xem Chi Tiết
        </Button>
      )
    }
  ];

  return (
    <Card 
      title={
        <Space>
          <DollarOutlined />
          <span>Báo Cáo Tài Chính</span>
        </Space>
      }
      extra={
        <Space>
          <Button icon={<PieChartOutlined />}>Biểu Đồ</Button>
          <Button icon={<BarChartOutlined />}>Phân Tích</Button>
        </Space>
      }
    >
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Statistic 
            title="Tổng Doanh Thu" 
            value={1234567} 
            prefix="₫" 
            precision={0} 
          />
        </Col>
        <Col span={8}>
          <Statistic 
            title="Tổng Chi Phí" 
            value={876543} 
            prefix="₫" 
            precision={0} 
          />
        </Col>
        <Col span={8}>
          <Statistic 
            title="Lợi Nhuận Ròng" 
            value={358024} 
            prefix="₫" 
            precision={0}
            valueStyle={{ color: '#3f8600' }}
          />
        </Col>
      </Row>

      <Title level={4}>Chi Tiết Báo Cáo</Title>
      <Table 
        columns={columns} 
        dataSource={[]} 
        pagination={{ 
          total: 50, 
          showSizeChanger: true,
          showQuickJumper: true 
        }}
      />
    </Card>
  );
};

export default FinancialReports;