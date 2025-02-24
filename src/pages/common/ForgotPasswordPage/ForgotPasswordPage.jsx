import React from 'react';
import {
  WrapperContainer,
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight
} from '../SignInPage/style';
import InputForm from '../../../components/InputForm/InputForm';
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent';
import imgLogin from './../../../assets/common/images/image-login.png';
import { Image } from 'antd';

const ForgotPasswordPage = () => {
  return (
    <WrapperContainer>
      <div
        style={{
          width: "800px",
          height: "445px",
          display: "flex",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <WrapperContainerLeft>
          <h4>Quên mật khẩu</h4>
          <p>Nhập email để đặt lại mật khẩu</p>
          <InputForm placeholder={"abc@gmail.com"} type="email" />
          <ButtonComponent
            size={40}
            styleButton={{
              backgroundColor: "rgb(256,0,0)",
              height: "48px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
            }}
            styleTextButton={{
              color: "white",
              fontSize: "16px",
              fontWeight: "700",
            }}
            textButton={"Gửi yêu cầu"}
          />
          <p>
            <WrapperTextLight>Quay lại</WrapperTextLight> trang <WrapperTextLight>Đăng nhập</WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imgLogin} width={203} height={203} />
        </WrapperContainerRight>
      </div>
    </WrapperContainer>
  );
};

export default ForgotPasswordPage;