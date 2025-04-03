import React, { useState, useEffect } from "react";
import { 
  Card,
  Button, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  message, 
  Typography,
  Row,
  Col,
  Divider,
  Space,
  Breadcrumb,
  Descriptions,
  Tag,
  Alert
} from "antd";
import { SaveOutlined, PrinterOutlined, ArrowLeftOutlined, FormOutlined, CheckCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const DocumentFormPage = () => {
  // Form state
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Mock data - replace with actual API calls in production
  useEffect(() => {
    fetchFormData();
  }, []);
  
  const fetchFormData = () => {
    setLoading(true);
    // Mock data for a specific form
    setTimeout(() => {
      const mockData = {
        form_id: "FORM001",
        created_at: "2023-05-15",
        updated_at: "2023-05-20",
        file_name: "request_maintenance.pdf",
        form_type: "maintenance",
        user_id: "USER123",
        user_name: "Nguyễn Văn A",
        user_department: "Kỹ thuật",
        status: "pending",
        requestor_phone: "0912345678",
        requestor_email: "nguyen.van.a@company.com",
        maintenance_location: "Tầng 3, Phòng 302",
        maintenance_details: "Sửa chữa điều hòa không khí không hoạt động",
        priority: "medium",
        required_completion_date: "2023-05-25"
      };
      
      setFormData(mockData);
      form.setFieldsValue({
        ...mockData,
        created_at: moment(mockData.created_at),
        updated_at: moment(mockData.updated_at),
        required_completion_date: moment(mockData.required_completion_date)
      });
      setLoading(false);
    }, 500);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  const handleSaveForm = () => {
    form.validateFields().then(values => {
      // Convert moment objects to strings
      const updatedValues = {
        ...values,
        created_at: values.created_at.format("YYYY-MM-DD"),
        updated_at: moment().format("YYYY-MM-DD"),
        required_completion_date: values.required_completion_date.format("YYYY-MM-DD")
      };
      
      // In a real application, you would call an API here
      setFormData(updatedValues);
      message.success("Đã lưu thông tin đơn từ thành công!");
      setIsEditing(false);
    });
  };
  
  const handlePrintForm = () => {
    message.info("Đang chuẩn bị in đơn từ...");
    window.print();
  };
  
  const getStatusTag = (status) => {
    const statusMap = {
      pending: { color: "orange", text: "Đang chờ xử lý" },
      approved: { color: "green", text: "Đã duyệt" },
      rejected: { color: "red", text: "Đã từ chối" },
      completed: { color: "blue", text: "Đã hoàn thành" }
    };
    
    const statusInfo = statusMap[status] || { color: "default", text: status };
    return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
  };
  
  
  const getFormTypeText = (type) => {
    const formTypes = {
      "maintenance": "Bảo trì",
      "complaint": "Khiếu nại",
      "extension": "Gia hạn",
      "other": "Khác"
    };
    return formTypes[type] || type;
  };

  return (
    <div className="document-form-page">
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: "Trang chủ" },
          { title: "Quản lý đơn từ" },
          { title: formData ? `Đơn từ ${formData.form_id}` : "Chi tiết đơn từ" }
        ]}
      />
      
      <Card
        loading={loading}
        title={
          <Space>
            <Title level={4}>{formData ? getFormTypeText(formData.form_type) : ""} - {formData?.form_id}</Title>
            {formData && getStatusTag(formData.status)}
          </Space>
        }
        extra={
          <Space>
            <Button 
              type="default" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => window.history.back()}
            >
              Quay lại
            </Button>
            {isEditing ? (
              <Button 
                type="primary" 
                icon={<SaveOutlined />} 
                onClick={handleSaveForm}
              >
                Lưu
              </Button>
            ) : (
              <>
                <Button 
                  type="primary" 
                  icon={<FormOutlined />} 
                  onClick={handleEditToggle}
                >
                  Chỉnh sửa
                </Button>
                <Button 
                  type="default" 
                  icon={<PrinterOutlined />} 
                  onClick={handlePrintForm}
                >
                  In
                </Button>
              </>
            )}
          </Space>
        }
        style={{ marginBottom: 24 }}
      >
        {formData && formData.status === 'pending' && (
          <Alert
            message="Đơn từ này đang chờ được xử lý"
            description="Vui lòng kiểm tra lại thông tin trước khi in và gửi đơn từ."
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        
        {formData && formData.status === 'approved' && (
          <Alert
            message="Đơn từ đã được phê duyệt"
            description="Đơn từ này đã được phê duyệt và đang trong quá trình xử lý."
            type="success"
            showIcon
            icon={<CheckCircleOutlined />}
            style={{ marginBottom: 16 }}
          />
        )}
        
        <Form
          form={form}
          layout="vertical"
          disabled={!isEditing}
          className="document-form"
        >
          <Row gutter={24}>
            <Col span={24}>
              <Title level={5}>Thông tin đơn từ</Title>
              <Divider style={{ margin: "8px 0 16px" }} />
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="form_id"
                label="ID Đơn từ"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="form_type"
                label="Loại đơn"
                rules={[{ required: true, message: "Vui lòng chọn loại đơn!" }]}
              >
                <Select>
                  <Option value="maintenance">Bảo trì</Option>
                  <Option value="complaint">Khiếu nại</Option>
                  <Option value="extension">Gia hạn</Option>
                  <Option value="other">Khác</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="priority"
                label="Mức độ ưu tiên"
                rules={[{ required: true, message: "Vui lòng chọn mức độ ưu tiên!" }]}
              >
                <Select>
                  <Option value="low">Thấp</Option>
                  <Option value="medium">Trung bình</Option>
                  <Option value="high">Cao</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="created_at"
                label="Ngày tạo"
              >
                <DatePicker style={{ width: "100%" }} disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="updated_at"
                label="Ngày cập nhật"
              >
                <DatePicker style={{ width: "100%" }} disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="required_completion_date"
                label="Ngày hoàn thành yêu cầu"
                rules={[{ required: true, message: "Vui lòng chọn ngày hoàn thành!" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={24}>
              <Title level={5} style={{ marginTop: 16 }}>Thông tin người yêu cầu</Title>
              <Divider style={{ margin: "8px 0 16px" }} />
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="user_id"
                label="ID Người dùng"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="user_name"
                label="Họ và tên"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="user_department"
                label="Phòng ban"
                rules={[{ required: true, message: "Vui lòng nhập phòng ban!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col xs={24} sm={12} md={12}>
              <Form.Item
                name="requestor_email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12}>
              <Form.Item
                name="requestor_phone"
                label="Số điện thoại"
                rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={24}>
              <Title level={5} style={{ marginTop: 16 }}>Chi tiết yêu cầu</Title>
              <Divider style={{ margin: "8px 0 16px" }} />
            </Col>
          </Row>
          
          {formData && formData.form_type === "maintenance" && (
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="maintenance_location"
                  label="Địa điểm cần bảo trì"
                  rules={[{ required: true, message: "Vui lòng nhập địa điểm cần bảo trì!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="maintenance_details"
                  label="Chi tiết yêu cầu bảo trì"
                  rules={[{ required: true, message: "Vui lòng nhập chi tiết yêu cầu bảo trì!" }]}
                >
                  <TextArea rows={6} />
                </Form.Item>
              </Col>
            </Row>
          )}
          
          {formData && formData.form_type === "complaint" && (
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="complaint_subject"
                  label="Chủ đề khiếu nại"
                  rules={[{ required: true, message: "Vui lòng nhập chủ đề khiếu nại!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="complaint_details"
                  label="Nội dung khiếu nại"
                  rules={[{ required: true, message: "Vui lòng nhập nội dung khiếu nại!" }]}
                >
                  <TextArea rows={6} />
                </Form.Item>
              </Col>
            </Row>
          )}
          
          {formData && formData.form_type === "extension" && (
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="extension_reason"
                  label="Lý do gia hạn"
                  rules={[{ required: true, message: "Vui lòng nhập lý do gia hạn!" }]}
                >
                  <TextArea rows={6} />
                </Form.Item>
              </Col>
            </Row>
          )}
          
          {formData && formData.form_type === "other" && (
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="other_details"
                  label="Chi tiết yêu cầu"
                  rules={[{ required: true, message: "Vui lòng nhập chi tiết yêu cầu!" }]}
                >
                  <TextArea rows={6} />
                </Form.Item>
              </Col>
            </Row>
          )}
          
          <Row gutter={24}>
            <Col span={24}>
              <Title level={5} style={{ marginTop: 16 }}>Phê duyệt</Title>
              <Divider style={{ margin: "8px 0 16px" }} />
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={24}>
              <Descriptions bordered size="small">
                <Descriptions.Item label="Trạng thái" span={3}>
                  {formData && getStatusTag(formData.status)}
                </Descriptions.Item>
                <Descriptions.Item label="Người phê duyệt" span={3}>
                  {formData && formData.status === 'approved' ? 'Trần Văn B - Trưởng phòng' : 'Chưa có'}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày phê duyệt" span={3}>
                  {formData && formData.status === 'approved' ? '22/05/2023' : 'Chưa có'}
                </Descriptions.Item>
                <Descriptions.Item label="Ghi chú" span={3}>
                  {formData && formData.status === 'approved' ? 'Đã phê duyệt yêu cầu, vui lòng liên hệ phòng kỹ thuật để được hỗ trợ.' : 'Chưa có'}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
          
          <Row gutter={24} style={{ marginTop: 24 }}>
            <Col span={24}>
              <div className="signature-area">
                <Row gutter={24}>
                  <Col span={8}>
                    <div className="signature-box text-center">
                      <p>Người lập đơn</p>
                      <div className="signature-placeholder"></div>
                      <p>{formData?.user_name}</p>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="signature-box text-center">
                      <p>Người quản lý trực tiếp</p>
                      <div className="signature-placeholder"></div>
                      <p></p>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="signature-box text-center">
                      <p>Người phê duyệt</p>
                      <div className="signature-placeholder"></div>
                      <p></p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
      
      <style jsx global>{`
        @media print {
          .ant-card-extra,
          .ant-alert,
          .ant-breadcrumb {
            display: none !important;
          }
          
          .ant-card {
            border: none !important;
            box-shadow: none !important;
          }
          
          .ant-card-head {
            border-bottom: 2px solid #000 !important;
          }
          
          .signature-area {
            margin-top: 100px !important;
          }
        }
        
        .signature-box {
          text-align: center;
        }
        
        .signature-placeholder {
          height: 80px;
          border-bottom: 1px dashed #ccc;
          margin: 20px 0;
        }
        
        .text-center {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default DocumentFormPage;