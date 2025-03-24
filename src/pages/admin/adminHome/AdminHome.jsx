import React, { useState } from "react";
import {
  UserOutlined,
  HomeOutlined,
  FileAddOutlined,
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  BellOutlined,
  UserAddOutlined,
  SafetyOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
  ClockCircleOutlined,
  ApartmentOutlined,
  FileDoneOutlined
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Form,
  Input,
  Button,
  Table,
  Space,
  Row,
  Col,
  // Badge,
  Tag,
  Select,
  Statistic,
  Card,
  Tabs,
  Switch,
} from "antd";

const { Sider, Content, Header } = Layout;
const { SubMenu } = Menu;
const { TextArea } = Input;
const { Option } = Select;

const AdminHome = () => {
  // State for sidebar collapse
  const [collapsed, setCollapsed] = useState(false);
  // State for active tab
  const [activeTab, setActiveTab] = useState("dashboard");
  // State for deposit detail modal visibility
  // const [ setIsDepositDetailVisible] = useState(false);
  // State for selected deposit
  // const [ setSelectedDeposit] = useState(null);
  // State for deposit approval modal
  // const [ setIsDepositApprovalVisible] = useState(false);
  // State for new deposit modal
  const [ setIsNewDepositVisible] = useState(false);
  // Form for deposit creation
  const [depositForm] = Form.useForm();
  // State for filter status
  const [depositFilterStatus, setDepositFilterStatus] = useState("all");

  // Dashboard Statistics
  const dashboardStats = {
    totalRevenue: 987654321,
    newDeposits: 12,
    pendingTransactions: 5,
    activeApartments: 45,
    completedTransactions: 23,
    totalUsers: 256
  };

  // Toggle sidebar collapse
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // View deposit details
  // const viewDepositDetail = (deposit) => {
  //   setSelectedDeposit(deposit);
  //   setIsDepositDetailVisible(true);
  // };

  // Handle deposit modal close
  // const handleDepositDetailClose = () => {
  //   setIsDepositDetailVisible(false);
  // };

  // Show deposit approval modal
  // const showDepositApprovalModal = (deposit) => {
  //   setSelectedDeposit(deposit);
  //   setIsDepositApprovalVisible(true);
  // };

  // Handle deposit approval modal close
  // const handleDepositApprovalClose = () => {
  //   setIsDepositApprovalVisible(false);
  // };

  // Show new deposit modal
  const showNewDepositModal = () => {
    setIsNewDepositVisible(true);
    depositForm.resetFields();
  };

  // Handle new deposit modal close
  // const handleNewDepositClose = () => {
  //   setIsNewDepositVisible(false);
  // };

  // Handle deposit confirmation
  // const confirmDeposit = () => {
  //   // Logic for confirming deposit
  //   handleDepositApprovalClose();
  // };

  // Handle deposit rejection
  // const rejectDeposit = () => {
  //   // Logic for rejecting deposit
  //   handleDepositApprovalClose();
  // };

  // Handle deposit completion
  // const completeDeposit = () => {
  //   // Logic for completing deposit
  //   handleDepositDetailClose();
  // };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + " VNĐ";
  };

  // Format date
  // const formatDate = (dateString) => {
  //   if (!dateString) return "N/A";
  //   const date = new Date(dateString);
  //   return new Intl.DateTimeFormat('vi-VN', {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   }).format(date);
  // };

  // Render deposit status
  // const renderDepositStatus = (status) => {
  //   switch (status) {
  //     case 'pending':
  //       return <Badge status="processing" text={<Tag color="blue">Chờ xác nhận</Tag>} />;
  //     case 'confirmed':
  //       return <Badge status="warning" text={<Tag color="orange">Đã xác nhận</Tag>} />;
  //     case 'completed':
  //       return <Badge status="success" text={<Tag color="green">Hoàn thành</Tag>} />;
  //     case 'cancelled':
  //       return <Badge status="error" text={<Tag color="red">Đã hủy</Tag>} />;
  //     default:
  //       return <Badge status="default" text={<Tag>Chưa xác định</Tag>} />;
  //   }
  // };

  // Render deposit type
  // const renderDepositType = (type) => {
  //   switch (type) {
  //     case 'rental':
  //       return <Tag color="purple">Cho thuê</Tag>;
  //     case 'purchase':
  //       return <Tag color="geekblue">Mua bán</Tag>;
  //     default:
  //       return <Tag>Khác</Tag>;
  //   }
  // };

  // Menu items
  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Bảng điều khiển"
    },
    {
      key: "deposits",
      icon: <SafetyOutlined />,
      label: "Quản lý đặt cọc"
    },
    {
      key: "accounts",
      icon: <UserOutlined />,
      label: "Quản lý tài khoản",
      children: [
        {
          key: "accountsList",
          label: "Danh sách tài khoản"
        },
        {
          key: "pendingAccounts",
          label: "Duyệt tài khoản"
        }
      ]
    },
    {
      key: "apartments",
      icon: <HomeOutlined />,
      label: "Quản lý căn hộ"
    },
    {
      key: "posts",
      icon: <BellOutlined />,
      label: "Quản lý bài viết",
      children: [
        {
          key: "postsList",
          label: "Danh sách bài viết"
        },
        {
          key: "createPost",
          icon: <FileAddOutlined />,
          label: "Tạo bài viết mới"
        }
      ]
    },
    {
      key: "reports",
      icon: <DollarOutlined />,
      label: "Báo cáo tài chính"
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt hệ thống"
    }
  ];

  // Deposit statistics
  const depositStats = {
    total: 3,
    pending: 1,
    confirmed: 1,
    completed: 1,
    cancelled: 0,
    totalAmount: 418200000,
  };

  // Column configuration for deposit table
  const depositColumns = [
    // (Previous deposit columns remain the same)
  ];

  // Sample data for deposits
  const depositSampleData = [
    // (Previous sample data remains the same)
  ];

  // Filter deposits by status
  const filteredDeposits = depositFilterStatus === 'all' 
    ? depositSampleData 
    : depositSampleData.filter(item => item.status === depositFilterStatus);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width={250}
      >
        <div style={{ height: 64, padding: 16, textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: collapsed ? 14 : 18 }}>
            {collapsed ? "QL" : "Quản Lý Admin"}
          </h2>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[activeTab]}
          defaultOpenKeys={['accounts', 'posts']}
        >
          {menuItems.map(item => {
            if (item.children) {
              return (
                <SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                >
                  {item.children.map(child => (
                    <Menu.Item key={child.key} onClick={() => setActiveTab(child.key)}>
                      {child.icon && child.icon} {child.label}
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            }
            return (
              <Menu.Item key={item.key} icon={item.icon} onClick={() => setActiveTab(item.key)}>
                {item.label}
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>

      <Layout>
        {/* Header with sidebar toggle */}
        <Header style={{ padding: 0, background: "#fff" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        </Header>
        
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff", borderRadius: 4, minHeight: 280 }}>
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
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
                        { key: '2', type: 'Tạo tài khoản', details: 'Nguyễn Văn A', time: '15 phút trước' },
                        { key: '3', type: 'Thanh toán', details: 'Hóa đơn dịch vụ', time: '1 giờ trước' }
                      ]}
                      pagination={false}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          )}

          {/* DEPOSIT MANAGEMENT */}
{activeTab === "deposits" && (
  <Card 
    title={
      <Space>
        <SafetyOutlined /> 
        <span>Quản lý đặt cọc</span>
      </Space>
    } 
    extra={
      <Button type="primary" onClick={showNewDepositModal}>
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
)}

          {/* ACCOUNTS MANAGEMENT */}
          {activeTab === "accountsList" && (
            <Card 
              title={
                <Space>
                  <UserOutlined /> 
                  <span>Danh sách tài khoản</span>
                </Space>
              }
            >
              <p>Nội dung quản lý tài khoản sẽ được cập nhật sau.</p>
            </Card>
          )}
           {/* PENDING ACCOUNTS */}
          {activeTab === "pendingAccounts" && (
            <Card 
              title={
                <Space>
                  <UserAddOutlined /> 
                  <span>Duyệt tài khoản</span>
                </Space>
              }
            >
              <p>Nội dung duyệt tài khoản sẽ được cập nhật sau.</p>
            </Card>
          )}

          {/* APARTMENTS MANAGEMENT */}
          {activeTab === "apartments" && (
            <Card 
              title={
                <Space>
                  <HomeOutlined /> 
                  <span>Quản lý căn hộ</span>
                </Space>
              } 
              extra={
                <Button type="primary">
                  Thêm căn hộ mới
                </Button>
              }
            >
              <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Statistic 
                    title="Tổng số căn hộ" 
                    value={45} 
                    prefix={<HomeOutlined />}
                  />
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Statistic 
                    title="Đang cho thuê" 
                    value={22} 
                    prefix={<SafetyOutlined />}
                  />
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Statistic 
                    title="Sẵn sàng" 
                    value={15} 
                    prefix={<CheckCircleOutlined />}
                  />
                </Col>
              </Row>

              <Table 
                columns={[
                  { 
                    title: 'Mã căn hộ', 
                    dataIndex: 'code', 
                    key: 'code' 
                  },
                  { 
                    title: 'Tên căn hộ', 
                    dataIndex: 'name', 
                    key: 'name' 
                  },
                  { 
                    title: 'Diện tích', 
                    dataIndex: 'area', 
                    key: 'area',
                    render: (area) => `${area} m²`
                  },
                  { 
                    title: 'Trạng thái', 
                    dataIndex: 'status', 
                    key: 'status',
                    render: (status) => {
                      const statusMap = {
                        'rented': <Tag color="blue">Đang cho thuê</Tag>,
                        'available': <Tag color="green">Sẵn sàng</Tag>,
                        'maintenance': <Tag color="orange">Bảo trì</Tag>
                      };
                      return statusMap[status];
                    }
                  },
                  {
                    title: 'Thao tác',
                    key: 'actions',
                    render: () => (
                      <Space>
                        <Button size="small" type="primary">Xem</Button>
                        <Button size="small">Chỉnh sửa</Button>
                      </Space>
                    )
                  }
                ]}
                dataSource={[
                  { 
                    key: '1', 
                    code: 'VIN-A1202', 
                    name: 'Căn hộ 2PN Vinhomes', 
                    area: 85, 
                    status: 'rented' 
                  },
                  { 
                    key: '2', 
                    code: 'VIN-B1506', 
                    name: 'Căn hộ 1PN Vinhomes', 
                    area: 65, 
                    status: 'available' 
                  }
                ]}
              />
            </Card>
          )}

          {/* POSTS MANAGEMENT */}
          {activeTab === "postsList" && (
            <Card 
              title={
                <Space>
                  <BellOutlined /> 
                  <span>Danh sách bài viết</span>
                </Space>
              } 
              extra={
                <Button 
                  type="primary" 
                  icon={<FileAddOutlined />}
                  onClick={() => setActiveTab("createPost")}
                >
                  Tạo bài viết mới
                </Button>
              }
            >
              <Table 
                columns={[
                  { 
                    title: 'Tiêu đề', 
                    dataIndex: 'title', 
                    key: 'title' 
                  },
                  { 
                    title: 'Tác giả', 
                    dataIndex: 'author', 
                    key: 'author' 
                  },
                  { 
                    title: 'Ngày tạo', 
                    dataIndex: 'createdAt', 
                    key: 'createdAt' 
                  },
                  { 
                    title: 'Trạng thái', 
                    dataIndex: 'status', 
                    key: 'status',
                    render: (status) => {
                      const statusMap = {
                        'draft': <Tag color="orange">Bản nháp</Tag>,
                        'published': <Tag color="green">Đã xuất bản</Tag>
                      };
                      return statusMap[status];
                    }
                  },
                  {
                    title: 'Thao tác',
                    key: 'actions',
                    render: () => (
                      <Space>
                        <Button size="small" type="primary">Xem</Button>
                        <Button size="small">Chỉnh sửa</Button>
                      </Space>
                    )
                  }
                ]}
                dataSource={[
                  { 
                    key: '1', 
                    title: 'Hướng dẫn thuê căn hộ', 
                    author: 'Admin', 
                    createdAt: '2025-03-20',
                    status: 'published' 
                  },
                  { 
                    key: '2', 
                    title: 'Thị trường bất động sản 2025', 
                    author: 'Quản trị viên', 
                    createdAt: '2025-03-15',
                    status: 'draft' 
                  }
                ]}
              />
            </Card>
          )}

          {/* CREATE NEW POST */}
          {activeTab === "createPost" && (
            <Card 
              title={
                <Space>
                  <FileAddOutlined /> 
                  <span>Tạo bài viết mới</span>
                </Space>
              }
            >
              <Form layout="vertical">
                <Form.Item label="Tiêu đề bài viết">
                  <Input placeholder="Nhập tiêu đề bài viết" />
                </Form.Item>
                
                <Form.Item label="Nội dung">
                  <TextArea rows={10} placeholder="Nhập nội dung bài viết" />
                </Form.Item>
                
                <Form.Item label="Danh mục">
                  <Select placeholder="Chọn danh mục">
                    <Option value="news">Tin tức</Option>
                    <Option value="guide">Hướng dẫn</Option>
                    <Option value="market">Thị trường</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item>
                  <Space>
                    <Button type="primary">Lưu bản nháp</Button>
                    <Button type="default">Xuất bản</Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          )}
          {/* FINANCIAL REPORTS */}
          {activeTab === "reports" && (
            <Card 
              title={
                <Space>
                  <DollarOutlined /> 
                  <span>Báo cáo tài chính</span>
                </Space>
              }
            >
              <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Card>
                    <Statistic 
                      title="Tổng doanh thu" 
                      value={987654321} 
                      precision={0}
                      prefix="VNĐ"
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Card>
                    <Statistic 
                      title="Doanh thu tháng" 
                      value={82543210} 
                      precision={0}
                      prefix="VNĐ"
                      valueStyle={{ color: '#1890ff' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Card>
                    <Statistic 
                      title="Chi phí hoạt động" 
                      value={45236789} 
                      precision={0}
                      prefix="VNĐ"
                      valueStyle={{ color: '#ff4d4f' }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Card>
                    <Statistic 
                      title="Lợi nhuận ròng" 
                      value={37306521} 
                      precision={0}
                      prefix="VNĐ"
                      valueStyle={{ color: '#52c41a' }}
                    />
                  </Card>
                </Col>
              </Row>

              <Card title="Chi tiết báo cáo">
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="Báo cáo doanh thu" key="1">
                    <Table 
                      columns={[
                        { 
                          title: 'Tháng', 
                          dataIndex: 'month', 
                          key: 'month' 
                        },
                        { 
                          title: 'Doanh thu', 
                          dataIndex: 'revenue', 
                          key: 'revenue',
                          render: (value) => formatCurrency(value)
                        },
                        { 
                          title: 'Chi phí', 
                          dataIndex: 'expenses', 
                          key: 'expenses',
                          render: (value) => formatCurrency(value)
                        },
                        { 
                          title: 'Lợi nhuận', 
                          dataIndex: 'profit', 
                          key: 'profit',
                          render: (value) => formatCurrency(value)
                        }
                      ]}
                      dataSource={[
                        { 
                          key: '1', 
                          month: 'Tháng 1/2025', 
                          revenue: 82543210, 
                          expenses: 45236789, 
                          profit: 37306521 
                        },
                        { 
                          key: '2', 
                          month: 'Tháng 2/2025', 
                          revenue: 89654321, 
                          expenses: 47236789, 
                          profit: 42417532 
                        }
                      ]}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Báo cáo chi phí" key="2">
                    <p>Nội dung báo cáo chi phí sẽ được cập nhật.</p>
                  </Tabs.TabPane>
                </Tabs>
              </Card>
            </Card>
          )}

          {/* SYSTEM SETTINGS */}
          {activeTab === "settings" && (
            <Card 
              title={
                <Space>
                  <SettingOutlined /> 
                  <span>Cài đặt hệ thống</span>
                </Space>
              }
            >
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title="Cấu hình chung">
                    <Form layout="vertical">
                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                          <Form.Item label="Tên hệ thống">
                            <Input 
                              defaultValue="Hệ thống Quản lý Bất động sản" 
                              placeholder="Nhập tên hệ thống" 
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Múi giờ">
                            <Select defaultValue="Asia/Ho_Chi_Minh">
                              <Option value="Asia/Ho_Chi_Minh">Việt Nam (ICT)</Option>
                              <Option value="Asia/Singapore">Singapore (SGT)</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Ngôn ngữ mặc định">
                            <Select defaultValue="vi">
                              <Option value="vi">Tiếng Việt</Option>
                              <Option value="en">English</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Chế độ tối">
                            <Switch defaultChecked={false} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Card>
                </Col>

                <Col span={24}>
                  <Card title="Quản lý người dùng">
                    <Table 
                      columns={[
                        { 
                          title: 'Tên người dùng', 
                          dataIndex: 'username', 
                          key: 'username' 
                        },
                        { 
                          title: 'Vai trò', 
                          dataIndex: 'role', 
                          key: 'role' 
                        },
                        { 
                          title: 'Trạng thái', 
                          dataIndex: 'status', 
                          key: 'status',
                          render: (status) => (
                            <Tag color={status === 'active' ? 'green' : 'red'}>
                              {status === 'active' ? 'Hoạt động' : 'Vô hiệu hóa'}
                            </Tag>
                          )
                        },
                        {
                          title: 'Thao tác',
                          key: 'actions',
                          render: () => (
                            <Space>
                              <Button size="small" type="primary">Chỉnh sửa</Button>
                              <Button size="small" danger>Xóa</Button>
                            </Space>
                          )
                        }
                      ]}
                      dataSource={[
                        { 
                          key: '1', 
                          username: 'admin_main', 
                          role: 'Quản trị viên', 
                          status: 'active' 
                        },
                        { 
                          key: '2', 
                          username: 'manager_sales', 
                          role: 'Nhân viên kinh doanh', 
                          status: 'active' 
                        }
                      ]}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          )}
        </Content>
      </Layout>

      {/* Existing Modal components from previous sections */}
    </Layout>
  );
};

export default AdminHome;