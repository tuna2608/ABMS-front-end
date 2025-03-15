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
  Tooltip
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
  ClockCircleOutlined
} from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

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
    status: "Đã cho thuê",
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
    status: "Còn trống",
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
    status: "Đang đặt cọc",
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
    status: "Còn trống",
    images: ["apartment5.jpg"]
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
  const pageSize = 4;

  // Giả lập việc lấy dữ liệu từ API
  useEffect(() => {
    setTimeout(() => {
      setApartments(sampleApartments);
      setLoading(false);
    }, 1000);
  }, []);

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

  return (
    <div style={{ padding: "20px" }}>
      <Card 
        title={
          <Space>
            <HomeOutlined /> 
            <span>Quản lý căn hộ chung cư</span>
          </Space>
        } 
        extra={<Button type="primary" icon={<HomeOutlined />}>Thêm căn hộ mới</Button>}
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
                <IconText icon={<EnvironmentOutlined />} text={apartment.address} key="list-location" />,
                <IconText icon={<AreaChartOutlined />} text={`${apartment.area} m²`} key="list-area" />,
                <IconText icon={<DollarOutlined />} text={formatPrice(apartment.price)} key="list-price" />,
                <IconText icon={<UserOutlined />} text={`${apartment.bedrooms} PN, ${apartment.bathrooms} VS`} key="list-rooms" />,
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
                      {apartment.status === "Còn trống" && (
                        <Tag color="green" icon={<CheckCircleOutlined />}>Còn trống</Tag>
                      )}
                      {apartment.status === "Đang đặt cọc" && (
                        <Tag color="orange" icon={<ClockCircleOutlined />}>Đang đặt cọc</Tag>
                      )}
                    </Space>
                  }
                  description={`Người đăng: ${apartment.owner} | Loại: ${apartment.category}`}
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
    </div>
  );
};

export default OwnerHome;