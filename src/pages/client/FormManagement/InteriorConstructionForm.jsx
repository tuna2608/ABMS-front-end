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

const InteriorConstructionDocument = ({ initialData }) => {
  const documentData = initialData || {
    // Default Form Information
    formDetails: {
      formId: 'FORM-IC-002',
      createdAt: '20/05/2023',
      updatedAt: '25/05/2023',
      priority: 'Trung bình',
      status: 'Đang chờ phê duyệt',
      constructionStartDate: '15/06/2023',
      constructionEndDate: '30/06/2023'
    },
    
    // Requestor Information
    requestorInfo: {
      fullName: 'Nguyễn Văn A',
      department: 'Chủ căn hộ',
      email: 'nguyen.van.a@gmail.com',
      phone: '0987654321',
      apartmentNumber: 'FPT Plaza 2, P.508'
    },
    
    // Construction Details
    constructionDetails: {
      constructionCompany: 'Công ty Nội Thất Hoàng Long',
      constructionDescription: 'Cải tạo và nâng cấp không gian sống, thay đổi bố trí nội thất để phù hợp với nhu cầu sử dụng mới.',
      installationItems: [
        'Lắp đặt nội thất rời',
        'Lắp đặt quạt trần',
        'Lắp đặt hệ thống chiếu sáng',
        'Sơn/Dán tường'
      ],
      lightConstructionItems: [
        'Lắp đặt nội thất (có khoan tường)',
        'Lắp đặt cửa'
      ],
      heavyConstructionItems: [
        'Tháo dỡ/lát lại sàn hiện tại',
        'Thay đổi hệ thống chiếu sáng'
      ]
    },
    
    // Approval Information
    approvalDetails: {
      approver: 'Ban Quản Lý Toà Nhà',
      notes: 'Vui lòng tuân thủ nghiêm ngặt quy định thi công của Ban Quản Lý'
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
              ĐƠN THI CÔNG NỘI THẤT
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
              <Col span={24}>
                <Text strong>Địa chỉ căn hộ: </Text>
                <Text>{documentData.requestorInfo.apartmentNumber}</Text>
              </Col>
            </Row>
          </div>

          {/* Construction Details */}
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
              Chi Tiết Thi Công
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Ngày bắt đầu: </Text>
                <Text>{documentData.formDetails.constructionStartDate}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Ngày kết thúc dự kiến: </Text>
                <Text>{documentData.formDetails.constructionEndDate}</Text>
              </Col>
              <Col span={24}>
                <Text strong>Công ty thi công: </Text>
                <Text>{documentData.constructionDetails.constructionCompany}</Text>
              </Col>
              <Col span={24}>
                <Text strong>Mô tả thi công: </Text>
                <Paragraph>
                  {documentData.constructionDetails.constructionDescription}
                </Paragraph>
              </Col>
            </Row>

            {/* Construction Items */}
            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
              <Col span={24}>
                <Text strong>I. Lắp đặt thiết bị: </Text>
                <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                  {documentData.constructionDetails.installationItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Col>
              <Col span={24}>
                <Text strong>II. Hạng mục thi công nhẹ: </Text>
                <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                  {documentData.constructionDetails.lightConstructionItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Col>
              <Col span={24}>
                <Text strong>III. Hạng mục thi công nặng: </Text>
                <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                  {documentData.constructionDetails.heavyConstructionItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
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
              <Text strong>Nhà thầu</Text>
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

export default InteriorConstructionDocument;