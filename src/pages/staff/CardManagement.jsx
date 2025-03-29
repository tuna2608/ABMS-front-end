import React, { useState, useEffect } from "react";
import { 
  Card, 
  Table, 
  Space, 
  Tag, 
  Input, 
  Select, 
  Button, 
  message,
  Modal,
  Form,
  DatePicker,
} from "antd";
import { 
  SearchOutlined, 
  FilterOutlined,
  CreditCardOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import moment from 'moment';

const { Search } = Input;
const { Option } = Select;

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

];

const CardManagement = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("Tất cả");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [cardForm] = Form.useForm();

  // Giả lập việc lấy dữ liệu từ API
  useEffect(() => {
    setTimeout(() => {
      setCards(sampleCards);
      setLoading(false);
    }, 1000);
  }, []);

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
    Modal.confirm({
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
          <Button type="danger" size="small" icon={<DeleteOutlined />} onClick={() => handleDeleteCard(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
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

      <Modal
        title={isEditMode ? "Sửa thông tin thẻ" : "Thêm thẻ mới"}
        open={isModalVisible}
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
    </Card>
  );
};

export default CardManagement;