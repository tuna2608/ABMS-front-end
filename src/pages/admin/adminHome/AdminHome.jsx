import React, { useState } from "react";
import {
  UserOutlined,
  HomeOutlined,
  FileAddOutlined,
  SearchOutlined,
  EyeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  BellOutlined,
  UserAddOutlined,
  SafetyOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Form,
  Input,
  Button,
  Table,
  Typography,
  Space,
  Row,
  Col,
  Modal,
  Divider,
  Badge,
  Tag,
  Select,
  Statistic,
  DatePicker,
  Card,
  InputNumber,
  Alert,
  Checkbox
} from "antd";

const { Title, Text } = Typography;
const { Sider, Content, Header } = Layout;
const { SubMenu } = Menu;
const { TextArea } = Input;
const { Option } = Select;

const AdminHome = () => {
  // State for sidebar collapse
  const [collapsed, setCollapsed] = useState(false);
  // State for active tab
  const [activeTab, setActiveTab] = useState("deposits");
  // State for deposit detail modal visibility
  const [isDepositDetailVisible, setIsDepositDetailVisible] = useState(false);
  // State for selected deposit
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  // State for deposit approval modal
  const [isDepositApprovalVisible, setIsDepositApprovalVisible] = useState(false);
  // State for new deposit modal
  const [isNewDepositVisible, setIsNewDepositVisible] = useState(false);
  // Form for deposit creation
  const [depositForm] = Form.useForm();
  // State for filter status
  const [depositFilterStatus, setDepositFilterStatus] = useState("all");

  // Handle menu click
  // const handleMenuClick = (e) => {
  //   setActiveTab(e.key);
  // };

  // Toggle sidebar collapse
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // View deposit details
  const viewDepositDetail = (deposit) => {
    setSelectedDeposit(deposit);
    setIsDepositDetailVisible(true);
  };

  // Handle deposit modal close
  const handleDepositDetailClose = () => {
    setIsDepositDetailVisible(false);
  };

  // Show deposit approval modal
  const showDepositApprovalModal = (deposit) => {
    setSelectedDeposit(deposit);
    setIsDepositApprovalVisible(true);
  };

  // Handle deposit approval modal close
  const handleDepositApprovalClose = () => {
    setIsDepositApprovalVisible(false);
  };

  // Show new deposit modal
  const showNewDepositModal = () => {
    setIsNewDepositVisible(true);
    depositForm.resetFields();
  };

  // Handle new deposit modal close
  const handleNewDepositClose = () => {
    setIsNewDepositVisible(false);
  };

  // Handle deposit confirmation
  const confirmDeposit = () => {
    // Logic for confirming deposit
    handleDepositApprovalClose();
  };

  // Handle deposit rejection
  const rejectDeposit = () => {
    // Logic for rejecting deposit
    handleDepositApprovalClose();
  };

  // Handle deposit completion
  const completeDeposit = () => {
    // Logic for completing deposit
    handleDepositDetailClose();
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + " VNĐ";
  };

  // Format date
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

  // Render deposit status
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

  // Render deposit type
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

  // Menu items
  const menuItems = [
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
        <Space>
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => viewDepositDetail(record)}
          >
            Chi tiết
          </Button>
          {record.status === 'pending' && (
            <Button 
              type="default" 
              size="small"
              onClick={() => showDepositApprovalModal(record)}
            >
              Duyệt
            </Button>
          )}
        </Space>
      ),
      width: 180,
      fixed: 'right',
    },
  ];

  // Sample data for deposits (optimized with fewer entries)
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
    },
    {
      id: "DEP-2025031903",
      apartmentId: "VIN-A1506",
      apartmentName: "Căn hộ 1PN Vinhomes Central Park A1506",
      owner: "Phạm Thị Diệu",
      ownerPhone: "0977889900",
      tenant: "Khách mua nhà",
      tenantPhone: "0966778899",
      amount: 350000000,
      status: "completed",
      type: "purchase",
      createdAt: "2025-03-15T08:30:00Z",
      transactionDate: "2025-03-16T11:20:00Z",
      dueDate: null,
      notes: "Đặt cọc mua căn hộ, đã hoàn tất giao dịch và chuyển sang hợp đồng chính thức"
    },
    {
      id: "DEP-2025031705",
      apartmentId: "VIN-A2201",
      apartmentName: "Căn hộ 3PN Vinhomes Central Park A2201",
      owner: "Nguyễn Thị Lan",
      ownerPhone: "0922334455",
      tenant: "David Chen",
      tenantPhone: "0955667788",
      amount: 43200000,
      status: "confirmed",
      type: "purchase",
      createdAt: "2025-03-12T10:15:00Z",
      transactionDate: "2025-03-13T14:30:00Z",
      dueDate: "2025-04-13T14:30:00Z",
      notes: "Đặt cọc mua căn hộ, đang chờ hoàn tất thủ tục giấy tờ"
    }
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

      {/* CONTENT AREA */}
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
          {/* DEPOSIT MANAGEMENT */}
          {activeTab === "deposits" && (
            <>
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
            </>
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
            >
              <p>Nội dung quản lý căn hộ sẽ được cập nhật sau.</p>
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
              <p>Nội dung danh sách bài viết sẽ được cập nhật sau.</p>
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
              <p>Giao diện tạo bài viết mới sẽ được cập nhật sau.</p>
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
              <p>Nội dung báo cáo tài chính sẽ được cập nhật sau.</p>
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
              <p>Nội dung cài đặt hệ thống sẽ được cập nhật sau.</p>
            </Card>
          )}
        </Content>
      </Layout>

      {/* DEPOSIT DETAIL MODAL */}
      <Modal
        title="Chi tiết giao dịch đặt cọc"
        open={isDepositDetailVisible}
        onCancel={handleDepositDetailClose}
        footer={[
          <Button key="close" onClick={handleDepositDetailClose}>
            Đóng
          </Button>,
          selectedDeposit && selectedDeposit.status === 'confirmed' && (
            <Button 
              key="complete" 
              type="primary" 
              style={{ backgroundColor: '#52c41a' }}
              onClick={completeDeposit}
            >
              Hoàn thành giao dịch
            </Button>
          ),
          selectedDeposit && selectedDeposit.status === 'pending' && (
            <>
              <Button 
                key="confirm" 
                type="primary"
                onClick={() => showDepositApprovalModal(selectedDeposit)}
              >
                Xác nhận giao dịch
              </Button>
              <Button 
                key="reject" 
                danger
                onClick={() => showDepositApprovalModal(selectedDeposit)}
              >
                Từ chối giao dịch
              </Button>
            </>
          ),
          <Button key="print" type="default">
            In biên lai
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
            </Row>
          </>
        )}
      </Modal>

      {/* DEPOSIT APPROVAL MODAL */}
      <Modal
        title="Xác nhận giao dịch đặt cọc"
        open={isDepositApprovalVisible}
        onCancel={handleDepositApprovalClose}
        footer={null}
        width={600}
      >
        {selectedDeposit && (
          <>
            <Alert
              message="Quan trọng"
              description="Vui lòng kiểm tra kỹ thông tin trước khi xác nhận giao dịch đặt cọc."
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
            />
            
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Text strong>Thông tin giao dịch</Text>
              </Col>
              
              <Col xs={24} sm={12}>
                <Text type="secondary">Mã giao dịch:</Text>
                <div>{selectedDeposit.id}</div>
              </Col>
              
              <Col xs={24} sm={12}>
                <Text type="secondary">Loại giao dịch:</Text>
                <div>{renderDepositType(selectedDeposit.type)}</div>
              </Col>
              
              <Col xs={24} sm={12}>
                <Text type="secondary">Căn hộ:</Text>
                <div>{selectedDeposit.apartmentName}</div>
              </Col>
              
              <Col xs={24} sm={12}>
                <Text type="secondary">Số tiền đặt cọc:</Text>
                <div><Text strong>{formatCurrency(selectedDeposit.amount)}</Text></div>
              </Col>
              
              <Col span={24}>
                <Divider />
              </Col>
              
              <Col span={24}>
                <Form layout="vertical">
                  <Form.Item
                    label="Ghi chú xác nhận"
                    name="confirmationNote"
                  >
                    <TextArea 
                      rows={4} 
                      placeholder="Nhập ghi chú cho giao dịch này..." 
                    />
                  </Form.Item>
                  
                  <Form.Item
                    label="Ngày hết hạn"
                    name="dueDate"
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Form>
              </Col>
              
              <Col span={24}>
                <Space style={{ float: 'right' }}>
                  <Button 
                    danger 
                    onClick={rejectDeposit}
                    icon={<CloseCircleOutlined />}
                  >
                    Từ chối giao dịch
                  </Button>
                  <Button 
                    type="primary" 
                    onClick={confirmDeposit}
                    icon={<CheckCircleOutlined />}
                  >
                    Xác nhận giao dịch
                  </Button>
                </Space>
              </Col>
            </Row>
          </>
        )}
      </Modal>

      {/* NEW DEPOSIT MODAL */}
      <Modal
        title="Tạo giao dịch đặt cọc mới"
        open={isNewDepositVisible}
        onCancel={handleNewDepositClose}
        footer={null}
        width={700}
      >
        <Form 
          layout="vertical" 
          form={depositForm}
          onFinish={() => {
            // Handle form submission
            handleNewDepositClose();
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Alert
                message="Thông tin quan trọng"
                description="Vui lòng nhập đầy đủ thông tin để tạo giao dịch đặt cọc mới. Mã giao dịch sẽ được tạo tự động."
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="Loại giao dịch"
                name="type"
                rules={[{ required: true, message: 'Vui lòng chọn loại giao dịch' }]}
              >
                <Select placeholder="Chọn loại giao dịch">
                  <Option value="rental">Cho thuê</Option>
                  <Option value="purchase">Mua bán</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="Số tiền đặt cọc"
                name="amount"
                rules={[{ required: true, message: 'Vui lòng nhập số tiền đặt cọc' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Nhập số tiền"
                  min={1000000}
                  step={1000000}
                  addonAfter="VNĐ"
                />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Divider orientation="left">Thông tin căn hộ</Divider>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="Mã căn hộ"
                name="apartmentId"
                rules={[{ required: true, message: 'Vui lòng nhập mã căn hộ' }]}
              >
                <Input placeholder="Nhập mã căn hộ" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="Tên căn hộ"
                name="apartmentName"
                rules={[{ required: true, message: 'Vui lòng nhập tên căn hộ' }]}
              >
                <Input placeholder="Nhập tên căn hộ" />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Divider orientation="left">Thông tin chủ nhà</Divider>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="Tên chủ nhà"
                name="owner"
                rules={[{ required: true, message: 'Vui lòng nhập tên chủ nhà' }]}
              >
                <Input placeholder="Nhập tên chủ nhà" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="Số điện thoại chủ nhà"
                name="ownerPhone"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại chủ nhà' },
                  { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }
                ]}
              >
                <Input placeholder="Nhập số điện thoại chủ nhà" />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Divider orientation="left">Thông tin khách hàng</Divider>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="Tên khách hàng"
                name="tenant"
                rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
              >
                <Input placeholder="Nhập tên khách hàng" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="Số điện thoại khách hàng"
                name="tenantPhone"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại khách hàng' },
                  { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }
                ]}
              >
                <Input placeholder="Nhập số điện thoại khách hàng" />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Form.Item
                label="Ghi chú"
                name="notes"
              >
                <TextArea 
                  rows={4} 
                  placeholder="Nhập ghi chú cho giao dịch này..." 
                />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Form.Item
                label="Hạn hoàn thành"
                name="dueDate"
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('Vui lòng xác nhận thông tin'))
                  },
                ]}
              >
                <Checkbox>
                  Tôi xác nhận thông tin giao dịch là chính xác và hợp lệ
                </Checkbox>
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Space style={{ float: 'right' }}>
                <Button onClick={handleNewDepositClose}>
                  Hủy bỏ
                </Button>
                <Button type="primary" htmlType="submit" icon={<CheckCircleOutlined />}>
                  Tạo giao dịch
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AdminHome;