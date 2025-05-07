import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Space,
  Input,
  Select,
  Pagination,
  Typography,
  Badge,
  Tooltip,
  Flex,
  Tag,
  Button,
  Divider,
  Empty,
  message,
  Spin,
} from "antd";
import {
  HomeOutlined,
  DollarOutlined,
  UserOutlined,
  SearchOutlined,
  EnvironmentOutlined,
  AreaChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { getAllPostsNoDispatch } from "../../../redux/apiCalls";
import { useSelector } from "react-redux";

const { Search } = Input;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

// Khu vực
const areas = [
  "Tất cả",
  "Ngũ Hành Sơn",
  "Cẩm Lệ",
  "Sơn Trà",
  "Liên Chiểu",
  "Hòa Vang",
  "Hải Châu",
];

// Data mẫu chưa có api lấy căn hộ đặt cọc Tú call api rồi thế vào đây nhé
const sampleBookedApartments = [
  {
    postId: "1",
    title: "Căn hộ cao cấp tại Ngũ Hành Sơn",
    content: "Căn hộ hiện đại, view biển tuyệt đẹp, đầy đủ nội thất",
    userName: "Nguyễn Văn A",
    price: 15000000,
    depositDate: "15/04/2024",
    postImages: ["/api/placeholder/400/300"],
    apartment: {
      apartmentName: "Khu đô thị Sơn Trà",
      numberOfBedrooms: 2,
      numberOfBathrooms: 2,
    },
  },
];

const DepositApartments = ({
  onViewDetails, // Prop for handling navigation to details
}) => {
  const userCurrent = useSelector((state) => state.user.currentUser);
  const [depositPosts, setDepositPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedArea, setSelectedArea] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 8;

  useEffect(() => {
    callGetPostByUserDepositId();
  }, []);

  async function callGetPostByUserDepositId() {
    setLoading(true);
    try {
      const res = await getAllPostsNoDispatch();
      if (res.success) {
        const listPost = res.data.filter(
          (post) => post.depositUserId === userCurrent.userId
        );
        setDepositPosts(listPost);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Không thể lấy danh sách");
    } finally {
      setLoading(false);
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ/tháng";
  };

  // if (deletePost !== null) {
  //   const filteredApartments = depositPosts.filter((apartment) => {
  //     const matchSearch =
  //       apartment.title.toLowerCase().includes(searchText.toLowerCase()) ||
  //       apartment.apartment.apartmentName
  //         .toLowerCase()
  //         .includes(searchText.toLowerCase());
  //     const matchArea =
  //       selectedArea === "Tất cả" ||
  //       apartment.apartment.apartmentName === selectedArea;
  //     return matchSearch && matchArea;
  //   });
  // }
  // Lọc danh sách căn hộ

  // Phân trang
  // const paginatedApartments = depositPosts.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // );

  return (
    <Spin spinning={loading}>
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Card
          bordered={false}
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ display: "inline-block", position: "relative" }}>
              <Title
                level={2}
                style={{
                  margin: 0,
                  color: "rgba(30, 58, 138, 0.92)",
                  position: "relative",
                  display: "inline-block",
                  padding: "0 16px",
                }}
              >
                <HomeOutlined style={{ marginRight: 12 }} />
                CÁC CĂN HỘ ĐÃ ĐẶT CỌC
              </Title>
              <div
                style={{
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80px",
                  height: "3px",
                  backgroundColor: "rgba(30, 58, 138, 0.92)",
                  borderRadius: "2px",
                }}
              />
            </div>
            <Text type="secondary" style={{ display: "block", marginTop: 12 }}>
              Quản lý và theo dõi các căn hộ bạn đã đặt cọc
            </Text>
          </div>

          <Divider style={{ margin: "16px 0 24px" }} />

          <Flex
            justify="space-between"
            align="center"
            wrap="wrap"
            gap={16}
            style={{ marginBottom: 24 }}
          >
            <Search
              placeholder="Tìm kiếm căn hộ theo tên, khu vực..."
              onSearch={(value) => setSearchText(value)}
              style={{ width: 320 }}
              prefix={<SearchOutlined />}
              allowClear
              size="large"
            />

            <Flex align="center" gap={8}>
              <EnvironmentOutlined
                style={{ color: "rgba(30, 58, 138, 0.92)" }}
              />
              <Select
                defaultValue="Tất cả"
                style={{ width: 180 }}
                onChange={(value) => setSelectedArea(value)}
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

          {depositPosts && depositPosts.length === 0 ? (
            <Empty
              description="Bạn chưa có căn hộ nào được đặt cọc"
              style={{ marginTop: 40 }}
            />
          ) : (
            <>
              <Row gutter={[24, 24]}>
                {depositPosts &&
                  depositPosts.map((post) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={post.postId}>
                      <Card
                        hoverable
                        style={{
                          borderRadius: "8px",
                          overflow: "hidden",
                          height: "100%",
                          transition: "all 0.3s",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
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
                              alt={post.title}
                              src={post.postImages[0]}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 0.3s",
                              }}
                            />
                            <Badge
                              count="Đã cọc"
                              style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                backgroundColor: "#52c41a",
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background:
                                  "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
                                padding: "16px 12px 8px",
                                color: "white",
                              }}
                            >
                              <Text
                                style={{ color: "white", fontWeight: "bold" }}
                              >
                                {post.userName}
                              </Text>
                            </div>
                          </div>
                        }
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
                              {`${post.apartment.numberOfBedrooms}PN, ${post.apartment.numberOfBathrooms}VS`}
                            </Space>
                          </Tooltip>,
                          <Tooltip title="Ngày đặt cọc">
                            <Space>
                              <ClockCircleOutlined key="deposit-date" />
                              {post.depositDate || "Chưa rõ"}
                            </Space>
                          </Tooltip>,
                        ]}
                      >
                        <Card.Meta
                          title={
                            <Tooltip title={post.title}>
                              <div
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  color: "rgba(30, 58, 138, 0.92)",
                                }}
                              >
                                {post.title.length > 28
                                  ? `${post.title.substring(0, 28)}...`
                                  : post.title}
                              </div>
                            </Tooltip>
                          }
                          description={
                            <>
                              <Paragraph
                                ellipsis={{ rows: 2 }}
                                style={{
                                  height: 40,
                                  color: "#666",
                                  marginBottom: 12,
                                }}
                              >
                                {post.content}
                              </Paragraph>
                              <Space
                                direction="vertical"
                                style={{ width: "100%" }}
                              >
                                <div>
                                  <Flex justify="space-between" align="center">
                                    <Flex align="center">
                                      <EnvironmentOutlined
                                        style={{
                                          color: "rgba(30, 58, 138, 0.92)",
                                          marginRight: 5,
                                        }}
                                      />
                                      <Text type="secondary">
                                        {post.apartment.apartmentName}
                                      </Text>
                                    </Flex>
                                    <Tag
                                      icon={<CheckCircleOutlined />}
                                      color="success"
                                      style={{
                                        padding: "4px 8px",
                                        fontSize: "14px",
                                      }}
                                    >
                                      Đã Cọc
                                    </Tag>
                                  </Flex>
                                </div>
                                <div>
                                  <DollarOutlined
                                    style={{ color: "#ff4d4f", marginRight: 5 }}
                                  />
                                  <Text
                                    strong
                                    style={{
                                      color: "#ff4d4f",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {formatPrice(post.price)}
                                  </Text>
                                </div>
                                <div style={{ marginTop: 8 }}>
                                  <Button
                                    type="primary"
                                    size="small"
                                    style={{
                                      borderRadius: "4px",
                                      background: "rgba(30, 58, 138, 0.92)",
                                      width: "100%",
                                    }}
                                    onClick={() =>
                                      onViewDetails &&
                                      onViewDetails(post.postId)
                                    }
                                  >
                                    Xem chi tiết
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
                  total={depositPosts !== null ? depositPosts.length : 0}
                  onChange={(page) => setCurrentPage(page)}
                  showSizeChanger={false}
                  showTotal={(total) => `Tổng cộng ${total} căn hộ đã đặt cọc`}
                />
              </div>
            </>
          )}
        </Card>
      </div>
    </Spin>
  );
};

export default DepositApartments;
