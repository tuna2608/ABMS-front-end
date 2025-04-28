import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  WrapperContainer,
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { Checkbox, Form, Image, message } from "antd";
import imgLogin from "./../../../assets/common/images/logo-login.png";
import styled from "styled-components";
import InputForm from "../../../components/common/InputForm/InputForm";
import ButtonComponent from "../../../components/common/ButtonComponent/ButtonComponent";
import bgLogin from "../../../assets/common/images/bg-login.jpg";
import { LoadingComponent } from "../../../components/common/LoadingComponent/LoadingComponent";
import { LinkNav } from "../ForgotPasswordPage/style";
import { login } from "../../../redux/apiCalls";
import { useDispatch } from "react-redux";

const TextContent = styled.p`
  color: var(--cparagraph);
`;

const TitlePage = styled.h2`
  color: var(--cheadline);
`;

const SignInPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [loading,setLoading] = useState(false);

  // Validation
  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValidPassword = (value) => {
    return value.length >= 2;
  };

  const handleLogin = async () => {
    setLoading(true)
    try {
      if (!isValidPassword(password)) {
        message.error("Password must be at least 6 characters long.");
        return;
      }
      const res = await login(dispatch, { usernameOrEmail: email, password });
      if (res.success) {
        message.success(res.message);
        const roleUser = res.data.role;
        if (roleUser === "Admin") {
          navigate("/adminHome");
        } else if (roleUser === "Staff") {
          navigate("/staffHome");
        } else {
          navigate("/");
        }
      }else {
        message.error(res.message)
      }
    } catch (error) {
      message.error("Không thể thực hiện đăng nhập");
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
          height: "450px",
          display: "flex",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0 0 300px rgb(0, 0, 0)",
        }}
      >
        <WrapperContainerLeft>
          <TitlePage>Xin chào</TitlePage>
          <TextContent>Mời bạn đăng nhập tài khoản</TextContent>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            autoComplete="off"
          >
            <Form.Item
              name="usernameOrEmail"
              rules={[{ required: true, message: "Hãy nhập userName!" }]}
            >
              <InputForm
                placeholder={"Email hoặc tài khoản"}
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
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
                  placeholder={"Mật khẩu"}
                  value={password}
                  type={isShowPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item label={null}>
              <LoadingComponent isPending={loading}>
                <ButtonComponent
                  htmlType="submit"
                  disabled={!email.length || !password.length}
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
                  textButton={"Đăng nhập"}
                />
              </LoadingComponent>
              {/* {isError && (
                <ErrorBoundary
                  description="Failed to login"
                  message={
                    error.info?.message ||
                    "username or password wrong, try again!"
                  }
                />
              )} */}
            </Form.Item>
          </Form>
          <LinkNav>
            <WrapperTextLight onClick={() => navigate("/forgot-password")}>
              Quên mật khẩu
            </WrapperTextLight>
          </LinkNav>
          <LinkNav>
            <p>
              Chưa có tài khoản ?
              <WrapperTextLight onClick={() => navigate("/register")}>
                Đăng ký ngay
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

export default SignInPage;