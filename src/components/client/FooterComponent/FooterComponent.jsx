import React from "react";
import { Col, Row, Image, Space } from "antd";
import styled from "styled-components";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import logoMenu from "../../../assets/common/images/logo-menu.png";

const WrapperFooter = styled(Row)`
  background-color: var(--cheadline);
  color: white;
  padding: 40px 120px;
`;

const FooterCol = styled(Col)`
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const SocialIcons = styled(Space)`
  font-size: 20px;
  & > * {
    cursor: pointer;
    transition: color 0.3s;
  }
  & > *:hover {
    color: #1890ff;
  }
`;

function FooterComponent() {
  return (
    <WrapperFooter justify="space-between">
      <FooterCol span={6}>
        <Image src={logoMenu} width={150} preview={false} />
        <p>Bản quyền © 2025 ABMS</p>
        <p>Thiết kế bởi Phương Nam</p>
      </FooterCol>
      <FooterCol span={6}>
        <h3>Về chúng tôi</h3>
        <p>Chúng tôi cung cấp giải pháp quản lý tòa nhà thông minh.</p>
        <p>Hệ thống giúp tối ưu hóa vận hành, tiết kiệm chi phí.</p>
        <p>Nâng cao chất lượng dịch vụ và trải nghiệm khách hàng.</p>
      </FooterCol>
      <FooterCol span={6}>
        <h3>Vị trí</h3>
        <p>Hòa Hải, Ngũ Hành Sơn, Đà Nẵng, Việt Nam</p>
      </FooterCol>
      <FooterCol span={6}>
        <h3>Thông tin liên hệ</h3>
        <p>123 Đường Chính, Thành phố ABC, Việt Nam</p>
        <p>+84 123 456 789</p>
        <p>info@abms.com</p>
      </FooterCol>
      <Row style={{ width: "100%", marginTop: "20px", borderTop: "1px solid white", paddingTop: "20px" }} justify="space-between">
        <Col>
          <h3>Theo dõi chúng tôi</h3>
          <SocialIcons>
            <FacebookOutlined />
            <InstagramOutlined />
            <TwitterOutlined />
          </SocialIcons>
        </Col>
        <Col>
          <p>Chính sách bảo mật | Điều khoản sử dụng</p>
        </Col>
      </Row>
    </WrapperFooter>
  );
}

export default FooterComponent;
