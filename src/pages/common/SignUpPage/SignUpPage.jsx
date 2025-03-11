import React from 'react'
import { WrapperContainer, WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from '../SignInPage/style'
import InputForm from '../../../components/InputForm/InputForm'
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent'
import imgLogin from './../../../assets/common/images/image-login.png'
import { Image } from 'antd'
import { GoogleOutlined } from '@ant-design/icons' // Thêm icon Google

const SignUpPage = () => {
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
          <h4>Xin chào</h4>
          <p>Tạo tài khoản</p>
          <InputForm placeholder={"abc@gmail.com"} type="email" />
          <InputForm placeholder={"Password"} type="password" />
          <InputForm placeholder={"Confirm password"} type="password" />
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
            textButton={"Đăng ký"}
          />
          <p><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>
          <p>Bạn đã có tài khoản <WrapperTextLight>Đăng nhập</WrapperTextLight></p>
          
          {/* Nút đăng nhập với Google */}
          <ButtonComponent
            size={40}
            styleButton={{
              backgroundColor: "#4285F4", // Màu xanh của Google
              height: "48px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            styleTextButton={{
              color: "white",
              fontSize: "16px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
            }}
            textButton={<><GoogleOutlined style={{ marginRight: "10px" }} /> Đăng nhập với Google</>}
          />
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imgLogin} width={203} height={203} />
        </WrapperContainerRight>
      </div>
    </WrapperContainer>
  )
}

export default SignUpPage
