import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Space,
  Input,
  Select,
  Pagination,
  Skeleton,
  Typography,
  Badge,
  Tooltip,
  Flex,
  Tag,
  Button,
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
  EyeOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  AppstoreOutlined
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../../redux/apiCalls";

const { Search } = Input;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

// Các danh mục căn hộ
const categories = ["Tất cả", "Cho thuê", "Bán", "Đã cho thuê", "Đang đặt cọc"];

// Các khu vực
const areas = [
  "Tất cả",
  "Ngũ Hành Sơn",
  "Cẩm Lệ",
  "Sơn Trà",
  "Liên Chiểu",
  "Hòa Vang",
  "Hải Châu"
];

// Màu trạng thái
const statusColors = {
  0: "green",
  1: "red",
};

const PostList = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
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
      setLoading(true);
      const res = await getAllPosts(dispatch);
      console.log(res.data);
      setApartments(res.data);
      setLoading(false);
    }
    getPostList();
  }, [dispatch]);

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

  const goToDetails = (postId) => {
    navigate(`/post-detail/${postId}`);
    console.log(`Đang chuyển đến trang chi tiết của căn hộ ID: ${postId}`);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Card 
        bordered={false}
        style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "inline-block", position: "relative" }}>
            <Title 
              level={2} 
              style={{ 
                margin: 0, 
                color: 'rgba(30, 58, 138, 0.92)',
                position: 'relative',
                display: 'inline-block',
                padding: '0 16px'
              }}
            >
              <HomeOutlined style={{ marginRight: 12 }} />
              DANH SÁCH CĂN HỘ CHUNG CƯ
            </Title>
            <div style={{ 
              position: 'absolute', 
              bottom: '-8px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              width: '80px', 
              height: '3px', 
              backgroundColor: 'rgba(30, 58, 138, 0.92)', 
              borderRadius: '2px' 
            }} />
          </div>
          <Text type="secondary" style={{ display: 'block', marginTop: 12 }}>
            Khám phá các căn hộ chất lượng cao với đầy đủ tiện nghi
          </Text>
        </div>

        <Divider style={{ margin: '16px 0 24px' }} />

        <Flex justify="space-between" align="center" wrap="wrap" gap={16} style={{ marginBottom: 24 }}>
          <Search
            placeholder="Tìm kiếm căn hộ theo tên, khu vực..."
            onSearch={onSearch}
            style={{ width: 320 }}
            prefix={<SearchOutlined />}
            allowClear
            size="large"
          />

          <Flex gap={16} wrap="wrap">
            <Flex align="center" gap={8}>
              <AppstoreOutlined style={{ color: 'rgba(30, 58, 138, 0.92)' }} />
              <Select
                defaultValue="Tất cả"
                style={{ width: 150 }}
                onChange={onCategoryChange}
                size="large"
              >
                {categories.map((cat) => (
                  <Option key={cat} value={cat}>
                    {cat}
                  </Option>
                ))}
              </Select>
            </Flex>
            
            <Flex align="center" gap={8}>
              <EnvironmentOutlined style={{ color: 'rgba(30, 58, 138, 0.92)' }} />
              <Select
                defaultValue="Tất cả"
                style={{ width: 180 }}
                onChange={onAreaChange}
                size="large"
              >
                {areas.map((area) => (
                  <Option key={area} value={area}>
                    {area}
                  </Option>
                ))}
              </Select>
            </Flex>
          </Flex>
        </Flex>

        <Row gutter={[24, 24]}>
          {loading
            ? // Hiển thị skeleton loading
              Array(4)
                .fill(null)
                .map((_, index) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={`loading-${index}`}>
                    <Card style={{ borderRadius: '8px', overflow: 'hidden', height: '100%' }}>
                      <Skeleton.Image
                        style={{ width: "100%", height: 200 }}
                        active
                      />
                      <Skeleton active paragraph={{ rows: 3 }} />
                    </Card>
                  </Col>
                ))
            : // Hiển thị danh sách căn hộ dạng card
              apartments.map((apartment) => (
                <Col xs={24} sm={12} md={8} lg={6} key={apartment.postId}>
                  <Card
                    hoverable
                    style={{ 
                      borderRadius: '8px', 
                      overflow: 'hidden', 
                      height: '100%',
                      transition: 'all 0.3s',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                    }}
                    cover={
                      <div
                        style={{
                          position: "relative",
                          height: 200,
                          overflow: "hidden",
                        }}
                      >
                        <img
                          alt={apartment.title}
                          src={apartment.postImages[0]}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: 'transform 0.3s',
                          }}
                        />
                        <Badge
                          count={apartment.depositCheck}
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            backgroundColor:
                              statusColors[apartment.depositCheck],
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
                            padding: "16px 12px 8px",
                            color: "white",
                          }}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            {apartment.userName}
                          </Text>
                        </div>
                      </div>
                    }
                    onClick={() => {
                      if (apartment.depositCheck == null) {
                        goToDetails(apartment.postId);
                      }
                    }}
                    actions={[
                      <Tooltip title="Diện tích">
                        <Space>
                          <AreaChartOutlined key="area" />
                          {`200 m²`}
                        </Space>
                      </Tooltip>,
                      <Tooltip title="Phòng ngủ & phòng tắm">
                        <Space>
                          <UserOutlined key="rooms" />
                          {`${apartment.apartment.numberOfBedrooms}PN, ${apartment.apartment.numberOfBathrooms}VS`}
                        </Space>
                      </Tooltip>,
                      <Tooltip title="Lượt xem">
                        <Space>
                          <EyeOutlined key="view" />
                          {apartment.views}
                        </Space>
                      </Tooltip>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Tooltip title={apartment.title}>
                          <div style={{ fontSize: '16px', fontWeight: 600, color: 'rgba(30, 58, 138, 0.92)' }}>
                            {apartment.title.length > 28
                              ? `${apartment.title.substring(0, 28)}...`
                              : apartment.title}
                          </div>
                        </Tooltip>
                      }
                      description={
                        <>
                          <Paragraph
                            ellipsis={{ rows: 2 }}
                            style={{ height: 40, color: '#666', marginBottom: 12 }}
                          >
                            {apartment.content}
                          </Paragraph>
                          <Space direction="vertical" style={{ width: "100%" }}>
                            <div>
                              <Flex justify="space-between" align="center">
                                <Flex align="center">
                                  <EnvironmentOutlined style={{ color: 'rgba(30, 58, 138, 0.92)', marginRight: 5 }} />
                                  <Text type="secondary">
                                    {apartment.apartment.apartmentName}
                                  </Text>
                                </Flex>
                                {apartment.depositCheck === "done" && (
                                  <Tag
                                    icon={<CheckCircleOutlined />}
                                    color="error"
                                    style={{padding:'4px 8px', fontSize: '14px'}}
                                  >
                                    Đã cọc
                                  </Tag>
                                )}
                              </Flex>
                            </div>
                            <div>
                              <DollarOutlined style={{ color: '#ff4d4f', marginRight: 5 }} />
                              <Text strong style={{ color: '#ff4d4f', fontSize: '16px' }}>
                                {formatPrice(apartment.price)}
                              </Text>
                            </div>
                            <div style={{ marginTop: 8 }}>
                              <Button
                                type="primary"
                                size="small"
                                style={{ 
                                  borderRadius: '4px', 
                                  background: apartment.depositCheck !== "done" ? 'rgba(30, 58, 138, 0.92)' : '#d9d9d9',
                                  width: '100%'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goToDetails(apartment.postId);
                                }}
                                disabled={apartment.depositCheck === "done"}
                              >
                                Xem chi tiết <ArrowRightOutlined />
                              </Button>
                            </div>
                          </Space>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
        </Row>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={apartments.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            showTotal={(total) => `Tổng cộng ${total} căn hộ`}
          />
        </div>
      </Card>
    </div>
  );
};

export default PostList;