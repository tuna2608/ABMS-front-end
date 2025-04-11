import React, { useState, useEffect } from "react";
import { Form, Image, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  LinkNav,
  WrapperContainer,
  WrapperContainerLeft,
  WrapperContainerRight,
} from "./style";
import InputForm from "../../../components/common/InputForm/InputForm";
import ButtonComponent from "../../../components/common/ButtonComponent/ButtonComponent";
import imgLogin from "../../../assets/common/images/logo-login.png";
import bgLogin from "../../../assets/common/images/bg-login.jpg";
import { WrapperTextLight } from "../LoginPage/style";
import { resetPassword } from "../../../redux/apiCalls";

const TitlePage = styled.h2`
  color: var(--cheadline);
`;

const TextContent = styled.p`
  color: var(--cparagraph);
`;

const NewPasswordPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Retrieve email from localStorage
    const storedEmail = localStorage.getItem('resetPasswordEmail') || 
                        localStorage.getItem('forgotPasswordEmail');
    
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email is stored, redirect back to forgot password page
      navigate('/forgot-password');
    }
  }, [navigate]);

  const handleResetPassword = async (values) => {
    // Validate password match first
    if (values.newPassword !== values.confirmPassword) {
      message.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    setIsLoading(true);
    try {
      // Force a small delay to ensure UI updates
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Call resetPassword function
      const result = await resetPassword(dispatch, {
        email,
        newPassword: values.newPassword
      });
      
      // Get message from result
      const messageAPI = result?.message;

      // Check for success more explicitly
      if (result && (result.success || result.status === 200)) {
        // Clear stored emails
        localStorage.removeItem('resetPasswordEmail');
        localStorage.removeItem('forgotPasswordEmail');
        
        // Show success message
        message.success(messageAPI || "Đặt lại mật khẩu thành công");
        
        // Small delay before navigation to ensure message is visible
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 500);
      } else {
        // Handle specific error messages
        const errorMessage = messageAPI || "Đặt lại mật khẩu không thành công";
        message.error(errorMessage);

        // If the error is about using the old password
        if (errorMessage.includes("mật khẩu cũ")) {
          form.setFields([{
            name: 'newPassword',
            errors: [errorMessage]
          }]);
        }
      }
    } catch (error) {
      console.error('Reset Password Error:', error);
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WrapperContainer>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          zIndex: "-99",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src={bgLogin}
          alt=""
        />
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>
      <div
        style={{
          width: "800px",
          height: "500px", // Increased height
          display: "flex",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0 0 300px rgb(0, 0, 0)",
        }}
      >
        <WrapperContainerLeft>
          <TitlePage>Đặt Lại Mật Khẩu</TitlePage>
          <TextContent>
            Vui lòng nhập mật khẩu mới
          </TextContent>
          <Form
            form={form}
            name="newPassword"
            onFinish={handleResetPassword}
            autoComplete="off"
            style={{ maxWidth: 600, marginBottom: '20px' }}
          >
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                { 
                  min: 6, 
                  message: "Mật khẩu phải có ít nhất 6 ký tự!" 
                },
                {
                  // Modified rule to allow only numeric or only alphabetic passwords
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    
                    const isNumeric = /^\d+$/.test(value);
                    const isAlphabetic = /^[a-zA-Z]+$/.test(value);
                    
                    if (isNumeric || isAlphabetic) {
                      return Promise.resolve();
                    }
                    
                    return Promise.reject(new Error('Mật khẩu phải là số hoặc chữ cái'));
                  }
                }
              ]}
            >
              <InputForm
                placeholder="Mật khẩu mới"
                type="password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                  },
                }),
              ]}
            >
              <InputForm
                placeholder="Xác nhận mật khẩu"
                type="password"
              />
            </Form.Item>

            <Form.Item>
              <ButtonComponent
                textButton="Đặt Lại Mật Khẩu"
                htmlType="submit"
                disabled={isLoading}
                size={40}
                styleButton={{
                  backgroundColor: "var(--cbutton)",
                  height: "48px",
                  width: "100%",
                  border: "none",
                  borderRadius: "4px",
                }}
                styleTextButton={{
                  color: "var(--cbuttontext)",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              />
            </Form.Item>
          </Form>
          <LinkNav style={{ textAlign: 'center', marginTop: '10px' }}>
            <WrapperTextLight onClick={() => navigate("/verify-forgot-otp")}>
              Quay lại
            </WrapperTextLight>
          </LinkNav>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imgLogin} width="250px" height="250px" preview={false} />
        </WrapperContainerRight>
      </div>
    </WrapperContainer>
  );
};

export default NewPasswordPage;