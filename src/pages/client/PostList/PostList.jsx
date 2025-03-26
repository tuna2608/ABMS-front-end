import React, { useState, useEffect } from "react";
import { 
  Card, 
  Row, 
  Col,
  Space, 
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
import { useDispatch} from "react-redux";
import { getAllPosts } from "../../../redux/apiCalls";

const { Search } = Input;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

// Các danh mục căn hộ
const categories = ["Tất cả", "Cho thuê", "Bán", "Đã cho thuê", "Đang đặt cọc"];

// Các khu vực
const areas = ["Tất cả", "Quận 1", "Quận 2", "Quận Bình Thạnh", "Quận 7", "TP. Thủ Đức"];

// Màu trạng thái
const statusColors = {
  "0": "green",
  "1": "red",
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
    setLoading(false);
  },[]);

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
  
  const goToDetails = (postId) => {
    navigate(`/post-detail/${postId}`);
    console.log(`Đang chuyển đến trang chi tiết của căn hộ ID: ${postId}`);
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
                      />
                      <Badge 
                        count={apartment.depositCheck}
                        style={{ 
                          position: 'absolute', 
                          top: 10, 
                          right: 10,
                          backgroundColor: statusColors[apartment.depositCheck]
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
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>{apartment.userName}</Text>
                      </div>
                    </div>
                  }
                  onClick={() => goToDetails(apartment.postId)}
                  actions={[
                    <Space><AreaChartOutlined key="area" />{`200 m²`}</Space>,
                    <Space><UserOutlined key="rooms" />{`${apartment.apartment.numberOfBedrooms}PN, ${apartment.apartment.numberOfBathrooms}VS`}</Space>,
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
                            <Text type="secondary">{apartment.apartment.apartmentName}</Text>
                          </div>
                          <div>
                            <DollarOutlined style={{ marginRight: 5 }} />
                            <Text strong>{formatPrice(apartment.price)}</Text>
                          </div>
                          <div>
                          </div>
                          <Button type="link" style={{ padding: 0 }} onClick={(e) => {
                            e.stopPropagation();
                            goToDetails(apartment.postId);
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