import React, { useState } from "react";
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
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    console.log("Form values:", values);

    // Include the avatar image in the form data
    const formData = {
      ...values,
      avatar: imageUrl,
    };

    console.log("Complete form data:", formData);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      // Handle success or show notification
    }, 1000);
  };

  const handleImageChange = (info) => {
    if (info.file.status === "uploading") {
      setUploading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get image URL from response or use FileReader to preview
      setUploading(false);

      // In a real app, you'd use the response from your backend
      // Here we're using the browser's FileReader API to create a preview
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
      });
    }
  };

  // Helper function to convert File to base64 string for preview
  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <PageContainer>
      <Sidebar>
        <LogoText>ABMS</LogoText>
        <LogoSubtext>TECHNOLOGIES</LogoSubtext>
      </Sidebar>

      <MainContent>
        <BackButton icon={<ArrowLeftOutlined />} type="default" />

        <FormContainer>
          <Title level={2} style={{ color: "#1d3557", marginBottom: 40 }}>
            Edit profile
          </Title>

          <AvatarContainer>
            <Upload
              name="avatar"
              listType="none"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Replace with your actual upload endpoint
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  message.error("You can only upload image files!");
                }
                return isImage;
              }}
              onChange={handleImageChange}
            >
              <Avatar>
                <AvatarImage>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="/api/placeholder/100/80"
                        alt="Default"
                        style={{ width: 100, height: 60 }}
                      />
                    </div>
                  )}
                </AvatarImage>
                <AvatarUploadButton>
                  <CameraOutlined style={{ color: "white", fontSize: 16 }} />
                </AvatarUploadButton>
              </Avatar>
            </Upload>
          </AvatarContainer>

          <Form
            form={form}
            layout="vertical"
            initialValues={{ username: "nguyenquangminh" }}
            onFinish={handleSubmit}
          >
            <FormSection>
              <Form.Item label="Username:" name="username">
                <Input />
              </Form.Item>

              <Form.Item label="Password:" name="password">
                <Input.Password />
              </Form.Item>
            </FormSection>

            <FormSection>
              <Form.Item label="Email:" name="email">
                <Input />
              </Form.Item>

              <Form.Item label="Phone:" name="phone">
                <Input />
              </Form.Item>
            </FormSection>

            <FormSection>
              <FullWidthSection>
                <Form.Item label="Description" name="description">
                  <Input.TextArea rows={4} />
                </Form.Item>
              </FullWidthSection>
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
              <Form.Item label="ID number:" name="idNumber">
                <Input />
              </Form.Item>

              <Form.Item label="Job:" name="job">
                <Input />
              </Form.Item>
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
