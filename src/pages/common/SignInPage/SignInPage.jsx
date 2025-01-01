import React from "react";
import { WrapperContainer, WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../../components/InputForm/InputForm";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import imgLogin from './../../../assets/common/images/image-login.png'

const SignInPage = () => {
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
          <h4>Xin chao</h4>
          <p>Dang nhap, tao tai khoan</p>
          <InputForm placeholder={"abc@gmail.com"} type="email" />
          <InputForm placeholder={"Password"} type="password" />
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
            textButton={"Dang nhap"}
          />
          <p ><WrapperTextLight>Quen mat khau</WrapperTextLight></p>
          <p>Chua co tai khoan <WrapperTextLight>Dang ky tai khoan</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
            <Image src={imgLogin} width={203} height={203}/>
        </WrapperContainerRight>
      </div>
    </WrapperContainer>
  );
};

export default SignInPage;
