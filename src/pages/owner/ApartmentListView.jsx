import React, { useState } from 'react';
import { 
  Card, 
  Space, 
  Button, 
  Select, 
  Input,
  List, 
  Pagination,
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
  const [ setIsModalVisible] = useState(false);

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
            style={{ 
              background: 'rgba(30, 58, 138, 0.92)', 
            }}
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

    </>
  );
};

export default ApartmentListView;