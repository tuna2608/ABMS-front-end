import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  DatePicker,
  Upload,
  message,
  Modal,
  Alert
} from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { TransactionOutlined } from "@ant-design/icons";

import avtBase from "../../../assets/common/images/avtbase.jpg";
import { editProfile, getImageCloud } from "../../../redux/apiCalls";
import moment from "moment";

const { Title } = Typography;

// Refined Styled Components
const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px 0;
  align-items: center;
  justify-content: center;
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
  padding: 40px;
`;

const FormContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const FormSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidthSection = styled.div`
  grid-column: span 2;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const AvatarWrapper = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 4px solid #e6e6e6;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #f0f5fc, #d6e1f3);
  box-shadow: 8px 8px 16px #d1dce6, -8px -8px 16px #ffffff;
  margin-bottom: 20px;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FileUploadContainer = styled(Upload)`
  width: 100%;
  max-width: 300px;

  .ant-upload {
    position: relative;
    width: 100%;
    padding: 15px;
    border: 2px dashed #4b7bec;
    border-radius: 10px;
    text-align: center;
    transition: all 0.3s ease;
    background-color: #f4f7fa;
  }

  .ant-upload:hover {
    border-color: #3a5ec7;
    background-color: #eaf0f6;
  }

  .ant-upload-text {
    color: #4b7bec;
    font-weight: 500;
  }

  .ant-upload-list {
    display: none;
  }
`;

const ChangeButton = styled(Button)`
  margin-top: 10px;
  background-color: #4b7bec;
  color: white;
  border: none;

  &:hover {
    background-color: #3a5ec7;
  }
`;

const SaveButton = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: 25px;
  background-color: #4b7bec;
  border-color: #4b7bec;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3a5ec7;
    border-color: #3a5ec7;
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
  }
`;

const CoinBadge = styled.div`
  background-color: #f7f9fc;
  border: 1px solid #e6e6e6;
  border-radius: 20px;
  padding: 10px 20px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
  color: #4b7bec;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CoinActionButton = styled(Button)`
  margin-left: 10px;
  background-color: #52c41a;
  color: white;
  border: none;

  &:hover {
    background-color: #389e0d;
  }
`;

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const userCurrent = useSelector((state) => state.user.currentUser);

  const defaultValue = moment();
  const [user, setUser] = useState({
    ...userCurrent,
    birthday: (userCurrent) ? dayjs(userCurrent.birthday) : dayjs(defaultValue),
  });

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(user.userImgUrl || avtBase);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isInitialUpload, setIsInitialUpload] = useState(!user.userImgUrl);

  // New states for coin transfer
  const [isBankInfoModalVisible, setIsBankInfoModalVisible] = useState(false);
  const [isCoinRequestModalVisible, setIsCoinRequestModalVisible] = useState(false);
  const [coinRequestAmount, setCoinRequestAmount] = useState(0);
  const [bankInfo, setBankInfo] = useState({
    bankName: '',
    accountNumber: '',
    accountName: ''
  });

  const dispatch = useDispatch();

  const triggerFileInput = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedFile(file);
        setSelectedImage(imageUrl);
        setIsInitialUpload(false);
      }
    };
    fileInput.click();
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    let formattedDate;
    let formData = {
      ...values,
      password: userCurrent.password,
      userId: user.userId,
    };
    if (values.birthday) {
      formattedDate = values.birthday.format("YYYY-MM-DD");
      formData = {
        ...formData,
        birthday: formattedDate,
      };
    }

    if (selectedFile) {
      const formData1 = new FormData();
      formData1.append("file", selectedFile);
      const res = await getImageCloud(formData1);
      const messageApi = res.message;
      if (res.status === 403) {
        message.error(messageApi);
      } else {
        const userImgUrl = res.data;
        formData = {
          ...formData,
          userImgUrl: userImgUrl,
        };
      }
    } else {
      formData = {
        ...formData,
        userImgUrl: null,
      };
    }

    const resEdit = await editProfile(dispatch, formData);
    const messageAPI = resEdit.data.message;
    if (
      resEdit.status === 401 ||
      resEdit.status === 400 ||
      resEdit.status === 403
    ) {
      message.error(messageAPI);
    } else {
      message.success(messageAPI);
      setIsInitialUpload(false);
    }
    setLoading(false);
  };

  // New handler for bank info submission
  const handleBankInfoSubmit = (values) => {
    setBankInfo(values);
    setIsBankInfoModalVisible(false);
    setIsCoinRequestModalVisible(true);
  };

  // New handler for coin transfer request
  const handleCoinTransferRequest = () => {
    if (coinRequestAmount <= 0) {
      message.error('Số tiền yêu cầu phải lớn hơn 0');
      return;
    }

    message.success('Yêu cầu chuyển coin đã được gửi');
    setIsCoinRequestModalVisible(false);
    setCoinRequestAmount(0);
    navigate('/adminHome/coin');
  };

  return (
    <PageContainer>
      <MainContent>
        <FormContainer>
          <Title level={2} style={{ 
            color: "#4b7bec", 
            marginBottom: 30, 
            textAlign: 'center', 
            fontWeight: 700 
          }}>
            Thay đổi thông tin 
          </Title>
          
          <AvatarContainer>
            <AvatarWrapper>
              <AvatarImage 
                src={selectedImage} 
                alt="Profile Avatar" 
              />
            </AvatarWrapper>
            
            {isInitialUpload ? (
              <FileUploadContainer
                name="avatar"
                accept="image/*"
                beforeUpload={(file) => {
                  const imageUrl = URL.createObjectURL(file);
                  setSelectedFile(file);
                  setSelectedImage(imageUrl);
                  setIsInitialUpload(false);
                  return false; // Prevent default upload
                }}
              >
                <div className="ant-upload">
                  <p className="ant-upload-text">
                    Bấm hoặc thả tệp vào khung này
                  </p>
                </div>
              </FileUploadContainer>
            ) : (
              <ChangeButton onClick={triggerFileInput}>
                Thay đổi hình ảnh
              </ChangeButton>
            )}
          </AvatarContainer>

          <CoinBadge>
            Coins khả dụng: {user.accountBallance}
            <CoinActionButton 
              icon={<TransactionOutlined />}
              onClick={() => {
                // If no bank info, show bank info modal first
                if (!bankInfo.accountNumber) {
                  setIsBankInfoModalVisible(true);
                } else {
                  setIsCoinRequestModalVisible(true);
                }
              }}
            >
              Yêu Cầu Chuyển Coin
            </CoinActionButton>
          </CoinBadge>

          <Form
            form={form}
            layout="vertical"
            initialValues={user}
            onFinish={handleSubmit}
          >
            <FormSection>
              <Form.Item label="Tên tài khoản:" name="userName">
                <Input disabled />
              </Form.Item>

              <Form.Item label="Email:" name="email">
                <Input disabled />
              </Form.Item>
            </FormSection>

            <FormSection>
              <Form.Item label="Họ và tên:" name="fullName">
                <Input />
              </Form.Item>

              <Form.Item label="Số điện thoại:" name="phone">
                <Input />
              </Form.Item>
            </FormSection>
            
            <FormSection>
              <Form.Item label="Ngày sinh:" name="birthday">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Công việc:" name="job">
                <Input />
              </Form.Item>
            </FormSection>
            
            <FormSection>
              <FullWidthSection>
                <Form.Item label="Mô tả" name="description">
                  <Input.TextArea rows={4} />
                </Form.Item>
              </FullWidthSection>
            </FormSection>

            <Form.Item>
              <SaveButton
                type="primary"
                htmlType="submit"
                disabled={loading}
                loading={loading}
              >
                Lưu thay đổi
              </SaveButton>
            </Form.Item>
          </Form>
        </FormContainer>
      </MainContent>

      {/* Bank Info Modal */}
      <Modal
        title="Thông Tin Tài Khoản Ngân Hàng"
        open={isBankInfoModalVisible}
        onCancel={() => setIsBankInfoModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleBankInfoSubmit}
          initialValues={bankInfo}
        >
          <Form.Item 
            name="bankName" 
            label="Tên Ngân Hàng"
            rules={[{ required: true, message: 'Vui lòng nhập tên ngân hàng' }]}
          >
            <Input placeholder="Nhập tên ngân hàng" />
          </Form.Item>
          <Form.Item 
            name="accountNumber" 
            label="Số Tài Khoản"
            rules={[{ required: true, message: 'Vui lòng nhập số tài khoản' }]}
          >
            <Input placeholder="Nhập số tài khoản" />
          </Form.Item>
          <Form.Item 
            name="accountName" 
            label="Tên Tài Khoản"
            rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]}
          >
            <Input placeholder="Nhập tên tài khoản" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lưu Thông Tin
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Coin Transfer Request Modal */}
      <Modal
        title="Yêu Cầu Chuyển Coin"
        open={isCoinRequestModalVisible}
        onCancel={() => setIsCoinRequestModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsCoinRequestModalVisible(false)}>
            Hủy
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleCoinTransferRequest}
          >
            Gửi Yêu Cầu
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Số Coin Muốn Chuyển">
            <Input 
              type="number" 
              value={coinRequestAmount}
              onChange={(e) => setCoinRequestAmount(Number(e.target.value))}
              placeholder="Nhập số coin muốn chuyển"
            />
          </Form.Item>
          <div style={{ marginBottom: '15px' }}>
            <strong>Thông Tin Tài Khoản:</strong>
            <p>Ngân Hàng: {bankInfo.bankName}</p>
            <p>Số Tài Khoản: {bankInfo.accountNumber}</p>
            <p>Tên Tài Khoản: {bankInfo.accountName}</p>
          </div>
          <Alert 
            message="Lưu Ý" 
            description="Yêu cầu chuyển coin sẽ được quản trị viên xử lý. Vui lòng kiểm tra số dư và thông tin tài khoản ngân hàng." 
            type="info" 
            showIcon 
          />
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default ProfileEditPage;