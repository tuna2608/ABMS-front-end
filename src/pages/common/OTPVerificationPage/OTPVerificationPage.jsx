import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  WrapperContainer,
  WrapperContainerLeft,
  WrapperContainerRight,
} from "./style";
import { Form, Image } from "antd";
import imgLogin from "./../../../assets/common/images/logo-login.png";
import styled from "styled-components";
import ButtonComponent from "../../../components/common/ButtonComponent/ButtonComponent";
import bgLogin from "../../../assets/common/images/bg-login.jpg";
import { LinkNav } from "../ForgotPasswordPage/style";
import { WrapperTextLight } from "../LoginPage/style";

const TextContent = styled.p`
  color: var(--cparagraph);
  margin-bottom: 20px;
`;

const TitlePage = styled.h2`
  color: var(--cheadline);
`;

const OtpInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
`;

const OtpInput = styled.input`
  width: 50px;
  height: 50px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  text-align: center;
  font-size: 20px;
  margin: 0 5px;
  
  &:focus {
    border-color: var(--cbutton);
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const ResendText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: var(--cparagraph);
`;

const ResendButton = styled.span`
  color: var(--cbutton);
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
  
  &.disabled {
    color: #d9d9d9;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

const OTPVerificationPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Add focus management for OTP inputs
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    // Allow only numbers
    if (value && !/^\d+$/.test(value)) {
      return;
    }
    
    // Update the OTP array with the new input
    const newOtp = [...otp];
    newOtp[index] = value.substring(0, 1);
    setOtp(newOtp);
    
    // Auto-focus to next input after filling current one
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace - move to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    
    // Check if pasted content is a number and has expected length
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split("").slice(0, 6);
      const newOtp = [...otp];
      
      digits.forEach((digit, index) => {
        if (index < 6) {
          newOtp[index] = digit;
        }
      });
      
      setOtp(newOtp);
      
      // Focus on the next empty input or the last one
      const lastFilledIndex = Math.min(digits.length - 1, 5);
      if (lastFilledIndex < 5) {
        inputRefs.current[lastFilledIndex + 1].focus();
      } else {
        inputRefs.current[5].focus();
      }
    }
  };

  // Count down for resend OTP
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOTP = () => {
    if (canResend) {
      // Reset OTP
      setOtp(["", "", "", "", "", ""]);
      // Reset timer
      setTimer(60);
      setCanResend(false);
      // Focus on first input
      inputRefs.current[0].focus();
      
      // Here you would call your API to resend the OTP
      console.log("Resending OTP...");
    }
  };

  const handleVerifyOTP = () => {
    console.log(otp);
    // navigate('/new-password');
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
          <TitlePage>Xác Thực OTP</TitlePage>
          <TextContent>
            Chúng tôi đã gửi mã xác thực đến email của bạn. Vui lòng nhập mã OTP để đặt lại mật khẩu.
          </TextContent>
          
          <OtpInputContainer>
            {otp.map((digit, index) => (
              <OtpInput
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : null}
                ref={(el) => (inputRefs.current[index] = el)}
                autoFocus={index === 0}
              />
            ))}
          </OtpInputContainer>
          
          <ResendText>
            Không nhận được mã? {" "}
            <ResendButton 
              className={!canResend ? "disabled" : ""}
              onClick={handleResendOTP}
            >
              {canResend ? "Gửi lại" : `Gửi lại sau (${timer}s)`}
            </ResendButton>
          </ResendText>
          
          <Form>
            <Form.Item>
              <ButtonComponent
                onClick={handleVerifyOTP}
                disabled={otp.some((digit) => !digit)}
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
                textButton={"Xác nhận"}
              />
            </Form.Item>
          </Form>
          
          <LinkNav>
            <p>
              Quay lại trang {" "}
              <WrapperTextLight onClick={() => navigate("/forgot-password")}>
                Quên mật khẩu
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

export default OTPVerificationPage;