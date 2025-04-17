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
import { useDispatch } from 'react-redux';

// Định nghĩa các breakpoint
const breakpoints = {
  mobile: '576px',
  tablet: '768px',
  laptop: '992px',
  desktop: '1200px'
};

// Styled components với responsive
const ResponsiveContainer = styled.div`
  width: 90%;
  max-width: 800px;
  height: auto;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 300px rgb(0, 0, 0);
  overflow: hidden;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    height: 450px;
  }
`;

const TextContent = styled.p`
  color: var(--cparagraph);
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 16px;
    text-align: left;
    padding: 0 8%;
  }
`;

const TitlePage = styled.h2`
  color: var(--cheadline);
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 28px;
    text-align: left;
    padding: 0 8%;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -99;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const ResponsiveContainerLeft = styled(WrapperContainerLeft)`
  width: 100%;
  padding: 20px;
  
  @media (min-width: ${breakpoints.tablet}) {
    width: 60%;
    padding: 30px;
  }
`;

const ResponsiveContainerRight = styled(WrapperContainerRight)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  
  @media (min-width: ${breakpoints.tablet}) {
    width: 40%;
    padding: 0;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  
  @media (min-width: ${breakpoints.tablet}) {
    height: 100%;
  }
`;

// Form styling with even spacing
const FormContainer = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 8%;
  
  .ant-form-item {
    margin-bottom: 16px;
    width: 100%;
  }
`;

// Improved FormFooter with consistent padding and alignment
const FormFooter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 8%;
  margin-top: 10px;
  
  .ant-checkbox-wrapper {
    margin-left: 0;
  }
`;

// Improved StyledLinkNav with consistent padding and spacing
const StyledLinkNav = styled(LinkNav)`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  
  @media (min-width: ${breakpoints.tablet}) {
    justify-content: flex-start;
  }
  
  p {
    margin: 0;
  }
`;

// New style for the "Quên mật khẩu" link
const ForgotPasswordLink = styled(WrapperTextLight)`
  cursor: pointer;
  color: var(--cbutton);
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

// New style for "Đăng ký ngay" link
const RegisterLink = styled(WrapperTextLight)`
  cursor: pointer;
  color: var(--cbutton);
  font-weight: 500;
  margin-left: 5px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SignInPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // Validation
  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValidPassword = (value) => {
    return value.length >= 2;
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!isValidPassword(password)) {
        message.error("Password must be at least 6 characters long.");
        return;
      }
      const res = await login(dispatch, { usernameOrEmail: email, password });
      // console.log(res);
      if(res.success){
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
        message.error(res.message);
      }
    } catch (error) {
      message.error("Không thể thực hiện đăng nhập")
    }finally{
      setLoading(false)
    }
    
  };

  return (
    <WrapperContainer>
      <BackgroundImage>
        <img src={bgLogin} alt="background" />
      </BackgroundImage>
      
      <ResponsiveContainer>
        <ResponsiveContainerRight className="mobile-logo">
          <LogoContainer>
            <Image 
              src={imgLogin} 
              width="auto" 
              height="auto" 
              preview={false}
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                objectFit: "contain"
              }} 
            />
          </LogoContainer>
        </ResponsiveContainerRight>
        
        <ResponsiveContainerLeft>
          <TitlePage>Xin chào</TitlePage>
          <TextContent>Mời bạn đăng nhập tài khoản</TextContent>
          <FormContainer
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            autoComplete="off"
          >
            <Form.Item
              name="usernameOrEmail"
              rules={[
                { required: true, message: "Hãy nhập userName!" },
              ]}
            >
              <InputForm
                placeholder={"Email hoặc tài khoản"}
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <div style={{ position: "relative", width: '100%' }}>
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
                  style={{ width: '100%' }}
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
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                  textButton={"Đăng nhập"}
                />
              </LoadingComponent>
            </Form.Item>
          </FormContainer>
          
          {/* Improved footer with better responsive design */}
          <FormFooter>
            <StyledLinkNav>
              <ForgotPasswordLink onClick={() => navigate("/forgot-password")}>
                Quên mật khẩu
              </ForgotPasswordLink>
            </StyledLinkNav>
            <StyledLinkNav>
              <p>Chưa có tài khoản?{" "}
                <RegisterLink onClick={() => navigate("/register")}>
                  Đăng ký ngay
                </RegisterLink>
              </p>
            </StyledLinkNav>
          </FormFooter>
        </ResponsiveContainerLeft>
        
        {/* Logo bên phải chỉ hiển thị trên tablet trở lên */}
        <ResponsiveContainerRight className="desktop-logo" style={{ display: 'none' }}>
          <LogoContainer>
            <Image 
              src={imgLogin} 
              width="auto" 
              height="auto" 
              preview={false}
              style={{
                maxWidth: "250px",
                maxHeight: "250px",
                objectFit: "contain"
              }} 
            />
          </LogoContainer>
        </ResponsiveContainerRight>
      </ResponsiveContainer>
      
      {/* CSS để kiểm soát hiển thị logo trên các thiết bị */}
      <style jsx>{`
        @media (max-width: ${breakpoints.tablet}) {
          .desktop-logo {
            display: none !important;
          }
        }
        
        @media (min-width: ${breakpoints.tablet}) {
          .mobile-logo {
            display: none !important;
          }
          .desktop-logo {
            display: flex !important;
          }
        }
      `}</style>
    </WrapperContainer>
  );
};

export default SignInPage;