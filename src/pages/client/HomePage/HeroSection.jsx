import React from 'react';
import styled from 'styled-components';
import { Carousel } from "antd";
import { 
  LeftOutlined, 
  RightOutlined, 
} from "@ant-design/icons";

const HeroSectionWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: visible;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  .ant-carousel {
    position: static !important;
  }
`;

const ImageControlsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 45%;
  width: 55%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 30;
  pointer-events: none;
  padding: 0 16px;

  button {
    pointer-events: auto;
  }
`;

const CarouselNavButton = styled.button`
  position: relative;
  z-index: 20;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: rgba(30, 58, 138, 0.8);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  pointer-events: auto;

  &:hover {
    background-color: rgba(30, 58, 138, 1);
  }

  &.prev {
    margin-left: -26px;
  }

  &.next {
    margin-right: -10px;
  }
`;

const ContentContainer = styled.div`
  width: 45%;
  height: 360px;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  background-color: transparent;
  margin: 20px 0;
  padding-right: 30px;
`;

const ImageContainer = styled.div`
  width: 55%;
  height: 360px;
  margin: 20px 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    max-width: 100%;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  background-color: transparent;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 30px;
  color: #1e3a8a;
  margin-bottom: 16px;
  font-weight: 700;
  text-align: left;
`;

const Description = styled.p`
  font-size: 16px;
  color: #1f2937;
  line-height: 1.6;
  margin-bottom: 24px;
  max-width: 500px;
  text-align: left;
`;

const RegisterButton = styled.button`
  background-color: #1e3a8a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: fit-content;

  &:hover {
    background-color: #1e40af;
  }
`;

function HeroSection({ carouselRef, handlePrev, handleNext }) {
  const heroData = [
    {
      title: "Chào mừng bạn đến với trang web",
      description: "Website quản lý chung cư A là nền tảng trực tuyến giúp bạn quản lý và cư dân chung cư dễ dàng kết nối, trao đổi thông tin và thực hiện các thủ tục quan trọng. Hệ thống hỗ trợ đăng ký cư trú, thanh toán phí dịch vụ.",
      image: "https://images.cenhomes.vn/2020/03/1585033148-can-ho-mau-an-land-complex.jpg",
      altText: "Apartment management system"
    },
    {
      title: "Hệ thống quản lý thông minh",
      description: "Với giao diện thân thiện, tích hợp các tính năng hiện đại, website giúp tối ưu hóa quy trình quản lý, nâng cao trải nghiệm sống cho cư dân và đảm bảo sự minh bạch trong vận hành chung cư.",
      image: "https://images.cenhomes.vn/2020/03/1585033149-can-ho-mau-cosmo-tay-ho.jpg",
      altText: "Smart management system"
    },
    {
      title: "Trải nghiệm sống hiện đại",
      description: "Hệ thống quản lý căn hộ thông minh, giúp bạn theo dõi, quản lý và vận hành căn hộ một cách dễ dàng và hiệu quả. Trải nghiệm sự tiện lợi ngay hôm nay!",
      image: "https://images.cenhomes.vn/2020/03/1585033155-can-ho-mau-imperia-sky-garden.jpg",
      altText: "Modern apartment interior"
    }
  ];

  return (
    <HeroSectionWrapper>
      <CarouselWrapper>
        <Carousel
          ref={carouselRef}
          dots={false}
          autoplay
          autoplaySpeed={5000}
          style={{ width: "100%", height: "400px" }}
          easing="linear"
          effect="fade"
        >
          {heroData.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "400px",
                  width: "100%",
                  maxWidth: "1200px",
                  margin: "0 auto",
                  position: "relative",
                }}
              >
                <ContentContainer>
                  <Content>
                    <Title>{item.title}</Title>
                    <Description>{item.description}</Description>
                    <RegisterButton>Đăng ký →</RegisterButton>
                  </Content>
                </ContentContainer>
                <ImageContainer>
                  <img src={item.image} alt={item.altText} />
                </ImageContainer>
              </div>
            </div>
          ))}
        </Carousel>

        {/* Custom Navigation Buttons */}
        <ImageControlsContainer>
          <CarouselNavButton
            className="prev"
            onClick={handlePrev}
            type="button"
          >
            <LeftOutlined />
          </CarouselNavButton>

          <CarouselNavButton
            className="next"
            onClick={handleNext}
            type="button"
          >
            <RightOutlined />
          </CarouselNavButton>
        </ImageControlsContainer>
      </CarouselWrapper>
    </HeroSectionWrapper>
  );
}

export default HeroSection;
