import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Image, message } from "antd";
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
import { useNavigate } from "react-router-dom";
import { WrapperTextLight } from "../LoginPage/style";
import { forgotPassword } from "../../../redux/apiCalls";

const TitlePage = styled.h2`
  color: var(--cheadline);
`;

const TextContent = styled.p`
  color: var(--cparagraph);
`;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (values) => {
    setIsLoading(true);
    try {
      const result = await forgotPassword(dispatch, values.email);
      
      const messageAPI = result?.message;
      if (result?.status === 200) {
        message.success(messageAPI || "Mã OTP đã được gửi đến email của bạn");
        // Store email in localStorage for OTP verification
        localStorage.setItem('forgotPasswordEmail', values.email);
        // Navigate to OTP verification page
        navigate('/verify-forgot-otp');
      } else {
        message.error(messageAPI || "Có lỗi xảy ra khi gửi mã OTP");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
      console.error(error);
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
          height: "350px",
          display: "flex",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0 0 300px rgb(0, 0, 0)",
        }}
      >
        <WrapperContainerLeft>
          <TitlePage>Quên mật khẩu</TitlePage>
          <TextContent>
            Nhập email để nhận OTP đặt lại mật khẩu
          </TextContent>
          <Form
            name="forgotPassword"
            onFinish={handleResetPassword}
            autoComplete="off"
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { 
                  type: 'email', 
                  message: 'Vui lòng nhập đúng định dạng email!' 
                }
              ]}
            >
              <InputForm
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <ButtonComponent
                textButton="Gửi yêu cầu"
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
          <LinkNav>
            <WrapperTextLight onClick={() => navigate("/login")}>Quay lại trang đăng nhập</WrapperTextLight>
          </LinkNav>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imgLogin} width="250px" height="250px" preview={false} />
        </WrapperContainerRight>
      </div>
    </WrapperContainer>
  );
};

export default ForgotPasswordPage;