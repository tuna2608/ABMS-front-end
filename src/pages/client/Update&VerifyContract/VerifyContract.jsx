import React, { useState, useEffect } from "react";
import {
  Card, Space, Input, Form, Select, Button, message, Typography, Row, Col, Upload, DatePicker, AutoComplete
} from "antd";
import {
  UserOutlined, MailOutlined, PhoneOutlined, TagOutlined, HomeOutlined, 
  UploadOutlined, SearchOutlined, LockOutlined
} from "@ant-design/icons";
import moment from 'moment';

const { Option } = Select;
const { Text } = Typography;

const VerifyContract = () => {
  const [verificationForm] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [searching, setSearching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [verificationType, setVerificationType] = useState(null);
  const [userData, setUserData] = useState(null);
  
  // Simulated data for apartments without real API calls
  const [unrentedApartments, setUnrentedApartments] = useState([
    { apartmentId: 1, apartmentName: "A101", area: 75, floor: 1 },
    { apartmentId: 2, apartmentName: "A102", area: 85, floor: 1 },
    { apartmentId: 3, apartmentName: "B201", area: 90, floor: 2 },
    { apartmentId: 4, apartmentName: "B202", area: 100, floor: 2 }
  ]);
  
  const [noHouseholderApartments, setNoHouseholderApartments] = useState([
    { apartmentId: 5, apartmentName: "C301", area: 110, floor: 3 },
    { apartmentId: 6, apartmentName: "C302", area: 120, floor: 3 },
    { apartmentId: 7, apartmentName: "D401", area: 130, floor: 4 },
    { apartmentId: 8, apartmentName: "D402", area: 140, floor: 4 }
  ]);

  // Sample user data for demonstration
  const sampleUsers = [
    {
      username: "user1",
      email: "user1@example.com",
      fullName: "Nguyen Van A",
      phoneNumber: "0123456789",
      role: "Resident",
      apartmentName: "A101",
      verificationType: 1,
      contractStartDate: "2023-01-01",
      contractEndDate: "2024-01-01"
    },
    {
      username: "user2",
      email: "user2@example.com",
      fullName: "Tran Thi B",
      phoneNumber: "0987654321",
      role: "Owner",
      apartmentName: "C301",
      verificationType: 2,
      contractStartDate: "2023-02-01",
      contractEndDate: null
    }
  ];

  useEffect(() => {
    if (verificationType === 2) {
      verificationForm.setFieldValue('contractEndDate', null);
    }
  }, [verificationType, verificationForm]);

  const handleSearch = async (values) => {
    try {
      setSearching(true);
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        const user = sampleUsers.find(
          u => u.username === values.searchQuery || u.email === values.searchQuery
        );
        
        if (user) {
          setUserData(user);
          message.success("Tìm thấy thông tin người dùng!");
          setSearchPerformed(true);
          
          verificationForm.setFieldsValue({
            fullName: user.fullName,
            email: user.email,
            phone: user.phoneNumber,
            apartment: user.apartmentName,
            verificationType: user.verificationType,
            contractStartDate: user.contractStartDate ? moment(user.contractStartDate) : null,
            contractEndDate: user.contractEndDate ? moment(user.contractEndDate) : null
          });
          
          setVerificationType(user.verificationType);
        } else {
          message.warning("Không tìm thấy người dùng");
        }
        
        setSearching(false);
      }, 1000);
    } catch (error) {
      console.error('Search error:', error);
      message.error("Có lỗi xảy ra khi tìm kiếm!");
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

      // Simulate form submission with setTimeout
      setTimeout(() => {
        console.log("Form Values:", {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          apartment: values.apartment,
          verificationType: values.verificationType,
          contractStartDate: values.contractStartDate.format("YYYY-MM-DD"),
          contractEndDate: values.contractEndDate ? values.contractEndDate.format("YYYY-MM-DD") : null,
          documents: fileList
        });

        message.success("Đã gửi thông tin xác thực thành công!");
        verificationForm.resetFields();
        setFileList([]);
        setSearchPerformed(false);
        setVerificationType(null);
        setUserData(null);
        setSubmitting(false);
      }, 2000);
    } catch (error) {
      message.error("Có lỗi xảy ra khi gửi thông tin: " + (error.message || "Unknown error"));
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
            <Text>{userData.phoneNumber || 'Không có'}</Text>
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
    <div className="verify-contract-container">
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
          <Card title="Nhập thông tin xác thực hợp đồng">
            <Form
              form={verificationForm}
              layout="vertical"
              onFinish={handleVerificationSubmit}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="fullName"
                    label="Tên hợp đồng"
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
                      disabled={searchPerformed && userData?.phoneNumber}
                      suffix={searchPerformed && userData?.phoneNumber ? <LockOutlined /> : null}
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
                            {apt.apartmentName} - {apt.area}m² - Tầng {apt.floor}
                          </AutoComplete.Option>
                        ))
                      ) : (
                        unrentedApartments.map(apt => (
                          <AutoComplete.Option 
                            key={apt.apartmentId} 
                            value={apt.apartmentName}
                          >
                            {apt.apartmentName} - {apt.area}m²
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

export default VerifyContract;