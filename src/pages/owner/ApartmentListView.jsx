import React, { useState } from 'react';
import { 
  Card, 
  Space, 
  Button, 
  Select, 
  Input,
  List, 
  Pagination,
  Modal,
  Form,
  InputNumber,
  message,
  Checkbox,
  Typography,
  Alert
} from 'antd';
import { 
  HomeOutlined, 
  SearchOutlined, 
  FilterOutlined, 
  EnvironmentOutlined,
  PlusOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;
const { Text } = Typography;

const ApartmentListView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [apartmentForm] = Form.useForm();
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);

  // Apartment status and area options
  const statusOptions = [
    { value: 'available', label: 'Sẵn sàng' },
    { value: 'rented', label: 'Đã cho thuê' },
    { value: 'maintenance', label: 'Đang bảo trì' }
  ];

  const areaOptions = [
    { value: 'district1', label: 'Quận 1' },
    { value: 'district2', label: 'Quận 2' },
    { value: 'district3', label: 'Quận 3' },
    { value: 'thuThiem', label: 'Thủ Thiêm' }
  ];

  // Sample apartments for deposit calculation
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

  // Pagination change handler
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  // Show modal for adding new apartment
  const showAddApartmentModal = () => {
    setIsModalVisible(true);
    setTermsAgreed(false);
    setSelectedApartment(null);
    apartmentForm.resetFields();
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    apartmentForm.resetFields();
    setTermsAgreed(false);
    setSelectedApartment(null);
  };

  // Handle apartment selection
  const handleApartmentSelect = (value) => {
    const apartment = apartments.find(apt => apt.id === value);
    setSelectedApartment(apartment);
    
    // Set default deposit amount based on rent price
    apartmentForm.setFieldsValue({ 
      depositAmount: apartment.price * 3 
    });
  };

  // Handle apartment submission
  const handleApartmentSubmit = () => {
    apartmentForm.validateFields().then(values => {
      if (!termsAgreed) {
        message.error('Vui lòng đồng ý với các điều khoản');
        return;
      }

      console.log('New Apartment Submission:', values);
      message.success('Bài viết đã được gửi chờ duyệt');
      
      // Close modal and reset form
      setIsModalVisible(false);
      apartmentForm.resetFields();
      setTermsAgreed(false);
      setSelectedApartment(null);
    }).catch(errorInfo => {
      console.log('Validation Failed:', errorInfo);
    });
  };

  // Terms and Conditions Modal Content
  const TermsContent = () => (
    <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '0 10px' }}>
      <h3>Điều Khoản Và Điều Kiện Đăng Tin Căn Hộ</h3>
      <ol>
        <li>
          <strong>Tính Chính Xác Thông Tin</strong>
          <p>Người đăng tin cam kết cung cấp thông tin chính xác, đầy đủ và trung thực về căn hộ.</p>
        </li>
        <li>
          <strong>Trách Nhiệm Pháp Lý</strong>
          <p>Mọi thông tin sai lệch sẽ chịu trách nhiệm pháp lý và có thể bị khóa tài khoản.</p>
        </li>
        <li>
          <strong>Quyền Sở Hữu</strong>
          <p>Người đăng tin phải là chủ sở hữu hợp pháp hoặc được ủy quyền quản lý căn hộ.</p>
        </li>
        <li>
          <strong>Bảo Mật Thông Tin</strong>
          <p>Thông tin cá nhân và căn hộ sẽ được bảo mật và chỉ sử dụng cho mục đích cho thuê.</p>
        </li>
        <li>
          <strong>Phí Dịch Vụ</strong>
          <p>Việc đăng tin có thể phải chịu các khoản phí dịch vụ theo quy định của nền tảng.</p>
        </li>
      </ol>
    </div>
  );

  return (
    <>
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
            onClick={showAddApartmentModal}
          >
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
              {statusOptions.map(status => (
                <Option key={status.value} value={status.value}>
                  {status.label}
                </Option>
              ))}
            </Select>
          </Space>

          <Space>
            <EnvironmentOutlined />
            <Select 
              defaultValue="Tất cả" 
              style={{ width: 150 }}
            >
              {areaOptions.map(area => (
                <Option key={area.value} value={area.value}>
                  {area.label}
                </Option>
              ))}
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
            current={currentPage}
            pageSize={pageSize}
            total={0}
            showSizeChanger={false}
            onChange={handlePaginationChange}
          />
        </div>
      </Card>

      <Modal
        title="Thêm Căn Hộ Mới"
        visible={isModalVisible}
        onOk={handleApartmentSubmit}
        onCancel={handleCancel}
        okText="Gửi Bài Viết Chờ Duyệt"
        cancelText="Hủy"
        okButtonProps={{ disabled: !termsAgreed }}
      >
        <Form 
          form={apartmentForm} 
          layout="vertical"
        >
          <Form.Item
            name="postType"
            label="Loại Bài Viết"
            rules={[{ required: true, message: "Vui lòng chọn loại bài viết" }]}
          >
            <Select 
              placeholder="Chọn loại bài viết"
            >
              <Option value="Cho thuê">Cho thuê</Option>
              <Option value="Bán">Bán</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="apartmentId"
            label="Chọn Căn Hộ"
            rules={[{ required: true, message: "Vui lòng chọn căn hộ" }]}
          >
            <Select 
              placeholder="Chọn căn hộ"
              onChange={handleApartmentSelect}
            >
              {apartments.map(apt => (
                <Option key={apt.id} value={apt.id}>
                  {apt.title}
                </Option>
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
                      const minDeposit = selectedApartment.price * 1;
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
                  min={selectedApartment.price}
                  max={selectedApartment.price * 3}
                />
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
                <Input.TextArea 
                  rows={6} 
                  placeholder="Nhập chi tiết thông tin căn hộ" 
                />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Checkbox 
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
            >
              Tôi đã đọc và đồng ý với các điều khoản
            </Checkbox>
          </Form.Item>

          {!termsAgreed && (
            <div style={{ marginBottom: 16 }}>
              <Text type="warning">
                <InfoCircleOutlined style={{ marginRight: 8 }} />
                Vui lòng đọc và đồng ý với điều khoản để tiếp tục
              </Text>
            </div>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default ApartmentListView;