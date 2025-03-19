import React, { useState, useEffect } from "react";
import { 
  Card, 
  Row, 
  Col,
  Space, 
  Tag, 
  Input, 
  Select, 
  Button, 
  Pagination,
  Skeleton,
  Typography,
  Badge,
  Tooltip,
} from "antd";
import { 
  HomeOutlined, 
  DollarOutlined, 
  UserOutlined, 
  SearchOutlined, 
  FilterOutlined,
  EnvironmentOutlined,
  AreaChartOutlined,
  EyeOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../../redux/apiCalls";

const { Search } = Input;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

// Dữ liệu mẫu các bài đăng căn hộ
const sampleApartments = [
  {
    id: 1,
    title: "Căn hộ cao cấp Vinhomes Central Park",
    description: "Căn hộ ban công rộng, view sông, nội thất cao cấp, an ninh 24/7",
    address: "Quận Bình Thạnh, TP.HCM",
    price: 5800000,
    area: 70,
    bedrooms: 2,
    bathrooms: 2,
    owner: "Văn Phú Invest",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
    date: "2025-03-12",
    category: "Cho thuê",
    tags: ["Cao cấp", "Đầy đủ nội thất", "View sông"],
    views: 145,
    status: "Còn trống",
    image: "https://picsum.photos/400/300?random=1"
  },
  {
    id: 2,
    title: "Studio căn hộ The Sun Avenue",
    description: "Căn hộ đầy đủ nội thất, cửa sổ lớn, bảo vệ 24/7, gần trung tâm thương mại",
    address: "Quận 2, TP.HCM",
    price: 3500000,
    area: 35,
    bedrooms: 1,
    bathrooms: 1,
    owner: "Landsoft Building",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
    date: "2025-03-10",
    category: "Cho thuê",
    tags: ["Studio", "Đầy đủ nội thất", "Gần trung tâm"],
    views: 98,
    status: "Đã cho thuê",
    image: "https://picsum.photos/400/300?random=2"
  },
  {
    id: 3,
    title: "Căn hộ 3 phòng ngủ Masteri Thảo Điền",
    description: "Căn góc, view đẹp, nội thất cao cấp, bảo vệ 24/7, hồ bơi, gym",
    address: "Quận 2, TP.HCM",
    price: 7200000,
    area: 95,
    bedrooms: 3,
    bathrooms: 2,
    owner: "Osaka Complex",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
    date: "2025-03-08",
    category: "Cho thuê",
    tags: ["Căn góc", "Nội thất cao cấp", "View đẹp"],
    views: 167,
    status: "Còn trống",
    image: "https://picsum.photos/400/300?random=3"
  },
  {
    id: 4,
    title: "Penthouse Saigon Pearl",
    description: "Penthouse sang trọng, view toàn thành phố, sân vườn riêng, an ninh tuyệt đối",
    address: "Quận Bình Thạnh, TP.HCM",
    price: 15000000,
    area: 180,
    bedrooms: 4,
    bathrooms: 3,
    owner: "Sky Garden",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=4",
    date: "2025-03-05",
    category: "Bán",
    tags: ["Penthouse", "Sang trọng", "View toàn thành phố"],
    views: 213,
    status: "Đang đặt cọc",
    image: "https://picsum.photos/400/300?random=4"
  },
  {
    id: 5,
    title: "Căn hộ 2 phòng ngủ Gateway Thảo Điền",
    description: "Căn hộ thiết kế hiện đại, view sông, bảo vệ 24/7, gần trạm metro",
    address: "Quận 2, TP.HCM",
    price: 6000000,
    area: 65,
    bedrooms: 2,
    bathrooms: 2,
    owner: "Văn Phú Invest",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=5",
    date: "2025-03-01",
    category: "Cho thuê",
    tags: ["Hiện đại", "View sông", "Gần metro"],
    views: 187,
    status: "Còn trống",
    image: "https://picsum.photos/400/300?random=5"
  },
  {
    id: 6,
    title: "Căn hộ cao cấp Phú Đông",
    description: "Căn hộ thiết kế sang trọng, đầy đủ tiện nghi, an ninh tốt, tiện ích đầy đủ",
    address: "TP. Thủ Đức, TP.HCM",
    price: 4500000,
    area: 55,
    bedrooms: 2,
    bathrooms: 1,
    owner: "Landsoft Building",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=6",
    date: "2025-02-25",
    category: "Cho thuê",
    tags: ["Mới xây", "Hiện đại", "Tiện ích đầy đủ"],
    views: 142,
    status: "Còn trống",
    image: "https://picsum.photos/400/300?random=6"
  },
  {
    id: 7,
    title: "Căn hộ dịch vụ quận 1",
    description: "Căn hộ dịch vụ cao cấp, full nội thất, dịch vụ hàng ngày, vị trí trung tâm",
    address: "Quận 1, TP.HCM",
    price: 9000000,
    area: 45,
    bedrooms: 1,
    bathrooms: 1,
    owner: "Sky Garden",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=7",
    date: "2025-02-20",
    category: "Cho thuê",
    tags: ["Dịch vụ", "Trung tâm", "Sang trọng"],
    views: 208,
    status: "Còn trống",
    image: "https://picsum.photos/400/300?random=7"
  },
  {
    id: 8,
    title: "Căn hộ 1 phòng ngủ Sunrise City",
    description: "Căn hộ thiết kế hiện đại, view đẹp, tiện ích đầy đủ, bảo vệ 24/7",
    address: "Quận 7, TP.HCM",
    price: 4200000,
    area: 50,
    bedrooms: 1,
    bathrooms: 1,
    owner: "Osaka Complex",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=8",
    date: "2025-02-15",
    category: "Cho thuê",
    tags: ["Hiện đại", "Tiện ích đầy đủ", "View đẹp"],
    views: 156,
    status: "Đã cho thuê",
    image: "https://picsum.photos/400/300?random=8"
  }
];

// Các danh mục căn hộ
const categories = ["Tất cả", "Cho thuê", "Bán", "Đã cho thuê", "Đang đặt cọc"];

// Các khu vực
const areas = ["Tất cả", "Quận 1", "Quận 2", "Quận Bình Thạnh", "Quận 7", "TP. Thủ Đức"];

// Màu trạng thái
const statusColors = {
  "0": "green",
  "1": "red",
  "Đang đặt cọc": "orange"
};

const PostList = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  // const paramValue = query.get("amount");
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedArea, setSelectedArea] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  useEffect(() => {
    async function getPostList() {
      setLoading(true)
      const res = await getAllPosts(dispatch);
      console.log(res.data);
      setApartments(res.data);
      
    }
    getPostList();
    setLoading(false)
  },[]);

  console.log(apartments);

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
  
  const goToDetails = (id) => {
    navigate(`/post-detail`);
    console.log(`Đang chuyển đến trang chi tiết của căn hộ ID: ${id}`);
  };

  // Xử lý thêm mới
  const handleAddNew = () => {
    navigate('/post/new');
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card 
        title={
          <Title level={3} style={{ textAlign: "center", marginBottom: 0 }}>
            <HomeOutlined style={{ marginRight: 8 }} />
            DANH SÁCH CĂN HỘ CHUNG CƯ
          </Title>
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
          
          <Button 
            type="primary" 
            icon={<HomeOutlined />}
            onClick={handleAddNew}
          >
            Thêm căn hộ mới
          </Button>
        </Space>

        <Row gutter={[16, 16]}>
          {loading ? (
            // Hiển thị skeleton loading
            Array(4).fill(null).map((_, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={`loading-${index}`}>
                <Card>
                  <Skeleton.Image style={{ width: '100%', height: 200 }} active />
                  <Skeleton active paragraph={{ rows: 3 }} />
                </Card>
              </Col>
            ))
          ) : (
            // Hiển thị danh sách căn hộ dạng card
            apartments.map(apartment => (
              <Col xs={24} sm={12} md={8} lg={6} key={apartment.postId}>
                <Card
                  hoverable
                  cover={
                    <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                      <img 
                        alt={apartment.title}
                        src={apartment.postImages[0]}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onClick={() => goToDetails(apartment.postId)}
                      />
                      <Badge 
                        count={apartment.status}
                        style={{ 
                          position: 'absolute', 
                          top: 10, 
                          right: 10,
                          backgroundColor: statusColors[apartment.status]
                        }}
                      />
                      <div 
                        style={{ 
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'rgba(0,0,0,0.6)',
                          padding: '5px 10px',
                          color: 'white'
                        }}
                      >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>{apartment.owner}</Text>
                      </div>
                    </div>
                  }
                  onClick={() => goToDetails(apartment.id)}
                  actions={[
                    <Space><AreaChartOutlined key="area" />{`200 m²`}</Space>,
                    <Space><UserOutlined key="rooms" />{`2 PN, 2 VS`}</Space>,
                    <Space><EyeOutlined key="view" />{apartment.views}</Space>
                  ]}
                >
                  <Card.Meta
                    title={<Tooltip title={apartment.title}>{apartment.title.length > 28 ? `${apartment.title.substring(0, 28)}...` : apartment.title}</Tooltip>}
                    description={
                      <>
                        <Paragraph ellipsis={{ rows: 2 }} style={{ height: 40 }}>
                          {apartment.content}
                        </Paragraph>
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <div>
                            <EnvironmentOutlined style={{ marginRight: 5 }} />
                            <Text type="secondary">{apartment.address}</Text>
                          </div>
                          <div>
                            <DollarOutlined style={{ marginRight: 5 }} />
                            <Text strong>{formatPrice(apartment.price)}</Text>
                          </div>
                          <div>
                            <Space wrap>
                              {/* {apartment.tags.slice(0, 2).map(tag => (
                                <Tag color="blue" key={tag}>
                                  {tag}
                                </Tag>
                              ))} */}
                              {/* {apartment.tags.length > 2 && <Tag>+{apartment.tags.length - 2}</Tag>} */}
                            </Space>
                          </div>
                          <Button type="link" style={{ padding: 0 }} onClick={(e) => {
                            e.stopPropagation();
                            goToDetails(apartment.id);
                          }}>
                            Xem chi tiết <ArrowRightOutlined />
                          </Button>
                        </Space>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))
          )}
        </Row>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            // total={apartments.length}
            onChange={page => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </Card>
    </div>
  );
};

export default PostList;