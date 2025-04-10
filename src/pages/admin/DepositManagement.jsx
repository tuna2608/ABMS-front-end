import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Table, Space, Button, Input, Select, Tag } from 'antd';
import { SafetyOutlined, SearchOutlined } from "@ant-design/icons";
import { getAllDeposits } from './../../redux/apiCalls'; 

const { Option } = Select;

const DepositManagement = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [depositFilterStatus, setDepositFilterStatus] = useState("all");
  const [searchText, setSearchText] = useState("");

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + " VNĐ";
  };

  // Fetch deposits
  useEffect(() => {
    const fetchDeposits = async () => {
      const result = await getAllDeposits();
      if (result.success) {
        setDeposits(result.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchDeposits();
  }, []);

  // Calculate deposit statistics
  const depositStats = {
    total: deposits.length,
    ongoing: deposits.filter(d => d.status === 'ongoing').length,
    done: deposits.filter(d => d.status === 'done').length,
    none: deposits.filter(d => d.status === 'none').length,
    totalAmount: deposits.reduce((sum, deposit) => sum + deposit.depositPrice, 0)
  };

  // Filter deposits
  const filteredDeposits = deposits.filter(item => 
    (depositFilterStatus === 'all' || item.status === depositFilterStatus) &&
    (searchText === '' || 
     item.depositId.toString().includes(searchText) || 
     item.apartmentName.toLowerCase().includes(searchText.toLowerCase()) ||
     item.postOwnerName.toLowerCase().includes(searchText.toLowerCase()) ||
     item.depositUserName.toLowerCase().includes(searchText.toLowerCase()))
  );

  // Status color mapping
  const getStatusColor = (status) => {
    switch(status) {
      case 'done': return 'success';
      case 'ongoing': return 'processing';
      case 'none': return 'default';
      default: return 'default';
    }
  };

  // Deposit columns definition
  const depositColumns = [
    {
      title: 'Mã Đặt Cọc',
      dataIndex: 'depositId',
      key: 'depositId',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === 'done' ? 'Hoàn Thành' : 
           status === 'ongoing' ? 'Đang Đặt Cọc' : 
           status === 'none' ? 'Chưa Đặt Cọc' : status}
        </Tag>
      )
    },
    {
      title: 'Chủ Bài Đăng',
      dataIndex: 'postOwnerName',
      key: 'postOwnerName',
    },
    {
      title: 'Người Đặt Cọc',
      dataIndex: 'depositUserName',
      key: 'depositUserName',
    },
    {
      title: 'Căn Hộ',
      dataIndex: 'apartmentName',
      key: 'apartmentName',
    },
    {
      title: 'Mã Thanh Toán',
      dataIndex: 'paymentId',
      key: 'paymentId',
    },
    {
      title: 'Ngày Thanh Toán',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (date) => new Date(date).toLocaleString('vi-VN')
    },
    {
      title: 'Thông Tin Thanh Toán',
      dataIndex: 'paymentInfo',
      key: 'paymentInfo',
    }
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
      {/* Phần còn lại của component giữ nguyên như cũ */}
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
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card onClick={() => setDepositFilterStatus('ongoing')} hoverable>
            <Statistic 
              title="Đang Đặt Cọc" 
              value={depositStats.ongoing}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card onClick={() => setDepositFilterStatus('done')} hoverable>
            <Statistic 
              title="Hoàn Thành" 
              value={depositStats.done}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card onClick={() => setDepositFilterStatus('none')} hoverable>
            <Statistic 
              title="Chưa Đặt Cọc" 
              value={depositStats.none}
              valueStyle={{ color: '#d9d9d9' }}
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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        
        <Space>
          <Select 
            value={depositFilterStatus} 
            style={{ width: 150 }}
            onChange={setDepositFilterStatus}
          >
            <Option value="all">Tất cả trạng thái</Option>
            <Option value="ongoing">Đang Đặt Cọc</Option>
            <Option value="done">Hoàn Thành</Option>
            <Option value="none">Chưa Đặt Cọc</Option>
          </Select>
        </Space>
      </Space>

      <Table 
        columns={depositColumns} 
        dataSource={filteredDeposits}
        loading={loading}
        rowKey="depositId"
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