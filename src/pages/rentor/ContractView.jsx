import React, { useState, useEffect } from "react";
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Descriptions, 
  Tag, 
} from "antd";
import { 
  FileProtectOutlined, 
  DownloadOutlined, 
} from "@ant-design/icons";

import moment from "moment";

// Hàm format tiền tệ
const formatCurrency = (value) => {
  // Kiểm tra nếu value không phải là số
  if (typeof value !== 'number') return '0';
  
  // Format số tiền theo định dạng Việt Nam
  return new Intl.NumberFormat('vi-VN').format(value) + ' VND';
};

// ContractView Component
const ContractView = () => {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [isContractModalVisible, setIsContractModalVisible] = useState(false);

  // Mock contracts data
  useEffect(() => {
    const mockContracts = [
      {
        id: 1,
        apartmentName: "Căn hộ 2PN Vinhomes Central Park",
        contractNumber: "HĐ-2023-001",
        startDate: "2023-06-01",
        endDate: "2024-06-01",
        rentAmount: 15000000,
        status: "active",
        parkingSlot: "A12",
        additionalFees: {
          management: 3000000,
          parking: 1000000,
          service: 2000000
        }
      },
      {
        id: 2,
        apartmentName: "Căn hộ 1PN Masteri Thảo Điền",
        contractNumber: "HĐ-2023-002",
        startDate: "2023-09-15",
        endDate: "2024-09-15",
        rentAmount: 12000000,
        status: "expired",
        parkingSlot: "B24",
        additionalFees: {
          management: 2500000,
          parking: 800000,
          service: 1800000
        }
      }
    ];
    setContracts(mockContracts);
  }, []);

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
    <Card title="Hợp đồng của tôi">
      <Table 
        dataSource={contracts} 
        columns={contractColumns}
        rowKey="id"
      />
      {renderContractModal()}
    </Card>
  );
};

export default ContractView;