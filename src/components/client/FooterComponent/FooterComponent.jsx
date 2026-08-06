import React from "react";
import { Image } from "antd";
import styled from "styled-components";
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import logoMenu from "../../../assets/common/images/logo-menu.png";
import { md, sm } from "../../../utilities/responsive";

const WrapperFooter = styled.div`
  background-color: var(--cheadline);
  color: white;
  padding: 40px var(--page-gutter) 20px;

  ${sm`
    padding: 28px 16px 16px;
  `}
`;

/* Desktop: 4 cột — tablet: 2 cột — mobile: 1 cột */
const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 30px;

  ${md`
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 16px;
  `}

  ${sm`
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 20px;
  `}
`;

const FooterCol = styled.div`
  min-width: 0;

  h3 {
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    /* Cùng chiều cao heading để 4 cột thẳng hàng trên desktop;
       bỏ khi đã xuống 1 cột vì không còn cần canh hàng */
    height: 27px;
  }

  p {
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.5;
  }

  ${sm`
    h3 {
      height: auto;
      margin-bottom: 12px;
      font-size: 17px;
    }
  `}
`;

const LogoColumn = styled(FooterCol)`
  .ant-image {
    width: 180px;
    max-width: 100%;
    margin-bottom: 20px;
  }

  .ant-image img {
    width: 100%;
    height: auto;
  }

  p {
    margin-bottom: 8px;
  }

  ${sm`
    .ant-image { width: 140px; margin-bottom: 12px; }
  `}
`;

const ContentColumn = styled(FooterCol)`
  p {
    margin-bottom: 10px;
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  ${sm`
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  `}
`;

const SocialSection = styled.div`
  h3 {
    color: white;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 20px;
  font-size: 20px;

  & > * {
    cursor: pointer;
    transition: color 0.3s;
  }

  & > *:hover {
    color: #1890ff;
  }
`;

const PolicyLinks = styled.div`
  font-size: 14px;

  ${sm`
    font-size: 13px;
    line-height: 1.8;
  `}

  a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
    padding: 0 5px;

    &:hover {
      color: #1890ff;
    }

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }
`;

function FooterComponent() {
  return (
    <WrapperFooter>
      <FooterContent>
        <LogoColumn>
          <Image src={logoMenu} preview={false} />
          <p>Bản quyền © 2025 ABMS</p>
          <p>Thiết kế bởi ABMS Team</p>
        </LogoColumn>

        <ContentColumn>
          <h3>Về chúng tôi</h3>
          <p>Chúng tôi cung cấp giải pháp quản lý tòa nhà thông minh.</p>
          <p>Hệ thống giúp tối ưu hóa vận hành, tiết kiệm chi phí.</p>
          <p>Nâng cao chất lượng dịch vụ và trải nghiệm khách hàng.</p>
        </ContentColumn>

        <ContentColumn>
          <h3>Vị trí</h3>
          <p>Hòa Hải, Ngũ Hành Sơn, Đà Nẵng, Việt Nam</p>
        </ContentColumn>

        <ContentColumn>
          <h3>Thông tin liên hệ</h3>
          <p>123 Đường Chính, Thành phố ABC, Việt Nam</p>
          <p>+84 123 456 789</p>
          <p>info@abms.com</p>
        </ContentColumn>
      </FooterContent>

      <BottomSection>
        <SocialSection>
          <h3>Theo dõi chúng tôi</h3>
          <SocialIcons>
            <FacebookOutlined />
            <InstagramOutlined />
            <TwitterOutlined />
          </SocialIcons>
        </SocialSection>

        <PolicyLinks>
          <a href="#">Chính sách bảo mật</a> | <a href="#">Điều khoản sử dụng</a>
        </PolicyLinks>
      </BottomSection>
    </WrapperFooter>
  );
}

export default FooterComponent;
