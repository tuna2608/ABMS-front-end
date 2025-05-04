import React, { useState, useEffect } from "react";
import {
  Card, Space, Input, Form, Select, Button, message, Typography, Row, Col, Upload, DatePicker, AutoComplete
} from "antd";
import {
  UserOutlined, MailOutlined, PhoneOutlined, TagOutlined, HomeOutlined, 
  UploadOutlined, SearchOutlined, LockOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { 
  searchUserByUsernameOrEmail, 
  verifyUserInfo, 
  getUnrentedApartments,
  getApartmentsWithoutHouseholder 
} from "../../redux/apiCalls";
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
  const [verificationType, setVerificationType] = useState(null);
  const [unrentedApartments, setUnrentedApartments] = useState([]);
  const [noHouseholderApartments, setNoHouseholderApartments] = useState([]);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.users);

  useEffect(() => {
    const fetchUnrentedApartments = async () => {
      try {
        const unrentedResponse = await getUnrentedApartments(dispatch);
        if (unrentedResponse.success) {
          setUnrentedApartments(unrentedResponse.data);
        } else {
          message.error(unrentedResponse.message);
        }
      } catch (error) {
        console.error("Không thể lấy căn hộ chưa cho thuê");
      }
    };

    const fetchNoHouseholderApartments = async () => {
      try {
        const noHouseholderResponse = await getApartmentsWithoutHouseholder(dispatch);
        if (noHouseholderResponse.success) {
          setNoHouseholderApartments(noHouseholderResponse.data);
        } else {
          message.error(noHouseholderResponse.message);
        }
      } catch (error) {
        console.error("Không thể lấy căn hộ chưa có chủ", error);
      }
    };

    fetchUnrentedApartments();
    fetchNoHouseholderApartments();
  }, [dispatch]);

  useEffect(() => {
    if (verificationType === 2) {
      verificationForm.setFieldValue('contractEndDate', null);
    }
  }, [verificationType, verificationForm]);

  const handleSearch = async (values) => {
    try {
      setSearching(true);
      const result = await searchUserByUsernameOrEmail(dispatch, values.searchQuery);

      if (result.status === 200) {
        message.success("Tìm thấy thông tin người dùng!");
        setSearchPerformed(true);

        if (result.data) {
          const userData = result.data;
          const phoneNumber = userData.phoneNumber || userData.phone || userData.telephone || userData.mobileNumber;

          verificationForm.setFieldsValue({
            fullName: userData.fullName,
            email: userData.email,
            phone: phoneNumber,
            apartment: userData.apartmentName || userData.apartment,
            verificationType: userData.verificationType,
            contractStartDate: userData.contractStartDate ? moment(userData.contractStartDate) : null,
            contractEndDate: userData.contractEndDate ? moment(userData.contractEndDate) : null
          });

          setVerificationType(userData.verificationType);

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

      if (fileList.length === 0) {
        message.error("Vui lòng tải lên ít nhất một tài liệu xác thực!");
        setSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append("verificationFormName", values.fullName);
      formData.append("verificationFormType", values.verificationType);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phone);
      formData.append("apartmentName", values.apartment);

      const startDate = values.contractStartDate.format("YYYY-MM-DDT00:00:00");
      formData.append("contractStartDate", startDate);

      if (values.verificationType !== 2 && values.contractEndDate) {
        const endDate = values.contractEndDate.format("YYYY-MM-DDT00:00:00");
        formData.append("contractEndDate", endDate);
      }

      fileList.forEach((file) => {
        const fileObject = file.originFileObj || file;
        if (fileObject) {
          formData.append("imageFile", fileObject);
        }
      });

      const response = await verifyUserInfo(dispatch, formData);

      if (response && response.status === 201) {
        message.success(response.message || "Đã gửi thông tin xác thực thành công!");
        verificationForm.resetFields();
        setFileList([]);
        setSearchPerformed(false);
        setVerificationType(null);
      } else {
        throw new Error(response?.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi gửi thông tin: " + (error.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerificationTypeChange = (value) => {
    setVerificationType(value);
    
    if (value === 2) {
      verificationForm.setFieldValue('contractEndDate', null);
    }
  };

  const handleApartmentSearch = (value) => {
    // Nếu là mua căn hộ, trả về các căn hộ không có chủ hộ
    if (verificationType === 2) {
      const filteredApartments = noHouseholderApartments
        .filter(apt => 
          apt.apartmentName.toLowerCase().includes(value.toLowerCase())
        )
        .map(apt => ({
          value: apt.apartmentName,
          label: `${apt.apartmentName} - ${apt.area}m² - ${apt.floor}`
        }));
      
      return filteredApartments;
    }
    
    // Nếu là thuê, chỉ trả về căn hộ chưa cho thuê
    const filteredRentApartments = unrentedApartments
      .filter(apt => 
        apt.apartmentName.toLowerCase().includes(value.toLowerCase())
      )
      .map(apt => ({
        value: apt.apartmentName,
        label: `${apt.apartmentName} - ${apt.area}m²`
      }));
    
    return filteredRentApartments;
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
    if (!userData) return null;

    const phoneNumber = userData.phoneNumber || userData.phone || userData.telephone || userData.mobileNumber || 'Không có';

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
              <Text>{userData.verificationType === 2 ? 'Chủ hộ' : 'Người thuê'}</Text>
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
                    rules={[{ required: true, message: 'Vui lòng nhập tên hợp đồng!' }]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Nhập tên hợp đồng"
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
                    <AutoComplete
                      style={{ width: '100%' }}
                      onSearch={handleApartmentSearch}
                      placeholder="Nhập tên căn hộ"
                      filterOption={(inputValue, option) =>
                        option.value.toLowerCase().includes(inputValue.toLowerCase())
                      }
                      disabled={verificationType === null}
                    >
                      {verificationType === 2 ? (
                        noHouseholderApartments.map(apt => (
                          <AutoComplete.Option 
                            key={apt.apartmentId} 
                            value={apt.apartmentName}
                          >
                            {apt.apartmentName}
                          </AutoComplete.Option>
                        ))
                      ) : (
                        unrentedApartments.map(apt => (
                          <AutoComplete.Option 
                            key={apt.apartmentId} 
                            value={apt.apartmentName}
                          >
                            {apt.apartmentName}
                          </AutoComplete.Option>
                        ))
                      )}
                    </AutoComplete>
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
                    <Select 
                      placeholder="Chọn loại hợp đồng"
                      onChange={handleVerificationTypeChange}
                    >
                      <Option value={2}>Hợp đồng mua căn hộ</Option>
                      <Option value={1}>Hợp đồng thuê căn hộ</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Row gutter={8}>
                    <Col span={verificationType === 2 ? 24 : 12}>
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
                    {verificationType !== 2 && (
                      <Col span={12}>
                        <Form.Item
                          name="contractEndDate"
                          label="Ngày kết thúc hợp đồng"
                          rules={[
                            { 
                              required: verificationType === 1, 
                              message: 'Vui lòng chọn ngày kết thúc!' 
                            }
                          ]}
                        >
                          <DatePicker
                            style={{ width: '100%' }}
                            format="YYYY-MM-DD"
                            placeholder="Chọn ngày kết thúc"
                          />
                        </Form.Item>
                      </Col>
                    )}
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