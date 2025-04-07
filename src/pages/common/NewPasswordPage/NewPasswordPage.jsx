import React, { useState } from "react";
import { Form, Image } from "antd";
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

const TitlePage = styled.h2`
  color: var(--cheadline);
`;

const TextContent = styled.p`
  color: var(--cparagraph);
`;

const NewPasswordPage = () => {
  const navigate = useNavigate();

  const handleUpdatePassword = (values) => {
    console.log(values);
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
          <TitlePage>Đặt lại mật khẩu</TitlePage>
          <TextContent>
            Nhập mật khẩu mới và xác nhận mật khẩu
          </TextContent>
          <Form
            name="newPassword"
            onFinish={handleUpdatePassword}
            autoComplete="off"
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" }
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
                textButton="Đặt lại mật khẩu"
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

export default NewPasswordPage;