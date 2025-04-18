import React, { useState } from 'react';
import { Table, Button, Typography, Card, Badge, Modal, Space, Descriptions, Row, Col, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined, DownloadOutlined, FilterOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;

// Styled Components
const StyledCard = styled(Card)`
  margin: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const HeaderSection = styled.div`
  background: linear-gradient(to right, #4b7bec, #3867d6);
  padding: 24px;
  color: white;
  border-radius: 8px 8px 0 0;
`;

const FilterSection = styled.div`
  padding: 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 16px;
`;

const TableSection = styled.div`
  padding: 0 24px 24px 24px;
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #f0f5ff;
    color: #3867d6;
  }
`;

const DetailsContainer = styled.div`
  padding: 24px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const ActionButton = styled(Button)`
  margin-right: 8px;
`;

const AdminFormManagement = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  // Dữ liệu mẫu dựa trên FormManagement
  const sampleData = [
    {
      id: 1,
      formType: 'apartment_renovation',
      residentName: 'Nguyễn Văn A',
      apartmentNumber: 'A-101',
      submissionDate: '2025-04-17T08:30:00',
      status: 'pending',
      reason: 'Tôi muốn thay đổi sàn nhà và sơn lại tường các phòng trong căn hộ.',
      fileUrl: '#',
      fileName: 'don_dang_ky_thi_cong.pdf'
    },
    {
      id: 2,
      formType: 'maintenance_request',
      residentName: 'Trần Thị B',
      apartmentNumber: 'B-205',
      submissionDate: '2025-04-16T14:15:00',
      status: 'approved',
      reason: 'Vòi nước trong nhà tắm bị rò rỉ cần được sửa gấp.',
      fileUrl: '#',
      fileName: 'hinh_anh_hu_hong.jpg'
    },
    {
      id: 3,
      formType: 'complaint_form',
      residentName: 'Lê Văn C',
      apartmentNumber: 'C-310',
      submissionDate: '2025-04-15T10:45:00',
      status: 'rejected',
      reason: 'Tiếng ồn từ căn hộ bên cạnh quá lớn vào ban đêm, gây ảnh hưởng đến giấc ngủ.',
      fileUrl: '#',
      fileName: 'don_khieu_nai.docx'
    },
    {
      id: 4,
      formType: 'facility_booking',
      residentName: 'Phạm Thị D',
      apartmentNumber: 'A-507',
      submissionDate: '2025-04-14T16:20:00',
      status: 'pending',
      reason: 'Đăng ký sử dụng phòng sinh hoạt cộng đồng vào ngày 20/04/2025 cho tiệc sinh nhật con.',
      fileUrl: '#',
      fileName: 'dang_ky_phong_cong_dong.pdf'
    },
    {
      id: 5,
      formType: 'apartment_transfer',
      residentName: 'Hoàng Văn E',
      apartmentNumber: 'B-412',
      submissionDate: '2025-04-13T09:10:00',
      status: 'pending',
      reason: 'Chuyển từ căn hộ hiện tại sang căn B-415 từ ngày 01/05/2025.',
      fileUrl: '#',
      fileName: 'don_chuyen_can_ho.pdf'
    }
  ];

  // Lọc dữ liệu theo trạng thái
  const filteredData = statusFilter === 'all' 
    ? sampleData 
    : sampleData.filter(item => item.status === statusFilter);

  // Bản đồ loại đơn
  const formTypeMap = {
    apartment_renovation: 'Đăng ký thi công nội thất',
    apartment_transfer: 'Đơn chuyển căn hộ',
    maintenance_request: 'Đơn yêu cầu bảo trì',
    complaint_form: 'Đơn khiếu nại',
    facility_booking: 'Đơn đăng ký sử dụng tiện ích'
  };

  const handleViewDetails = (record) => {
    setSelectedForm(record);
    setModalVisible(true);
  };

  const handleStatusChange = (formId, newStatus) => {
    // Trong UI demo, chỉ cập nhật trạng thái ở client-side
    const updatedData = sampleData.map(form => 
      form.id === formId ? { ...form, status: newStatus } : form
    );
    
    console.log(`Form ${formId} status changed to ${newStatus}`);
    setTimeout(() => {
      setModalVisible(false);
    }, 500);
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      pending: { color: 'gold', text: 'Chờ duyệt' },
      approved: { color: 'green', text: 'Đã duyệt' },
      rejected: { color: 'red', text: 'Đã từ chối' }
    };
    
    const { color, text } = statusConfig[status];
    return <Badge status={color} text={text} />;
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Loại đơn',
      dataIndex: 'formType',
      key: 'formType',
      render: (text) => formTypeMap[text] || text,
    },
    {
      title: 'Căn hộ',
      dataIndex: 'apartmentNumber',
      key: 'apartmentNumber',
    },
    {
      title: 'Người gửi',
      dataIndex: 'residentName',
      key: 'residentName',
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'submissionDate',
      key: 'submissionDate',
      render: (date) => new Date(date).toLocaleString('vi-VN'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(record)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <StyledCard>
      <HeaderSection>
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          Quản lý đơn từ cư dân
        </Title>
      </HeaderSection>

      <FilterSection>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Title level={5} style={{ margin: 0 }}>
            <FilterOutlined /> Lọc theo trạng thái
          </Title>
          <Space>
            <Button 
              type={statusFilter === 'all' ? 'primary' : 'default'}
              onClick={() => setStatusFilter('all')}
            >
              Tất cả
            </Button>
            <Button 
              type={statusFilter === 'pending' ? 'primary' : 'default'} 
              onClick={() => setStatusFilter('pending')}
            >
              Chờ duyệt
            </Button>
            <Button 
              type={statusFilter === 'approved' ? 'primary' : 'default'} 
              onClick={() => setStatusFilter('approved')}
            >
              Đã duyệt
            </Button>
            <Button 
              type={statusFilter === 'rejected' ? 'primary' : 'default'} 
              onClick={() => setStatusFilter('rejected')}
            >
              Đã từ chối
            </Button>
          </Space>
        </Space>
      </FilterSection>

      <TableSection>
        <StyledTable
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Tổng cộng ${total} đơn`
          }}
        />
      </TableSection>

      <Modal
        title={<Title level={4}>Chi tiết đơn</Title>}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedForm && (
          <>
            <DetailsContainer>
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Loại đơn">
                  {formTypeMap[selectedForm.formType] || selectedForm.formType}
                </Descriptions.Item>
                <Descriptions.Item label="Số căn hộ">
                  {selectedForm.apartmentNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Họ và tên cư dân">
                  {selectedForm.residentName}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày gửi">
                  {new Date(selectedForm.submissionDate).toLocaleString('vi-VN')}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  {getStatusTag(selectedForm.status)}
                </Descriptions.Item>
                <Descriptions.Item label="Lý do">
                  {selectedForm.reason}
                </Descriptions.Item>
                <Descriptions.Item label="Tệp đính kèm">
                  <Button 
                    type="link" 
                    icon={<DownloadOutlined />} 
                    href={selectedForm.fileUrl} 
                    target="_blank"
                  >
                    {selectedForm.fileName}
                  </Button>
                </Descriptions.Item>
              </Descriptions>
            </DetailsContainer>

            <Row gutter={16} justify="end">
              <Col>
                <ActionButton 
                  type="primary" 
                  danger 
                  icon={<CloseCircleOutlined />}
                  disabled={selectedForm.status !== 'pending'}
                  onClick={() => handleStatusChange(selectedForm.id, 'rejected')}
                >
                  Từ chối
                </ActionButton>
              </Col>
              <Col>
                <ActionButton 
                  type="primary" 
                  icon={<CheckCircleOutlined />}
                  disabled={selectedForm.status !== 'pending'}
                  onClick={() => handleStatusChange(selectedForm.id, 'approved')}
                >
                  Duyệt đơn
                </ActionButton>
              </Col>
              <Col>
                <Button onClick={() => setModalVisible(false)}>
                  Đóng
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </StyledCard>
  );
};

export default AdminFormManagement;