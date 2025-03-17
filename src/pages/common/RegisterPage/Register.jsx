import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  WrapperContainer,
  WrapperContainerLeft,
  WrapperContainerRight,
} from "./style";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { Checkbox, Form, Image } from "antd";
import imgLogin from "./../../../assets/common/images/logo-login.png";
import styled from "styled-components";
import InputForm from "../../../components/common/InputForm/InputForm";
import ButtonComponent from "../../../components/common/ButtonComponent/ButtonComponent";
import { registerUser } from "../../../services/UserService";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import bgLogin from "../../../assets/common/images/bg-login.jpg";
import { LinkNav } from "../ForgotPasswordPage/style";
import { WrapperTextLight } from "../LoginPage/style";

const TextContent = styled.p`
  color: var(--cparagraph);
`;

const TitlePage = styled.h2`
  color: var(--cheadline);
`;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ email, password }) => registerUser({ email, password }),
    onSuccess: () => {
      console.log("register success");
    },
  });

  const handleRegister = (values) => {
    mutate({
      email: values.email,
      password: values.password,
    });
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
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
          height: "500px",
          display: "flex",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0 0 300px rgb(0, 0, 0)",
        }}
      >
        <WrapperContainerLeft>
          <TitlePage>Đăng ký tài khoản</TitlePage>
          <TextContent>Hãy tạo tài khoản của bạn</TextContent>
          <Form
            name="register"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            onFinish={handleRegister}
            autoComplete="off"
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

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <div style={{ position: "relative" }}>
                <span
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  style={{
                    zIndex: 10,
                    position: "absolute",
                    top: "4px",
                    right: "8px",
                  }}
                >
                  {isShowPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                </span>
                <InputForm
                  placeholder="Mật khẩu"
                  value={password}
                  type={isShowPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[{ required: true, message: "Xác nhận mật khẩu!" }]}
            >
              <InputForm
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item name="agree" valuePropName="checked">
              <Checkbox>Tôi đồng ý với điều khoản sử dụng</Checkbox>
            </Form.Item>

            <Form.Item>
              {isPending && <p>Loading...</p>}
              {!isPending && (
                <ButtonComponent
                  htmlType="submit"
                  disabled={
                    !email.length ||
                    !password.length ||
                    password !== confirmPassword
                  }
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
                  textButton={"Đăng ký"}
                />
              )}
              {isError && (
                <ErrorBoundary
                  description="Đăng ký thất bại"
                  message={error?.message}
                />
              )}
            </Form.Item>
          </Form>
          <LinkNav>
            <p>
              Đã có tài khoản? 
              <WrapperTextLight onClick={() => navigate("/login")}>
                Đăng nhập
              </WrapperTextLight>
            </p>
          </LinkNav>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imgLogin} width="250px" height="250px" preview={false} />
        </WrapperContainerRight>
      </div>
    </WrapperContainer>
  );
};

export default RegisterPage;
