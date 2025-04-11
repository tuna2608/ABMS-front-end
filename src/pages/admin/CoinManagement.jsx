import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  message, 
  Typography,
  Descriptions,
  Tag,
  Modal,
  Space,
  Alert
} from 'antd';
import { 
  MoneyCollectOutlined, 
  BankOutlined, 
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';

const { Text } = Typography;

// Sample initial transfer request data for testing
const initialTransferRequest = {
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
};

const CoinManagement = () => {
  const [transferRequest, setTransferRequest] = useState(initialTransferRequest);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  // Handle coin transfer approval or rejection
  const handleTransferAction = (action) => {
    setModalAction(action);
    setIsConfirmModalVisible(true);
  };

  // Confirm transfer process
  const confirmTransfer = () => {
    if (!transferRequest) return;

    Modal.confirm({
      title: modalAction === 'approve' 
        ? 'Xác Nhận Chuyển Coin' 
        : 'Xác Nhận Từ Chối Yêu Cầu',
      content: modalAction === 'approve'
        ? `Bạn có chắc chuyển ${transferRequest.amount} coin cho ${transferRequest.fullName}?`
        : `Bạn có chắc từ chối yêu cầu chuyển ${transferRequest.amount} coin của ${transferRequest.fullName}?`,
      onOk() {
        // Simulate transfer or rejection process
        const successMessage = modalAction === 'approve'
          ? `Đã chuyển ${transferRequest.amount} coin cho ${transferRequest.fullName}`
          : `Đã từ chối yêu cầu chuyển coin của ${transferRequest.fullName}`;
        
        message.success(successMessage);
        
        // Update transfer request status
        const updatedStatus = modalAction === 'approve' ? 'completed' : 'rejected';
        setTransferRequest(prev => ({
          ...prev,
          status: updatedStatus
        }));

        // Close modal
        setIsConfirmModalVisible(false);
      }
    });
  };

  return (
    <Card 
      title={
        <Space>
          <MoneyCollectOutlined />
          <span>Quản lý Yêu Cầu Chuyển Coin</span>
        </Space>
      }
    >
      <Card 
        type="inner" 
        title={
          <Space>
            <BankOutlined />
            <span>Thông Tin Tài Khoản Ngân Hàng</span>
          </Space>
        }
        style={{ marginBottom: 16 }}
      >
        <Descriptions column={1}>
          <Descriptions.Item label="Tên Ngân Hàng">
            {transferRequest.bankInfo.bankName}
          </Descriptions.Item>
          <Descriptions.Item label="Số Tài Khoản">
            {transferRequest.bankInfo.accountNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Tên Tài Khoản">
            {transferRequest.bankInfo.accountName}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card 
        type="inner" 
        title={
          <Space>
            <MoneyCollectOutlined />
            <span>Chi Tiết Yêu Cầu</span>
          </Space>
        }
      >
        <Descriptions column={1}>
          <Descriptions.Item label="Người Yêu Cầu">
            <Text strong>{transferRequest.fullName}</Text>
            <br />
            <Text type="secondary">({transferRequest.username})</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Số Tiền Yêu Cầu">
            <Text strong style={{ color: '#1890ff' }}>
              {transferRequest.amount} VND
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="Ngày Yêu Cầu">
            {transferRequest.requestDate}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng Thái">
            {transferRequest.status === 'pending' ? (
              <Tag color="orange">Chờ Xử Lý</Tag>
            ) : transferRequest.status === 'completed' ? (
              <Tag color="green">Đã Hoàn Thành</Tag>
            ) : (
              <Tag color="red">Đã Từ Chối</Tag>
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {transferRequest.status === 'pending' && (
        <div style={{ 
          marginTop: 16, 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '16px' 
        }}>
          <Button 
            type="primary" 
            icon={<CheckOutlined />} 
            size="large"
            onClick={() => handleTransferAction('approve')}
          >
            Duyệt Chuyển Coin
          </Button>
          <Button 
            type="danger" 
            icon={<CloseOutlined />} 
            size="large"
            onClick={() => handleTransferAction('reject')}
          >
            Từ Chối Yêu Cầu
          </Button>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal
        title={modalAction === 'approve' 
          ? 'Xác Nhận Chuyển Coin' 
          : 'Xác Nhận Từ Chối Yêu Cầu'}
        open={isConfirmModalVisible}
        onOk={confirmTransfer}
        onCancel={() => setIsConfirmModalVisible(false)}
      >
        <p>
          {modalAction === 'approve' 
            ? `Bạn có chắc muốn duyệt và chuyển ${transferRequest.amount} VND cho ${transferRequest.fullName} không?`
            : `Bạn có chắc muốn từ chối yêu cầu chuyển ${transferRequest.amount} VND của ${transferRequest.fullName} không?`}
        </p>
        <Alert 
          message="Lưu Ý" 
          description="Sau khi xác nhận, giao dịch sẽ không thể hoàn tác." 
          type="warning" 
          showIcon 
        />
      </Modal>
    </Card>
  );
};

export default CoinManagement;