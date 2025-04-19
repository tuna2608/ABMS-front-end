
import React, { useState, useEffect } from 'react';
import { Table, Button, Typography, Card, Badge, Modal, Space, Descriptions, Row, Col } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined, DownloadOutlined, FilterOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getAllForms, approveForm } from '../../redux/apiCalls';

const { Title } = Typography;

const StyledCard = styled(Card)`margin: 24px;border-radius: 8px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);`;
const HeaderSection = styled.div`background: linear-gradient(to right, #4b7bec, #3867d6);padding: 24px;color: white;border-radius: 8px 8px 0 0;`;
const FilterSection = styled.div`padding: 16px;background-color: #f8f9fa;border-bottom: 1px solid #e8e8e8;margin-bottom: 16px;`;
const TableSection = styled.div`padding: 0 24px 24px 24px;`;
const StyledTable = styled(Table)`.ant-table-thead > tr > th {background-color: #f0f5ff;color: #3867d6;}`;
const DetailsContainer = styled.div`padding: 24px;background-color: #f8f9fa;border-radius: 8px;margin-bottom: 16px;`;
const ActionButton = styled(Button)`margin-right: 8px;`;

const formTypeMap = {
  apartment_renovation: 'Đăng ký thi công nội thất',
  apartment_transfer: 'Đơn chuyển căn hộ',
  maintenance_request: 'Đơn yêu cầu bảo trì',
  complaint_form: 'Đơn khiếu nại',
  facility_booking: 'Đơn đăng ký sử dụng tiện ích',
};

const AdminFormManagement = () => {
  const dispatch = useDispatch();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      const res = await getAllForms(dispatch);
      if (res.success) {
        const mapped = res.data.map((item) => ({
          id: item.formId,
          formType: item.formType,
          apartmentNumber: item.apartment?.apartmentName || 'N/A',
          residentName: item.user?.fullName || 'N/A',
          submissionDate: item.createdAt,
          status: item.status,
          reason: item.reason || '-',
          fileUrl: item.fileUrl,
          fileName: item.fileName,
        }));
        setForms(mapped);
      }
      setLoading(false);
    };
    fetchForms();
  }, [dispatch]);

  const handleStatusChange = async (formId, newStatus) => {
    const res = await approveForm(dispatch, formId, newStatus);
    if (res.success) {
      const updated = forms.map(f => f.id === formId ? { ...f, status: newStatus } : f);
      setForms(updated);
      setModalVisible(false);
    }
  };

  const getStatusTag = (status) => {
    const config = {
      pending: { color: 'gold', text: 'Chờ duyệt' },
      approved: { color: 'green', text: 'Đã duyệt' },
      rejected: { color: 'red', text: 'Đã từ chối' },
    };
    return <Badge status={config[status]?.color} text={config[status]?.text} />;
  };

  const filteredData = statusFilter === 'all' ? forms : forms.filter(f => f.status === statusFilter);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'Loại đơn', dataIndex: 'formType', render: (t) => formTypeMap[t] || t },
    { title: 'Căn hộ', dataIndex: 'apartmentNumber' },
    { title: 'Người gửi', dataIndex: 'residentName' },
    { title: 'Ngày gửi', dataIndex: 'submissionDate', render: (d) => new Date(d).toLocaleString('vi-VN') },
    { title: 'Trạng thái', dataIndex: 'status', render: getStatusTag },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" icon={<EyeOutlined />} onClick={() => { setSelectedForm(record); setModalVisible(true); }}>Chi tiết</Button>
      ),
    },
  ];

  return (
    <StyledCard>
      <HeaderSection>
        <Title level={2} style={{ color: 'white', margin: 0 }}>Quản lý đơn từ cư dân</Title>
      </HeaderSection>

      <FilterSection>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={5}><FilterOutlined /> Lọc theo trạng thái</Title>
          <Space>
            {['all', 'pending', 'approved', 'rejected'].map(st => (
              <Button
                key={st}
                type={statusFilter === st ? 'primary' : 'default'}
                onClick={() => setStatusFilter(st)}
              >
                {st === 'all' ? 'Tất cả' : getStatusTag(st)}
              </Button>
            ))}
          </Space>
        </Space>
      </FilterSection>

      <TableSection>
        <StyledTable
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10, showTotal: (t) => `Tổng cộng ${t} đơn` }}
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
                <Descriptions.Item label="Loại đơn">{formTypeMap[selectedForm.formType]}</Descriptions.Item>
                <Descriptions.Item label="Căn hộ">{selectedForm.apartmentNumber}</Descriptions.Item>
                <Descriptions.Item label="Người gửi">{selectedForm.residentName}</Descriptions.Item>
                <Descriptions.Item label="Ngày gửi">{new Date(selectedForm.submissionDate).toLocaleString('vi-VN')}</Descriptions.Item>
                <Descriptions.Item label="Trạng thái">{getStatusTag(selectedForm.status)}</Descriptions.Item>
                <Descriptions.Item label="Lý do">{selectedForm.reason}</Descriptions.Item>
                <Descriptions.Item label="Tệp đính kèm">
                  <Button type="link" icon={<DownloadOutlined />} href={selectedForm.fileUrl} target="_blank">{selectedForm.fileName}</Button>
                </Descriptions.Item>
              </Descriptions>
            </DetailsContainer>
            <Row justify="end" gutter={16}>
              <Col>
                <ActionButton
                  type="primary"
                  danger
                  icon={<CloseCircleOutlined />}
                  disabled={selectedForm.status !== 'pending'}
                  onClick={() => handleStatusChange(selectedForm.id, 'rejected')}
                >Từ chối</ActionButton>
              </Col>
              <Col>
                <ActionButton
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  disabled={selectedForm.status !== 'pending'}
                  onClick={() => handleStatusChange(selectedForm.id, 'approved')}
                >Duyệt đơn</ActionButton>
              </Col>
              <Col>
                <Button onClick={() => setModalVisible(false)}>Đóng</Button>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </StyledCard>
  );
};

export default AdminFormManagement;
