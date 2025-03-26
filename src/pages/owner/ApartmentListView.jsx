import React from 'react';
import { 
  Card, 
  Space, 
  Button, 
  Select, 
  Input,
  List, 
  Pagination 
} from 'antd';
import { 
  HomeOutlined, 
  SearchOutlined, 
  FilterOutlined, 
  EnvironmentOutlined 
} from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;

const ApartmentListView = () => {
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
};

export default ApartmentListView;