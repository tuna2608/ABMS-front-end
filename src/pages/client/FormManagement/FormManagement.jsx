import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Typography,
  Card,
  Divider,
  Row,
  Col,
  message,
} from "antd";
import {
  UploadOutlined,
  SendOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createForm, getApartments } from "../../../redux/apiCalls"; // cập nhật lại đường dẫn phù hợp
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

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

const FormSection = styled.div`
  padding: 24px;
`;

const NoteSection = styled.div`
  background-color: #f8f9fa;
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 4px;
  border-left: 4px solid #3867d6;
`;

const StyledDivider = styled(Divider)`
  margin: 24px 0;
  background-color: #3867d6;
  height: 2px;
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 24px;
`;

const SubmitButton = styled(Button)`
  background-color: #4b7bec;
  border-color: #3867d6;
  &:hover {
    background-color: #3867d6;
    border-color: #3867d6;
  }
`;

const ApplicationTypeLabel = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const UploadArea = styled(Upload.Dragger)`
  margin-bottom: 16px;
`;

const SupportedFormats = styled.div`
  text-align: center;
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.45);
`;

const DownloadButton = styled(Button)`
  margin-top: 8px;
  color: #3867d6;
  border-color: #3867d6;
  display: block;
  margin: 0 auto;
  &:hover {
    color: #4b7bec;
    border-color: #4b7bec;
  }
`;

const FormManagement = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  

  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApartments(currentUser);
  }, [currentUser]);

  const fetchApartments = async (currentUser) => {
    setLoading(true);
    try {
      const response = await getApartments();
      if (response.success) {
        const apartmentsRentor = response.data.filter((item) =>
          item.users.includes(currentUser.userName)
        );
        setApartments(
          apartmentsRentor.map((apt) => ({
            ...apt,
            key: apt.apartmentId,
          }))
        );
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching apartments:", error);
      message.error("Không thể tải danh sách căn hộ");
    } finally {
      setLoading(false);
    }
  };

  const applicationTypes = [
    { value: "apartment_renovation", label: "Đăng ký thi công nội thất" },
    { value: "apartment_transfer", label: "Đơn chuyển căn hộ" },
    { value: "maintenance_request", label: "Đơn yêu cầu bảo trì" },
    { value: "complaint_form", label: "Đơn khiếu nại" },
    { value: "facility_booking", label: "Đơn đăng ký sử dụng tiện ích" },
  ];

  const onFinish = async (values) => {
    if (!file) {
      return message.warning("Vui lòng đính kèm file");
    }

    const dto = {
      formType: values.application_type,
      status: "pending",
      apartmentId: values.apartment_number, // giả lập, cần lấy từ dữ liệu thực tế
      file: file,
      residentName: values.resident_name,
      apartmentNumber: values.apartment_number,
      reason: values.reason,
    };

    const userId = currentUser.userId; // lấy user id đăng nhập
    const res = await createForm(dispatch, userId, dto);

    if (res.success) {
      message.success(res.message || "Tạo đơn thành công");
      form.resetFields();
      setFile(null);
      // Chuyển hướng đến trang danh sách đơn sau khi gửi thành công
      navigate("/form-list");
    } else {
      message.error(res.message || "Tạo đơn thất bại");
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    fileList: file ? [file] : [],
  };

  return (
    <StyledCard>
      <HeaderSection>
        <Title level={2} style={{ color: "white", margin: 0 }}>
          Gửi đơn cho Ban Quản lý Chung cư
        </Title>
      </HeaderSection>

      <FormSection>
        <NoteSection>
          <Paragraph>
            <Text strong>Lưu ý:</Text> Khi gửi đơn/email đến các phòng ban
          </Paragraph>
          <Paragraph>
            Bộ phận xử lý đơn sẽ trả lời đơn/email của cư dân trong vòng 48h
            (trừ đơn rút tiền, đơn phúc tra, chuyển căn hộ...).
          </Paragraph>
          <Paragraph>
            Để hạn chế SPAM, sẽ giảm thời gian trả lời đơn/email có tính chất
            SPAM theo nguyên tắc: Khi cư dân gửi N đơn/email (N&gt;1) cho cùng
            một yêu cầu thì thời gian trả lời trong vòng N*48h.
          </Paragraph>
          <Paragraph>
            Vì vậy cư dân cần nhắc trước khi gửi đơn/email với cùng một nội dung
            để nhận được trả lời/giải quyết nhanh nhất theo quy định.
          </Paragraph>
        </NoteSection>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ application_type: "apartment_renovation" }}
        >
          <Row gutter={24}>
            <Col span={24}>
              <ApplicationTypeLabel>Loại đơn:</ApplicationTypeLabel>
              <Form.Item name="application_type">
                <Select>
                  {applicationTypes.map((type) => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <StyledDivider />

          <Title level={4}>THÔNG TIN CƯ DÂN</Title>

          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item
                name="apartment_number"
                label="Căn hộ"
                rules={[{ required: true, message: "Vui lòng chọn căn hộ" }]}
              >
                <Select placeholder="Chọn căn hộ">
                  {apartments &&
                    apartments.map((apartment) => (
                      <Option
                        key={apartment.apartmentId}
                        value={apartment.apartmentName}
                      >
                        {apartment.apartmentName}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24} md={12}>
              <Form.Item
                label="Họ và tên"
                name="resident_name"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
              >
                <Input defaultValue={currentUser.fullName} disabled/>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Lý do"
                name="reason"
                rules={[{ required: true, message: "Vui lòng nhập lý do" }]}
              >
                <TextArea rows={6} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Tệp đính kèm" name="attachment">
                <UploadArea {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Kéo thả file vào đây hoặc click để chọn file
                  </p>
                </UploadArea>
              </Form.Item>
              <SupportedFormats>
                Hỗ trợ định dạng: .xlsx, .pdf, .docx, .doc, .xls, .jpg, .png,
                .zip
              </SupportedFormats>
              <DownloadButton
                icon={<DownloadOutlined />}
                href="https://drive.google.com/file/d/1fxwKwvBvGRdDVE-wkQsCzzyUl52mUpnl/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tải mẫu đơn tại đây
              </DownloadButton>
            </Col>
          </Row>

          <FormFooter>
            <SubmitButton
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
            >
              Gửi
            </SubmitButton>
          </FormFooter>
        </Form>
      </FormSection>
    </StyledCard>
  );
};

export default FormManagement;
