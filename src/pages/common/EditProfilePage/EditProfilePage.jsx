import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  DatePicker,
  Upload,
  message,
} from "antd";
import { CameraOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useSelector } from "react-redux";

import avtBase from '../../../assets/common/images/avtbase.jpg'

const { Title } = Typography;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #7fbfbf;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
`;

const FormContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const FormSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

const FullWidthSection = styled.div`
  grid-column: span 2;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const Avatar = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #456470;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
`;

const AvatarImage = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  transform: rotate(-5deg);
  overflow: hidden;
`;

const AvatarUploadButton = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: #456470;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const LogoText = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: #3a5068;
  margin-top: 40px;
  letter-spacing: 2px;
`;

const LogoSubtext = styled.div`
  color: #3a5068;
  font-size: 14px;
  letter-spacing: 1px;
`;

const SaveButton = styled(Button)`
  background-color: #7fbfbf;
  border-color: #7fbfbf;
  border-radius: 20px;
  padding: 0 40px;
  height: 40px;
  float: right;
  margin-top: 20px;

  &:hover {
    background-color: #6eacac;
    border-color: #6eacac;
  }
`;

const BackButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #d9d9d9;
`;

const ProfileEditPage = () => {
  const [user, setUser] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedImage,setSelectedImage] = useState(avtBase);
  const [selectedFile, setSelectedFile] = useState(null);

  const userCurrent = useSelector((state) => state.user.currentUser);
  console.log(userCurrent);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    description: "",
    phone: "",
    userImgUrl: "",
    age: "",
    birthday: "",
    idNumber: "",
    job: "",
  });

  const handleImageChange = (e) =>{
    const file = e.target.files[0];
    if(file){
      const imageUrl = URL.createObjectURL(file);
      // console.log(imageUrl);
      setSelectedFile(file);
      setSelectedImage(imageUrl);
    }
  }

  const handleSubmit = (values) => {
    setLoading(true);
    console.log("Form values:", values);

    // Include the avatar image in the form data
    const formData = {
      ...values,
      user: imageUrl,
    };

    console.log("Complete form data:", formData);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      // Handle success or show notification
    }, 1000);
  };

  return (
    <PageContainer>
      <Sidebar>
        <LogoText>ABMS</LogoText>
        <LogoSubtext>TECHNOLOGIES</LogoSubtext>
      </Sidebar>

      <MainContent>
        {/* <BackButton icon={<ArrowLeftOutlined />} type="default" /> */}
        <FormContainer>
          <Title level={2} style={{ color: "#1d3557", marginBottom: 40 }}>
            Edit profile
          </Title>
          <AvatarContainer>
            <img style={{width: '50px',height: '50px',}} src={selectedImage || userCurrent.userImgUrl}/>
            <input type="file" accept="image/*" onChange={handleImageChange}/>
          </AvatarContainer>
          <Form
            form={form}
            layout="vertical"
            initialValues={userCurrent}
            onFinish={handleSubmit}
          >
            <FormSection>
              <Form.Item label="Username:" name="user">
                <Input disabled />
              </Form.Item>

              <Form.Item label="Email:" name="email">
                <Input disabled />
              </Form.Item>
            </FormSection>

            <FormSection>
              <Form.Item label="Fullname:" name="fullName">
                <Input />
              </Form.Item>

              <Form.Item label="Phone:" name="phone">
                <Input />
              </Form.Item>
            </FormSection>
            <FormSection>
              <Form.Item label="Age:" name="age">
                <Input />
              </Form.Item>

              <Form.Item label="Birthday:" name="birthday">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </FormSection>
            <FormSection>
              <FullWidthSection>
                <Form.Item label="Description" name="description">
                  <Input.TextArea rows={4} />
                </Form.Item>
              </FullWidthSection>
            </FormSection>

            <Form.Item>
              <SaveButton type="primary" htmlType="submit" loading={loading}>
                SAVE
              </SaveButton>
            </Form.Item>
          </Form>
        </FormContainer>
      </MainContent>
    </PageContainer>
  );
};

export default ProfileEditPage;
