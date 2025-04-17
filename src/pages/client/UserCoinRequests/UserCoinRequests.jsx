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
  CheckCircleOutlined,
  EyeOutlined,
  FileImageOutlined,
  HistoryOutlined,
  ClockCircleOutlined
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

// Sample data for user's transfer requests
const sampleUserRequests = [
  {
    id: 1,
    amount: 500000,
    status: 'pending',
    bankInfo: {
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'NGUYEN VAN A'
    },
    requestDate: '2024-04-10',
    transferProof: null
  },
  {
    id: 2,
    amount: 1000000,
    status: 'processing',
    bankInfo: {
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'NGUYEN VAN A'
    },
    requestDate: '2024-04-09',
    transferProof: '/api/placeholder/600/400'
  },
  {
    id: 3,
    amount: 750000,
    status: 'completed',
    bankInfo: {
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'NGUYEN VAN A'
    },
    requestDate: '2024-04-05',
    transferProof: '/api/placeholder/600/400',
    completedDate: '2024-04-06'
  },
  {
    id: 4,
    amount: 300000,
    status: 'rejected',
    bankInfo: {
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'NGUYEN VAN A'
    },
    requestDate: '2024-04-01',
    rejectedDate: '2024-04-02'
  }
];

const UserCoinRequests = () => {
  const [userRequests, setUserRequests] = useState(sampleUserRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [proofImageVisible, setProofImageVisible] = useState(false);
  const [confirmReceiptVisible, setConfirmReceiptVisible] = useState(false);

  // Status tag renderer
  const renderStatus = (status) => {
    const statusMap = {
      pending: { color: 'orange', text: 'Chờ Xử Lý' },
      processing: { color: 'blue', text: 'Đang Xử Lý' },
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

  // View transfer proof image
  const viewTransferProof = (record) => {
    setSelectedRequest(record);
    setProofImageVisible(true);
  };

  // Confirm receipt of transfer
  const handleConfirmReceipt = (record) => {
    setSelectedRequest(record);
    setConfirmReceiptVisible(true);
  };

  // Confirm user has received the money
  const confirmReceived = () => {
    if (!selectedRequest) return;
    
    // Update the request status
    const updatedRequests = userRequests.map(req => 
      req.id === selectedRequest.id ? { ...req, status: 'completed', completedDate: new Date().toISOString().split('T')[0] } : req
    );
    setUserRequests(updatedRequests);
    
    // Show success message
    message.success(`Đã xác nhận nhận được ${formatCurrency(selectedRequest.amount)} VND`);
    
    // Close confirmation modal
    setConfirmReceiptVisible(false);
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Ngày Yêu Cầu',
      dataIndex: 'requestDate',
      key: 'requestDate',
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
          {record.status === 'processing' && record.transferProof && (
            <>
              <Button 
                icon={<FileImageOutlined />} 
                onClick={() => viewTransferProof(record)} 
                title="Xem ảnh chuyển khoản"
              />
              <Button 
                type="primary" 
                icon={<CheckCircleOutlined />} 
                onClick={() => handleConfirmReceipt(record)} 
                title="Xác nhận đã nhận tiền"
              >
                Xác nhận
              </Button>
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
          <span>Yêu Cầu Chuyển Coin Của Tôi</span>
        </Space>
      }
    >
      {/* Table of user transfer requests */}
      <Table 
        dataSource={userRequests} 
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
          selectedRequest?.status === 'processing' && (
            <Button 
              type="primary" 
              icon={<CheckCircleOutlined />}
              onClick={() => {
                setDrawerVisible(false);
                handleConfirmReceipt(selectedRequest);
              }}
            >
              Xác Nhận Đã Nhận
            </Button>
          )
        }
      >
        {selectedRequest && (
          <>
            <Descriptions title="Thông Tin Yêu Cầu" column={1}>
              <Descriptions.Item label="Số Tiền Yêu Cầu">
                <Text strong style={{ color: '#1890ff' }}>
                  {formatCurrency(selectedRequest.amount)} VND
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Trạng Thái">
                {renderStatus(selectedRequest.status)}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày Yêu Cầu">
                <Space>
                  <ClockCircleOutlined />
                  {selectedRequest.requestDate}
                </Space>
              </Descriptions.Item>
              {selectedRequest.completedDate && (
                <Descriptions.Item label="Ngày Hoàn Thành">
                  <Space>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    {selectedRequest.completedDate}
                  </Space>
                </Descriptions.Item>
              )}
              {selectedRequest.rejectedDate && (
                <Descriptions.Item label="Ngày Từ Chối">
                  {selectedRequest.rejectedDate}
                </Descriptions.Item>
              )}
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

            {selectedRequest.status === 'processing' && selectedRequest.transferProof && (
              <>
                <Divider />
                <div style={{ textAlign: 'center' }}>
                  <Button 
                    type="primary" 
                    icon={<FileImageOutlined />}
                    onClick={() => {
                      setDrawerVisible(false);
                      viewTransferProof(selectedRequest);
                    }}
                  >
                    Xem Ảnh Chuyển Khoản
                  </Button>
                </div>
              </>
            )}

            {selectedRequest.status === 'pending' && (
              <>
                <Divider />
                <Alert
                  message="Yêu cầu đang chờ xử lý"
                  description="Admin đang xem xét yêu cầu của bạn. Vui lòng chờ trong giây lát."
                  type="info"
                  showIcon
                  icon={<ClockCircleOutlined />}
                />
              </>
            )}

            {selectedRequest.status === 'rejected' && (
              <>
                <Divider />
                <Alert
                  message="Yêu cầu đã bị từ chối"
                  description="Vui lòng liên hệ với admin để biết thêm chi tiết."
                  type="error"
                  showIcon
                />
              </>
            )}
          </>
        )}
      </Drawer>

      {/* Transfer Proof Image Modal */}
      <Modal
        title="Ảnh Chuyển Khoản"
        open={proofImageVisible}
        onCancel={() => setProofImageVisible(false)}
        footer={[
          <Button key="back" onClick={() => setProofImageVisible(false)}>
            Đóng
          </Button>,
          selectedRequest?.status === 'processing' && (
            <Button 
              key="confirm" 
              type="primary" 
              icon={<CheckCircleOutlined />}
              onClick={() => {
                setProofImageVisible(false);
                setConfirmReceiptVisible(true);
              }}
            >
              Xác Nhận Đã Nhận Tiền
            </Button>
          )
        ]}
        width={700}
      >
        {selectedRequest && (
          <div style={{ textAlign: 'center' }}>
            <Image 
              src={selectedRequest.transferProof} 
              alt="Ảnh chuyển khoản"
              style={{ maxWidth: '100%' }}
            />
            <Descriptions style={{ marginTop: 16 }} column={1}>
              <Descriptions.Item label="Số Tiền">
                <Text strong style={{ color: '#1890ff' }}>
                  {formatCurrency(selectedRequest.amount)} VND
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Tài Khoản Nhận">
                {selectedRequest.bankInfo.accountName} - {selectedRequest.bankInfo.accountNumber} - {selectedRequest.bankInfo.bankName}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* Confirm Receipt Modal */}
      <Modal
        title="Xác Nhận Đã Nhận Tiền"
        open={confirmReceiptVisible}
        onOk={confirmReceived}
        onCancel={() => setConfirmReceiptVisible(false)}
        okText="Xác Nhận Đã Nhận"
        cancelText="Hủy"
      >
        {selectedRequest && (
          <>
            <p>
              Bạn xác nhận đã nhận được số tiền {formatCurrency(selectedRequest.amount)} VND vào tài khoản {selectedRequest.bankInfo.bankName} của mình?
            </p>
            <Alert
              message="Lưu ý"
              description="Sau khi xác nhận, hệ thống sẽ cập nhật trạng thái yêu cầu thành 'Đã hoàn thành' và thêm coin vào tài khoản của bạn."
              type="info"
              showIcon
              icon={<HistoryOutlined />}
            />
          </>
        )}
      </Modal>
    </Card>
  );
};

export default UserCoinRequests;