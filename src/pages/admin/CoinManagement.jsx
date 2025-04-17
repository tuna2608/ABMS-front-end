import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  message, 
  Typography,
  Tag,
  Modal,
  Space,
  Alert,
  Table,
  Drawer,
  Descriptions,
  Divider,
  Image
} from 'antd';
import { 
  MoneyCollectOutlined, 
  BankOutlined, 
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  QrcodeOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Text } = Typography;

// Hàm định dạng số tiền mới thay thế cho toLocaleString()
const formatCurrency = (amount) => {
  // Chuyển số thành string
  const numStr = String(amount);
  // Thêm dấu phẩy ngăn cách hàng nghìn
  let result = '';
  let counter = 0;
  
  for (let i = numStr.length - 1; i >= 0; i--) {
    counter++;
    result = numStr[i] + result;
    if (counter % 3 === 0 && i !== 0) {
      result = ',' + result;
    }
  }
  
  return result;
};

// Sample data for multiple transfer requests
const sampleTransferRequests = [
  {
    id: 1,
    userId: 'U001',
    username: 'nguyen_van_a',
    fullName: 'Nguyễn Văn A',
    amount: 500000,
    status: 'pending',
    bankInfo: {
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'NGUYEN VAN A'
    },
    requestDate: '2024-04-10'
  },
  {
    id: 2,
    userId: 'U002',
    username: 'tran_thi_b',
    fullName: 'Trần Thị B',
    amount: 1000000,
    status: 'pending',
    bankInfo: {
      bankName: 'BIDV',
      accountNumber: '0987654321',
      accountName: 'TRAN THI B'
    },
    requestDate: '2024-04-11'
  },
  {
    id: 3,
    userId: 'U003',
    username: 'le_van_c',
    fullName: 'Lê Văn C',
    amount: 750000,
    status: 'completed',
    bankInfo: {
      bankName: 'Techcombank',
      accountNumber: '2345678901',
      accountName: 'LE VAN C'
    },
    requestDate: '2024-04-09'
  },
  {
    id: 4,
    userId: 'U004',
    username: 'pham_thi_d',
    fullName: 'Phạm Thị D',
    amount: 300000,
    status: 'rejected',
    bankInfo: {
      bankName: 'TPBank',
      accountNumber: '3456789012',
      accountName: 'PHAM THI D'
    },
    requestDate: '2024-04-08'
  }
];

const CoinManagement = () => {
  const [transferRequests, setTransferRequests] = useState(sampleTransferRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);

  // Status tag renderer
  const renderStatus = (status) => {
    const statusMap = {
      pending: { color: 'orange', text: 'Chờ Xử Lý' },
      completed: { color: 'green', text: 'Đã Hoàn Thành' },
      rejected: { color: 'red', text: 'Đã Từ Chối' }
    };
    
    const { color, text } = statusMap[status] || { color: 'default', text: status };
    return <Tag color={color}>{text}</Tag>;
  };

  // View request details
  const viewRequestDetails = (record) => {
    setSelectedRequest(record);
    setDrawerVisible(true);
  };

  // Handle approval action
  const handleApprove = (record) => {
    setSelectedRequest(record);
    setQrModalVisible(true);
  };

  // Handle rejection action
  const handleReject = (record) => {
    setSelectedRequest(record);
    setRejectModalVisible(true);
  };

  // Confirm transfer completion
  const confirmTransferCompleted = () => {
    if (!selectedRequest) return;
    
    // Update the request status
    const updatedRequests = transferRequests.map(req => 
      req.id === selectedRequest.id ? { ...req, status: 'completed' } : req
    );
    setTransferRequests(updatedRequests);
    
    // Show success message
    message.success(`Đã xác nhận chuyển ${formatCurrency(selectedRequest.amount)} VND cho ${selectedRequest.fullName}`);
    
    // Close QR modal
    setQrModalVisible(false);
  };

  // Confirm rejection
  const confirmReject = () => {
    if (!selectedRequest) return;
    
    // Update the request status
    const updatedRequests = transferRequests.map(req => 
      req.id === selectedRequest.id ? { ...req, status: 'rejected' } : req
    );
    setTransferRequests(updatedRequests);
    
    // Show success message
    message.success(`Đã từ chối yêu cầu chuyển coin của ${selectedRequest.fullName}`);
    
    // Close reject modal
    setRejectModalVisible(false);
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Người Yêu Cầu',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text, record) => (
        <>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary">({record.username})</Text>
        </>
      ),
    },
    {
      title: 'Số Tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <Text strong style={{ color: '#1890ff' }}>
          {formatCurrency(amount)} VND
        </Text>
      ),
    },
    {
      title: 'Ngày Yêu Cầu',
      dataIndex: 'requestDate',
      key: 'requestDate',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: renderStatus,
    },
    {
      title: 'Thao Tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => viewRequestDetails(record)} 
            title="Xem chi tiết"
          />
          {record.status === 'pending' && (
            <>
              <Button 
                type="primary" 
                icon={<CheckOutlined />} 
                onClick={() => handleApprove(record)} 
                title="Duyệt"
              />
              <Button 
                danger 
                icon={<CloseOutlined />} 
                onClick={() => handleReject(record)} 
                title="Từ chối"
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card 
      title={
        <Space>
          <MoneyCollectOutlined />
          <span>Quản lý Yêu Cầu Chuyển Coin</span>
        </Space>
      }
    >
      {/* Table of transfer requests */}
      <Table 
        dataSource={transferRequests} 
        columns={columns} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      {/* Request Details Drawer */}
      <Drawer
        title="Chi Tiết Yêu Cầu Chuyển Coin"
        placement="right"
        width={400}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        extra={
          selectedRequest?.status === 'pending' && (
            <Space>
              <Button 
                type="primary" 
                icon={<CheckOutlined />}
                onClick={() => {
                  setDrawerVisible(false);
                  handleApprove(selectedRequest);
                }}
              >
                Duyệt
              </Button>
              <Button 
                danger 
                icon={<CloseOutlined />}
                onClick={() => {
                  setDrawerVisible(false);
                  handleReject(selectedRequest);
                }}
              >
                Từ Chối
              </Button>
            </Space>
          )
        }
      >
        {selectedRequest && (
          <>
            <Descriptions title="Thông Tin Người Dùng" column={1}>
              <Descriptions.Item label="Họ Tên">
                {selectedRequest.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Tên Đăng Nhập">
                {selectedRequest.username}
              </Descriptions.Item>
              <Descriptions.Item label="Số Tiền Yêu Cầu">
                <Text strong style={{ color: '#1890ff' }}>
                  {formatCurrency(selectedRequest.amount)} VND
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Trạng Thái">
                {renderStatus(selectedRequest.status)}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày Yêu Cầu">
                {selectedRequest.requestDate}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Thông Tin Tài Khoản Ngân Hàng" column={1}>
              <Descriptions.Item label="Tên Ngân Hàng">
                {selectedRequest.bankInfo.bankName}
              </Descriptions.Item>
              <Descriptions.Item label="Số Tài Khoản">
                {selectedRequest.bankInfo.accountNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Tên Tài Khoản">
                {selectedRequest.bankInfo.accountName}
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Drawer>

      {/* QR Code Modal for Transfer */}
      <Modal
        title={
          <Space>
            <QrcodeOutlined />
            <span>Xác Nhận Chuyển Khoản</span>
          </Space>
        }
        open={qrModalVisible}
        onCancel={() => setQrModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setQrModalVisible(false)}>
            Hủy
          </Button>,
          <Button 
            key="confirm" 
            type="primary" 
            icon={<CheckCircleOutlined />}
            onClick={confirmTransferCompleted}
          >
            Đã Chuyển Khoản
          </Button>
        ]}
      >
        {selectedRequest && (
          <>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Người Nhận">
                {selectedRequest.bankInfo.accountName}
              </Descriptions.Item>
              <Descriptions.Item label="Số Tài Khoản">
                {selectedRequest.bankInfo.accountNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Ngân Hàng">
                {selectedRequest.bankInfo.bankName}
              </Descriptions.Item>
              <Descriptions.Item label="Số Tiền">
                <Text strong style={{ color: '#1890ff' }}>
                  {formatCurrency(selectedRequest.amount)} VND
                </Text>
              </Descriptions.Item>
            </Descriptions>
            
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <Image 
                src="/api/placeholder/200/200" 
                alt="QR Code for Bank Transfer"
                style={{ maxWidth: '200px' }}
              />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">Quét mã QR để chuyển khoản</Text>
              </div>
            </div>

            <Alert
              message="Xác nhận sau khi chuyển khoản"
              description="Sau khi hoàn tất chuyển khoản, vui lòng nhấn nút 'Đã Chuyển Khoản' để xác nhận và hoàn tất yêu cầu."
              type="info"
              showIcon
            />
          </>
        )}
      </Modal>

      {/* Rejection Confirmation Modal */}
      <Modal
        title="Xác Nhận Từ Chối Yêu Cầu"
        open={rejectModalVisible}
        onOk={confirmReject}
        onCancel={() => setRejectModalVisible(false)}
        okText="Xác Nhận Từ Chối"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        {selectedRequest && (
          <>
            <p>
              Bạn có chắc muốn từ chối yêu cầu chuyển {formatCurrency(selectedRequest.amount)} VND của {selectedRequest.fullName} không?
            </p>
            <Alert
              message="Lưu ý"
              description="Thao tác này không thể hoàn tác sau khi xác nhận."
              type="warning"
              showIcon
            />
          </>
        )}
      </Modal>
    </Card>
  );
};

export default CoinManagement;