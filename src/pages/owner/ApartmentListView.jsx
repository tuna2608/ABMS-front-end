import React, { useEffect, useState } from "react";
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
} from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  FilterOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getApartments, getRentorByApartment } from "../../redux/apiCalls";

const { Option } = Select;
const { Search } = Input;

const ApartmentListView = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renters, setRenters] = useState({});


  useEffect(() => {
    if (currentUser) {
      fetchApartments(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchRentersForApartments = async () => {
      if (apartments.length > 0) {
        const promises = apartments.map(apt => fetchRenters(apt.apartmentName));
        await Promise.all(promises);
      }
    };

    fetchRentersForApartments();
  }, [apartments]);

  const fetchApartments = async (currentUser) => {
    if (!currentUser) {
      return;
    }
    
    setLoading(true);
    try {
      const response = await getApartments();
      if (response.success) {
        const apartmentsOwner = response.data.filter(
          (item) => item.householder === currentUser.userName
        );

        setApartments(
          apartmentsOwner.map((apt) => ({
            ...apt,
            key: apt.apartmentId,
          }))
        );
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

  const fetchRenters = async (apartmentName) => {
    try {
      const response = await getRentorByApartment(apartmentName);
      if (response.success) {
        setRenters((prev) => ({
          ...prev,
          [apartmentName]: response.data,
        }));
      } else {
        console.warn(`No renters found for apartment ${apartmentName}`);
      }
    } catch (error) {
      console.error(`Error fetching renters for ${apartmentName}:`, error);
      message.error(`Không thể tải thông tin người thuê cho căn hộ ${apartmentName}`);
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
    {
      title: "Người thuê",
      key: "renters",
      render: (_, record) => {
        const apartmentRenters = renters[record.apartmentName] || [];
        return apartmentRenters.length > 0 ? (
          <Space direction="vertical" style={{ width: '100%' }}>
            {apartmentRenters.map((renter) => (
              <Card 
                key={renter.userId} 
                size="small" 
                style={{
                  marginBottom: 8,
                  borderRadius: 8,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: '1px solid #e8e8e8'
                }}
                bodyStyle={{ padding: '12px' }}
              >
                <Space align="start">
                  <div 
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: '#1890ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '16px',
                      marginRight: 8
                    }}
                  >
                    {renter.userName?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <Space direction="vertical" size={4}>
                    <Space>
                      <span style={{ 
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#262626'
                      }}>
                        {renter.userName}
                      </span>
                      <Tag 
                        color="purple" 
                        style={{ 
                          borderRadius: '4px',
                          fontSize: '12px',
                          padding: '0 6px'
                        }}
                      >
                        {renter.role}
                      </Tag>
                    </Space>
                    <Space size={12}>
                      {renter.email && (
                        <span style={{ 
                          fontSize: '12px',
                          color: '#595959',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <MailOutlined style={{ marginRight: 4 }} />
                          {renter.email}
                        </span>
                      )}
                      {renter.phone && (
                        <span style={{ 
                          fontSize: '12px',
                          color: '#595959',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <PhoneOutlined style={{ marginRight: 4 }} />
                          {renter.phone}
                        </span>
                      )}
                    </Space>
                  </Space>
                </Space>
              </Card>
            ))}
          </Space>
        ) : (
          <Tag 
            color="default"
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '13px'
            }}
          >
            Chưa có người thuê
          </Tag>
        );
      },
      width: 300
    },
  ];

  // Apartment status and area options
  const statusOptions = [
    { value: "available", label: "Sẵn sàng" },
    { value: "rented", label: "Đã cho thuê" },
    { value: "maintenance", label: "Đang bảo trì" },
  ];

  const areaOptions = [
    { value: "district1", label: "Quận 1" },
    { value: "district2", label: "Quận 2" },
    { value: "district3", label: "Quận 3" },
    { value: "thuThiem", label: "Thủ Thiêm" },
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
            <Select defaultValue="Tất cả" style={{ width: 150 }}>
              {statusOptions.map((status) => (
                <Option key={status.value} value={status.value}>
                  {status.label}
                </Option>
              ))}
            </Select>
          </Space>

          <Space>
            <EnvironmentOutlined />
            <Select defaultValue="Tất cả" style={{ width: 150 }}>
              {areaOptions.map((area) => (
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
            showTotal: (total) => `Tổng số ${total} căn hộ`,
          }}
        />

        <div style={{ textAlign: "right", marginTop: 16 }}>
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
