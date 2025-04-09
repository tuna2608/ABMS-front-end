import React, { useState } from "react";
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Descriptions, 
  Tag,
  message
} from "antd";
import { 
  FileProtectOutlined, 
  DownloadOutlined, 
} from "@ant-design/icons";
import styled from 'styled-components';
import moment from "moment";

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

// ContractView Component
const ContractView = () => {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [isContractModalVisible, setIsContractModalVisible] = useState(false);

  // Hàm tải mẫu đơn
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
      title: "Căn hộ",
      dataIndex: "apartmentName",
      key: "apartmentName",
    },
    {
      title: "Số hợp đồng",
      dataIndex: "contractNumber",
      key: "contractNumber",
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
      render: (status) => {
        const statusMap = {
          active: { color: "green", text: "Đang hiệu lực" },
          expired: { color: "red", text: "Đã hết hạn" }
        };
        const statusInfo = statusMap[status];
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
      }
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
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
        footer={[
          <Button 
            key="download" 
            type="primary" 
            icon={<DownloadOutlined />}
          >
            Tải hợp đồng
          </Button>,
          <Button 
            key="close" 
            onClick={() => setIsContractModalVisible(false)}
          >
            Đóng
          </Button>
        ]}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Căn hộ">
            {selectedContract.apartmentName}
          </Descriptions.Item>
          <Descriptions.Item label="Số hợp đồng">
            {selectedContract.contractNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày bắt đầu">
            {moment(selectedContract.startDate).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày kết thúc">
            {moment(selectedContract.endDate).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Tiền thuê">
            {formatCurrency(selectedContract.rentAmount)}/tháng
          </Descriptions.Item>
          <Descriptions.Item label="Phí quản lý">
            {formatCurrency(selectedContract.additionalFees?.management)}/tháng
          </Descriptions.Item>
          <Descriptions.Item label="Phí giữ xe">
            {formatCurrency(selectedContract.additionalFees?.parking)}/tháng
          </Descriptions.Item>
          <Descriptions.Item label="Phí dịch vụ">
            {formatCurrency(selectedContract.additionalFees?.service)}/tháng
          </Descriptions.Item>
          <Descriptions.Item label="Vị trí bãi đỗ xe">
            {selectedContract.parkingSlot}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag color={selectedContract.status === 'active' ? 'green' : 'red'}>
              {selectedContract.status === 'active' ? 'Đang hiệu lực' : 'Đã hết hạn'}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    );
  };

  return (  
    <Card 
      title="Quản lý hợp đồng "
      extra={
        <DownloadButton 
          icon={<DownloadOutlined />} 
          onClick={handleDownloadTemplate}
        >
          Tải mẫu đơn tại đây
        </DownloadButton>
      }
    >
      <Table 
        dataSource={contracts} 
        columns={contractColumns}
        rowKey="id"
        locale={{ emptyText: 'Không có dữ liệu' }}
      />
      {renderContractModal()}
    </Card>
  );
};

export default ContractView;