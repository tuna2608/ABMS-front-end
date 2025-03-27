import React, { useState } from "react";
import { 
  Card, 
  Space, 
  Input, 
  Select, 
  List, 
  Pagination,
//   Badge,
//   Tag
} from "antd";
import { 
  SearchOutlined, 
  FilterOutlined,
  EnvironmentOutlined,
  BankOutlined
} from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;

const areas = ["Tất cả", "Quận 1", "Quận 2", "Quận Bình Thạnh", "Quận 7", "Quận 4"];

const ApartmentList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [setSearchText] = useState("");
  const [setSelectedStatus] = useState("Tất cả");
  const [setSelectedArea] = useState("Tất cả");

  const pageSize = 4;

  const onSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const onStatusChange = (value) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const onAreaChange = (value) => {
    setSelectedArea(value);
    setCurrentPage(1);
  };

//   const renderApartmentStatus = (status) => {
//     switch (status) {
//       case 'available':
//         return <Badge status="success" text={<Tag color="green">Trống</Tag>} />;
//       case 'occupied':
//         return <Badge status="processing" text={<Tag color="blue">Đang ở</Tag>} />;
//       case 'reserved':
//         return <Badge status="warning" text={<Tag color="orange">Đã đặt chỗ</Tag>} />;
//       case 'maintenance':
//         return <Badge status="error" text={<Tag color="red">Bảo trì</Tag>} />;
//       default:
//         return <Badge status="default" text={<Tag>Chưa xác định</Tag>} />;
//     }
//   };

  return (
    <Card 
      title={
        <Space>
          <BankOutlined /> 
          <span>Danh sách căn hộ</span>
        </Space>
      } 
    >
      <Space style={{ marginBottom: 20 }} size="large" wrap>
        <Search
          placeholder="Tìm kiếm căn hộ"
          onSearch={onSearch}
          style={{ width: 300 }}
          prefix={<SearchOutlined />}
          allowClear
        />
        
        <Space>
          <FilterOutlined />
          <Select 
            defaultValue="Tất cả" 
            style={{ width: 150 }}
            onChange={onStatusChange}
          >
            <Option value="Tất cả">Tất cả trạng thái</Option>
            <Option value="Chưa bán">Chưa bán</Option>
            <Option value="Đã bán">Đã bán</Option>
            <Option value="Đang cho thuê">Đang cho thuê</Option>
            <Option value="Đang ở">Đang ở</Option>
            <Option value="Trống">Trống</Option>
          </Select>
        </Space>

        <Space>
          <EnvironmentOutlined />
          <Select 
            defaultValue="Tất cả" 
            style={{ width: 150 }}
            onChange={onAreaChange}
          >
            {areas.map(area => (
              <Option key={area} value={area}>{area}</Option>
            ))}
          </Select>
        </Space>
      </Space>

      <List
        itemLayout="vertical"
        size="large"
        dataSource={[]} // Empty array for now, can be populated with actual apartment data
        renderItem={() => null}
      />

      <div style={{ textAlign: 'right', marginTop: 16 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={0}
          onChange={page => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </Card>
  );
};

export default ApartmentList;