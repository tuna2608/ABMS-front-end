import React, { useState } from "react";
import { 
  Card, 
  Space, 
  Input, 
  Select, 
  Table, 
  Row, 
  Col, 
  Statistic,
  Tag,
  Button,
  Badge
} from "antd";
import { 
  SafetyOutlined, 
  EyeOutlined,
  SearchOutlined, 
  FilterOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined 
} from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;

// Sample data for deposits
const depositSampleData = [
  {
    id: "DEP-2025032301",
    apartmentId: "VIN-A1202",
    apartmentName: "Căn hộ 2PN Vinhomes Central Park A1202",
    owner: "Nguyễn Văn An",
    ownerPhone: "0901234567",
    tenant: "Trần Thị Bình",
    tenantPhone: "0987654321",
    amount: 25000000,
    status: "pending",
    type: "rental",
    createdAt: "2025-03-20T09:30:00Z",
    transactionDate: null,
    dueDate: "2025-04-20T09:30:00Z",
    notes: "Đặt cọc thuê căn hộ 6 tháng, dọn vào ngày 01/05/2025"
  }
];

const DepositManagement = ({ onViewDepositDetail }) => {
  const [depositFilterStatus, setDepositFilterStatus] = useState("all");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + " VNĐ";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const renderDepositStatus = (status) => {
    switch (status) {
      case 'pending':
        return <Badge status="processing" text={<Tag color="blue">Chờ xác nhận</Tag>} />;
      case 'confirmed':
        return <Badge status="warning" text={<Tag color="orange">Đã xác nhận</Tag>} />;
      case 'completed':
        return <Badge status="success" text={<Tag color="green">Hoàn thành</Tag>} />;
      case 'cancelled':
        return <Badge status="error" text={<Tag color="red">Đã hủy</Tag>} />;
      default:
        return <Badge status="default" text={<Tag>Chưa xác định</Tag>} />;
    }
  };

  const renderDepositType = (type) => {
    switch (type) {
      case 'rental':
        return <Tag color="purple">Cho thuê</Tag>;
      case 'purchase':
        return <Tag color="geekblue">Mua bán</Tag>;
      default:
        return <Tag>Khác</Tag>;
    }
  };

  const depositColumns = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'id',
      key: 'id',
      width: 150,
    },
    {
      title: 'Căn hộ',
      dataIndex: 'apartmentName',
      key: 'apartmentName',
      ellipsis: true,
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (type) => renderDepositType(type),
      width: 100,
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => formatCurrency(amount),
      width: 150,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderDepositStatus(status),
      width: 150,
      filters: [
        { text: 'Chờ xác nhận', value: 'pending' },
        { text: 'Đã xác nhận', value: 'confirmed' },
        { text: 'Hoàn thành', value: 'completed' },
        { text: 'Đã hủy', value: 'cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => formatDate(date),
      width: 180,
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="link" 
          icon={<EyeOutlined />}
          onClick={() => onViewDepositDetail(record)}
        >
          Xem chi tiết
        </Button>
      ),
      width: 120,
      fixed: 'right',
    },
  ];

  const depositStats = {
    total: depositSampleData.length,
    pending: depositSampleData.filter(d => d.status === 'pending').length,
    confirmed: depositSampleData.filter(d => d.status === 'confirmed').length,
    completed: depositSampleData.filter(d => d.status === 'completed').length,
    cancelled: depositSampleData.filter(d => d.status === 'cancelled').length,
  };

  return (
    <Card 
      title={
        <Space>
          <SafetyOutlined /> 
          <span>Quản lý đặt cọc</span>
        </Space>
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
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5}>
          <Card onClick={() => setDepositFilterStatus('confirmed')} hoverable>
            <Statistic 
              title="Đã xác nhận" 
              value={depositStats.confirmed}
              valueStyle={{ color: '#fa8c16' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5}>
          <Card onClick={() => setDepositFilterStatus('completed')} hoverable>
            <Statistic 
              title="Hoàn thành" 
              value={depositStats.completed}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5}>
          <Card onClick={() => setDepositFilterStatus('cancelled')} hoverable>
            <Statistic 
              title="Đã hủy" 
              value={depositStats.cancelled}
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Space style={{ marginBottom: 20 }} size="large" wrap>
        <Search
          placeholder="Tìm kiếm mã giao dịch, căn hộ"
          style={{ width: 300 }}
          prefix={<SearchOutlined />}
          allowClear
        />
        
        <Space>
          <FilterOutlined />
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
        dataSource={depositSampleData}
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