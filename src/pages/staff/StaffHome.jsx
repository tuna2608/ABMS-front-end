import React, { useState } from "react";
import { 
  Layout, 
  Menu, 
  Card, 
  List, 
  Space, 
  Input, 
  Select, 
  Button, 
  Pagination,
  Typography,
  Table,
  Form,
  Modal,
  Tabs,
  message,
  FloatButton,
  Badge,
  Tag,
  Statistic,
  Row,
  Col,
  Divider
} from "antd";
import { 
  HomeOutlined, 
  DollarOutlined, 
  UserOutlined, 
  SearchOutlined, 
  FilterOutlined,
  EnvironmentOutlined,
  BankOutlined,
  MessageOutlined,
  ThunderboltOutlined,
  CommentOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SafetyOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider, Content, Header } = Layout;
const { Search } = Input;
const { Option } = Select;
const { Text, Title } = Typography;
const { TabPane } = Tabs;

// Khu vực
const areas = ["Tất cả", "Quận 1", "Quận 2", "Quận Bình Thạnh", "Quận 7", "Quận 4"];

// Sample data for deposits (reduced to single entry)
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

const StaffHome = () => {
  // State Management
  const [collapsed, setCollapsed] = useState(false);
  const [setSearchText] = useState("");
  const [setSelectedStatus] = useState("Tất cả");
  const [setSelectedArea] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuItem, setActiveMenuItem] = useState("apartment-list");
  const [setUtilityType] = useState("electric");
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [currentMessage] = useState(null);
  const [isDepositDetailVisible, setIsDepositDetailVisible] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [depositFilterStatus, setDepositFilterStatus] = useState("all");

  // Form Instances
  const [replyForm] = Form.useForm();
  const [accountForm] = Form.useForm();
  const pageSize = 4;
  const navigate = useNavigate();

  // Utility Functions
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const onStatusChange = (value) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const onAreaChange = (value) => {
    setSelectedArea(value);
    setCurrentPage(1);
  };

  // Message Handling
  const handleReplySubmit = () => {
    replyForm.validateFields().then(values => {
      setIsReplyModalVisible(false);
      replyForm.resetFields();
      message.success("Đã gửi phản hồi thành công!");
    });
  };

  const handleAccountFormSubmit = () => {
    accountForm.validateFields().then(values => {
      message.success("Đã gửi thông tin tài khoản cho admin!");
      accountForm.resetFields();
    });
  };

  const navigateToChatPage = () => {
    navigate('/chat-page');
  };
  
  // Deposit handling
  const viewDepositDetail = (deposit) => {
    setSelectedDeposit(deposit);
    setIsDepositDetailVisible(true);
  };

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

  // Deposit status renderer
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

  // Deposit type renderer
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

  // Columns for Utility Tables
  const electricColumns = [
    {
      title: 'Số căn hộ',
      dataIndex: 'apartmentId',
      key: 'apartmentId',
    },
    // ... (rest of the columns remain the same)
  ];

  // Columns for Deposit Table
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
          type="primary" 
          icon={<EyeOutlined />} 
          size="small"
          onClick={() => viewDepositDetail(record)}
        >
          Xem chi tiết
        </Button>
      ),
      width: 120,
      fixed: 'right',
    },
  ];

  // Return all deposits regardless of filter status (Staff can only view)
  const filteredDeposits = depositSampleData;

  // Menu items
  const menuItems = [
    {
      key: "apartment-list",
      icon: <HomeOutlined />,
      label: "Danh sách nhà",
      onClick: () => setActiveMenuItem("apartment-list"),
    },
    {
      key: "deposit-management",
      icon: <SafetyOutlined />,
      label: "Quản lý đặt cọc",
      onClick: () => setActiveMenuItem("deposit-management"),
    },
    {
      key: "utility-management",
      icon: <DollarOutlined />,
      label: "Khoản phí",
      onClick: () => setActiveMenuItem("utility-management"),
    },
    {
      key: "account-management",
      icon: <UserOutlined />,
      label: "Quản lý tài khoản",
      onClick: () => setActiveMenuItem("account-management"),
    },
    {
      key: "messages",
      icon: <MessageOutlined />,
      label: "Tin nhắn",
      onClick: () => setActiveMenuItem("messages"),
    },
  ];

  // Deposit status statistics
  const depositStats = {
    total: depositSampleData.length,
    pending: depositSampleData.filter(d => d.status === 'pending').length,
    confirmed: depositSampleData.filter(d => d.status === 'confirmed').length,
    completed: depositSampleData.filter(d => d.status === 'completed').length,
    cancelled: depositSampleData.filter(d => d.status === 'cancelled').length,
  };

  // Content Rendering
  const renderContent = () => {
    switch (activeMenuItem) {
      case "apartment-list":
        return (
          <Card 
            title={
              <Space>
                <BankOutlined /> 
                <span>Danh sách căn hộ</span>
              </Space>
            } 
          >
            <Space style={{ marginBottom: 20 }} size="large" wrap>
              <Search
                placeholder="Tìm kiếm căn hộ"
                onSearch={onSearch}
                style={{ width: 300 }}
                prefix={<SearchOutlined />}
                allowClear
              />
              
              <Space>
                <FilterOutlined />
                <Select 
                  defaultValue="Tất cả" 
                  style={{ width: 150 }}
                  onChange={onStatusChange}
                >
                  <Option value="Tất cả">Tất cả trạng thái</Option>
                  <Option value="Chưa bán">Chưa bán</Option>
                  <Option value="Đã bán">Đã bán</Option>
                  <Option value="Đang cho thuê">Đang cho thuê</Option>
                  <Option value="Đang ở">Đang ở</Option>
                  <Option value="Trống">Trống</Option>
                </Select>
              </Space>

              <Space>
                <EnvironmentOutlined />
                <Select 
                  defaultValue="Tất cả" 
                  style={{ width: 150 }}
                  onChange={onAreaChange}
                >
                  {areas.map(area => (
                    <Option key={area} value={area}>{area}</Option>
                  ))}
                </Select>
              </Space>
            </Space>

            <List
              itemLayout="vertical"
              size="large"
              dataSource={[]}
              renderItem={() => null}
            />

            <div style={{ textAlign: 'right', marginTop: 16 }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={0}
                onChange={page => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          </Card>
        );
      
      case "deposit-management":
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
      
      case "utility-management":
        return (
          <Card 
            title={
              <Space>
                <DollarOutlined /> 
                <span>Quản lý khoản phí</span>
              </Space>
            } 
          >
            <Tabs 
              defaultActiveKey="electric" 
              onChange={(key) => setUtilityType(key)}
            >
              <TabPane 
                tab={
                  <span>
                    <ThunderboltOutlined />
                    Điện
                  </span>
                } 
                key="electric"
              >
                <Table 
                  columns={electricColumns} 
                  dataSource={[]} 
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                />
              </TabPane>
              <TabPane 
                tab={
                  <span>
                    <HomeOutlined />
                    Nước
                  </span>
                } 
                key="water"
              >
                <Table 
                  columns={electricColumns} 
                  dataSource={[]} 
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                />
              </TabPane>
            </Tabs>
          </Card>
        );
      
      case "account-management":
        return (
          <Card 
            title={
              <Space>
                <UserOutlined /> 
                <span>Quản lý tài khoản</span>
              </Space>
            } 
          >
            <Form
              form={accountForm}
              layout="vertical"
              onFinish={handleAccountFormSubmit}
            >
              <Form.Item
                name="fullName"
                label="Họ và tên"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
              </Form.Item>
              
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
              
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
              
              <Form.Item
                name="position"
                label="Vị trí công việc"
                rules={[{ required: true, message: 'Vui lòng chọn vị trí công việc!' }]}
              >
                <Select placeholder="Chọn vị trí công việc">
                  <Option value="staff">Nhân viên quản lý</Option>
                  <Option value="manager">Quản lý toà nhà</Option>
                  <Option value="accountant">Kế toán</Option>
                  <Option value="technician">Kỹ thuật viên</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="note"
                label="Ghi chú"
              >
                <Input.TextArea rows={4} placeholder="Nhập ghi chú" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Gửi thông tin cho admin
                </Button>
              </Form.Item>
            </Form>
          </Card>
        );
      
      case "messages":
        return (
          <Card 
            title={
              <Space>
                <MessageOutlined /> 
                <span>Quản lý tin nhắn</span>
              </Space>
            } 
          >
            <List
              itemLayout="vertical"
              dataSource={[]}
              renderItem={() => null}
            />
          </Card>
        );
      
      default:
        return <Card title="Không tìm thấy nội dung" />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        theme="light"
      >
        <div style={{ height: 64, padding: 16, textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: collapsed ? 14 : 18 }}>
            {collapsed ? "QL" : "Quản Lý Toà Nhà"}
          </h2>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['apartment-list']}
          items={menuItems}
        />
      </Sider>
      
      <Layout>
        <Header style={{ 
          background: "#fff", 
          padding: 0, 
          display: "flex", 
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ marginRight: 20 }}></div>
        </Header>
        
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff" }}>
          {renderContent()}
        </Content>
      </Layout>
      
      {/* Reply Modal */}
      <Modal
        title="Trả lời tin nhắn"
        open={isReplyModalVisible}
        onCancel={() => setIsReplyModalVisible(false)}
        onOk={handleReplySubmit}
      >
        {currentMessage && (
          <>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Từ:</Text> {currentMessage.sender}
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Nội dung:</Text> {currentMessage.content}
            </div>
            <Form
              form={replyForm}
              layout="vertical"
            >
              <Form.Item
                name="reply"
                label="Nội dung trả lời"
                rules={[{ required: true, message: 'Vui lòng nhập nội dung trả lời!' }]}
              >
                <Input.TextArea rows={4} placeholder="Nhập nội dung phản hồi..." />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
      
      {/* Deposit Detail Modal - Read-only for Staff */}
      <Modal
        title="Chi tiết giao dịch đặt cọc"
        open={isDepositDetailVisible}
        onCancel={() => setIsDepositDetailVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDepositDetailVisible(false)}>
            Đóng
          </Button>
        ]}
        width={700}
      >
        {selectedDeposit && (
          <>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Title level={4}>{selectedDeposit.id}</Title>
                  {renderDepositStatus(selectedDeposit.status)}
                </div>
                <Divider style={{ margin: '12px 0' }} />
              </Col>
              
              <Col xs={24} sm={12}>
                <Text type="secondary">Loại giao dịch</Text>
                <div>{renderDepositType(selectedDeposit.type)}</div>
              </Col>
              
              <Col xs={24} sm={12}>
                <Text type="secondary">Số tiền đặt cọc</Text>
                <div><Text strong>{formatCurrency(selectedDeposit.amount)}</Text></div>
              </Col>
              
              <Col xs={24} sm={12}>
                <Text type="secondary">Mã căn hộ</Text>
                <div>{selectedDeposit.apartmentId}</div>
              </Col>
              
              <Col xs={24} sm={12}>
                <Text type="secondary">Tên căn hộ</Text>
                <div>{selectedDeposit.apartmentName}</div>
              </Col>
              
              <Col xs={24} sm={12}>
                <Text type="secondary">Ngày tạo giao dịch</Text>
                <div>{formatDate(selectedDeposit.createdAt)}</div>
              </Col>
              
              <Col xs={24} sm={12}>
                <Text type="secondary">Ngày giao dịch</Text>
                <div>{formatDate(selectedDeposit.transactionDate)}</div>
              </Col>
              
              <Col xs={24} sm={12}>
                <Text type="secondary">Hạn hoàn thành</Text>
                <div>{formatDate(selectedDeposit.dueDate)}</div>
              </Col>
              
              <Col span={24}>
                <Divider orientation="left">Thông tin chủ nhà</Divider>
              </Col>
              
              <Col xs={24} sm={12}>
                <Text type="secondary">Tên chủ nhà</Text>
                <div>{selectedDeposit.owner}</div>
              </Col>
              
              <Col xs={24} sm={12}>
                <Text type="secondary">Số điện thoại</Text>
                <div>{selectedDeposit.ownerPhone}</div>
              </Col>
              
              <Col span={24}>
                <Divider orientation="left">Thông tin khách hàng</Divider>
              </Col>
              
              <Col xs={24} sm={12}>
                <Text type="secondary">Tên khách hàng</Text>
                <div>{selectedDeposit.tenant}</div>
              </Col>
              
              <Col xs={24} sm={12}>
                <Text type="secondary">Số điện thoại</Text>
                <div>{selectedDeposit.tenantPhone}</div>
              </Col>
              
              <Col span={24}>
                <Text type="secondary">Ghi chú</Text>
                <div style={{ padding: '8px', background: '#f5f5f5', borderRadius: '4px', marginTop: '4px' }}>
                  {selectedDeposit.notes}
                </div>
              </Col>
              
              <Col span={24} style={{ marginTop: 16 }}>
                <div className="note-box" style={{ padding: '12px', background: '#f0f8ff', borderRadius: '4px', border: '1px solid #d9e8ff' }}>
                  <Text type="secondary">
                    <i>Ghi chú: Nhân viên chỉ có quyền xem thông tin giao dịch. Vui lòng liên hệ quản lý để thực hiện các thao tác xác nhận hoặc hủy giao dịch.</i>
                  </Text>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Modal>
      
      {/* Floating action button for quick chat access */}
      <FloatButton
        icon={<CommentOutlined />}
        type="primary"
        tooltip="Chat với khách hàng"
        onClick={navigateToChatPage}
        style={{ right: 24 }}
      />
    </Layout>
  );
};

export default StaffHome;