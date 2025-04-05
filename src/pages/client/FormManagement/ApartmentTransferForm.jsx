import React from 'react';
import { 
  Layout, 
  Typography, 
  Card, 
  Row, 
  Col 
} from 'antd';

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

const ApartmentTransferDocument = () => {
  const documentData = {
    // Form Information
    formDetails: {
      formId: 'FORM-AT-001',
      createdAt: '15/05/2023',
      updatedAt: '20/05/2023',
      priority: 'Trung bình',
      status: 'Đang chờ phê duyệt'
    },
    
    // Requestor Information
    requestorInfo: {
      fullName: 'Trần Thị B',
      department: 'Chủ căn hộ',
      email: 'tran.thi.b@gmail.com',
      phone: '0923456789'
    },
    
    // Transfer Details
    transferDetails: {
      transferDate: '01/07/2023',
      currentApartment: 'FPT Plaza 2, P.405',
      newApartment: 'FPT Plaza 2, P.610',
      transferReason: 'Cần không gian lớn hơn cho gia đình'
    },
    
    // Approval Information
    approvalDetails: {
      approver: 'Ban Quản Lý Toà Nhà',
      notes: 'Việc chuyển nhà sẽ được thực hiện sau khi hoàn thành các thủ tục liên quan'
    }
  };

  return (
    <Layout style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: '#f0f2f5', 
      padding: '24px' 
    }}>
      <Content style={{ 
        width: '100%', 
        maxWidth: '800px' 
      }}>
        <Card 
          style={{ 
            background: 'white', 
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            borderRadius: '12px',
            padding: '40px'
          }}
        >
          {/* Document Header */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '32px',
            borderBottom: '2px solid #f0f0f0',
            paddingBottom: '24px'
          }}>
            <Title level={2} style={{ 
              margin: 0, 
              color: '#1890ff',
              marginBottom: '8px'
            }}>
              ĐƠN CHUYỂN NHÀ
            </Title>
            <Text type="secondary">
              Mã đơn: {documentData.formDetails.formId}
            </Text>
          </div>

          {/* Form Information */}
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={8}>
              <Text strong>Ngày tạo: </Text>
              <Text>{documentData.formDetails.createdAt}</Text>
            </Col>
            <Col span={8}>
              <Text strong>Ngày cập nhật: </Text>
              <Text>{documentData.formDetails.updatedAt}</Text>
            </Col>
            <Col span={8}>
              <Text strong>Mức độ ưu tiên: </Text>
              <Text>{documentData.formDetails.priority}</Text>
            </Col>
          </Row>

          {/* Requestor Information */}
          <div style={{ 
            background: '#f6f6f6', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '24px'
          }}>
            <Title level={4} style={{ 
              marginTop: 0, 
              marginBottom: '16px',
              color: '#1890ff'
            }}>
              Thông Tin Người Yêu Cầu
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Họ và tên: </Text>
                <Text>{documentData.requestorInfo.fullName}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Chức danh: </Text>
                <Text>{documentData.requestorInfo.department}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Email: </Text>
                <Text>{documentData.requestorInfo.email}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Số điện thoại: </Text>
                <Text>{documentData.requestorInfo.phone}</Text>
              </Col>
            </Row>
          </div>

          {/* Transfer Details */}
          <div style={{ 
            background: '#f6f6f6', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '24px'
          }}>
            <Title level={4} style={{ 
              marginTop: 0, 
              marginBottom: '16px',
              color: '#1890ff'
            }}>
              Chi Tiết Chuyển Nhà
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Ngày chuyển nhà: </Text>
                <Text>{documentData.transferDetails.transferDate}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Căn hộ hiện tại: </Text>
                <Text>{documentData.transferDetails.currentApartment}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Căn hộ mới: </Text>
                <Text>{documentData.transferDetails.newApartment}</Text>
              </Col>
              <Col span={24}>
                <Text strong>Lý do chuyển nhà: </Text>
                <Paragraph>
                  {documentData.transferDetails.transferReason}
                </Paragraph>
              </Col>
            </Row>
          </div>

          {/* Approval Details */}
          <div style={{ 
            background: '#f6f6f6', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '24px'
          }}>
            <Title level={4} style={{ 
              marginTop: 0, 
              marginBottom: '16px',
              color: '#1890ff'
            }}>
              Thông Tin Phê Duyệt
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Trạng thái: </Text>
                <Text type="warning">
                  {documentData.formDetails.status}
                </Text>
              </Col>
              <Col span={12}>
                <Text strong>Người phê duyệt: </Text>
                <Text>{documentData.approvalDetails.approver}</Text>
              </Col>
              <Col span={24}>
                <Text strong>Ghi chú: </Text>
                <Paragraph>
                  {documentData.approvalDetails.notes}
                </Paragraph>
              </Col>
            </Row>
          </div>

          {/* Signature Area */}
          <Row gutter={16} style={{ 
            textAlign: 'center',
            marginTop: '32px'
          }}>
            <Col span={8}>
              <Text strong>Người lập đơn</Text>
              <div style={{ 
                height: '120px', 
                border: '1px dashed #d9d9d9', 
                marginTop: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text type="secondary">Chữ ký</Text>
              </div>
              <Text style={{ marginTop: '8px' }}>
                {documentData.requestorInfo.fullName}
              </Text>
            </Col>
            <Col span={8}>
              <Text strong>Bộ phận quản lý</Text>
              <div style={{ 
                height: '120px', 
                border: '1px dashed #d9d9d9', 
                marginTop: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text type="secondary">Chữ ký</Text>
              </div>
            </Col>
            <Col span={8}>
              <Text strong>Ban Quản Lý Toà Nhà</Text>
              <div style={{ 
                height: '120px', 
                border: '1px dashed #d9d9d9', 
                marginTop: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text type="secondary">Chữ ký</Text>
              </div>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default ApartmentTransferDocument;