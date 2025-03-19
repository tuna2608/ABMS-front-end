import React, { useState, useEffect } from "react";
import { 
  Layout, 
  Menu, 
  Card, 
  Table, 
  Space, 
  Tag, 
  Input, 
  Select, 
  Button, 
  Badge,
  Typography,
  Form,
  Modal,
  message,
  DatePicker,
  notification,
  Tabs
} from "antd";
import { 
  HomeOutlined, 
  DollarOutlined, 
  UserOutlined, 
  SearchOutlined, 
  FilterOutlined,
  BankOutlined,
  MessageOutlined,
  LogoutOutlined,
  CreditCardOutlined,
  BellOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import moment from 'moment';

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { confirm } = Modal;

// Dữ liệu mẫu thẻ
const sampleCards = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    room: "2001",
    type: "Mẻ xây",
    issueDate: "2025-01-15",
    expireDate: "2025-04-15",
    status: "Đang sử dụng"
  },
  {
    id: 2,
    name: "Trần Thị B",
    room: "1502",
    type: "Thang máy",
    issueDate: "2025-02-10",
    expireDate: "2025-05-10",
    status: "Đang sử dụng"
  },
  {
    id: 3,
    name: "Lê Văn C",
    room: "3001",
    type: "Mẻ xây",
    issueDate: "2024-12-20",
    expireDate: "2025-03-20",
    status: "Sắp hết hạn"
  },
  {
    id: 4,
    name: "Phạm Văn D",
    room: "1803",
    type: "Thang máy",
    issueDate: "2024-11-05",
    expireDate: "2025-03-05",
    status: "Hết hạn"
  },
  {
    id: 5,
    name: "Hoàng Thị E",
    room: "2505",
    type: "Mẻ xây",
    issueDate: "2025-02-28",
    expireDate: "2025-05-28",
    status: "Đang sử dụng"
  },
  {
    id: 6,
    name: "Vũ Văn F",
    room: "1201",
    type: "Thang máy",
    issueDate: "2025-03-01",
    expireDate: "2025-06-01",
    status: "Đang sử dụng"
  },
  {
    id: 7,
    name: "Đỗ Thị G",
    room: "2202",
    type: "Mẻ xây",
    issueDate: "2025-01-15",
    expireDate: "2025-03-25",
    status: "Sắp hết hạn"
  }
];

// Dữ liệu mẫu các thông báo
const sampleNotifications = [
  {
    id: 1,
    title: "Thẻ sắp hết hạn",
    description: "Thẻ của cư dân Lê Văn C sẽ hết hạn vào ngày 20/03/2025",
    time: "2025-03-10 09:30",
    read: false
  },
  {
    id: 2,
    title: "Thẻ đã hết hạn",
    description: "Thẻ của cư dân Phạm Văn D đã hết hạn vào ngày 05/03/2025",
    time: "2025-03-06 14:15",
    read: true
  }
];

const CardManagement = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [cards, setCards] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("Tất cả");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [cardForm] = Form.useForm();
  const [activeMenuItem, setActiveMenuItem] = useState("card-management");

  // Thông tin nhân viên
  const staffInfo = {
    name: "Lê Văn Staff",
    position: "Nhân viên quản lý",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=10"
  };

  // Giả lập việc lấy dữ liệu từ API
  useEffect(() => {
    setTimeout(() => {
      setCards(sampleCards);
      setNotifications(sampleNotifications);
      setLoading(false);

      // Kiểm tra thẻ sắp hết hạn
      checkExpiringCards();
    }, 1000);
  }, []);

  // Kiểm tra thẻ sắp hết hạn và hiển thị thông báo
  const checkExpiringCards = () => {
    const today = moment();
    const nearExpireLimit = moment().add(14, 'days'); // 14 ngày trước khi hết hạn

    sampleCards.forEach(card => {
      const expireDate = moment(card.expireDate);
      
      // Thẻ sắp hết hạn trong vòng 14 ngày
      if (expireDate.isAfter(today) && expireDate.isBefore(nearExpireLimit)) {
        notification.warning({
          message: "Thẻ sắp hết hạn",
          description: `Thẻ của cư dân ${card.name} (phòng ${card.room}) sẽ hết hạn vào ngày ${moment(card.expireDate).format('DD/MM/YYYY')}`,
          icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />
        });
      }
      
      // Thẻ đã hết hạn
      if (expireDate.isBefore(today)) {
        notification.error({
          message: "Thẻ đã hết hạn",
          description: `Thẻ của cư dân ${card.name} (phòng ${card.room}) đã hết hạn vào ngày ${moment(card.expireDate).format('DD/MM/YYYY')}`,
          icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
        });
      }
    });
  };

  // Xử lý lọc thẻ theo loại và trạng thái
  const filteredCards = cards.filter(card => {
    const matchSearch = card.name.toLowerCase().includes(searchText.toLowerCase()) || 
                      card.room.toLowerCase().includes(searchText.toLowerCase());
    const matchType = selectedType === "Tất cả" || card.type === selectedType;
    const matchStatus = selectedStatus === "Tất cả" || card.status === selectedStatus;
    
    return matchSearch && matchType && matchStatus;
  });

  const onSearch = value => {
    setSearchText(value);
  };

  const onTypeChange = value => {
    setSelectedType(value);
  };

  const onStatusChange = value => {
    setSelectedStatus(value);
  };

  const showAddCardModal = () => {
    setIsEditMode(false);
    setCurrentCard(null);
    cardForm.resetFields();
    setIsModalVisible(true);
  };

  const showEditCardModal = (card) => {
    setIsEditMode(true);
    setCurrentCard(card);
    cardForm.setFieldsValue({
      ...card,
      issueDate: moment(card.issueDate),
      expireDate: moment(card.expireDate)
    });
    setIsModalVisible(true);
  };

  const handleCardSubmit = () => {
    cardForm.validateFields().then(values => {
      if (isEditMode && currentCard) {
        // Cập nhật thẻ
        const updatedCards = cards.map(card => {
          if (card.id === currentCard.id) {
            return {
              ...card,
              ...values,
              issueDate: values.issueDate.format('YYYY-MM-DD'),
              expireDate: values.expireDate.format('YYYY-MM-DD'),
              status: checkCardStatus(values.expireDate)
            };
          }
          return card;
        });
        
        setCards(updatedCards);
        message.success("Cập nhật thẻ thành công!");
      } else {
        // Thêm thẻ mới
        const newCard = {
          id: cards.length + 1,
          ...values,
          issueDate: values.issueDate.format('YYYY-MM-DD'),
          expireDate: values.expireDate.format('YYYY-MM-DD'),
          status: checkCardStatus(values.expireDate)
        };
        
        setCards([...cards, newCard]);
        message.success("Thêm thẻ mới thành công!");
      }
      
      setIsModalVisible(false);
      cardForm.resetFields();
    });
  };

  // Kiểm tra trạng thái thẻ dựa trên ngày hết hạn
  const checkCardStatus = (expireDate) => {
    const today = moment();
    const expiryDate = moment(expireDate);
    const nearExpireLimit = moment().add(14, 'days');
    
    if (expiryDate.isBefore(today)) {
      return "Hết hạn";
    } else if (expiryDate.isBefore(nearExpireLimit)) {
      return "Sắp hết hạn";
    } else {
      return "Đang sử dụng";
    }
  };

  const handleDeleteCard = (card) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa thẻ này?',
      icon: <ExclamationCircleOutlined />,
      content: `Thẻ của ${card.name}, phòng ${card.room} sẽ bị xóa khỏi hệ thống.`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        const updatedCards = cards.filter(item => item.id !== card.id);
        setCards(updatedCards);
        message.success("Đã xóa thẻ thành công!");
      }
    });
  };

  const extendCard = (card) => {
    confirm({
      title: 'Gia hạn thẻ',
      icon: <CreditCardOutlined />,
      content: `Bạn muốn gia hạn thẻ của ${card.name}, phòng ${card.room} thêm bao nhiêu tháng?`,
      okText: 'Gia hạn 3 tháng',
      cancelText: 'Hủy',
      onOk() {
        const updatedCards = cards.map(item => {
          if (item.id === card.id) {
            const newExpireDate = moment(item.expireDate).add(3, 'months').format('YYYY-MM-DD');
            return {
              ...item,
              expireDate: newExpireDate,
              status: "Đang sử dụng"
            };
          }
          return item;
        });
        
        setCards(updatedCards);
        message.success("Đã gia hạn thẻ thành công!");
      }
    });
  };

  // Xác định màu sắc cho trạng thái thẻ
  const getStatusColor = (status) => {
    switch (status) {
      case "Đang sử dụng":
        return "green";
      case "Sắp hết hạn":
        return "orange";
      case "Hết hạn":
        return "red";
      default:
        return "blue";
    }
  };

  // Cột cho bảng thẻ
  const cardColumns = [
    {
      title: 'Tên cư dân',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phòng',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'Loại thẻ',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === "Mẻ xây" ? "blue" : "purple"}>
          {type}
        </Tag>
      )
    },
    {
      title: 'Ngày cấp',
      dataIndex: 'issueDate',
      key: 'issueDate',
      render: (date) => moment(date).format('DD/MM/YYYY')
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expireDate',
      key: 'expireDate',
      render: (date) => moment(date).format('DD/MM/YYYY')
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => showEditCardModal(record)}>
            Sửa
          </Button>
          <Button type="default" size="small" onClick={() => extendCard(record)}>
            Gia hạn
          </Button>
          <Button type="danger" size="small" icon={<DeleteOutlined />} onClick={() => handleDeleteCard(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <BankOutlined style={{ fontSize: 24 }} /> 
          {!collapsed && <span style={{ marginLeft: 8, fontSize: 20 }}>Quản lý toà nhà</span>}
        </div>
        
        <Menu
          theme="dark"
          defaultSelectedKeys={['card-management']}
          mode="inline"
          onClick={({ key }) => setActiveMenuItem(key)}
        >
          <Menu.Item key="apartment-list" icon={<HomeOutlined />}>
            Danh sách nhà
          </Menu.Item>
          
          <Menu.Item key="utility-management" icon={<DollarOutlined />}>
            Khoản phí
          </Menu.Item>
          
          <Menu.Item key="card-management" icon={<CreditCardOutlined />}>
            Quản lý thẻ
            {cards.filter(c => c.status === "Sắp hết hạn" || c.status === "Hết hạn").length > 0 && (
              <Badge 
                count={cards.filter(c => c.status === "Sắp hết hạn" || c.status === "Hết hạn").length} 
                style={{ marginLeft: 8 }} 
              />
            )}
          </Menu.Item>
          
          <Menu.Item key="account-management" icon={<UserOutlined />}>
            Quản lý tài khoản
          </Menu.Item>
          
          <Menu.Item key="messages" icon={<MessageOutlined />}>
            Tin nhắn
          </Menu.Item>
        </Menu>
      </Sider>
      
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: '#fff' }}>
          <div style={{ float: 'right', marginRight: 24 }}>
            <Space>
              <Badge count={notifications.filter(n => !n.read).length} dot>
                <BellOutlined style={{ fontSize: 20 }} />
              </Badge>
              <span>Xin chào, {staffInfo.name}</span>
              <Button type="link" icon={<LogoutOutlined />}>
                Đăng xuất
              </Button>
            </Space>
          </div>
        </Header>
        
        <Content style={{ margin: '16px' }}>
          <Card 
            title={
              <Space>
                <CreditCardOutlined /> 
                <span>Quản lý thẻ</span>
              </Space>
            } 
            extra={
              <Button type="primary" icon={<PlusOutlined />} onClick={showAddCardModal}>
                Thêm thẻ mới
              </Button>
            }
          >
            <Space style={{ marginBottom: 20 }} size="large" wrap>
              <Search
                placeholder="Tìm kiếm tên hoặc phòng"
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
                  onChange={onTypeChange}
                >
                  <Option value="Tất cả">Tất cả loại thẻ</Option>
                  <Option value="Mẻ xây">Mẻ xây</Option>
                  <Option value="Thang máy">Thang máy</Option>
                </Select>
              </Space>

              <Space>
                <FilterOutlined />
                <Select 
                  defaultValue="Tất cả" 
                  style={{ width: 150 }}
                  onChange={onStatusChange}
                >
                  <Option value="Tất cả">Tất cả trạng thái</Option>
                  <Option value="Đang sử dụng">Đang sử dụng</Option>
                  <Option value="Sắp hết hạn">Sắp hết hạn</Option>
                  <Option value="Hết hạn">Hết hạn</Option>
                </Select>
              </Space>
            </Space>

            <Table 
              columns={cardColumns} 
              dataSource={filteredCards} 
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
            
            <div style={{ marginTop: 16 }}>
              <Title level={5}>Thống kê:</Title>
              <Space size="large">
                <Text>Tổng số thẻ: <strong>{cards.length}</strong></Text>
                <Text>Thẻ mẻ xây: <strong>{cards.filter(c => c.type === "Mẻ xây").length}</strong></Text>
                <Text>Thẻ thang máy: <strong>{cards.filter(c => c.type === "Thang máy").length}</strong></Text>
                <Text>Thẻ sắp hết hạn: <strong>{cards.filter(c => c.status === "Sắp hết hạn").length}</strong></Text>
                <Text>Thẻ đã hết hạn: <strong>{cards.filter(c => c.status === "Hết hạn").length}</strong></Text>
              </Space>
            </div>
          </Card>
        </Content>
      </Layout>
      
      <Modal
        title={isEditMode ? "Sửa thông tin thẻ" : "Thêm thẻ mới"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleCardSubmit}>
            {isEditMode ? "Cập nhật" : "Thêm mới"}
          </Button>
        ]}
      >
        <Form
          form={cardForm}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Tên cư dân"
            rules={[{ required: true, message: 'Vui lòng nhập tên cư dân!' }]}
          >
            <Input placeholder="Nhập tên cư dân" />
          </Form.Item>
          
          <Form.Item
            name="room"
            label="Phòng"
            rules={[{ required: true, message: 'Vui lòng nhập số phòng!' }]}
          >
            <Input placeholder="Nhập số phòng" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="Loại thẻ"
            rules={[{ required: true, message: 'Vui lòng chọn loại thẻ!' }]}
          >
            <Select placeholder="Chọn loại thẻ">
              <Option value="Mẻ xây">Mẻ xây</Option>
              <Option value="Thang máy">Thang máy</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="issueDate"
            label="Ngày cấp"
            rules={[{ required: true, message: 'Vui lòng chọn ngày cấp!' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>
          
          <Form.Item
            name="expireDate"
            label="Ngày hết hạn"
            rules={[{ required: true, message: 'Vui lòng chọn ngày hết hạn!' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default CardManagement;