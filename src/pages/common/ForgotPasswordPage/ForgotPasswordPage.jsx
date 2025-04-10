import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
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
import { sendOtpForgotPassword } from "../../../redux/apiCalls";

const TitlePage = styled.h2`
  color: var(--cheadline);
`;

const TextContent = styled.p`
  color: var(--cparagraph);
`;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const handleResetPassword = async (values) => {
    setLoading(true);
    const formData = {
      email: values.email
    }
    try {
      const res = await sendOtpForgotPassword(formData);
      if(res.success){
        navigate('/verify-forgot-otp')
      }else{
        message.error(res.message);
      }
    } catch (error) {
      message.error("Không thể send otp forgot password")
    }finally{
      setLoading(false)
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
            Nhập email để nhận liên kết đặt lại mật khẩu
          </TextContent>
          <Form
            name="forgotPassword"
            onFinish={handleResetPassword}
            autoComplete="off"
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
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
                disabled={false}
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
              {/* {isError && <p className="error-message">{error.message}</p>} */}
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
