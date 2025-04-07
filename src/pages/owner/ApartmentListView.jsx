import React, { useEffect, useState } from 'react';
import { 
  Card, 
  Space, 
  Select, 
  Input,
  List, 
  Pagination,
  message,
  Tag,
  Table,
} from 'antd';
import { 
  HomeOutlined, 
  SearchOutlined, 
  FilterOutlined, 
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { getApartments } from '../../redux/apiCalls';

const { Option } = Select;
const { Search } = Input;

const ApartmentListView = () => {
  const [currentUser] = useState(
    useSelector((state) => state.user.currentUser)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [apartments, setApartments] = useState([]);
  const [loading,setLoading] = useState(false);


  useEffect(()=>{
    fetchApartments(currentUser);
  },[currentUser])

  const fetchApartments = async (currentUser) => {
    setLoading(true);
    try {
      const response = await getApartments();
      if (response.success) {
        // const apartmentsRentor = response.data.filter(item => item.users.includes(currentUser.userName));
        const apartmentsOwner = response.data.filter((item) => item.householder === currentUser.userName);
        
        setApartments(apartmentsOwner.map(apt => ({
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

  return (
    <>
      <Card 
        title={
          <Space>
            <HomeOutlined /> 
            <span>Danh sách căn hộ</span>
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