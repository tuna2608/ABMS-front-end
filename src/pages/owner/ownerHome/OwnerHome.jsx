import React, { useState } from "react";
import { 
  Layout, 
  Menu, 
  Card, 
  List, 
  Space, 
  Input, 
  Select, 
  Button, 
  Pagination,
  Upload,
  message,
  Form,
  FloatButton
} from "antd";
import { 
  HomeOutlined, 
  SearchOutlined, 
  FilterOutlined,
  EnvironmentOutlined,
  FileProtectOutlined,
  WalletOutlined,
  UploadOutlined,
  FormOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CommentOutlined,
  InboxOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider, Content, Header } = Layout;
const { Search } = Input;
const { Option } = Select;
const { Dragger } = Upload;

const OwnerHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState("list");
  const [fileList, setFileList] = useState([]);
  const [uploadType, setUploadType] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const navigate = useNavigate();

  // Sample data
  const apartments = [
    { id: 1, title: "Căn hộ 2PN Vinhomes Central Park" },
    { id: 2, title: "Căn hộ 3PN Masteri Thảo Điền" }
  ];

  const documentTypes = [
    { value: "sodo", label: "Sơ đồ căn hộ" },
    { value: "thongtin", label: "Thông tin pháp lý" },
    { value: "hinh", label: "Hình ảnh" },
    { value: "khac", label: "Tài liệu khác" }
  ];

  // Toggle sidebar collapse
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Navigate to chat page
  const navigateToChatPage = () => {
    navigate('/chat-page');
  };

  // Handle document upload
  const handleUpload = () => {
    if (!selectedApartment || !uploadType || fileList.length === 0) {
      message.error("Vui lòng chọn căn hộ, loại tài liệu và tải lên file");
      return;
    }

    // Simulated upload process
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files', file.originFileObj);
    });
    formData.append('apartmentId', selectedApartment);
    formData.append('documentType', uploadType);

    // In a real application, you would send this to your backend
    message.success("Tải lên tài liệu thành công!");
    
    // Reset form after upload
    setFileList([]);
    setUploadType(null);
    setSelectedApartment(null);
  };

  // Upload configuration
  const uploadProps = {
    name: 'file',
    multiple: true,
    fileList,
    onChange(info) {
      let newFileList = [...info.fileList];
      
      // Limit to 5 files
      newFileList = newFileList.slice(-5);
      
      // Validate file types
      newFileList = newFileList.filter(file => {
        const isValidType = [
          'image/jpeg', 
          'image/png', 
          'application/pdf', 
          'application/msword'
        ].includes(file.type);
        
        if (!isValidType) {
          message.error(`${file.name} không phải định dạng được hỗ trợ`);
        }
        
        return isValidType;
      });

      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // Prevent automatic upload
      return false;
    }
  };

  // Menu items
  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Quản lý căn hộ",
      onClick: () => {
        setCurrentView("list");
      },
    },
    {
      key: "2",
      icon: <FormOutlined />,
      label: "Tạo bài viết",
      onClick: () => {
        setCurrentView("createPost");
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

  // Render content based on current view
  const renderContent = () => {
    switch (currentView) {
      case "list":
        return (
          <Card 
            title={
              <Space>
                <HomeOutlined /> 
                <span>Danh sách căn hộ</span>
              </Space>
            } 
            extra={
              <Button type="primary">
                Thêm căn hộ mới
              </Button>
            }
          >
            <Space style={{ marginBottom: 20 }} size="large" wrap>
              <Search
                placeholder="Tìm kiếm căn hộ"
                style={{ width: 300 }}
                prefix={<SearchOutlined />}
                allowClear
              />
              
              <Space>
                <FilterOutlined />
                <Select 
                  defaultValue="Tất cả" 
                  style={{ width: 150 }}
                >
                  <Option value="Tất cả">Tất cả trạng thái</Option>
                </Select>
              </Space>

              <Space>
                <EnvironmentOutlined />
                <Select 
                  defaultValue="Tất cả" 
                  style={{ width: 150 }}
                >
                  <Option value="Tất cả">Tất cả khu vực</Option>
                </Select>
              </Space>
            </Space>

            <List
              itemLayout="vertical"
              size="large"
              dataSource={[]}
              renderItem={() => null}
            />

            <div style={{ textAlign: 'right', marginTop: 16 }}>
              <Pagination
                current={1}
                pageSize={4}
                total={0}
                showSizeChanger={false}
              />
            </div>
          </Card>
        );
      
      case "createPost":
        return (
          <Card 
            title={
              <Space>
                <FormOutlined /> 
                <span>Tạo bài viết mới</span>
              </Space>
            }
          >
            <Form layout="vertical">
              <Form.Item label="Loại bài viết">
                <Select placeholder="Chọn loại bài viết" />
              </Form.Item>
              
              <Form.Item label="Chọn căn hộ">
                <Select placeholder="Chọn căn hộ" />
              </Form.Item>
            </Form>
          </Card>
        );
      
      case "contract":
        return (
          <Card 
            title={
              <Space>
                <FileProtectOutlined /> 
                <span>Quản lý hợp đồng</span>
              </Space>
            }
          >
            {/* Contract management content */}
          </Card>
        );
      
      case "payment":
        return (
          <Card 
            title={
              <Space>
                <WalletOutlined /> 
                <span>Quản lý thanh toán</span>
              </Space>
            }
          >
            {/* Payment management content */}
          </Card>
        );
      
      case "upload":
        return (
          <Card 
            title={
              <Space>
                <UploadOutlined /> 
                <span>Tải lên tài liệu</span>
              </Space>
            }
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Select
                style={{ width: '100%' }}
                placeholder="Chọn căn hộ"
                value={selectedApartment}
                onChange={(value) => setSelectedApartment(value)}
              >
                {apartments.map(apt => (
                  <Option key={apt.id} value={apt.id}>
                    {apt.title}
                  </Option>
                ))}
              </Select>

              <Select
                style={{ width: '100%' }}
                placeholder="Chọn loại tài liệu"
                value={uploadType}
                onChange={(value) => setUploadType(value)}
              >
                {documentTypes.map(type => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>

              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Nhấp hoặc kéo file vào khu vực này để tải lên
                </p>
                <p className="ant-upload-hint">
                  Hỗ trợ tải lên nhiều file (tối đa 5 file)
                </p>
              </Dragger>

              <Button 
                type="primary" 
                icon={<UploadOutlined />} 
                onClick={handleUpload}
                disabled={!selectedApartment || !uploadType || fileList.length === 0}
                style={{ width: '100%' }}
              >
                Tải lên tài liệu
              </Button>
            </Space>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        width={250}
      >
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
            currentView === "list" ? "1" :
            currentView === "createPost" ? "2" :
            currentView === "contract" ? "3" :
            currentView === "payment" ? "4" :
            currentView === "upload" ? "5" : "1"
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
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>

      {/* Chat Float Button */}
      <FloatButton
        icon={<CommentOutlined />}
        type="primary"
        tooltip="Chat"
        onClick={navigateToChatPage}
        style={{ right: 24, bottom: 24 }}
        shape="circle"
        size="large"
      />
    </Layout>
  );
};

export default OwnerHome;