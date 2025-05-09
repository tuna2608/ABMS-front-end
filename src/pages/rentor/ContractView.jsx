import React, { useEffect, useState } from "react";
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
import moment from "moment";
import { useSelector } from "react-redux";
import { getContractRentor } from "../../redux/apiCalls";

// Hàm format tiền tệ
const formatCurrency = (value) => {
  if (typeof value !== 'number') return '0';
  return new Intl.NumberFormat('vi-VN').format(value) + ' VND';
};

// ContractView Component
const ContractView = () => {
  const [currentUser] = useState(
    useSelector((state) => state.user.currentUser)
  );

  const [contracts, setContracts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [isContractModalVisible, setIsContractModalVisible] = useState(false);



  useEffect(()=>{
    callGetContractByRentorId(currentUser)
  },[currentUser])

  async function callGetContractByRentorId(currentUser){
    setLoading(true)
    try {
      const rentorId = currentUser.userId;
      const res = await getContractRentor(rentorId);
      if(res.success){
        setContracts(res.data);
        message.success(res.message)
      }else{
        message.error(res.message)
      }
    } catch (error) {
      message.error("Không thể lấy danh sách hợp đồng của người thuê")
    }finally{
      setLoading(false)
    }
  }

  // Hàm tải hợp đồng
  const handleDownloadContract = () => {
    // Thay thế URL này bằng link Google Drive trực tiếp có thể tải xuống
    const contractUrl = 'https://drive.google.com/drive/folders/1pBZ7EDr0qQPSM532vx9984FIx0-lQWCm?usp=drive_link';
    
    try {
      // Mở link tải xuống trong tab mới
      window.open(contractUrl, '_blank');
      
      // Hiển thị thông báo thành công
      message.success('Đang tải hợp đồng. Vui lòng kiểm tra trình duyệt của bạn.');
    } catch (error) {
      // Xử lý lỗi nếu có
      message.error('Có lỗi xảy ra khi tải hợp đồng. Vui lòng thử lại.');
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
      title: "Ngày bắt đầu",
      dataIndex: "contractStartDate",
      key: "contractStartDate",
      render: (date) => moment(date).format("DD/MM/YYYY")
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "contractEndDate",
      key: "contractEndDate",
      render: (date) => moment(date).format("DD/MM/YYYY")
    },
    {
      title: "Trạng thái",
      dataIndex: "verified",
      key: "verified",
      render: (verified) => {
        const statusMap = {
          true: { color: "green", text: "Đang hiệu lực" },
          false: { color: "red", text: "Đã hết hạn" }
        };
        const statusInfo = statusMap[verified];
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
        key={selectedContract.apartmentName}
        title="Chi tiết hợp đồng"
        open={isContractModalVisible}
        onCancel={() => setIsContractModalVisible(false)}
        footer={[
          <Button 
            key="download" 
            type="primary" 
            icon={<DownloadOutlined />}
            onClick={handleDownloadContract}
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
      title="Hợp đồng của tôi"
    >
      <Table 
        dataSource={contracts} 
        columns={contractColumns}
        rowKey={(record)=>record.apartmentName}
      />
      {renderContractModal()}
    </Card>
  );
};

export default ContractView;