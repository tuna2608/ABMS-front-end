import React from "react";
import { 
  Modal, 
  Row, 
  Col, 
  Typography, 
  Divider, 
  Button,
  Tag
} from "antd";

const { Text, Title } = Typography;

const DepositDetailModal = ({ visible, onCancel, deposit }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + " VNĐ";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const renderDepositStatus = (status) => {
    switch (status) {
      case 'pending':
        return <Tag color="blue">Chờ xác nhận</Tag>;
      case 'confirmed':
        return <Tag color="orange">Đã xác nhận</Tag>;
      case 'completed':
        return <Tag color="green">Hoàn thành</Tag>;
      case 'cancelled':
        return <Tag color="red">Đã hủy</Tag>;
      default:
        return <Tag>Chưa xác định</Tag>;
    }
  };

  const renderDepositType = (type) => {
    switch (type) {
      case 'rental':
        return <Tag color="purple">Cho thuê</Tag>;
      case 'purchase':
        return <Tag color="geekblue">Mua bán</Tag>;
      default:
        return <Tag>Khác</Tag>;
    }
  };

  if (!deposit) return null;

  return (
    <Modal
      title="Chi tiết giao dịch đặt cọc"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel}>
          Đóng
        </Button>
      ]}
      width={700}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={4}>{deposit.id}</Title>
            {renderDepositStatus(deposit.status)}
          </div>
          <Divider style={{ margin: '12px 0' }} />
        </Col>
        
        <Col xs={24} sm={12}>
          <Text type="secondary">Loại giao dịch</Text>
          <div>{renderDepositType(deposit.type)}</div>
        </Col>
        
        <Col xs={24} sm={12}>
          <Text type="secondary">Số tiền đặt cọc</Text>
          <div><Text strong>{formatCurrency(deposit.amount)}</Text></div>
        </Col>
        
        <Col xs={24} sm={12}>
          <Text type="secondary">Mã căn hộ</Text>
          <div>{deposit.apartmentId}</div>
        </Col>
        
        <Col xs={24} sm={12}>
          <Text type="secondary">Tên căn hộ</Text>
          <div>{deposit.apartmentName}</div>
        </Col>
        
        <Col xs={24} sm={12}>
          <Text type="secondary">Ngày tạo giao dịch</Text>
          <div>{formatDate(deposit.createdAt)}</div>
        </Col>
        
        <Col xs={24} sm={12}>
          <Text type="secondary">Ngày giao dịch</Text>
          <div>{formatDate(deposit.transactionDate)}</div>
        </Col>
        
        <Col xs={24} sm={12}>
          <Text type="secondary">Hạn hoàn thành</Text>
          <div>{formatDate(deposit.dueDate)}</div>
        </Col>
        
        <Col span={24}>
          <Divider orientation="left">Thông tin chủ nhà</Divider>
        </Col>
        
        <Col xs={24} sm={12}>
          <Text type="secondary">Tên chủ nhà</Text>
          <div>{deposit.owner}</div>
        </Col>
        
        <Col xs={24} sm={12}>
          <Text type="secondary">Số điện thoại</Text>
          <div>{deposit.ownerPhone}</div>
        </Col>
        
        <Col span={24}>
          <Divider orientation="left">Thông tin khách hàng</Divider>
        </Col>
        
        <Col xs={24} sm={12}>
          <Text type="secondary">Tên khách hàng</Text>
          <div>{deposit.tenant}</div>
        </Col>
        
        <Col xs={24} sm={12}>
          <Text type="secondary">Số điện thoại</Text>
          <div>{deposit.tenantPhone}</div>
        </Col>
        
        <Col span={24}>
          <Text type="secondary">Ghi chú</Text>
          <div style={{ padding: '8px', background: '#f5f5f5', borderRadius: '4px', marginTop: '4px' }}>
            {deposit.notes}
          </div>
        </Col>
        
        <Col span={24} style={{ marginTop: 16 }}>
          <div className="note-box" style={{ padding: '12px', background: '#f0f8ff', borderRadius: '4px', border: '1px solid #d9e8ff' }}>
            <Text type="secondary">
              <i>Ghi chú: Nhân viên chỉ có quyền xem thông tin giao dịch. Vui lòng liên hệ quản lý để thực hiện các thao tác xác nhận hoặc hủy giao dịch.</i>
            </Text>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default DepositDetailModal;