import React, { useState, useEffect } from "react";
import { 
  Layout, 
  Typography, 
  Card, 
  Select, 
  Form,
  Button,
  message,
  Space,
  Input,
  DatePicker,
  Row,
  Col
} from "antd";
import { 
  EditOutlined, 
  SaveOutlined 
} from "@ant-design/icons";
import moment from "moment";

// Import all document components
import InteriorConstructionDocument from "./InteriorConstructionForm";
import ApartmentTransferDocument from "./ApartmentTransferForm";

const { Title, Text } = Typography;
const { Option } = Select;
const { Content } = Layout;

const FormManagement = () => {
  // State management
  const [documentType, setDocumentType] = useState("interiorConstruction");
  const [documentData, setDocumentData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  
  // Document templates mapping
  const documentTemplates = {
    interiorConstruction: {
      component: InteriorConstructionDocument,
      title: "Đăng ký thi công nội thất",
      mockData: {
        formDetails: {
          formId: 'FORM-IC-002',
          createdAt: '20/05/2023',
          updatedAt: '25/05/2023',
          priority: 'Trung bình',
          status: 'Đang chờ phê duyệt',
          constructionStartDate: '15/06/2023',
          constructionEndDate: '30/06/2023'
        },
        requestorInfo: {
          fullName: 'Nguyễn Văn A',
          department: 'Chủ căn hộ',
          email: 'nguyen.van.a@gmail.com',
          phone: '0987654321',
          apartmentNumber: 'FPT Plaza 2, P.508'
        },
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
        approvalDetails: {
          approver: 'Ban Quản Lý Toà Nhà',
          notes: 'Vui lòng tuân thủ nghiêm ngặt quy định thi công của Ban Quản Lý'
        }
      }
    },
    apartmentTransfer: {
      component: ApartmentTransferDocument,
      title: "Đơn chuyển nhà",
      mockData: {
        formDetails: {
          formId: 'FORM-AT-001',
          createdAt: '15/05/2023',
          updatedAt: '20/05/2023',
          priority: 'Trung bình',
          status: 'Đang chờ phê duyệt'
        },
        requestorInfo: {
          fullName: 'Trần Thị B',
          department: 'Chủ căn hộ',
          email: 'tran.thi.b@gmail.com',
          phone: '0923456789'
        },
        transferDetails: {
          transferDate: '01/07/2023',
          currentApartment: 'FPT Plaza 2, P.405',
          newApartment: 'FPT Plaza 2, P.610',
          transferReason: 'Cần không gian lớn hơn cho gia đình'
        },
        approvalDetails: {
          approver: 'Ban Quản Lý Toà Nhà',
          notes: 'Việc chuyển nhà sẽ được thực hiện sau khi hoàn thành các thủ tục liên quan'
        }
      }
    }
  };
  
  // Load initial document data
  useEffect(() => {
    loadDocumentData();
  }, [documentType]);
  
  const loadDocumentData = () => {
    const mockData = documentTemplates[documentType].mockData;
    setDocumentData(mockData);
    
    // Flatten the nested data structure for form
    const flattenedData = {
      ...mockData.formDetails,
      ...mockData.requestorInfo,
      ...(mockData.transferDetails || mockData.constructionDetails),
      ...mockData.approvalDetails
    };
    
    form.resetFields();
    form.setFieldsValue(flattenedData);
  };
  
  // Handle document type change
  const handleDocumentTypeChange = (value) => {
    setDocumentType(value);
    setIsEditing(false);
  };
  
  // Handle edit toggle
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  // Handle save document
  const handleSaveDocument = () => {
    form.validateFields().then(values => {
                // Reconstruct the nested data structure
      const updatedData = {
        formDetails: {
          formId: values.formId || documentData.formDetails.formId,
          createdAt: values.createdAt || documentData.formDetails.createdAt,
          updatedAt: values.updatedAt || documentData.formDetails.updatedAt,
          priority: values.priority || documentData.formDetails.priority,
          status: values.status || documentData.formDetails.status,
          ...(values.constructionStartDate && { constructionStartDate: values.constructionStartDate }),
          ...(values.constructionEndDate && { constructionEndDate: values.constructionEndDate })
        },
        requestorInfo: {
          fullName: values.fullName || documentData.requestorInfo.fullName,
          department: values.department || documentData.requestorInfo.department,
          email: values.email || documentData.requestorInfo.email,
          phone: values.phone || documentData.requestorInfo.phone,
          ...(values.apartmentNumber && { apartmentNumber: values.apartmentNumber })
        },
        ...(documentType === 'interiorConstruction' ? {
          constructionDetails: {
            constructionCompany: values.constructionCompany || (documentData.constructionDetails?.constructionCompany || ''),
            constructionDescription: values.constructionDescription || (documentData.constructionDetails?.constructionDescription || ''),
            installationItems: documentData.constructionDetails?.installationItems || [],
            lightConstructionItems: documentData.constructionDetails?.lightConstructionItems || [],
            heavyConstructionItems: documentData.constructionDetails?.heavyConstructionItems || []
          }
        } : {
          transferDetails: {
            transferDate: values.transferDate || documentData.transferDetails.transferDate,
            currentApartment: values.currentApartment || documentData.transferDetails.currentApartment,
            newApartment: values.newApartment || documentData.transferDetails.newApartment,
            transferReason: values.transferReason || documentData.transferDetails.transferReason
          }
        }),
        approvalDetails: {
          approver: values.approver || documentData.approvalDetails.approver,
          notes: values.notes || documentData.approvalDetails.notes
        }
      };
      
      setDocumentData(updatedData);
      message.success("Đã lưu thông tin đơn từ thành công!");
      setIsEditing(false);
    }).catch(errorInfo => {
      message.error('Vui lòng kiểm tra lại thông tin');
    });
  };
  
  // Get document component
  const DocumentComponent = documentData ? documentTemplates[documentType].component : null;
  
  // Render editing form based on document type
  const renderEditingForm = () => {
    return (
      <Form
        form={form}
        layout="vertical"
        disabled={!isEditing}
      >
        <Row gutter={[16, 16]}>
          {/* Form Details Section */}
          <Col span={24}>
            <Title level={4}>Thông tin đơn từ</Title>
          </Col>
          <Col span={8}>
            <Form.Item name="formId" label="Mã đơn">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="createdAt" label="Ngày tạo">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="updatedAt" label="Ngày cập nhật">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="priority" label="Mức độ ưu tiên">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="status" label="Trạng thái">
              <Input />
            </Form.Item>
          </Col>

          {/* Conditional Fields */}
          {documentType === 'interiorConstruction' && (
            <>
              <Col span={8}>
                <Form.Item name="constructionStartDate" label="Ngày bắt đầu">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="constructionEndDate" label="Ngày kết thúc">
                  <Input />
                </Form.Item>
              </Col>
            </>
          )}
          {documentType === 'apartmentTransfer' && (
            <Col span={8}>
              <Form.Item name="transferDate" label="Ngày chuyển">
                <Input />
              </Form.Item>
            </Col>
          )}

          {/* Requestor Info Section */}
          <Col span={24}>
            <Title level={4}>Thông tin người yêu cầu</Title>
          </Col>
          <Col span={8}>
            <Form.Item name="fullName" label="Họ và tên">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="department" label="Chức danh">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="phone" label="Số điện thoại">
              <Input />
            </Form.Item>
          </Col>
          {documentType === 'interiorConstruction' && (
            <Col span={8}>
              <Form.Item name="apartmentNumber" label="Số căn hộ">
                <Input />
              </Form.Item>
            </Col>
          )}

          {/* Conditional Details Section */}
          <Col span={24}>
            <Title level={4}>
              {documentType === 'interiorConstruction' 
                ? 'Chi tiết thi công' 
                : 'Chi tiết chuyển nhà'}
            </Title>
          </Col>
          {documentType === 'interiorConstruction' && (
            <>
              <Col span={24}>
                <Form.Item name="constructionCompany" label="Công ty thi công">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="constructionDescription" label="Mô tả thi công">
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Col>
            </>
          )}
          {documentType === 'apartmentTransfer' && (
            <>
              <Col span={12}>
                <Form.Item name="currentApartment" label="Căn hộ hiện tại">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="newApartment" label="Căn hộ mới">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="transferReason" label="Lý do chuyển">
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Col>
            </>
          )}

          {/* Approval Details Section */}
          <Col span={24}>
            <Title level={4}>Thông tin phê duyệt</Title>
          </Col>
          <Col span={12}>
            <Form.Item name="approver" label="Người phê duyệt">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="notes" label="Ghi chú">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
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
        maxWidth: '900px' 
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
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px',
            borderBottom: '2px solid #f0f0f0',
            paddingBottom: '16px'
          }}>
            <Title level={2} style={{ 
              margin: 0, 
              color: '#1890ff'
            }}>
              Quản Lý Đơn Từ
            </Title>
            <Space>
              <Select 
                value={documentType} 
                onChange={handleDocumentTypeChange}
                style={{ width: 250 }}
              >
                <Option value="interiorConstruction">Đăng ký thi công nội thất</Option>
                <Option value="apartmentTransfer">Đơn chuyển nhà</Option>
              </Select>
              
              {isEditing ? (
                <Button 
                  type="primary" 
                  icon={<SaveOutlined />} 
                  onClick={handleSaveDocument}
                >
                  Lưu
                </Button>
              ) : (
                <Button 
                  type="primary" 
                  icon={<EditOutlined />} 
                  onClick={handleEditToggle}
                >
                  Chỉnh sửa
                </Button>
              )}
            </Space>
          </div>

          {/* Edit Mode */}
          {isEditing ? (
            renderEditingForm()
          ) : (
            // Render Document
            DocumentComponent && documentData && (
              <DocumentComponent 
                key={documentType} 
                initialData={documentData}
              />
            )
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default FormManagement;