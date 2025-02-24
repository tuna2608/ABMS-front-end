import React from 'react';
import styled from 'styled-components';
import { AiOutlinePicture } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { FaShare, FaExclamationTriangle, FaHeart } from "react-icons/fa";

/* Phần còn lại của code navbar, container, wrapper, v.v. 
   giả sử bạn vẫn giữ nguyên theo bản cũ. Ở đây chỉ tập trung 
   vào cột trái, nhất là InfoCard và InfoTable. 
   Dưới đây là code đầy đủ sẵn sàng chạy. */

const Container = styled.div`
  background-color: #f3f4f6;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

/* Top bar */
const TopBar = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  background: white;
  color: #dc2626;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
`;

/* Navbar chính (giống bạn giữ nguyên) */
const MainNav = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 8px 16px;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #111827;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  margin-left: 24px;
  gap: 16px;
  flex: 1;
`;

const Spacer = styled.div`
  flex: 1;
`;

const MenuButton = styled.button`
  background: #fff;
  border: none;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  color: #111827;

  &:hover {
    background-color: #166534;
    color: #fff;
  }
`;

/* 2 cột trái-phải */
const DetailContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr; 
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* Cột trái */
const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/* Ảnh lớn */
const MainImageWrapper = styled.div`
  background: #e5e7eb;
  height: 400px;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: #9ca3af;
    font-size: 80px;
  }
`;

/* Hàng thumbnail */
const ThumbnailsRow = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
`;

const ThumbItem = styled.div`
  width: 60px;
  height: 60px;
  background: #f3f4f6;
  border-radius: 4px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: #9ca3af;
    font-size: 24px;
  }
`;

/* Card thông tin */
const InfoCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0;
  color: #111827;
  font-weight: bold;
`;

const Address = styled.p`
  margin: 4px 0;
  color: #6b7280;
  font-size: 14px;
`;

/* 3 cột text + 3 icon = 6 cột */
const InfoTable = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr) 40px 40px 40px; 
  gap: 8px;
  align-items: center;
  font-size: 14px;
  color: #374151;
  border-top: 1px solid #e5e7eb;
  padding-top: 8px;
`;

/* Label */
const InfoLabel = styled.div`
  font-weight: 500;
  color: #6b7280;
`;

/* Value */
const InfoValue = styled.div`
  font-weight: 600;
  color: #111827;
`;

/* icon click */
const IconButton = styled.div`
  text-align: center;
  cursor: pointer;
  font-size: 18px;
  color: #6b7280;
  &:hover {
    color: #111827;
  }
`;

/* Cột phải */
const RightColumn = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/* Thông tin người đăng */
const OwnerHeader = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  background: #e5e7eb;
  border-radius: 50%;
`;

const OwnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #111827;

  .owner-name {
    font-weight: 600;
  }
  .other-ads {
    color: #6b7280;
    font-size: 12px;
  }
`;

const ContactButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  color: #fff;
`;

const ZaloButton = styled(ContactButton)`
  background-color: #0e8cf1;
`;

const PhoneButton = styled(ContactButton)`
  background-color: #0f766e;
`;

const DepositButton = styled(ContactButton)`
  background-color: #f97316;
`;

/* ------------- Component chính ------------- */
function ApartmentDetail() {
  return (
    <Container>
      <Wrapper>
        {/* TOP BAR */}
        <TopBar>
          <span>Kênh chủ căn hộ</span>
          <span>Kênh người thuê căn hộ</span>
        </TopBar>

        {/* NAV BAR */}
        <MainNav>
          <Logo>ABMS</Logo>
          <NavLinks>
            <MenuButton>Cho thuê</MenuButton>
            <MenuButton>Diễn đàn</MenuButton>
            <MenuButton>Mua bán</MenuButton>
            <Spacer />
            <MenuButton>Đăng nhập</MenuButton>
            <MenuButton>Đăng ký</MenuButton>
          </NavLinks>
        </MainNav>

        {/* 2 CỘT CHI TIẾT */}
        <DetailContent>
          {/* Cột Trái */}
          <LeftColumn>
            {/* Ảnh lớn */}
            <MainImageWrapper>
              <AiOutlinePicture />
            </MainImageWrapper>

            {/* Hàng thumbnails */}
            <ThumbnailsRow>
              {[1,2,3,4,5].map((item) => (
                <ThumbItem key={item}>
                  <BsFillImageFill />
                </ThumbItem>
              ))}
            </ThumbnailsRow>

            {/* Info */}
            <InfoCard>
              <Title>Cho thuê căn hộ 2PN full nội thất tại chung cư FPT Plaza 1 Đà Nẵng</Title>
              <Address>FPT Plaza 1, đường Võ Chí H...</Address>

              <InfoTable>
                {/* Hàng đầu: label + icon */}
                <InfoLabel>Mức giá</InfoLabel>
                <InfoLabel>Diện tích</InfoLabel>
                <InfoLabel>Phòng ngủ</InfoLabel>
                <IconButton><FaShare /></IconButton>
                <IconButton><FaExclamationTriangle /></IconButton>
                <IconButton><FaHeart /></IconButton>

                {/* Hàng hai: value + cột rỗng (nếu không cần hiển thị gì) */}
                <InfoValue>8,5 triệu / tháng</InfoValue>
                <InfoValue>68 m2</InfoValue>
                <InfoValue>2 PN</InfoValue>
                <div></div>
                <div></div>
                <div></div>
              </InfoTable>
            </InfoCard>
          </LeftColumn>

          {/* Cột Phải */}
          <RightColumn>
            <OwnerHeader>
              <Avatar />
              <OwnerInfo>
                <span className="owner-name">Nguyễn Anh Tú</span>
                <span className="other-ads">Xem thêm 16 tin khác</span>
              </OwnerInfo>
            </OwnerHeader>

            <ZaloButton>Liên hệ bằng zalo</ZaloButton>
            <PhoneButton>Hiển thị số 0912xxx</PhoneButton>
            <DepositButton>Đặt cọc trước</DepositButton>
          </RightColumn>
        </DetailContent>
      </Wrapper>
    </Container>
  );
}

export default ApartmentDetail;
