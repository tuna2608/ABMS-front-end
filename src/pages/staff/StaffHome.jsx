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
  FloatButton
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
  MenuFoldOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;
const { TabPane } = Tabs;

// Khu vực
const areas = ["Tất cả", "Quận 1", "Quận 2", "Quận Bình Thạnh", "Quận 7", "Quận 4"];

const StaffHome = () => {
  // State Management
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [ setSearchText] = useState("");
  const [ setSelectedStatus] = useState("Tất cả");
  const [setSelectedArea] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuItem, setActiveMenuItem] = useState("apartment-list");
  const [ setUtilityType] = useState("electric");
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [currentMessage] = useState(null);

  // Form Instances
  const [replyForm] = Form.useForm();
  const [accountForm] = Form.useForm();
  const pageSize = 4;
  const navigate = useNavigate();

  // Status Colors for Apartments
  // const statusColors = {
  //   "Chưa bán": "blue",
  //   "Đã bán": "red",
  //   "Đang cho thuê": "green",
  //   "Đang ở": "purple",
  //   "Trống": "orange"
  // };

  // Utility Functions
  const toggleSidebar = () => {
    setSidebarWidth(sidebarWidth === 200 ? 80 : 200);
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

  // const formatPrice = (price) => {
  //   return new Intl.NumberFormat('vi-VN').format(price) + " VNĐ/tháng";
  // };

  // const formatCurrency = (amount) => {
  //   return new Intl.NumberFormat('vi-VN').format(amount) + " VNĐ";
  // };

  // const IconText = ({ icon, text }) => (
  //   <Space>
  //     {icon}
  //     {text}
  //   </Space>
  // );

  // Message Handling
  // const handleReplyMessage = (message) => {
  //   setCurrentMessage(message);
  //   setIsReplyModalVisible(true);
  // };

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

  // Columns for Utility Tables
  const electricColumns = [
    {
      title: 'Số căn hộ',
      dataIndex: 'apartmentId',
      key: 'apartmentId',
    },
    // ... (rest of the columns remain the same)
  ];

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
        return <div>Chọn một mục từ menu</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        width={sidebarWidth}
        style={{ 
          overflow: 'auto', 
          height: '100vh', 
          position: 'absolute', 
          left: 0,
          transition: 'width 0.2s'
        }}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'white',
          position: 'relative'
        }}>
          <BankOutlined style={{ fontSize: 24 }} /> 
          {sidebarWidth > 80 && <span style={{ marginLeft: 8, fontSize: 20 }}>Quản lý toà nhà</span>}
          
          <Button 
            type="text"
            icon={sidebarWidth > 80 ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            onClick={toggleSidebar}
            style={{ 
              position: 'absolute', 
              right: 0, 
              color: 'white',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
        </div>
        
        <Menu
          theme="dark"
          defaultSelectedKeys={['apartment-list']}
          mode="inline"
          onClick={({ key }) => setActiveMenuItem(key)}
          style={{ width: '100%' }}
        >
          <Menu.SubMenu key="building-management" icon={<BankOutlined />} title="Quản lý toà nhà">
            <Menu.Item key="apartment-list" icon={<HomeOutlined />}>Danh sách nhà</Menu.Item>
          </Menu.SubMenu>
          
          <Menu.Item key="utility-management" icon={<DollarOutlined />}>
            Khoản phí
          </Menu.Item>
          
          <Menu.Item key="account-management" icon={<UserOutlined />}>
            Quản lý tài khoản
          </Menu.Item>
          
          <Menu.Item key="messages" icon={<MessageOutlined />}>
            Tin nhắn
          </Menu.Item>
        </Menu>
      </Sider>
      
      <Layout 
        className="site-layout" 
        style={{ 
          marginLeft: sidebarWidth,
          transition: 'margin-left 0.2s'
        }}
      >
        <Content style={{ margin: '16px' }}>
          {renderContent()}
        </Content>
      </Layout>
      
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
      
      <FloatButton
        icon={<CommentOutlined />}
        type="primary"
        tooltip="Chat"
        onClick={navigateToChatPage}
        style={{ right: 24, bottom: 24 }}
        shape="circle"
        size="large"
      />
    </Layout>
  );
};

export default StaffHome;