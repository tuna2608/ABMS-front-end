import React, { useState, useEffect } from "react";
import { 
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
  Modal,
  Form,
  InputNumber,
  Upload,
  Tabs,
  message,
  Descriptions,
  Menu,
  Layout,
  Typography,
  Divider
} from "antd";
import { 
  HomeOutlined, 
  DollarOutlined, 
  UserOutlined, 
  SearchOutlined, 
  FilterOutlined,
  EnvironmentOutlined,
  AreaChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  PictureOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  FileAddOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  FormOutlined,
  BuildOutlined,
  TeamOutlined,
  WalletOutlined,
  FileProtectOutlined,
  UploadOutlined,
  InboxOutlined
} from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Header, Sider, Content } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;

// Dữ liệu mẫu các bài đăng căn hộ
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
    status: "Còn trống",
    images: ["apartment1.jpg"],
    posts: [
      {
        id: 1,
        title: "Cho thuê căn hộ cao cấp view sông",
        content: "Căn hộ cao cấp 2 phòng ngủ tại Vinhomes Central Park, view sông tuyệt đẹp. Phù hợp cho gia đình hoặc người nước ngoài. Liên hệ ngay để xem nhà.",
        createdAt: "2025-03-12",
        status: "Đang hiển thị"
      }
    ]
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
    status: "Đã cho thuê",
    images: ["apartment2.jpg"],
    posts: []
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
    status: "Còn trống",
    images: ["apartment3.jpg"],
    posts: [
      {
        id: 2,
        title: "Cho thuê căn hộ 3PN tại Masteri Thảo Điền",
        content: "Căn góc 3 phòng ngủ, view đẹp, nội thất cao cấp. Tiện ích đầy đủ: hồ bơi, gym. Phù hợp cho gia đình hoặc nhóm ở ghép.",
        createdAt: "2025-03-08",
        status: "Đang hiển thị"
      }
    ]
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
    status: "Đang đặt cọc",
    images: ["apartment4.jpg"],
    posts: [
      {
        id: 3,
        title: "Bán Penthouse cao cấp Saigon Pearl",
        content: "Penthouse sang trọng với view toàn thành phố, thiết kế hiện đại. Diện tích lớn với 4 phòng ngủ và sân vườn riêng.",
        createdAt: "2025-03-05",
        status: "Đang hiển thị"
      }
    ]
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
    status: "Còn trống",
    images: ["apartment5.jpg"],
    posts: []
  },
];

// Các danh mục căn hộ
const categories = ["Tất cả", "Cho thuê", "Bán", "Đã cho thuê", "Đang đặt cọc"];

// Các khu vực
const areas = ["Tất cả", "Quận 1", "Quận 2", "Quận Bình Thạnh", "Quận 7", "Quận 4"];

const statusColors = {
  "Còn trống": "green",
  "Đã cho thuê": "red",
  "Đang đặt cọc": "orange"
};

const OwnerHome = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedArea, setSelectedArea] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [isApartmentModalVisible, setIsApartmentModalVisible] = useState(false);
  const [isPostModalVisible, setIsPostModalVisible] = useState(false);
  const [currentApartment, setCurrentApartment] = useState(null);
  const [currentView, setCurrentView] = useState("list"); // "list", "detail", "createPost", "myApartments", "payment", "contract", "upload"
  const [apartmentForm] = Form.useForm();
  const [postForm] = Form.useForm();
  const [collapsed, setCollapsed] = useState(false);
  const pageSize = 4;

  // Giả lập việc lấy dữ liệu từ API
  useEffect(() => {
    setTimeout(() => {
      setApartments(sampleApartments);
      setLoading(false);
    }, 1000);
  }, []);

  // Toggle sidebar collapse
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Xử lý lọc căn hộ theo danh mục và khu vực
  const filteredApartments = apartments.filter(apartment => {
    const matchSearch = apartment.title.toLowerCase().includes(searchText.toLowerCase()) || 
                       apartment.description.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory = selectedCategory === "Tất cả" || apartment.category === selectedCategory;
    const matchArea = selectedArea === "Tất cả" || apartment.address.includes(selectedArea);
    
    return matchSearch && matchCategory && matchArea;
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

  const onCategoryChange = value => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const onAreaChange = value => {
    setSelectedArea(value);
    setCurrentPage(1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + " VNĐ/tháng";
  };

  const IconText = ({ icon, text }) => (
    <Space>
      {icon}
      {text}
    </Space>
  );

  // Xử lý mở modal thêm/sửa căn hộ
  const showApartmentModal = (apartment = null) => {
    if (apartment) {
      setCurrentApartment(apartment);
      apartmentForm.setFieldsValue({
        title: apartment.title,
        description: apartment.description,
        address: apartment.address,
        price: apartment.price,
        area: apartment.area,
        bedrooms: apartment.bedrooms,
        bathrooms: apartment.bathrooms,
        category: apartment.category,
        status: apartment.status,
        tags: apartment.tags.join(", ")
      });
    } else {
      setCurrentApartment(null);
      apartmentForm.resetFields();
    }
    setIsApartmentModalVisible(true);
  };

  // Xử lý đóng modal căn hộ
  const handleApartmentCancel = () => {
    setIsApartmentModalVisible(false);
  };

  // Xử lý lưu thông tin căn hộ
  const handleApartmentSubmit = () => {
    apartmentForm.validateFields().then(values => {
      const tagsArray = values.tags.split(',').map(tag => tag.trim());
      const newApartment = {
        ...values,
        tags: tagsArray,
        id: currentApartment ? currentApartment.id : apartments.length + 1,
        owner: "Nguyễn Văn A",
        avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
        date: new Date().toISOString().split('T')[0],
        views: currentApartment ? currentApartment.views : 0,
        images: currentApartment ? currentApartment.images : [],
        posts: currentApartment ? currentApartment.posts : []
      };

      if (currentApartment) {
        // Cập nhật căn hộ hiện có
        setApartments(apartments.map(apt => apt.id === currentApartment.id ? newApartment : apt));
        message.success("Đã cập nhật thông tin căn hộ thành công!");
      } else {
        // Thêm căn hộ mới
        setApartments([...apartments, newApartment]);
        message.success("Đã thêm căn hộ mới thành công!");
      }
      
      setIsApartmentModalVisible(false);
    });
  };

  // Xử lý xóa căn hộ
  const handleDeleteApartment = (apartmentId) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa căn hộ này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setApartments(apartments.filter(apt => apt.id !== apartmentId));
        message.success("Đã xóa căn hộ thành công!");
        if (currentApartment && currentApartment.id === apartmentId) {
          setCurrentView("list");
          setCurrentApartment(null);
        }
      }
    });
  };

  // Xử lý xem chi tiết căn hộ
  const handleViewApartmentDetail = (apartment) => {
    setCurrentApartment(apartment);
    setCurrentView("detail");
  };

  // Quay lại danh sách căn hộ
  const handleBackToList = () => {
    setCurrentView("list");
    setCurrentApartment(null);
  };

  // Xử lý mở modal tạo bài viết
  const showPostModal = (postToEdit = null) => {
    if (postToEdit) {
      postForm.setFieldsValue({
        title: postToEdit.title,
        content: postToEdit.content,
        status: postToEdit.status
      });
    } else {
      postForm.resetFields();
    }
    setIsPostModalVisible(true);
  };

  // Xử lý đóng modal bài viết
  const handlePostCancel = () => {
    setIsPostModalVisible(false);
  };

  // Xử lý lưu bài viết
  const handlePostSubmit = () => {
    if (!currentApartment) {
      message.error("Vui lòng chọn căn hộ trước khi tạo bài viết");
      return;
    }

    postForm.validateFields().then(values => {
      const newPost = {
        id: Math.max(0, ...currentApartment.posts.map(p => p.id)) + 1,
        title: values.title,
        content: values.content,
        createdAt: new Date().toISOString().split('T')[0],
        status: values.status || "Đang hiển thị"
      };

      const updatedPosts = [...currentApartment.posts, newPost];
      const updatedApartment = { ...currentApartment, posts: updatedPosts };
      const updatedApartments = apartments.map(apt => 
        apt.id === currentApartment.id ? updatedApartment : apt
      );

      setApartments(updatedApartments);
      setCurrentApartment(updatedApartment);
      message.success("Đã tạo bài viết mới thành công!");
      setIsPostModalVisible(false);
    });
  };

  // Xử lý xóa bài viết
  const handleDeletePost = (postId) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa bài viết này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        if (currentApartment) {
          const updatedPosts = currentApartment.posts.filter(post => post.id !== postId);
          const updatedApartment = { ...currentApartment, posts: updatedPosts };
          const updatedApartments = apartments.map(apt => 
            apt.id === currentApartment.id ? updatedApartment : apt
          );

          setApartments(updatedApartments);
          setCurrentApartment(updatedApartment);
          message.success("Đã xóa bài viết thành công!");
        }
      }
    });
  };

  // Render danh sách căn hộ
  const renderApartmentList = () => {
    return (
      <Card 
        title={
          <Space>
            <HomeOutlined /> 
            <span>Danh sách căn hộ</span>
          </Space>
        } 
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => showApartmentModal()}>Thêm căn hộ mới</Button>}
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
              onChange={onCategoryChange}
            >
              {categories.map(cat => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
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
                <Button 
                  type="link" 
                  icon={<AppstoreOutlined />} 
                  onClick={() => handleViewApartmentDetail(apartment)}
                >
                  Chi tiết
                </Button>,
                <Button 
                  type="link" 
                  icon={<EditOutlined />} 
                  onClick={() => showApartmentModal(apartment)}
                >
                  Sửa
                </Button>,
                <Button 
                  type="link" 
                  danger
                  icon={<DeleteOutlined />} 
                  onClick={() => handleDeleteApartment(apartment.id)}
                >
                  Xóa
                </Button>,
              ]}
              extra={!loading && (
                <div style={{ textAlign: 'right' }}>
                  <Badge 
                    color={statusColors[apartment.status]} 
                    text={apartment.status} 
                    style={{ marginBottom: 8 }}
                  />
                  <div style={{ marginBottom: 8 }}>Ngày đăng: {apartment.date}</div>
                  <div style={{ marginBottom: 8 }}>
                    <Badge count={apartment.posts.length} overflowCount={99}>
                      <Tag color="blue">Bài viết</Tag>
                    </Badge>
                  </div>
                </div>
              )}
            >
              <Skeleton loading={loading} active avatar>
                <List.Item.Meta
                  avatar={<Avatar src={apartment.avatar} />}
                  title={
                    <Space>
                      <Button type="link" onClick={() => handleViewApartmentDetail(apartment)} style={{ padding: 0, height: 'auto', lineHeight: 'inherit' }}>{apartment.title}</Button>
                      {apartment.status === "Còn trống" && (
                        <Tag color="green" icon={<CheckCircleOutlined />}>Còn trống</Tag>
                      )}
                      {apartment.status === "Đang đặt cọc" && (
                        <Tag color="orange" icon={<ClockCircleOutlined />}>Đang đặt cọc</Tag>
                      )}
                    </Space>
                  }
                  description={
                    <Space direction="vertical" size="small">
                      <span>Người đăng: {apartment.owner} | Loại: {apartment.category}</span>
                      <Space>
                        <IconText icon={<EnvironmentOutlined />} text={apartment.address} />
                        <IconText icon={<AreaChartOutlined />} text={`${apartment.area} m²`} />
                        <IconText icon={<DollarOutlined />} text={formatPrice(apartment.price)} />
                        <IconText icon={<UserOutlined />} text={`${apartment.bedrooms} PN, ${apartment.bathrooms} VS`} />
                      </Space>
                    </Space>
                  }
                />
                <div style={{ marginTop: 10 }}>{apartment.description}</div>
                <div style={{ marginTop: 10 }}>
                  {apartment.tags.map(tag => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </div>
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
  };

  // Render chi tiết căn hộ
  const renderApartmentDetail = () => {
    if (!currentApartment) return null;

    return (
      <Card
        title={
          <Space>
            <Button icon={<UnorderedListOutlined />} onClick={handleBackToList}>Quay lại</Button>
            <span>Chi tiết căn hộ: {currentApartment.title}</span>
          </Space>
        }
        extra={
          <Space>
            <Button icon={<EditOutlined />} onClick={() => showApartmentModal(currentApartment)}>
              Sửa thông tin
            </Button>
            <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteApartment(currentApartment.id)}>
              Xóa căn hộ
            </Button>
          </Space>
        }
      >
        <Tabs defaultActiveKey="info">
          <TabPane tab={<span><AppstoreOutlined /> Thông tin căn hộ</span>} key="info">
            <Descriptions bordered column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
              <Descriptions.Item label="Tiêu đề">{currentApartment.title}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{currentApartment.address}</Descriptions.Item>
              <Descriptions.Item label="Giá">
                {formatPrice(currentApartment.price)}
              </Descriptions.Item>
              <Descriptions.Item label="Diện tích">{currentApartment.area} m²</Descriptions.Item>
              <Descriptions.Item label="Phòng ngủ">{currentApartment.bedrooms}</Descriptions.Item>
              <Descriptions.Item label="Phòng tắm">{currentApartment.bathrooms}</Descriptions.Item>
              <Descriptions.Item label="Chủ sở hữu">{currentApartment.owner}</Descriptions.Item>
              <Descriptions.Item label="Loại căn hộ">{currentApartment.category}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Badge color={statusColors[currentApartment.status]} text={currentApartment.status} />
              </Descriptions.Item>
              <Descriptions.Item label="Ngày đăng">{currentApartment.date}</Descriptions.Item>
              <Descriptions.Item label="Lượt xem">{currentApartment.views}</Descriptions.Item>
              <Descriptions.Item label="Hình ảnh">
                {currentApartment.images.length} hình ảnh
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả" span={3}>
                {currentApartment.description}
              </Descriptions.Item>
              <Descriptions.Item label="Tags" span={3}>
                {currentApartment.tags.map(tag => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </Descriptions.Item>
            </Descriptions>
          </TabPane>

          <TabPane tab={<span><FileTextOutlined /> Bài viết ({currentApartment.posts.length})</span>} key="posts">
            <div style={{ marginBottom: 16 }}>
              <Button 
                type="primary" 
                icon={<FileAddOutlined />}
                onClick={() => showPostModal()}
              >
                Tạo bài viết mới
              </Button>
            </div>

            {currentApartment.posts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <p>Chưa có bài viết nào cho căn hộ này</p>
              </div>
            ) : (
              <List
                itemLayout="vertical"
                dataSource={currentApartment.posts}
                renderItem={post => (
                  <List.Item
                    key={post.id}
                    actions={[
                      <Button 
                        type="link" 
                        icon={<EditOutlined />}
                        onClick={() => showPostModal(post)}
                      >
                        Sửa
                      </Button>,
                      <Button 
                        type="link" 
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeletePost(post.id)}
                      >
                        Xóa
                      </Button>
                    ]}
                    extra={
                      <Space direction="vertical" align="end">
                        <div>Ngày tạo: {post.createdAt}</div>
                        <Tag color={post.status === "Đang hiển thị" ? "green" : "orange"}>
                          {post.status}
                        </Tag>
                      </Space>
                    }
                  >
                    <List.Item.Meta
                      title={post.title}
                    />
                    <div style={{ whiteSpace: 'pre-line', marginTop: 10 }}>
                      {post.content}
                    </div>
                  </List.Item>
                )}
              />
            )}
          </TabPane>

          <TabPane tab={<span><PictureOutlined /> Hình ảnh</span>} key="images">
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <Upload
                listType="picture-card"
                fileList={[]}
                beforeUpload={() => false}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              </Upload>
              <p>Chức năng đang được phát triển</p>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    );
  };

  // Modal thêm/sửa căn hộ
  const renderApartmentModal = () => {
    return (
      <Modal
        title={currentApartment ? "Sửa thông tin căn hộ" : "Thêm căn hộ mới"}
        open={isApartmentModalVisible}
        onCancel={handleApartmentCancel}
        footer={[
          <Button key="back" onClick={handleApartmentCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleApartmentSubmit}>
            {currentApartment ? "Cập nhật" : "Thêm mới"}
          </Button>,
        ]}
        width={800}
      >
        <Form
          form={apartmentForm}
          layout="vertical"
          initialValues={{
            category: "Cho thuê",
            status: "Còn trống",
            bedrooms: 1,
            bathrooms: 1
          }}
        >
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề căn hộ!' }]}
          >
            <Input placeholder="Nhập tiêu đề căn hộ" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả căn hộ!' }]}
            >
            <TextArea rows={4} placeholder="Nhập mô tả chi tiết về căn hộ" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ căn hộ!' }]}
          >
            <Input placeholder="Nhập địa chỉ căn hộ" />
          </Form.Item>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              name="price"
              label="Giá thuê/bán (VNĐ)"
              rules={[{ required: true, message: 'Vui lòng nhập giá căn hộ!' }]}
              style={{ flex: 1 }}
            >
              <InputNumber style={{ width: '100%' }} placeholder="Nhập giá căn hộ" formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
            </Form.Item>

            <Form.Item
              name="area"
              label="Diện tích (m²)"
              rules={[{ required: true, message: 'Vui lòng nhập diện tích căn hộ!' }]}
              style={{ flex: 1 }}
            >
              <InputNumber style={{ width: '100%' }} placeholder="Nhập diện tích căn hộ" />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              name="bedrooms"
              label="Số phòng ngủ"
              rules={[{ required: true, message: 'Vui lòng nhập số phòng ngủ!' }]}
              style={{ flex: 1 }}
            >
              <InputNumber style={{ width: '100%' }} placeholder="Nhập số phòng ngủ" min={0} />
            </Form.Item>

            <Form.Item
              name="bathrooms"
              label="Số phòng tắm"
              rules={[{ required: true, message: 'Vui lòng nhập số phòng tắm!' }]}
              style={{ flex: 1 }}
            >
              <InputNumber style={{ width: '100%' }} placeholder="Nhập số phòng tắm" min={0} />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              name="category"
              label="Loại căn hộ"
              rules={[{ required: true, message: 'Vui lòng chọn loại căn hộ!' }]}
              style={{ flex: 1 }}
            >
              <Select>
                <Option value="Cho thuê">Cho thuê</Option>
                <Option value="Bán">Bán</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái căn hộ!' }]}
              style={{ flex: 1 }}
            >
              <Select>
                <Option value="Còn trống">Còn trống</Option>
                <Option value="Đã cho thuê">Đã cho thuê</Option>
                <Option value="Đang đặt cọc">Đang đặt cọc</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="tags"
            label="Tags (phân cách bằng dấu phẩy)"
          >
            <Input placeholder="Ví dụ: Cao cấp, View đẹp, Gần trung tâm" />
          </Form.Item>

          <Form.Item
            name="images"
            label="Hình ảnh"
          >
            <Upload
              listType="picture-card"
              fileList={[]}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  // Modal tạo bài viết
  const renderPostModal = () => {
    return (
      <Modal
        title="Tạo bài viết mới"
        open={isPostModalVisible}
        onCancel={handlePostCancel}
        footer={[
          <Button key="back" onClick={handlePostCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handlePostSubmit}>
            Đăng bài
          </Button>,
        ]}
        width={800}
      >
        <Form
          form={postForm}
          layout="vertical"
          initialValues={{
            status: "Đang hiển thị"
          }}
        >
          <Form.Item
            name="title"
            label="Tiêu đề bài viết"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài viết!' }]}
          >
            <Input placeholder="Nhập tiêu đề bài viết" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung bài viết"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung bài viết!' }]}
          >
            <TextArea rows={10} placeholder="Nhập nội dung chi tiết bài viết" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
          >
            <Select>
              <Option value="Đang hiển thị">Đang hiển thị</Option>
              <Option value="Ẩn">Ẩn</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  // Render phần tải lên ảnh
  const renderUploadContent = () => {
    return (
      <Card title={<span><UploadOutlined /> Quản lý hình ảnh</span>}>
        <Upload.Dragger
          name="files"
          action="/upload.do"
          listType="picture"
          multiple={true}
          beforeUpload={() => false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Kéo thả file vào đây hoặc click để tải lên</p>
          <p className="ant-upload-hint">Hỗ trợ tải lên nhiều file cùng lúc</p>
        </Upload.Dragger>
      </Card>
    );
  };

  // Render quản lý hợp đồng
  const renderContractContent = () => {
    return (
      <Card title={<span><FileProtectOutlined /> Quản lý hợp đồng</span>}>
        <List
          itemLayout="horizontal"
          dataSource={[
            { id: 1, name: "Hợp đồng thuê căn hộ - Nguyễn Văn X", date: "15/03/2025", status: "Đang hiệu lực" },
            { id: 2, name: "Hợp đồng thuê căn hộ - Trần Văn Y", date: "10/03/2025", status: "Đang hiệu lực" },
            { id: 3, name: "Hợp đồng thuê căn hộ - Lê Thị Z", date: "05/03/2025", status: "Chờ ký" },
          ]}
          renderItem={item => (
            <List.Item
              actions={[
                <Button type="link">Xem</Button>,
                <Button type="link">Tải xuống</Button>
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={`Ngày tạo: ${item.date} - Trạng thái: ${item.status}`}
              />
            </List.Item>
          )}
        />
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Button type="primary" icon={<FileAddOutlined />}>Tạo hợp đồng mới</Button>
        </div>
      </Card>
    );
  };

  // Render thanh toán
  const renderPaymentContent = () => {
    return (
      <Card title={<span><WalletOutlined /> Quản lý thanh toán</span>}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Thanh toán đến hạn" key="1">
            <List
              itemLayout="horizontal"
              dataSource={[
                { id: 1, name: "Tiền thuê tháng 3/2025 - Căn hộ A", amount: 5800000, dueDate: "25/03/2025" },
                { id: 2, name: "Tiền thuê tháng 3/2025 - Căn hộ B", amount: 7200000, dueDate: "28/03/2025" },
              ]}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button type="primary">Xác nhận thanh toán</Button>
                  ]}
                >
                  <List.Item.Meta
                    title={item.name}
                    description={`Số tiền: ${new Intl.NumberFormat('vi-VN').format(item.amount)} VNĐ - Hạn thanh toán: ${item.dueDate}`}
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Lịch sử thanh toán" key="2">
            <List
              itemLayout="horizontal"
              dataSource={[
                { id: 1, name: "Tiền thuê tháng 2/2025 - Căn hộ A", amount: 5800000, paidDate: "25/02/2025" },
                { id: 2, name: "Tiền thuê tháng 2/2025 - Căn hộ B", amount: 7200000, paidDate: "26/02/2025" },
                { id: 3, name: "Tiền thuê tháng 1/2025 - Căn hộ A", amount: 5800000, paidDate: "25/01/2025" },
              ]}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button type="link">Xem chi tiết</Button>
                  ]}
                >
                  <List.Item.Meta
                    title={item.name}
                    description={`Số tiền: ${new Intl.NumberFormat('vi-VN').format(item.amount)} VNĐ - Ngày thanh toán: ${item.paidDate}`}
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Card>
    );
  };

  // Render nội dung chính
  const renderMainContent = () => {
    switch (currentView) {
      case "detail":
        return renderApartmentDetail();
      case "upload":
        return renderUploadContent();
      case "contract":
        return renderContractContent();
      case "payment":
        return renderPaymentContent();
      case "list":
      default:
        return renderApartmentList();
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={240}>
        <div style={{ height: 64, padding: '16px', textAlign: 'center' }}>
          <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
            {collapsed ? 'RMS' : 'Rental Management'}
          </Typography.Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Quản lý căn hộ',
              onClick: () => setCurrentView("list")
            },
            {
              key: '2',
              icon: <FormOutlined />,
              label: 'Quản lý bài viết',
              onClick: () => setCurrentView("list")
            },
            {
              key: '3',
              icon: <BuildOutlined />,
              label: 'Quản lý dịch vụ',
              onClick: () => message.info('Tính năng đang phát triển')
            },
            {
              key: '4',
              icon: <TeamOutlined />,
              label: 'Quản lý khách thuê',
              onClick: () => message.info('Tính năng đang phát triển')
            },
            {
              key: '5',
              icon: <WalletOutlined />,
              label: 'Quản lý thanh toán',
              onClick: () => setCurrentView("payment")
            },
            {
              key: '6',
              icon: <FileProtectOutlined />,
              label: 'Quản lý hợp đồng',
              onClick: () => setCurrentView("contract")
            },
            {
              key: '7',
              icon: <UploadOutlined />,
              label: 'Quản lý hình ảnh',
              onClick: () => setCurrentView("upload")
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 24 }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
            <Space>
              <Badge count={5}>
                <Button type="text" icon={<BellOutlined />} style={{ fontSize: '16px' }} />
              </Badge>
              <Avatar icon={<UserOutlined />} />
              <span>Nguyễn Văn A</span>
            </Space>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          {renderMainContent()}
          {renderApartmentModal()}
          {renderPostModal()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default OwnerHome;