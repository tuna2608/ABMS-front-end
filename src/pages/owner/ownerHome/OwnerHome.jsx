import React, { useState } from "react";
import { DashboardOutlined, HomeOutlined, FileAddOutlined, BookOutlined, SettingOutlined, ContainerOutlined, CommentOutlined, DollarOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Menu, Layout, Form, Input, Select, InputNumber, Upload, Card, Typography, Table, Tag, message, Statistic, Row, Col } from "antd";
import { StyledLayout, StyledSider, StyledContentWrapper, StyledCard } from "./style";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const OwnerHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e) => {
    setActiveTab(e.key);
  };

  const onFinish = (values) => {
    console.log("Giá trị nhập vào:", values);
    message.success("Đã tạo danh sách bất động sản thành công!");
    form.resetFields();
    setFileList([]);
    setActiveTab("properties");
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const propertiesData = [
    { key: "1", name: "Biệt thự sang trọng", status: "Có sẵn", price: "$500,000" },
    { key: "2", name: "Căn hộ hiện đại", status: "Đã bán", price: "$300,000" },
    { key: "3", name: "Nhà nhỏ ấm cúng", status: "Đang xử lý", price: "$200,000" },
  ];

  const propertiesColumns = [
    { title: "Tên Bất Động Sản", dataIndex: "name", key: "name" },
    { title: "Trạng thái", dataIndex: "status", key: "status", render: (status) => <Tag color={status === "Có sẵn" ? "green" : "volcano"}>{status}</Tag> },
    { title: "Giá", dataIndex: "price", key: "price" },
  ];

  return (
    <StyledLayout>
      <StyledSider>
        <Menu theme="dark" mode="inline" selectedKeys={[activeTab]} onClick={handleMenuClick}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>Bảng điều khiển</Menu.Item>
          <Menu.Item key="properties" icon={<HomeOutlined />}>Bất động sản của tôi</Menu.Item>
          <Menu.Item key="create" icon={<FileAddOutlined />}>Tạo danh sách</Menu.Item>
          <Menu.Item key="createPost" icon={<BookOutlined />}>Tạo bài viết</Menu.Item>
          <Menu.Item key="bookings" icon={<BookOutlined />}>Đặt chỗ</Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>Cài đặt</Menu.Item>
          <Menu.SubMenu key="reports" title="Báo cáo" icon={<ContainerOutlined />}>
            <Menu.Item key="revenue">Doanh thu</Menu.Item>
            <Menu.Item key="visitors">Lượt truy cập</Menu.Item>
            <Menu.Item key="inquiries">Yêu cầu</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </StyledSider>
      <StyledContentWrapper collapsed={collapsed}>
        {activeTab === "dashboard" && (
          <StyledCard>
            <Row gutter={[16, 16]}>
              <Col span={6}><Statistic title="Tổng số bất động sản" value={3} prefix={<HomeOutlined />} /></Col>
              <Col span={6}><Statistic title="Tổng số lượt xem" value={558} prefix={<EyeOutlined />} /></Col>
              <Col span={6}><Statistic title="Yêu cầu đang xử lý" value={8} prefix={<CommentOutlined />} /></Col>
              <Col span={6}><Statistic title="Doanh thu hàng tháng" value={4550} prefix={<DollarOutlined />} /></Col>
            </Row>
          </StyledCard>
        )}
        {activeTab === "properties" && (
          <StyledCard>
            <Title level={4}>Danh sách bất động sản của tôi</Title>
            <Table dataSource={propertiesData} columns={propertiesColumns} />
          </StyledCard>
        )}
        {activeTab === "create" && (
          <StyledCard>
            <Title level={4}>Tạo danh sách bất động sản mới</Title>
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <Form.Item label="Tên bất động sản" name="name" rules={[{ required: true, message: "Vui lòng nhập tên bất động sản" }]}> <Input /> </Form.Item>
              <Form.Item label="Giá" name="price" rules={[{ required: true, message: "Vui lòng nhập giá" }]}> <InputNumber style={{ width: "100%" }} /> </Form.Item>
              <Form.Item label="Tải lên hình ảnh" name="images"> <Upload listType="picture-card" fileList={fileList} onChange={handleImageChange}> <PlusOutlined /> Tải lên </Upload> </Form.Item>
              <Form.Item> <Button type="primary" htmlType="submit">Gửi</Button> </Form.Item>
            </Form>
          </StyledCard>
        )}
        {activeTab === "createPost" && (
          <StyledCard>
            <Title level={4}>Tạo bài viết mới</Title>
            <Form layout="vertical" form={form} onFinish={() => message.success("Bài viết đã được tạo thành công!")}> 
              <Form.Item label="Tiêu đề bài viết" name="title" rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}> 
                <Input /> 
              </Form.Item>
              <Form.Item label="Nội dung bài viết" name="content" rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}> 
                <Input.TextArea rows={4} /> 
              </Form.Item>
              <Form.Item> 
                <Button type="primary" htmlType="submit">Đăng bài</Button> 
              </Form.Item>
            </Form>
          </StyledCard>
        )}
      </StyledContentWrapper>
    </StyledLayout>
  );
};

export default OwnerHome;
