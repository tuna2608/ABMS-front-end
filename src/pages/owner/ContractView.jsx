import React, { useState, useEffect } from "react";
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Descriptions, 
  Tag,
  Space,
  Select,
  Input,
  message,
  Tabs
} from "antd";
import { 
  FileProtectOutlined, 
  DownloadOutlined,
  ContainerOutlined,
  SearchOutlined,
  HomeOutlined
} from "@ant-design/icons";
import styled from 'styled-components';
import moment from "moment";
import { useSelector } from "react-redux";
import { getContractOwners, getApartments } from "../../redux/apiCalls";
import { RenewalModal } from './RenewContractModal';

const { Search } = Input;
const { TabPane } = Tabs;

// Styled Download Button
const DownloadButton = styled(Button)`
  margin-top: 8px;
  color: #3867d6;
  border-color: #3867d6;
  display: block;
  margin: 0 auto;
  
  &:hover {
    color: #4b7bec;
    border-color: #4b7bec;
  }
`;

// Hàm format tiền tệ
const formatCurrency = (value) => {
  if (typeof value !== 'number') return '0';
  return new Intl.NumberFormat('vi-VN').format(value) + ' VND';
};

const ContractView = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [isContractModalVisible, setIsContractModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isRenewModalVisible, setIsRenewModalVisible] = useState(false);
  const [renewingContract, setRenewingContract] = useState(null);

  // Fetch owner's apartments
  useEffect(() => {
    const fetchOwnerApartments = async () => {
      setLoading(true);
      try {
        const response = await getApartments();
        if (response.success) {
          const ownerApartments = response.data.filter(
            apt => apt.householder === currentUser.userName
          );
          setApartments(ownerApartments);
          if (ownerApartments.length > 0) {
            fetchContractOwners(ownerApartments[0].apartmentName);
          }
        }
      } catch (error) {
        message.error('Không thể tải danh sách căn hộ');
      } finally {
        setLoading(false);
      }
    };
    fetchOwnerApartments();
  }, [currentUser]);

  // Fetch contracts for selected apartment
  const fetchContractOwners = async (apartmentName) => {
    setLoading(true);
    try {
      const response = await getContractOwners(apartmentName);
      if (response.success) {
        const formattedContracts = response.data.map(contract => ({
          id: contract.verificationFormId,
          residentName: contract.verificationFormName,
          email: contract.email,
          phoneNumber: contract.phoneNumber,
          apartmentName: contract.apartmentName,
          startDate: contract.contractStartDate,
          endDate: contract.contractEndDate,
          status: moment(contract.contractEndDate).isAfter(moment()) ? 'active' : 'expired',
          imageFiles: contract.imageFiles,
          verificationFormType: contract.verificationFormType
        }));
        setContracts(formattedContracts);
      }
    } catch (error) {
      message.error('Không thể tải danh sách hợp đồng');
    } finally {
      setLoading(false);
    }
  };

  const handleApartmentChange = (apartmentName) => {
    setSelectedApartment(apartmentName);
    fetchContractOwners(apartmentName);
  };

  const handleRenewContract = (contract) => {
    setRenewingContract(contract);
    setIsRenewModalVisible(true);
  };

  const handleDownloadTemplate = () => {
    // Thay thế URL này bằng link Google Drive trực tiếp có thể tải xuống
    const templateUrl = 'https://drive.google.com/drive/folders/1bdFLx_qJY5ybWLUngrfMsDHwjae4mM9E?usp=drive_link';
    
    try {
      // Mở link tải xuống trong tab mới
      window.open(templateUrl, '_blank');
      
      // Hiển thị thông báo thành công
      message.success('Đang tải mẫu đơn. Vui lòng kiểm tra trình duyệt của bạn.');
    } catch (error) {
      // Xử lý lỗi nếu có
      message.error('Có lỗi xảy ra khi tải mẫu đơn. Vui lòng thử lại.');
      console.error('Download error:', error);
    }
  };

  const contractColumns = [
    {
      title: "Người thuê",
      dataIndex: "residentName",
      key: "residentName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => moment(date).format("DD/MM/YYYY")
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => moment(date).format("DD/MM/YYYY")
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Đang hiệu lực' : 'Đã hết hạn'}
        </Tag>
      )
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<FileProtectOutlined />}
            onClick={() => {
              setSelectedContract(record);
              setIsContractModalVisible(true);
            }}
          >
            Chi tiết
          </Button>
          {record.status === 'active' && (
            <Button
              type="primary"
              onClick={() => handleRenewContract(record)}
            >
              Gia hạn
            </Button>
          )}
        </Space>
      ),
    }
  ];

  const renderContractModal = () => {
    if (!selectedContract) return null;

    return (
      <Modal
        title="Chi tiết hợp đồng"
        open={isContractModalVisible}
        onCancel={() => setIsContractModalVisible(false)}
        width={800}
        footer={[
          <Button 
            key="renew" 
            type="primary"
            onClick={() => handleRenewContract(selectedContract)}
            disabled={selectedContract.status !== 'active'}
          >
            Gia hạn hợp đồng
          </Button>,
          <Button 
            key="close" 
            onClick={() => setIsContractModalVisible(false)}
          >
            Đóng
          </Button>
        ]}
      >
        <Tabs defaultActiveKey="info">
          <TabPane tab="Thông tin hợp đồng" key="info">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Người thuê">
                {selectedContract.residentName}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedContract.email}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {selectedContract.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Căn hộ">
                {selectedContract.apartmentName}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày bắt đầu">
                {moment(selectedContract.startDate).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày kết thúc">
                {moment(selectedContract.endDate).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={selectedContract.status === 'active' ? 'green' : 'red'}>
                  {selectedContract.status === 'active' ? 'Đang hiệu lực' : 'Đã hết hạn'}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </TabPane>
          <TabPane tab="Hình ảnh hợp đồng" key="images">
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {selectedContract.imageFiles?.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Hợp đồng ${index + 1}`}
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
                />
              ))}
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    );
  };

  return (
    <Card
      title={
        <Space>
          <ContainerOutlined />
          <span>Quản lý hợp đồng</span>
        </Space>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space style={{ marginBottom: 16 }}>
          <Select
            style={{ width: 200 }}
            placeholder="Chọn căn hộ"
            onChange={handleApartmentChange}
            value={selectedApartment}
          >
            {apartments.map(apt => (
              <Select.Option key={apt.apartmentId} value={apt.apartmentName}>
                {apt.apartmentName}
              </Select.Option>
            ))}
          </Select>
          <Search
            placeholder="Tìm kiếm hợp đồng"
            allowClear
            onSearch={value => setSearchText(value)}
            style={{ width: 300 }}
          />
          <DownloadButton
            icon={<DownloadOutlined />}
            onClick={handleDownloadTemplate}
          >
            Tải mẫu hợp đồng
          </DownloadButton>
        </Space>

        <Table
          columns={contractColumns}
          dataSource={contracts}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Tổng số ${total} hợp đồng`
          }}
        />
      </Space>

      {renderContractModal()}

      <RenewalModal
        isVisible={isRenewModalVisible}
        onCancel={() => setIsRenewModalVisible(false)}
        contract={renewingContract}
        onSuccess={fetchContractOwners}
        selectedApartment={selectedApartment}
      />
    </Card>
  );
};


export default ContractView;