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
  message
} from 'antd';
import { 
  HomeOutlined, 
  SearchOutlined, 
  FilterOutlined, 
  EnvironmentOutlined,
  PlusOutlined
} from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;

const ApartmentListView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [apartmentForm] = Form.useForm();

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

  // Pagination change handler
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  // Show modal for adding new apartment
  const showAddApartmentModal = () => {
    setIsModalVisible(true);
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    apartmentForm.resetFields();
  };

  // Handle apartment submission
  const handleApartmentSubmit = () => {
    apartmentForm.validateFields().then(values => {
      // TODO: Implement actual apartment creation logic
      console.log('New Apartment:', values);
      message.success('Thêm căn hộ mới thành công');
      
      // Close modal and reset form
      setIsModalVisible(false);
      apartmentForm.resetFields();
    }).catch(errorInfo => {
      console.log('Validation Failed:', errorInfo);
    });
  };

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
        okText="Thêm Căn Hộ"
        cancelText="Hủy"
      >
        <Form 
          form={apartmentForm} 
          layout="vertical"
        >
          <Form.Item
            name="apartmentName"
            label="Tên Căn Hộ"
            rules={[{ 
              required: true, 
              message: "Vui lòng nhập tên căn hộ" 
            }]}
          >
            <Input placeholder="Nhập tên căn hộ" />
          </Form.Item>

          <Form.Item
            name="area"
            label="Khu Vực"
            rules={[{ 
              required: true, 
              message: "Vui lòng chọn khu vực" 
            }]}
          >
            <Select placeholder="Chọn khu vực">
              {areaOptions.map(area => (
                <Option key={area.value} value={area.value}>
                  {area.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá Cho Thuê"
            rules={[
              { 
                required: true, 
                message: "Vui lòng nhập giá cho thuê" 
              },
              {
                validator: (_, value) => {
                  if (value && value < 1000000) {
                    return Promise.reject(new Error('Giá cho thuê tối thiểu là 1,000,000 VNĐ'));
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
              placeholder="Nhập giá cho thuê"
              min={1000000}
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng Thái"
            rules={[{ 
              required: true, 
              message: "Vui lòng chọn trạng thái" 
            }]}
          >
            <Select placeholder="Chọn trạng thái">
              {statusOptions.map(status => (
                <Option key={status.value} value={status.value}>
                  {status.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô Tả Chi Tiết"
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Nhập mô tả chi tiết về căn hộ" 
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ApartmentListView;