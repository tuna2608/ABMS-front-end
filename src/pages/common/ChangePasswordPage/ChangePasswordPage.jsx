import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  message,
} from "antd";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../redux/apiCalls"; // Đảm bảo đường dẫn chính xác
import { resetChangePasswordStatus } from "../../../redux/authSlice"; // Đảm bảo đường dẫn chính xác

const { Title } = Typography;

// Styled Components (giữ nguyên như phiên bản trước)
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
  max-width: 600px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
  padding: 40px;
`;

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
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

const PasswordRules = styled.div`
  background-color: #f7f9fc;
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 25px;
  
  h4 {
    color: #4b7bec;
    font-weight: 600;
    margin-bottom: 10px;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
    
    li {
      margin-bottom: 5px;
      color: #555;
      font-size: 14px;
    }
  }
`;

const ChangePasswordPage = () => {
  const userCurrent = useSelector((state) => state.user.currentUser);
  const changePasswordStatus = useSelector((state) => state.user.changePasswordStatus);
  const isFetching = useSelector((state) => state.user.isFetching);
  
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Theo dõi trạng thái đổi mật khẩu
  useEffect(() => {
    if (changePasswordStatus === 'success') {
      message.success("Đổi mật khẩu thành công");
      form.resetFields();
      dispatch(resetChangePasswordStatus());
      // Chuyển hướng về trang chủ
      setTimeout(() => {
        navigate('/');
      }, 1500); // Đợi 1.5 giây để người dùng xem thông báo thành công
    } else if (changePasswordStatus === 'error') {
      message.error("Đổi mật khẩu thất bại");
      dispatch(resetChangePasswordStatus());
    }
  }, [changePasswordStatus, dispatch, form, navigate]);

  const handleSubmit = async (values) => {
    // Validation để kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (values.newPassword !== values.confirmPassword) {
      message.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    // Gọi API đổi mật khẩu
    const changePasswordDTO = {
      email: userCurrent.email, // Hoặc userCurrent.userName tùy theo API backend
      currentPassword: values.oldPassword,
      newPassword: values.newPassword
    };

    const response = await changePassword(dispatch, changePasswordDTO);
    
    if (!response.success) {
      message.error(response.message);
    }
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
            Đổi Mật Khẩu
          </Title>
          
          <PasswordRules>
            <h4>Yêu cầu mật khẩu:</h4>
            <ul>
              <li>Tối thiểu 6 ký tự</li>
            </ul>
          </PasswordRules>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <FormSection>
              <Form.Item 
                label="Mật khẩu hiện tại:" 
                name="oldPassword"
                rules={[
                  { 
                    required: true, 
                    message: 'Vui lòng nhập mật khẩu hiện tại' 
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </FormSection>

            <FormSection>
              <Form.Item 
                label="Mật khẩu mới:" 
                name="newPassword"
                rules={[
                  { 
                    required: true, 
                    message: 'Vui lòng nhập mật khẩu mới' 
                  },
                  { 
                    min: 6, 
                    message: 'Mật khẩu phải có ít nhất 6 ký tự' 
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>
            </FormSection>
            
            <FormSection>
              <Form.Item 
                label="Xác nhận mật khẩu mới:" 
                name="confirmPassword"
                rules={[
                  { 
                    required: true, 
                    message: 'Vui lòng xác nhận mật khẩu mới' 
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Hai mật khẩu không khớp nhau'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </FormSection>

            <Form.Item>
              <SaveButton
                type="primary"
                htmlType="submit"
                disabled={isFetching}
                loading={isFetching}
              >
                XÁC NHẬN
              </SaveButton>
            </Form.Item>
          </Form>
        </FormContainer>
      </MainContent>
    </PageContainer>
  );
};

export default ChangePasswordPage;