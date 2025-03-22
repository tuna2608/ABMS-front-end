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
  Divider,
  Table,
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
  WalletOutlined,
  FileProtectOutlined,
  UploadOutlined,
  InboxOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Header, Sider, Content } = Layout;
const { TextArea } = Input;
const { Text } = Typography;

// Dữ liệu mẫu các bài đăng căn hộ
const sampleApartments = [
  {
    id: 1,
    title: "Căn hộ cao cấp 2 phòng ngủ - The Vinhomes Central Park",
    description:
      "Căn hộ ban công rộng, view sông, nội thất cao cấp, an ninh 24/7",
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
        content:
          "Căn hộ cao cấp 2 phòng ngủ tại Vinhomes Central Park, view sông tuyệt đẹp. Phù hợp cho gia đình hoặc người nước ngoài. Liên hệ ngay để xem nhà.",
        createdAt: "2025-03-12",
        status: "Đang hiển thị",
        depositPrice: 5800000,
      },
    ],
  },
  {
    id: 2,
    title: "Studio căn hộ The Sun Avenue - Đầy đủ nội thất",
    description:
      "Căn hộ đầy đủ nội thất, cửa sổ lớn, bảo vệ 24/7, gần trung tâm thương mại",
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
    posts: [],
  },
  {
    id: 3,
    title: "Căn hộ 3 phòng ngủ - Masteri Thảo Điền",
    description:
      "Căn góc, view đẹp, nội thất cao cấp, bảo vệ 24/7, hồ bơi, gym",
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
        content:
          "Căn góc 3 phòng ngủ, view đẹp, nội thất cao cấp. Tiện ích đầy đủ: hồ bơi, gym. Phù hợp cho gia đình hoặc nhóm ở ghép.",
        createdAt: "2025-03-08",
        status: "Đang hiển thị",
        depositPrice: 7200000,
      },
    ],
  },
  {
    id: 4,
    title: "Căn hộ Penthouse - Saigon Pearl",
    description:
      "Penthouse sang trọng, view toàn thành phố, sân vườn riêng, an ninh tuyệt đối",
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
        content:
          "Penthouse sang trọng với view toàn thành phố, thiết kế hiện đại. Diện tích lớn với 4 phòng ngủ và sân vườn riêng.",
        createdAt: "2025-03-05",
        status: "Đang hiển thị",
        depositPrice: 30000000,
      },
    ],
  },
  {
    id: 5,
    title: "Căn hộ 2 phòng ngủ - Gateway Thảo Điền",
    description:
      "Căn hộ thiết kế hiện đại, view sông, bảo vệ 24/7, gần trạm metro",
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
    posts: [],
  },
];

// Các loại bài viết
const postTypes = ["Cho thuê", "Mua bán"];

// Các danh mục căn hộ
const categories = ["Tất cả", "Cho thuê", "Bán", "Đã cho thuê", "Đang đặt cọc"];

// Các khu vực
const areas = [
  "Tất cả",
  "Quận 1",
  "Quận 2",
  "Quận Bình Thạnh",
  "Quận 7",
  "Quận 4",
];

const statusColors = {
  "Còn trống": "green",
  "Đã cho thuê": "red",
  "Đang đặt cọc": "orange",
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
  const [selectedPostType, setSelectedPostType] = useState(null);
  const [filteredApartmentsForPost, setFilteredApartmentsForPost] = useState(
    []
  );
  const pageSize = 4;

  // Giả lập việc lấy dữ liệu từ API
  useEffect(() => {
    setTimeout(() => {
      setApartments(sampleApartments);
      setLoading(false);
    }, 1000);
  }, []);

  // Effect để lọc các căn hộ cho bài viết khi loại bài viết thay đổi
  useEffect(() => {
    if (selectedPostType) {
      // Lọc căn hộ phù hợp với loại bài viết đã chọn
      const filtered = apartments.filter((apt) => {
        const matchesType =
          selectedPostType === "Cho thuê"
            ? apt.category === "Cho thuê"
            : apt.category === "Bán";
        return matchesType;
      });

      // Sắp xếp: chưa có bài viết lên đầu
      filtered.sort((a, b) => {
        if (a.posts.length === 0 && b.posts.length > 0) return -1;
        if (a.posts.length > 0 && b.posts.length === 0) return 1;
        return 0;
      });

      setFilteredApartmentsForPost(filtered);
    } else {
      setFilteredApartmentsForPost([]);
    }
  }, [selectedPostType, apartments]);

  // Toggle sidebar collapse
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Xử lý lọc căn hộ theo danh mục và khu vực
  const filteredApartments = apartments.filter((apartment) => {
    const matchSearch =
      apartment.title.toLowerCase().includes(searchText.toLowerCase()) ||
      apartment.description.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory =
      selectedCategory === "Tất cả" || apartment.category === selectedCategory;
    const matchArea =
      selectedArea === "Tất cả" || apartment.address.includes(selectedArea);

    return matchSearch && matchCategory && matchArea;
  });

  // Phân trang
  const paginatedApartments = filteredApartments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const onCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const onAreaChange = (value) => {
    setSelectedArea(value);
    setCurrentPage(1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ/tháng";
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
        tags: apartment.tags.join(", "),
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
    apartmentForm.validateFields().then((values) => {
      const tagsArray = values.tags.split(",").map((tag) => tag.trim());
      const newApartment = {
        ...values,
        tags: tagsArray,
        id: currentApartment ? currentApartment.id : apartments.length + 1,
        owner: "Nguyễn Văn A",
        avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
        date: new Date().toISOString().split("T")[0],
        views: currentApartment ? currentApartment.views : 0,
        images: currentApartment ? currentApartment.images : [],
        posts: currentApartment ? currentApartment.posts : [],
      };

      if (currentApartment) {
        // Cập nhật căn hộ hiện có
        setApartments(
          apartments.map((apt) =>
            apt.id === currentApartment.id ? newApartment : apt
          )
        );
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
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa căn hộ này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        setApartments(apartments.filter((apt) => apt.id !== apartmentId));
        message.success("Đã xóa căn hộ thành công!");
        if (currentApartment && currentApartment.id === apartmentId) {
          setCurrentView("list");
          setCurrentApartment(null);
        }
      },
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

  // Xử lý chọn loại bài viết cho create post
  const handlePostTypeChange = (value) => {
    setSelectedPostType(value);
    postForm.setFieldsValue({
      apartmentId: undefined,
    });
  };

  // Xử lý chọn căn hộ cho create post
  const handleSelectApartmentForPost = (value) => {
    const selected = apartments.find((apt) => apt.id === value);
    if (selected) {
      setCurrentApartment(selected);
      // Đặt giá tiền cọc mặc định là bằng giá thuê/bán
      postForm.setFieldsValue({
        depositPrice: selected.price,
      });
    }
  };

  // Xử lý đóng modal bài viết
  const handlePostCancel = () => {
    setIsPostModalVisible(false);
    if (currentView === "createPost") {
      postForm.resetFields();
      setSelectedPostType(null);
      setCurrentApartment(null);
    }
  };

  // Xử lý lưu bài viết
  const handlePostSubmit = () => {
    postForm.validateFields().then((values) => {
      const selectedApartment = apartments.find(
        (apt) => apt.id === values.apartmentId
      );

      if (!selectedApartment) {
        message.error("Vui lòng chọn căn hộ trước khi tạo bài viết");
        return;
      }

      const newPost = {
        id: Math.max(0, ...selectedApartment.posts.map((p) => p.id)) + 1,
        title: values.title,
        content: values.content,
        depositPrice: values.depositPrice,
        createdAt: new Date().toISOString().split("T")[0],
        status: "Đang hiển thị",
      };

      const updatedPosts = [...selectedApartment.posts, newPost];
      const updatedApartment = { ...selectedApartment, posts: updatedPosts };
      const updatedApartments = apartments.map((apt) =>
        apt.id === selectedApartment.id ? updatedApartment : apt
      );

      setApartments(updatedApartments);
      message.success("Đã tạo bài viết mới thành công!");

      if (currentView === "createPost") {
        postForm.resetFields();
        setSelectedPostType(null);
        setCurrentApartment(null);
      } else {
        setIsPostModalVisible(false);
        setCurrentApartment(updatedApartment);
      }
    });
  };

  // Xử lý xóa bài viết
  const handleDeletePost = (postId) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa bài viết này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        if (currentApartment) {
          const updatedPosts = currentApartment.posts.filter(
            (post) => post.id !== postId
          );
          const updatedApartment = { ...currentApartment, posts: updatedPosts };
          const updatedApartments = apartments.map((apt) =>
            apt.id === currentApartment.id ? updatedApartment : apt
          );

          setApartments(updatedApartments);
          setCurrentApartment(updatedApartment);
          message.success("Đã xóa bài viết thành công!");
        }
      },
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
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showApartmentModal()}
          >
            Thêm căn hộ mới
          </Button>
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
              onChange={onCategoryChange}
            >
              {categories.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
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
              {areas.map((area) => (
                <Option key={area} value={area}>
                  {area}
                </Option>
              ))}
            </Select>
          </Space>
        </Space>

        <List
          itemLayout="vertical"
          size="large"
          dataSource={paginatedApartments}
          renderItem={(apartment) => (
            <List.Item
              key={apartment.id}
              actions={
                !loading && [
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
                ]
              }
              extra={
                !loading && (
                  <div style={{ textAlign: "right" }}>
                    <Badge
                      color={statusColors[apartment.status]}
                      text={apartment.status}
                      style={{ marginBottom: 8 }}
                    />
                    <div style={{ marginBottom: 8 }}>
                      Ngày đăng: {apartment.date}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <Badge count={apartment.posts.length} overflowCount={99}>
                        <Tag color="blue">Bài viết</Tag>
                      </Badge>
                    </div>
                  </div>
                )
              }
            >
              <Skeleton loading={loading} active avatar>
                <List.Item.Meta
                  avatar={<Avatar src={apartment.avatar} />}
                  title={
                    <Space>
                      <Button
                        type="link"
                        onClick={() => handleViewApartmentDetail(apartment)}
                        style={{
                          padding: 0,
                          height: "auto",
                          lineHeight: "inherit",
                        }}
                      >
                        {apartment.title}
                      </Button>
                      {apartment.status === "Còn trống" && (
                        <Tag color="green" icon={<CheckCircleOutlined />}>
                          Còn trống
                        </Tag>
                      )}
                      {apartment.status === "Đang đặt cọc" && (
                        <Tag color="orange" icon={<ClockCircleOutlined />}>
                          Đang đặt cọc
                        </Tag>
                      )}
                    </Space>
                  }
                  description={
                    <Space direction="vertical" size="small">
                      <span>
                        Người đăng: {apartment.owner} | Loại:{" "}
                        {apartment.category}
                      </span>
                      <Space>
                        <IconText
                          icon={<EnvironmentOutlined />}
                          text={apartment.address}
                        />
                        <IconText
                          icon={<AreaChartOutlined />}
                          text={`${apartment.area} m²`}
                        />
                        <IconText
                          icon={<DollarOutlined />}
                          text={formatPrice(apartment.price)}
                        />
                        <IconText
                          icon={<UserOutlined />}
                          text={`${apartment.bedrooms} PN, ${apartment.bathrooms} VS`}
                        />
                      </Space>
                    </Space>
                  }
                />
                <div style={{ marginTop: 10 }}>{apartment.description}</div>
                <div style={{ marginTop: 10 }}>
                  {apartment.tags.map((tag) => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Skeleton>
            </List.Item>
          )}
        />

        <div style={{ textAlign: "right", marginTop: 16 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredApartments.length}
            onChange={(page) => setCurrentPage(page)}
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
            <Button icon={<UnorderedListOutlined />} onClick={handleBackToList}>
              Quay lại
            </Button>
            <span>Chi tiết căn hộ: {currentApartment.title}</span>
          </Space>
        }
        extra={
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => showApartmentModal(currentApartment)}
            >
              Sửa thông tin
            </Button>
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDeleteApartment(currentApartment.id)}
            >
              Xóa căn hộ
            </Button>
          </Space>
        }
      >
        <Tabs defaultActiveKey="info">
          <TabPane
            tab={
              <span>
                <AppstoreOutlined /> Thông tin căn hộ
              </span>
            }
            key="info"
          >
            <Descriptions
              bordered
              column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Tiêu đề">
                {currentApartment.title}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {currentApartment.address}
              </Descriptions.Item>
              <Descriptions.Item label="Giá">
                {formatPrice(currentApartment.price)}
              </Descriptions.Item>
              <Descriptions.Item label="Diện tích">
                {currentApartment.area} m²
              </Descriptions.Item>
              <Descriptions.Item label="Phòng ngủ">
                {currentApartment.bedrooms}
              </Descriptions.Item>
              <Descriptions.Item label="Phòng tắm">
                {currentApartment.bathrooms}
              </Descriptions.Item>
              <Descriptions.Item label="Chủ sở hữu">
                {currentApartment.owner}
              </Descriptions.Item>
              <Descriptions.Item label="Loại căn hộ">
                {currentApartment.category}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Badge
                  color={statusColors[currentApartment.status]}
                  text={currentApartment.status}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Ngày đăng">
                {currentApartment.date}
              </Descriptions.Item>
              <Descriptions.Item label="Lượt xem">
                {currentApartment.views}
              </Descriptions.Item>
              <Descriptions.Item label="Hình ảnh">
                {currentApartment.images.length} hình ảnh
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả" span={3}>
                {currentApartment.description}
              </Descriptions.Item>
              <Descriptions.Item label="Tags" span={3}>
                {currentApartment.tags.map((tag) => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </Descriptions.Item>
            </Descriptions>
          </TabPane>

          <TabPane
            tab={
              <span>
                <FileTextOutlined /> Bài viết ({currentApartment.posts.length})
              </span>
            }
            key="posts"
          >
            <div style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                icon={<FileAddOutlined />}
                onClick={() => showPostModal()}
                disabled={currentApartment.posts.length >= 2}
              >
                Tạo bài viết mới
              </Button>
              {currentApartment.posts.length >= 2 && (
                <Text type="warning" style={{ marginLeft: 8 }}>
                  Đã đạt giới hạn tối đa 2 bài viết cho căn hộ này
                </Text>
              )}
            </div>

            {currentApartment.posts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p>Chưa có bài viết nào cho căn hộ này</p>
              </div>
            ) : (
              <List
                itemLayout="vertical"
                dataSource={currentApartment.posts}
                renderItem={(post) => (
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
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={post.title}
                      description={
                        <Space direction="vertical">
                          <Text>Ngày tạo: {post.createdAt}</Text>
                          <Tag
                            color={
                              post.status === "Đang hiển thị"
                                ? "green"
                                : "default"
                            }
                          >
                            {post.status}
                          </Tag>
                          <Text>
                            Giá đặt cọc: {formatPrice(post.depositPrice)}
                          </Text>
                        </Space>
                      }
                    />
                    <div>{post.content}</div>
                  </List.Item>
                )}
              />
            )}
          </TabPane>

          <TabPane
            tab={
              <span>
                <PictureOutlined /> Hình ảnh
              </span>
            }
            key="images"
          >
            <Upload
              listType="picture-card"
              fileList={currentApartment.images.map((img, index) => ({
                uid: -index,
                name: img,
                status: "done",
                url: img,
              }))}
              onPreview={() => {}}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            </Upload>
          </TabPane>
        </Tabs>
      </Card>
    );
  };

  // Xử lý mở modal bài viết
  const showPostModal = (post = null) => {
    if (currentView === "createPost") {
      // Tiếp tục ở chế độ create post
    } else {
      if (post) {
        // Chỉnh sửa bài viết hiện có
        postForm.setFieldsValue({
          apartmentId: currentApartment.id,
          title: post.title,
          content: post.content,
          depositPrice: post.depositPrice,
        });
      } else {
        // Tạo bài viết mới
        postForm.setFieldsValue({
          apartmentId: currentApartment.id,
          depositPrice: currentApartment.price,
        });
      }
      setIsPostModalVisible(true);
    }
  };

  // Render trang tạo bài viết
  const renderCreatePost = () => {
    return (
      <Card
        title={
          <Space>
            <FileAddOutlined />
            <span>Tạo bài viết mới</span>
          </Space>
        }
      >
        <Form form={postForm} layout="vertical">
          <Form.Item
            name="postType"
            label="Loại bài viết"
            rules={[{ required: true, message: "Vui lòng chọn loại bài viết" }]}
          >
            <Select
              placeholder="Chọn loại bài viết"
              onChange={handlePostTypeChange}
              style={{ maxWidth: 400 }}
            >
              {postTypes.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="apartmentId"
            label="Chọn căn hộ"
            rules={[{ required: true, message: "Vui lòng chọn căn hộ" }]}
          >
            <Select
              placeholder="Chọn căn hộ"
              onChange={handleSelectApartmentForPost}
              disabled={!selectedPostType}
              style={{ maxWidth: 600 }}
            >
              {filteredApartmentsForPost.map((apt) => (
                <Option key={apt.id} value={apt.id}>
                  <Space>
                    {apt.title} - {apt.address}
                    {apt.posts.length > 0 && (
                      <Tag color="orange">
                        Đã có {apt.posts.length} bài viết
                      </Tag>
                    )}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>

          {currentApartment && (
            <>
              <Divider />
              <Text strong>Thông tin bài viết</Text>

              <Form.Item
                name="title"
                label="Tiêu đề bài viết"
                rules={[
                  { required: true, message: "Vui lòng nhập tiêu đề bài viết" },
                ]}
                style={{ marginTop: 16 }}
              >
                <Input placeholder="Nhập tiêu đề bài viết" maxLength={100} />
              </Form.Item>

              <Form.Item
                name="content"
                label="Nội dung bài viết"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập nội dung bài viết",
                  },
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="Mô tả chi tiết về căn hộ, tiện ích, điều kiện thuê/mua..."
                />
              </Form.Item>

              <Form.Item
                name="depositPrice"
                label="Giá đặt cọc"
                rules={[
                  { required: true, message: "Vui lòng nhập giá đặt cọc" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%", maxWidth: 400 }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  addonAfter="VNĐ"
                />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" onClick={handlePostSubmit}>
                    Tạo bài viết
                  </Button>
                  <Button
                    onClick={() => {
                      postForm.resetFields();
                      setSelectedPostType(null);
                      setCurrentApartment(null);
                    }}
                  >
                    Làm mới
                  </Button>
                  <Button onClick={handleBackToList}>Quay lại</Button>
                </Space>
              </Form.Item>
            </>
          )}
        </Form>
      </Card>
    );
  };

  // Render trang hợp đồng
  const renderContracts = () => {
    const contractColumns = [
      {
        title: "Mã hợp đồng",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Căn hộ",
        dataIndex: "apartment",
        key: "apartment",
      },
      {
        title: "Khách hàng",
        dataIndex: "customer",
        key: "customer",
      },
      {
        title: "Loại hợp đồng",
        dataIndex: "type",
        key: "type",
        render: (type) => (
          <Tag color={type === "Thuê" ? "green" : "blue"}>{type}</Tag>
        ),
      },
      {
        title: "Ngày bắt đầu",
        dataIndex: "startDate",
        key: "startDate",
      },
      {
        title: "Ngày kết thúc",
        dataIndex: "endDate",
        key: "endDate",
      },
      {
        title: "Giá trị",
        dataIndex: "value",
        key: "value",
        render: (value) => formatPrice(value),
      },
      {
        title: "Trạng thái",
        key: "status",
        dataIndex: "status",
        render: (status) => {
          let color = "default";
          if (status === "Đang hiệu lực") color = "green";
          else if (status === "Đã hết hạn") color = "red";
          else if (status === "Chờ ký kết") color = "orange";
          return <Tag color={color}>{status}</Tag>;
        },
      },
      {
        title: "Thao tác",
        key: "action",
        render: () => (
          <Space size="middle">
            <Button type="link" icon={<FileProtectOutlined />}>
              Xem
            </Button>
            <Button type="link" icon={<EditOutlined />}>
              Sửa
            </Button>
          </Space>
        ),
      },
    ];

    const sampleContracts = [
      {
        key: "1",
        id: "HD001",
        apartment: "Căn hộ 2PN Vinhomes Central Park",
        customer: "Nguyễn Văn X",
        type: "Thuê",
        startDate: "01/01/2025",
        endDate: "31/12/2025",
        value: 5800000,
        status: "Đang hiệu lực",
      },
      {
        key: "2",
        id: "HD002",
        apartment: "Căn hộ 3PN Masteri Thảo Điền",
        customer: "Trần Thị Y",
        type: "Thuê",
        startDate: "15/02/2025",
        endDate: "14/02/2026",
        value: 7200000,
        status: "Chờ ký kết",
      },
    ];

    return (
      <Card
        title={
          <Space>
            <FileProtectOutlined />
            <span>Quản lý hợp đồng</span>
          </Space>
        }
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            Tạo hợp đồng mới
          </Button>
        }
      >
        <Table columns={contractColumns} dataSource={sampleContracts} />
      </Card>
    );
  };

  // Render trang thanh toán
  const renderPayments = () => {
    const paymentColumns = [
      {
        title: "Mã giao dịch",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Căn hộ",
        dataIndex: "apartment",
        key: "apartment",
      },
      {
        title: "Khách hàng",
        dataIndex: "customer",
        key: "customer",
      },
      {
        title: "Loại thanh toán",
        dataIndex: "type",
        key: "type",
        render: (type) => (
          <Tag
            color={
              type === "Tiền thuê"
                ? "green"
                : type === "Tiền cọc"
                ? "orange"
                : "blue"
            }
          >
            {type}
          </Tag>
        ),
      },
      {
        title: "Ngày thanh toán",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Số tiền",
        dataIndex: "amount",
        key: "amount",
        render: (amount) => formatPrice(amount),
      },
      {
        title: "Trạng thái",
        key: "status",
        dataIndex: "status",
        render: (status) => {
          let color = "default";
          if (status === "Đã thanh toán") color = "green";
          else if (status === "Chưa thanh toán") color = "red";
          else if (status === "Đang xử lý") color = "orange";
          return <Tag color={color}>{status}</Tag>;
        },
      },
      {
        title: "Thao tác",
        key: "action",
        render: () => (
          <Space size="middle">
            <Button type="link" icon={<AppstoreOutlined />}>
              Chi tiết
            </Button>
            <Button type="link" icon={<EditOutlined />}>
              Cập nhật
            </Button>
          </Space>
        ),
      },
    ];

    const samplePayments = [
      {
        key: "1",
        id: "TT001",
        apartment: "Căn hộ 2PN Vinhomes Central Park",
        customer: "Nguyễn Văn X",
        type: "Tiền thuê",
        date: "01/03/2025",
        amount: 5800000,
        status: "Đã thanh toán",
      },
      {
        key: "2",
        id: "TT002",
        apartment: "Căn hộ 3PN Masteri Thảo Điền",
        customer: "Trần Thị Y",
        type: "Tiền cọc",
        date: "15/02/2025",
        amount: 7200000,
        status: "Đã thanh toán",
      },
      {
        key: "3",
        id: "TT003",
        apartment: "Căn hộ 2PN Vinhomes Central Park",
        customer: "Nguyễn Văn X",
        type: "Tiền thuê",
        date: "01/04/2025",
        amount: 5800000,
        status: "Chưa thanh toán",
      },
    ];

    return (
      <Card
        title={
          <Space>
            <WalletOutlined />
            <span>Quản lý thanh toán</span>
          </Space>
        }
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            Ghi nhận thanh toán mới
          </Button>
        }
      >
        <Table columns={paymentColumns} dataSource={samplePayments} />
      </Card>
    );
  };

  // Render trang tải lên tài liệu
  const renderUploadDocuments = () => {
    return (
      <Card
        title={
          <Space>
            <UploadOutlined />
            <span>Tải lên tài liệu</span>
          </Space>
        }
      >
        <Tabs defaultActiveKey="apartment">
          <TabPane tab="Tài liệu căn hộ" key="apartment">
            <Form layout="vertical">
              <Form.Item label="Chọn căn hộ">
                <Select
                  placeholder="Chọn căn hộ"
                  style={{ width: "100%", maxWidth: 600 }}
                >
                  {apartments.map((apt) => (
                    <Option key={apt.id} value={apt.id}>
                      {apt.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Loại tài liệu">
                <Select
                  placeholder="Chọn loại tài liệu"
                  style={{ width: "100%", maxWidth: 400 }}
                >
                  <Option value="sodo">Sơ đồ căn hộ</Option>
                  <Option value="thongtin">Thông tin pháp lý</Option>
                  <Option value="hinh">Hình ảnh</Option>
                  <Option value="khac">Tài liệu khác</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Tài liệu">
                <Upload.Dragger
                  multiple
                  listType="picture"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Nhấp hoặc kéo file vào khu vực này để tải lên
                  </p>
                  <p className="ant-upload-hint">
                    Hỗ trợ tải lên một hoặc nhiều file
                  </p>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item>
                <Button type="primary">Tải lên</Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Tài liệu hợp đồng" key="contract">
            <Form layout="vertical">
              <Form.Item label="Chọn hợp đồng">
                <Select
                  placeholder="Chọn hợp đồng"
                  style={{ width: "100%", maxWidth: 600 }}
                >
                  <Option value="HD001">
                    HD001 - Căn hộ 2PN Vinhomes Central Park
                  </Option>
                  <Option value="HD002">
                    HD002 - Căn hộ 3PN Masteri Thảo Điền
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item label="Loại tài liệu">
                <Select
                  placeholder="Chọn loại tài liệu"
                  style={{ width: "100%", maxWidth: 400 }}
                >
                  <Option value="hopdong">Hợp đồng có chữ ký</Option>
                  <Option value="cmnd">CMND/CCCD</Option>
                  <Option value="bienbangiao">Biên bản giao nhận</Option>
                  <Option value="khac">Tài liệu khác</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Tài liệu">
                <Upload.Dragger
                  multiple
                  listType="picture"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Nhấp hoặc kéo file vào khu vực này để tải lên
                  </p>
                  <p className="ant-upload-hint">
                    Hỗ trợ tải lên một hoặc nhiều file
                  </p>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item>
                <Button type="primary">Tải lên</Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    );
  };
  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Quản lý căn hộ",
      onClick: () => {
        setCurrentView("list");
        setCurrentApartment(null);
      },
    },
    {
      key: "2",
      icon: <FormOutlined />,
      label: "Tạo bài viết",
      onClick: () => {
        setCurrentView("createPost");
        setCurrentApartment(null);
        postForm.resetFields();
        setSelectedPostType(null);
      },
    },
    {
      key: "3",
      icon: <FileProtectOutlined />,
      label: "Quản lý hợp đồng",
      onClick: () => setCurrentView("contract"),
    },
    {
      key: "4",
      icon: <WalletOutlined />,
      label: "Quản lý thanh toán",
      onClick: () => setCurrentView("payment"),
    },
    {
      key: "5",
      icon: <UploadOutlined />,
      label: "Tải lên tài liệu",
      onClick: () => setCurrentView("upload"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
        <div
          style={{
            height: 64,
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <HomeOutlined style={{ fontSize: 24, color: "#fff" }} />
          {!collapsed && (
            <span style={{ color: "#fff", fontSize: 18, marginLeft: 12 }}>
              Quản lý nhà
            </span>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[
            currentView === "list" || currentView === "detail"
              ? "1"
              : currentView === "createPost"
              ? "2"
              : currentView === "contract"
              ? "3"
              : currentView === "payment"
              ? "4"
              : currentView === "upload"
              ? "5"
              : "1",
          ]}
          items={menuItems}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
          <Space>
            <Badge count={3}>
              <Button icon={<BellOutlined />} shape="circle" />
            </Badge>
            <Button icon={<UserOutlined />} shape="circle" />
            <span>Nguyễn Văn A</span>
          </Space>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
          }}
        >
          {currentView === "list" && renderApartmentList()}
          {currentView === "detail" && renderApartmentDetail()}
          {currentView === "createPost" && renderCreatePost()}
          {currentView === "contract" && renderContracts()}
          {currentView === "payment" && renderPayments()}
          {currentView === "upload" && renderUploadDocuments()}
        </Content>
      </Layout>

      {/* Modal thêm/sửa căn hộ */}
      <Modal
        title={
          currentApartment ? "Chỉnh sửa thông tin căn hộ" : "Thêm căn hộ mới"
        }
        open={isApartmentModalVisible}
        onOk={handleApartmentSubmit}
        onCancel={handleApartmentCancel}
        width={800}
      >
        <Form form={apartmentForm} layout="vertical">
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input placeholder="Nhập tiêu đề căn hộ" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <TextArea rows={4} placeholder="Nhập mô tả chi tiết về căn hộ" />
          </Form.Item>

          <Space size="large" style={{ width: "100%" }}>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              style={{ width: "100%" }}
            >
              <Input placeholder="Nhập địa chỉ căn hộ" />
            </Form.Item>

            <Form.Item
              name="price"
              label="Giá"
              rules={[{ required: true, message: "Vui lòng nhập giá" }]}
              style={{ width: "100%" }}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                placeholder="Nhập giá thuê/bán"
                addonAfter="VNĐ"
              />
            </Form.Item>
          </Space>

          <Space size="large" style={{ width: "100%" }}>
            <Form.Item
              name="area"
              label="Diện tích"
              rules={[{ required: true, message: "Vui lòng nhập diện tích" }]}
              style={{ width: "100%" }}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                placeholder="Diện tích"
                addonAfter="m²"
              />
            </Form.Item>

            <Form.Item
              name="bedrooms"
              label="Số phòng ngủ"
              rules={[
                { required: true, message: "Vui lòng nhập số phòng ngủ" },
              ]}
              style={{ width: "100%" }}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                placeholder="Số phòng ngủ"
              />
            </Form.Item>

            <Form.Item
              name="bathrooms"
              label="Số phòng tắm"
              rules={[
                { required: true, message: "Vui lòng nhập số phòng tắm" },
              ]}
              style={{ width: "100%" }}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                placeholder="Số phòng tắm"
              />
            </Form.Item>
          </Space>

          <Space size="large" style={{ width: "100%" }}>
            <Form.Item
              name="category"
              label="Loại"
              rules={[{ required: true, message: "Vui lòng chọn loại" }]}
              style={{ width: "100%" }}
            >
              <Select placeholder="Chọn loại">
                <Option value="Cho thuê">Cho thuê</Option>
                <Option value="Bán">Bán</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
              style={{ width: "100%" }}
            >
              <Select placeholder="Chọn trạng thái">
                <Option value="Còn trống">Còn trống</Option>
                <Option value="Đã cho thuê">Đã cho thuê</Option>
                <Option value="Đang đặt cọc">Đang đặt cọc</Option>
              </Select>
            </Form.Item>
          </Space>

          <Form.Item
            name="tags"
            label="Tags"
            rules={[{ required: true, message: "Vui lòng nhập tags" }]}
          >
            <Input placeholder="Nhập các tags (phân cách bởi dấu phẩy)" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal tạo bài viết */}
      <Modal
        title="Tạo bài viết"
        open={isPostModalVisible}
        onOk={handlePostSubmit}
        onCancel={handlePostCancel}
        width={800}
      >
        <Form form={postForm} layout="vertical">
          <Form.Item name="apartmentId" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="title"
            label="Tiêu đề bài viết"
            rules={[
              { required: true, message: "Vui lòng nhập tiêu đề bài viết" },
            ]}
          >
            <Input placeholder="Nhập tiêu đề bài viết" maxLength={100} />
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung bài viết"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung bài viết" },
            ]}
          >
            <TextArea
              rows={6}
              placeholder="Mô tả chi tiết về căn hộ, tiện ích, điều kiện thuê/mua..."
            />
          </Form.Item>

          <Form.Item
            name="depositPrice"
            label="Giá đặt cọc"
            rules={[{ required: true, message: "Vui lòng nhập giá đặt cọc" }]}
          >
            <InputNumber
              style={{ width: "100%", maxWidth: 400 }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              addonAfter="VNĐ"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default OwnerHome;
