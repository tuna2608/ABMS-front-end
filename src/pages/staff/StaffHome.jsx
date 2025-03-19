import React, { useState, useEffect } from "react";
import { 
  Layout, 
  Menu, 
  Card, 
  List, 
  Avatar, 
  Space, 
  Tag, 
  Input, 
  Select, 
  Button, 
  Pagination,
  Skeleton,
  Badge,
  Typography,
  Table,
  Form,
  Modal,
  Tabs,
  message
} from "antd";
import { 
  HomeOutlined, 
  DollarOutlined, 
  UserOutlined, 
  SearchOutlined, 
  FilterOutlined,
  EnvironmentOutlined,
  AreaChartOutlined,
  BankOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  MessageOutlined,
  LogoutOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Dữ liệu mẫu các căn hộ
const sampleApartments = [
  {
    id: 1,
    title: "Căn hộ cao cấp 2 phòng ngủ - The Vinhomes Central Park",
    description: "Căn hộ ban công rộng, view sông, nội thất cao cấp, an ninh 24/7",
    address: "Quận Bình Thạnh, TP.HCM",
    price: 5800000,
    area: 70,
    bedrooms: 2,
    bathrooms: 2,
    owner: "Nguyễn Văn A",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
    date: "2025-03-12",
    category: "Cho thuê",
    tags: ["Cao cấp", "Đầy đủ nội thất", "View sông"],
    views: 145,
    status: "Đang cho thuê",
    contractId: "CT00123",
    images: ["apartment1.jpg"]
  },
  {
    id: 2,
    title: "Studio căn hộ The Sun Avenue - Đầy đủ nội thất",
    description: "Căn hộ đầy đủ nội thất, cửa sổ lớn, bảo vệ 24/7, gần trung tâm thương mại",
    address: "Quận 2, TP.HCM",
    price: 3500000,
    area: 35,
    bedrooms: 1,
    bathrooms: 1,
    owner: "Trần Thị B",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
    date: "2025-03-10",
    category: "Cho thuê",
    tags: ["Studio", "Đầy đủ nội thất", "Gần trung tâm"],
    views: 98,
    status: "Đang ở",
    contractId: "CT00124",
    images: ["apartment2.jpg"]
  },
  {
    id: 3,
    title: "Căn hộ 3 phòng ngủ - Masteri Thảo Điền",
    description: "Căn góc, view đẹp, nội thất cao cấp, bảo vệ 24/7, hồ bơi, gym",
    address: "Quận 2, TP.HCM",
    price: 7200000,
    area: 95,
    bedrooms: 3,
    bathrooms: 2,
    owner: "Lê Văn C",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
    date: "2025-03-08",
    category: "Cho thuê",
    tags: ["Căn góc", "Nội thất cao cấp", "View đẹp"],
    views: 167,
    status: "Trống",
    contractId: "CT00125",
    images: ["apartment3.jpg"]
  },
  {
    id: 4,
    title: "Căn hộ Penthouse - Saigon Pearl",
    description: "Penthouse sang trọng, view toàn thành phố, sân vườn riêng, an ninh tuyệt đối",
    address: "Quận Bình Thạnh, TP.HCM",
    price: 15000000,
    area: 180,
    bedrooms: 4,
    bathrooms: 3,
    owner: "Phạm Văn D",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=4",
    date: "2025-03-05",
    category: "Bán",
    tags: ["Penthouse", "Sang trọng", "View toàn thành phố"],
    views: 213,
    status: "Đã bán",
    contractId: "CT00126",
    images: ["apartment4.jpg"]
  },
  {
    id: 5,
    title: "Căn hộ 2 phòng ngủ - Gateway Thảo Điền",
    description: "Căn hộ thiết kế hiện đại, view sông, bảo vệ 24/7, gần trạm metro",
    address: "Quận 2, TP.HCM",
    price: 6000000,
    area: 65,
    bedrooms: 2,
    bathrooms: 2,
    owner: "Hoàng Thị E",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=5",
    date: "2025-03-01",
    category: "Cho thuê",
    tags: ["Hiện đại", "View sông", "Gần metro"],
    views: 187,
    status: "Chưa bán",
    contractId: "",
    images: ["apartment5.jpg"]
  },
];

// Dữ liệu mẫu cho điện nước
const sampleUtilityBills = [
  {
    id: 1,
    apartmentId: 1,
    type: "Điện",
    month: "03/2025",
    readDate: "2025-03-15",
    previousReading: 2450,
    currentReading: 2650,
    unitPrice: 3500,
    total: 700000,
    status: "Chưa thanh toán"
  },
  {
    id: 2,
    apartmentId: 1,
    type: "Nước",
    month: "03/2025",
    readDate: "2025-03-15",
    previousReading: 145,
    currentReading: 165,
    unitPrice: 15000,
    total: 300000,
    status: "Chưa thanh toán"
  },
  {
    id: 3,
    apartmentId: 2,
    type: "Điện",
    month: "03/2025",
    readDate: "2025-03-14",
    previousReading: 1250,
    currentReading: 1380,
    unitPrice: 3500,
    total: 455000,
    status: "Đã thanh toán"
  },
  {
    id: 4,
    apartmentId: 2,
    type: "Nước",
    month: "03/2025",
    readDate: "2025-03-14",
    previousReading: 85,
    currentReading: 96,
    unitPrice: 15000,
    total: 165000,
    status: "Đã thanh toán"
  },
];

// Dữ liệu mẫu các tin nhắn
const sampleMessages = [
  {
    id: 1,
    sender: "Nguyễn Văn A",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
    content: "Tôi muốn báo cáo sự cố về hệ thống điều hòa trong căn hộ của tôi.",
    time: "2025-03-18 09:45",
    read: false,
    replies: []
  },
  {
    id: 2,
    sender: "Trần Thị B",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
    content: "Khi nào sẽ có hóa đơn điện nước tháng này?",
    time: "2025-03-17 14:20",
    read: true,
    replies: [
      {
        id: 1,
        content: "Hóa đơn sẽ được gửi vào ngày 20 hàng tháng. Cảm ơn bạn đã hỏi.",
        time: "2025-03-17 15:05",
        staff: "Lê Văn Staff"
      }
    ]
  },
  {
    id: 3,
    sender: "Lê Văn C",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
    content: "Tôi muốn đổi ngày thanh toán tiền thuê nhà hàng tháng. Có thể không?",
    time: "2025-03-15 11:30",
    read: true,
    replies: []
  }
];

// Trạng thái căn hộ và màu sắc tương ứng
const statusColors = {
  "Chưa bán": "blue",
  "Đã bán": "red",
  "Đang cho thuê": "green",
  "Đang ở": "purple",
  "Trống": "orange"
};

// Loại căn hộ
const apartmentTypes = ["Tất cả", "Căn hộ", "Penthouse", "Studio", "Duplex"];

// Khu vực
const areas = ["Tất cả", "Quận 1", "Quận 2", "Quận Bình Thạnh", "Quận 7", "Quận 4"];

const StaffHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [utilityBills, setUtilityBills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [selectedArea, setSelectedArea] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuItem, setActiveMenuItem] = useState("apartment-list");
  const [utilityType, setUtilityType] = useState("electric");
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [replyForm] = Form.useForm();
  const [accountForm] = Form.useForm();
  const pageSize = 4;

  // Thông tin nhân viên
  const staffInfo = {
    name: "Lê Văn Staff",
    position: "Nhân viên quản lý",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=10"
  };

  // Giả lập việc lấy dữ liệu từ API
  useEffect(() => {
    setTimeout(() => {
      setApartments(sampleApartments);
      setUtilityBills(sampleUtilityBills);
      setMessages(sampleMessages);
      setLoading(false);
    }, 1000);
  }, []);

  // Xử lý lọc căn hộ theo trạng thái và khu vực
  const filteredApartments = apartments.filter(apartment => {
    const matchSearch = apartment.title.toLowerCase().includes(searchText.toLowerCase()) || 
                       apartment.description.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = selectedStatus === "Tất cả" || apartment.status === selectedStatus;
    const matchArea = selectedArea === "Tất cả" || apartment.address.includes(selectedArea);
    
    return matchSearch && matchStatus && matchArea;
  });

  // Phân trang
  const paginatedApartments = filteredApartments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onSearch = value => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const onStatusChange = value => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const onAreaChange = value => {
    setSelectedArea(value);
    setCurrentPage(1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + " VNĐ/tháng";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + " VNĐ";
  };

  const IconText = ({ icon, text }) => (
    <Space>
      {icon}
      {text}
    </Space>
  );

  const handleReplyMessage = (message) => {
    setCurrentMessage(message);
    setIsReplyModalVisible(true);
  };

  const handleReplySubmit = () => {
    replyForm.validateFields().then(values => {
      const updatedMessages = messages.map(msg => {
        if (msg.id === currentMessage.id) {
          return {
            ...msg,
            read: true,
            replies: [
              ...msg.replies,
              {
                id: msg.replies.length + 1,
                content: values.reply,
                time: new Date().toLocaleString('vi-VN'),
                staff: staffInfo.name
              }
            ]
          };
        }
        return msg;
      });
      
      setMessages(updatedMessages);
      setIsReplyModalVisible(false);
      replyForm.resetFields();
      message.success("Đã gửi phản hồi thành công!");
    });
  };

  const handleAccountFormSubmit = () => {
    accountForm.validateFields().then(values => {
      console.log("Thông tin tài khoản:", values);
      message.success("Đã gửi thông tin tài khoản cho admin!");
      accountForm.resetFields();
    });
  };

  // Cột cho bảng điện
  const electricColumns = [
    {
      title: 'Số căn hộ',
      dataIndex: 'apartmentId',
      key: 'apartmentId',
      render: (id) => {
        const apartment = apartments.find(apt => apt.id === id);
        return apartment ? apartment.title.split(' - ')[0] : id;
      }
    },
    {
      title: 'Tháng',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Ngày đọc số',
      dataIndex: 'readDate',
      key: 'readDate',
    },
    {
      title: 'Chỉ số cũ',
      dataIndex: 'previousReading',
      key: 'previousReading',
    },
    {
      title: 'Chỉ số mới',
      dataIndex: 'currentReading',
      key: 'currentReading',
    },
    {
      title: 'Số tiêu thụ',
      key: 'consumption',
      render: (_, record) => record.currentReading - record.previousReading
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (price) => formatCurrency(price)
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
      render: (amount) => formatCurrency(amount)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === "Đã thanh toán" ? "green" : "volcano"}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" size="small">Sửa</Button>
          <Button size="small">Chi tiết</Button>
        </Space>
      ),
    },
  ];

  // Lọc dữ liệu điện nước theo loại
  const filteredUtilityBills = utilityBills.filter(bill => bill.type === (utilityType === "electric" ? "Điện" : "Nước"));

  // Render nội dung dựa trên menu item đang active
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
              dataSource={paginatedApartments}
              renderItem={apartment => (
                <List.Item
                  key={apartment.id}
                  actions={!loading && [
                    <IconText icon={<EnvironmentOutlined />} text={apartment.address} key="list-location" />,
                    <IconText icon={<AreaChartOutlined />} text={`${apartment.area} m²`} key="list-area" />,
                    <IconText icon={<DollarOutlined />} text={formatPrice(apartment.price)} key="list-price" />,
                    <IconText icon={<UserOutlined />} text={`${apartment.bedrooms} PN, ${apartment.bathrooms} VS`} key="list-rooms" />,
                    <IconText icon={<FileTextOutlined />} text={apartment.contractId || "Chưa có hợp đồng"} key="list-contract" />,
                  ]}
                  extra={!loading && (
                    <div style={{ textAlign: 'right' }}>
                      <Badge 
                        color={statusColors[apartment.status]} 
                        text={apartment.status} 
                        style={{ marginBottom: 8 }}
                      />
                      <div style={{ marginBottom: 8 }}>Ngày đăng: {apartment.date}</div>
                      <Space style={{ marginTop: 8 }}>
                        {apartment.tags.map(tag => (
                          <Tag color="blue" key={tag}>
                            {tag}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                  )}
                >
                  <Skeleton loading={loading} active avatar>
                    <List.Item.Meta
                      avatar={<Avatar src={apartment.avatar} />}
                      title={
                        <Space>
                          <a href={`/apartment/${apartment.id}`}>{apartment.title}</a>
                          <Tag color={statusColors[apartment.status]}>
                            {apartment.status}
                          </Tag>
                        </Space>
                      }
                      description={`Chủ nhà: ${apartment.owner} | Loại: ${apartment.category}`}
                    />
                    {apartment.description}
                  </Skeleton>
                </List.Item>
              )}
            />

            <div style={{ textAlign: 'right', marginTop: 16 }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredApartments.length}
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
                  dataSource={filteredUtilityBills} 
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                />
                <div style={{ textAlign: 'right', marginTop: 16 }}>
                  <Button type="primary" icon={<AppstoreOutlined />}>
                    Nhập chỉ số mới
                  </Button>
                </div>
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
                  dataSource={filteredUtilityBills} 
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                />
                <div style={{ textAlign: 'right', marginTop: 16 }}>
                  <Button type="primary" icon={<AppstoreOutlined />}>
                    Nhập chỉ số mới
                  </Button>
                </div>
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
              dataSource={messages}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[
                    <Button 
                      type="primary" 
                      onClick={() => handleReplyMessage(item)}
                    >
                      Trả lời
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={
                      <Space>
                        <span>{item.sender}</span>
                        {!item.read && <Badge color="red" text="Chưa đọc" />}
                      </Space>
                    }
                    description={`Thời gian: ${item.time}`}
                  />
                  <div style={{ marginBottom: 16 }}>
                    {item.content}
                  </div>
                  
                  {item.replies.length > 0 && (
                    <div style={{ marginLeft: 40, marginTop: 16 }}>
                      <Text strong>Phản hồi:</Text>
                      {item.replies.map(reply => (
                        <div key={reply.id} style={{ marginTop: 8, background: "#f5f5f5", padding: 8, borderRadius: 4 }}>
                          <div>
                            <Text type="secondary">{reply.staff} - {reply.time}</Text>
                          </div>
                          <div>{reply.content}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </List.Item>
              )}
            />
          </Card>
        );
      
      default:
        return <div>Chọn một mục từ menu</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <BankOutlined style={{ fontSize: 24 }} /> 
          {!collapsed && <span style={{ marginLeft: 8, fontSize: 20 }}>Quản lý toà nhà</span>}
        </div>
        
        <Menu
          theme="dark"
          defaultSelectedKeys={['apartment-list']}
          mode="inline"
          onClick={({ key }) => setActiveMenuItem(key)}
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
            {messages.filter(m => !m.read).length > 0 && (
              <Badge 
                count={messages.filter(m => !m.read).length} 
                style={{ marginLeft: 8 }} 
              />
            )}
          </Menu.Item>
        </Menu>
      </Sider>
      
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: '#fff' }}>
          <div style={{ float: 'right', marginRight: 24 }}>
            <Space>
              <span>Xin chào, {staffInfo.name}</span>
              <Avatar src={staffInfo.avatar} />
              <Button type="link" icon={<LogoutOutlined />}>
                Đăng xuất
              </Button>
            </Space>
          </div>
        </Header>
        
        <Content style={{ margin: '16px' }}>
          {renderContent()}
        </Content>
      </Layout>
      
      <Modal
        title="Trả lời tin nhắn"
        visible={isReplyModalVisible}
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
    </Layout>
  );
};

export default StaffHome;