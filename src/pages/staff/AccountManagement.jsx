import React, { useState } from "react";
import {
  Card,
  Space,
  Input,
  Form,
  Select,
  Button,
  message,
  Typography,
  Row,
  Col,
  Upload,
  DatePicker
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  TagOutlined,
  HomeOutlined,
  UploadOutlined,
  SearchOutlined,
  LockOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { searchUserByUsernameOrEmail, verifyUserInfo } from "../../redux/apiCalls";
import moment from 'moment';

const { Option } = Select;
const { Text } = Typography;

const AccountManagement = () => {
  const [verificationForm] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [searching, setSearching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const dispatch = useDispatch();

  // Get user data from Redux store
  const userData = useSelector((state) => state.users.users);

  const handleSearch = async (values) => {
    try {
      setSearching(true);
      const query = values.searchQuery;

      const result = await searchUserByUsernameOrEmail(dispatch, query);

      console.log("Full search result:", result);

      if (result.status === 200) {
        message.success("Tìm thấy thông tin người dùng!");
        setSearchPerformed(true);

        // Pre-fill verification form with user data if available
        if (result.data) {
          const userData = result.data;

          // Log user data details
          console.log("User Data Details:", JSON.stringify(userData, null, 2));

          // Determine phone number field
          const phoneNumber =
            userData.phoneNumber ||
            userData.phone ||
            userData.telephone ||
            userData.mobileNumber;

          // Autofill tất cả dữ liệu từ API
          verificationForm.setFieldsValue({
            fullName: userData.fullName,
            email: userData.email,
            phone: phoneNumber,
            // Autofill thêm các trường khác nếu API trả về
            apartment: userData.apartmentName || userData.apartment,
            verificationType: userData.verificationType,
            contractStartDate: userData.contractStartDate ? moment(userData.contractStartDate) : null,
            contractEndDate: userData.contractEndDate ? moment(userData.contractEndDate) : null
          });

          // Nếu API trả về danh sách tài liệu
          if (userData.documents && userData.documents.length > 0) {
            const existingFiles = userData.documents.map((doc, index) => ({
              uid: `-${index}`,
              name: doc.name || `Document ${index + 1}`,
              status: 'done',
              url: doc.url
            }));

            setFileList(existingFiles);
          }
        }
      } else {
        message.warning(result.message || "Không tìm thấy người dùng");
      }
    } catch (error) {
      console.error('Search error:', error);
      message.error("Có lỗi xảy ra khi tìm kiếm!");
    } finally {
      setSearching(false);
    }
  };

  const handleVerificationSubmit = async (values) => {
    try {
      setSubmitting(true);

      // Kiểm tra xem có file nào được chọn chưa
      if (fileList.length === 0) {
        message.error("Vui lòng tải lên ít nhất một tài liệu xác thực!");
        setSubmitting(false);
        return;
      }

      // Create FormData object
      const formData = new FormData();
      formData.append("verificationFormName", values.fullName);
      formData.append("verificationFormType", values.verificationType);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phone);
      formData.append("apartmentName", values.apartment);

      // Chỉ lấy ngày, tự động đặt giờ là 00:00:00
      const startDate = values.contractStartDate.format("YYYY-MM-DDT00:00:00");
      const endDate = values.contractEndDate.format("YYYY-MM-DDT00:00:00");

      formData.append("contractStartDate", startDate);
      formData.append("contractEndDate", endDate);

      // Xử lý file upload
      fileList.forEach((file) => {
        const fileObject = file.originFileObj || file;
        if (fileObject) {
          formData.append("imageFile", fileObject);
        }
      });

      // Gọi API trực tiếp như trong mẫu, nhưng sử dụng qua redux action
      const response = await verifyUserInfo(dispatch, formData);

      if (response && response.status === 201) {
        message.success(response.message || "Đã gửi thông tin xác thực thành công!");
        verificationForm.resetFields();
        setFileList([]);
        setSearchPerformed(false);
      } else {
        throw new Error(response?.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi gửi thông tin: " + (error.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  const uploadProps = {
    onRemove: file => {
      setFileList(prev => prev.filter(item => item !== file));
    },
    beforeUpload: file => {
      setFileList(prev => [...prev, file]);
      return false;
    },
    fileList,
    multiple: true
  };

  const renderUserDetails = () => {
    // Log the entire userData object to see its structure
    console.log("Full userData object:", userData);

    if (!userData) return null;

    // Check for different possible phone number field names
    const phoneNumber =
      userData.phoneNumber ||
      userData.phone ||
      userData.telephone ||
      userData.mobileNumber ||
      'Không có';

    return (
      <Card
        title="Thông tin người dùng đã tìm thấy"
        style={{ marginBottom: 16 }}
        headStyle={{ backgroundColor: '#f0f2f5' }}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text strong><UserOutlined /> Họ và tên: </Text>
            <Text>{userData.fullName || 'Không có'}</Text>
          </div>
          <div>
            <Text strong><MailOutlined /> Email: </Text>
            <Text>{userData.email || 'Không có'}</Text>
          </div>
          <div>
            <Text strong><PhoneOutlined /> Số điện thoại: </Text>
            <Text>{phoneNumber}</Text>
          </div>
          <div>
            <Text strong><TagOutlined /> Vai trò: </Text>
            <Text>{userData.role || 'Không có'}</Text>
          </div>
          {userData.apartmentName && (
            <div>
              <Text strong><HomeOutlined /> Căn hộ: </Text>
              <Text>{userData.apartmentName}</Text>
            </div>
          )}
          {userData.verificationType && (
            <div>
              <Text strong><TagOutlined /> Loại xác thực: </Text>
              <Text>{userData.verificationType === 1 ? 'Chủ hộ' : 'Người thuê'}</Text>
            </div>
          )}
        </Space>
      </Card>
    );
  };

  return (
    <div className="account-management-container">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Tìm kiếm người dùng">
            <Form
              form={searchForm}
              layout="inline"
              onFinish={handleSearch}
            >
              <Form.Item
                name="searchQuery"
                label="Tên người dùng/Email"
                rules={[{ required: true, message: "Vui lòng nhập tên người dùng hoặc email" }]}
                style={{ flex: 1 }}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Nhập tên người dùng hoặc email"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  loading={searching}
                >
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {searchPerformed && (
          <Col span={24}>
            {renderUserDetails()}
          </Col>
        )}

        <Col span={24}>
          <Card title="Nhập thông tin xác thực cư dân">
            <Form
              form={verificationForm}
              layout="vertical"
              onFinish={handleVerificationSubmit}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Nhập họ và tên"
                      disabled={searchPerformed && userData?.fullName}
                      suffix={searchPerformed && userData?.fullName ? <LockOutlined /> : null}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email!' },
                      { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Nhập email"
                      disabled={searchPerformed && userData?.email}
                      suffix={searchPerformed && userData?.email ? <LockOutlined /> : null}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="Nhập số điện thoại"
                      disabled={searchPerformed && userData?.phone}
                      suffix={searchPerformed && userData?.phone ? <LockOutlined /> : null}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="apartment"
                    label="Tên căn hộ"
                    rules={[{ required: true, message: 'Vui lòng nhập tên căn hộ!' }]}
                  >
                    <Input prefix={<HomeOutlined />} placeholder="Nhập tên căn hộ" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="verificationType"
                    label="Loại xác thực"
                    rules={[{ required: true, message: 'Vui lòng chọn loại xác thực!' }]}
                  >
                    <Select placeholder="Chọn loại xác thực">
                      <Option value={1}>Chủ hộ</Option>
                      <Option value={2}>Người thuê</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item
                        name="contractStartDate"
                        label="Ngày bắt đầu hợp đồng"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
                      >
                        <DatePicker
                          style={{ width: '100%' }}
                          format="YYYY-MM-DD"
                          placeholder="Chọn ngày bắt đầu"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="contractEndDate"
                        label="Ngày kết thúc hợp đồng"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}
                      >
                        <DatePicker
                          style={{ width: '100%' }}
                          format="YYYY-MM-DD"
                          placeholder="Chọn ngày kết thúc"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Form.Item
                name="documents"
                label="Tài liệu xác thực (CMND/CCCD, Hợp đồng thuê, ...)"
                rules={[{ required: true, message: 'Vui lòng tải lên tài liệu xác thực!' }]}
              >
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Tải lên tài liệu</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  block
                >
                  Gửi thông tin xác thực
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AccountManagement;