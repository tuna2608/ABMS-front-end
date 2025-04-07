import React, { useEffect, useState } from "react";
import {
  Card,
  Space,
  Input,
  Select,
  List,
  Pagination,
  Tag,
  Table,
  message,
  //   Badge,
  //   Tag
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  EnvironmentOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { getApartments } from "../../redux/apiCalls";

const { Option } = Select;
const { Search } = Input;

const areas = [
  "Tất cả",
  "Quận 1",
  "Quận 2",
  "Quận Bình Thạnh",
  "Quận 7",
  "Quận 4",
];

const ApartmentList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [setSearchText] = useState("");
  const [setSelectedStatus] = useState("Tất cả");
  const [setSelectedArea] = useState("Tất cả");
  const [apartments, setApartments] = useState([]);
  const [loading,setLoading] = useState(false);

  const pageSize = 4;

  useEffect(()=>{
    fetchApartments();
  },[])

  const fetchApartments = async () => {
    setLoading(true);
    try {
      const response = await getApartments();
      if (response.success) {
        setApartments(response.data.map(apt => ({
          ...apt,
          key: apt.apartmentId
        })));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching apartments:", error);
      message.error("Không thể tải danh sách căn hộ");
    } finally {
      setLoading(false);
    }
  };

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

  const apartmentColumns = [
    {
      title: "Số Nhà",
      dataIndex: "apartmentName",
      key: "apartmentName",
      editable: true,
    },
    {
      title: "Chủ Nhà",
      dataIndex: "householder",
      key: "householder",
      editable: true,
      render: (text) => text || "Chưa có",
    },
    {
      title: "Số Phòng Ngủ",
      dataIndex: "numberOfBedrooms",
      key: "numberOfBedrooms",
      width: 120,
      editable: true,
    },
    {
      title: "Số Phòng Tắm",
      dataIndex: "numberOfBathrooms",
      key: "numberOfBathrooms",
      width: 120,
      editable: true,
    },
    {
      title: "Tình Trạng",
      dataIndex: "status",
      key: "status",
      editable: true,
      render: (status) => {
        const statusMap = {
          unrented: "Còn Trống",
          rented: "Đã Cho Thuê",
          MAINTENANCE: "Đang Bảo Trì",
        };
        const colorMap = {
          unrented: "green",
          rented: "blue",
          MAINTENANCE: "orange",
        };
        return (
          <Tag color={colorMap[status] || "default"}>
            {statusMap[status] || status}
          </Tag>
        );
      },
    },
    {
      title: "Số Người Ở",
      dataIndex: "totalNumber",
      key: "totalNumber",
      width: 100,
      render: (text) => text || "0",
    },
    {
      title: "Diện Tích",
      dataIndex: "area",
      key: "area",
      width: 120,
      editable: false,
      render: (text) => `${text} m²`,
    },
    {
      title: "Hướng",
      dataIndex: "direction",
      key: "direction",
      editable: true,
    },
    {
      title: "Tầng",
      dataIndex: "floor",
      key: "floor",
      width: 80,
      editable: true,
    },
  ];

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
            {areas.map((area) => (
              <Option key={area} value={area}>
                {area}
              </Option>
            ))}
          </Select>
        </Space>
      </Space>

      <Table
        columns={apartmentColumns}
        dataSource={apartments}
        loading={loading}
        pagination={{
          total: apartments.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} căn hộ`
        }}
      />

      <div style={{ textAlign: "right", marginTop: 16 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={0}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </Card>
  );
};

export default ApartmentList;
