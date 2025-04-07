import React, { useState } from 'react';
import { 
  Card, 
  Space, 
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

} from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;

const ApartmentListView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);


  // Apartment status and area options
  const statusOptions = [
    { value: 'rented', label: 'Đã thuê' },
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

  return (
    <>
      <Card 
        title={
          <Space>
            <HomeOutlined /> 
            <span>Danh sách căn hộ của tôi</span>
          </Space>
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