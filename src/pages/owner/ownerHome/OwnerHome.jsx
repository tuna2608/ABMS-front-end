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
  FloatButton,
  InputNumber,
  Alert,
  Typography,
  Checkbox,
  Modal,
  Empty
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
  InboxOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider, Content, Header } = Layout;
const { Search } = Input;
const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;
const { Text } = Typography;

const OwnerHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState("list");
  const [fileList, setFileList] = useState([]);
  const [uploadType, setUploadType] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [postForm] = Form.useForm();
  const [selectedPostType, setSelectedPostType] = useState(null);
  const navigate = useNavigate();

  // Sample data
  const apartments = [
    { 
      id: 1, 
      title: "Căn hộ 2PN Vinhomes Central Park",
      price: 5800000 
    },
    { 
      id: 2, 
      title: "Căn hộ 3PN Masteri Thảo Điền", 
      price: 7200000 
    }
  ];

  const postTypes = ["Cho thuê", "Bán"];

  const documentTypes = [
    { value: "sodo", label: "Sơ đồ căn hộ" },
    { value: "thongtin", label: "Thông tin pháp lý" },
    { value: "hinh", label: "Hình ảnh" },
    { value: "khac", label: "Tài liệu khác" }
  ];

  // Deposit terms text
  const depositTerms = `
ĐIỀU KHOẢN HOÀN TRẢ TIỀN ĐẶT CỌC

1. Quy Định Hoàn Trả Tiền Đặt Cọc
- Chủ nhà sẽ hoàn trả 90% số tiền đặt cọc sau khi:
  a) Người thuê thực hiện đúng các cam kết trong hợp đồng
  b) Không có hư hỏng vượt quá mức sử dụng bình thường
  c) Thông báo và bàn giao lại mặt bằng đúng thời hạn

2. Điều Kiện Mất Tiền Đặt Cọc
Khách hàng có thể mất một phần hoặc toàn bộ tiền đặt cọc nếu:
- Vi phạm các điều khoản trong hợp đồng thuê
- Hủy hợp đồng trước thời hạn không có lý do chính đáng
- Gây hư hỏng tài sản vượt quá mức độ sử dụng bình thường

3. Thời Gian Và Phương Thức Hoàn Trả
- Thời gian hoàn trả: 10 ngày làm việc sau khi kết thúc hợp đồng
- Phương thức: Chuyển khoản ngân hàng theo thông tin do người thuê cung cấp

4. Cam Kết
- Chúng tôi cam kết minh bạch và rõ ràng trong việc hoàn trả tiền đặt cọc
- Mọi thắc mắc vui lòng liên hệ trực tiếp với chủ nhà để được giải đáp
  `;

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

  // Handle post type change
  const handlePostTypeChange = (value) => {
    setSelectedPostType(value);
    postForm.setFieldsValue({ 
      apartmentId: undefined,
      depositAmount: undefined 
    });
  };

  // Handle apartment selection for post
  const handleApartmentSelect = (value) => {
    const apartment = apartments.find(apt => apt.id === value);
    setSelectedApartment(apartment);
    
    // Set default deposit amount based on rent/sale price
    postForm.setFieldsValue({ 
      depositAmount: apartment.price * 3 
    });
  };

  // Handle post submission
  const handlePostSubmit = (values) => {
    // Validate form
    postForm.validateFields().then(validatedValues => {
      console.log('Post Submission:', validatedValues);
      
      // Check if deposit terms are agreed
      if (!validatedValues.depositTerms) {
        Modal.error({
          title: 'Điều khoản chưa được đồng ý',
          content: 'Vui lòng đọc và đồng ý với các điều khoản đặt cọc trước khi gửi bài.'
        });
        return;
      }

      // Show success message
      Modal.success({
        title: 'Gửi Bài Viết Thành Công',
        content: 'Bài viết của bạn đã được gửi và đang chờ duyệt.',
        onOk: () => {
          // Reset form
          postForm.resetFields();
          setSelectedApartment(null);
          setSelectedPostType(null);
        }
      });
    }).catch(errorInfo => {
      console.log('Validation Failed:', errorInfo);
    });
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
            <Form 
              form={postForm} 
              layout="vertical"
              onFinish={handlePostSubmit}
            >
              <Form.Item
                name="postType"
                label="Loại bài viết"
                rules={[{ required: true, message: "Vui lòng chọn loại bài viết" }]}
              >
                <Select 
                  placeholder="Chọn loại bài viết"
                  onChange={handlePostTypeChange}
                >
                  {postTypes.map(type => (
                    <Select.Option key={type} value={type}>
                      {type}
                    </Select.Option>
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
                  onChange={handleApartmentSelect}
                  disabled={!selectedPostType}
                >
                  {apartments.map(apt => (
                    <Select.Option key={apt.id} value={apt.id}>
                      {apt.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {selectedApartment && (
                <>
                  <Alert
                    message="Thông Tin Tiền Cọc"
                    description={
                      <Text>
                        Tiền cọc sẽ do <strong>ADMIN quản lý</strong>. Bài viết chỉ được 
                        đăng sau khi admin xác nhận .
                      </Text>
                    }
                    type="warning"
                    showIcon
                    icon={<InfoCircleOutlined />}
                    style={{ marginBottom: 16 }}
                  />

                  <Form.Item
                    name="depositAmount"
                    label="Số Tiền Cọc"
                    rules={[
                      { 
                        required: true, 
                        message: "Vui lòng nhập số tiền cọc" 
                      },
                      {
                        validator: (_, value) => {
                          const minDeposit = 1000000; // Minimum deposit set to 1,000,000 VNĐ
                          const maxDeposit = selectedApartment.price * 3;
                          
                          if (value < minDeposit) {
                            return Promise.reject(new Error(`Số tiền cọc tối thiểu là ${minDeposit.toLocaleString()} VNĐ`));
                          }
                          
                          if (value > maxDeposit) {
                            return Promise.reject(new Error(`Số tiền cọc tối đa là ${maxDeposit.toLocaleString()} VNĐ`));
                          }
                          
                          return Promise.resolve();
                        }
                      }
                    ]}
                  >
                    <InputNumber 
                      style={{ width: '100%' }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      addonAfter="VNĐ"
                      placeholder="Nhập số tiền cọc"
                      min={1000000}
                      max={selectedApartment.price * 3}
                    />
                  </Form.Item>

                  {/* Deposit Terms Section */}
                  <Form.Item
                    name="depositTerms"
                    rules={[
                      {
                        validator: (_, value) => 
                          value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đọc và đồng ý các điều khoản đặt cọc'))
                      }
                    ]}
                  >
                    <div>
                    <div style={{ 
                        maxHeight: 250, 
                        overflowY: 'auto', 
                        border: '1px solid #d9d9d9', 
                        padding: 16, 
                        borderRadius: 4,
                        marginBottom: 16
                      }}>
                        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                          {depositTerms}
                        </pre>
                      </div>
                      
                      <Checkbox 
                        name="depositTerms"
                        valuePropName="checked"
                      >
                        Tôi đã đọc và đồng ý với các điều khoản đặt cọc
                      </Checkbox>
                    </div>
                  </Form.Item>

                  <Form.Item
                    name="title"
                    label="Tiêu đề bài viết"
                    rules={[{ required: true, message: "Vui lòng nhập tiêu đề bài viết" }]}
                  >
                    <Input placeholder="Nhập tiêu đề bài viết" />
                  </Form.Item>

                  <Form.Item
                    name="content"
                    label="Nội dung bài viết"
                    rules={[{ required: true, message: "Vui lòng nhập nội dung bài viết" }]}
                  >
                    <TextArea 
                      rows={6} 
                      placeholder="Nhập chi tiết thông tin căn hộ" 
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      block
                    >
                      Gửi Bài Viết Chờ Duyệt
                    </Button>
                  </Form.Item>
                </>
              )}
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
            <Empty 
              description="Chưa có hợp đồng nào" 
              style={{ margin: '50px 0' }} 
            />
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
            <Empty 
              description="Chưa có giao dịch thanh toán" 
              style={{ margin: '50px 0' }} 
            />
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
                  Hỗ trợ các định dạng: JPG, PNG, PDF, DOC (tối đa 10MB/file)
                </p>
              </Dragger>

              <Button 
                type="primary" 
                onClick={handleUpload} 
                disabled={fileList.length === 0}
                block
              >
                Tải lên
              </Button>
            </Space>
          </Card>
        );
      
      default:
        return <Card title="Không tìm thấy nội dung" />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        trigger={null}
        theme="light"
        width={250}
      >
        <div style={{ height: 64, padding: 16, textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: collapsed ? 14 : 18 }}>
            {collapsed ? "QL" : "Quản Lý Chủ Nhà"}
          </h2>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          background: "#fff", 
          padding: 0, 
          display: "flex", 
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ marginRight: 20 }}></div>
        </Header>
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff" }}>
          {renderContent()}
        </Content>
      </Layout>
      
      <FloatButton
        icon={<CommentOutlined />}
        type="primary"
        tooltip="Chat với khách hàng"
        onClick={navigateToChatPage}
        style={{ right: 24 }}
      />
    </Layout>
  );
};

export default OwnerHome;