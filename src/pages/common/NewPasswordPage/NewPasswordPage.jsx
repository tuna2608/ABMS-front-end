import React, { useState } from "react";
import { Form, Image } from "antd";
import { useNavigate } from "react-router-dom";
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

const TitlePage = styled.h2`
  color: var(--cheadline);
`;

const TextContent = styled.p`
  color: var(--cparagraph);
`;

const NewPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (values) => {
    // Chuyển về trang login khi đặt lại mật khẩu thành công
    navigate('/login');
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
          <TitlePage>Đặt Lại Mật Khẩu</TitlePage>
          <TextContent>
            Vui lòng nhập mật khẩu mới
          </TextContent>
          <Form
            name="newPassword"
            onFinish={handleResetPassword}
            autoComplete="off"
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="newPassword"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
            >
              <InputForm
                placeholder="Mật khẩu mới"
                value={newPassword}
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu!" }]}
            >
              <InputForm
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <ButtonComponent
                textButton="Đặt Lại Mật Khẩu"
                htmlType="submit"
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
            <WrapperTextLight onClick={() => navigate("/otp-verification")}>
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