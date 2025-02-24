import React, { useState } from "react";
import styled from "styled-components";
import { FaHome, FaBook, FaFileInvoice, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

// Vùng ngoài cùng
const Container = styled.div`
  background: #f3f4f6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  flex: 1;
  gap: 16px;
`;

// Thanh menu bên trái (Sidebar)
const Sidebar = styled.div`
  width: 250px;
  background-color: #fdba74;
  padding: 16px;
  border-radius: 8px;
  height: 100vh;
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
`;

const SidebarItem = styled(NavLink)`
  text-decoration: none;
  color: #111827;
  font-weight: 500;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &:hover {
    background-color: #f97316;
    color: white;
  }

  &.active {
    background-color: #f97316;
    color: white;
  }
`;

// Navbar (with Kênh text)
const TopNav = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TopText = styled.div`
  color: #dc2626;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #111827;
`;

const NavLinks = styled.div`
  display: flex;
  margin-left: auto;
  gap: 16px;
`;

const NavButton = styled(NavLink)`
  text-decoration: none;
  padding: 8px 16px;
  color: #111827;
  font-weight: 500;
  border-radius: 4px;

  &:hover {
    background: #16a34a;
    color: white;
  }

  &.active {
    background: #15803d;
    color: white;
  }
`;

const UserIcon = styled(FaUserCircle)`
  color: #111827;
  font-size: 24px;
  margin-right: 8px;
`;

// Content
const Content = styled.div`
  flex: 1;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ApartmentDetail = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
`;

const ApartmentInfo = styled.div`
  flex: 1;
`;

const ApartmentTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: #111827;
`;

const ApartmentText = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 8px 0;
`;

const ApartmentImage = styled.div`
  width: 200px;
  height: 200px;
  background: #e5e7eb;
  border-radius: 8px;
`;

const InfoSection = styled.div`
  margin-top: 32px;
  background: #fdba74;
  padding: 16px;
  border-radius: 8px;
`;

const InfoTitle = styled.h3`
  margin-bottom: 16px;
`;

const InfoItem = styled.p`
  margin: 8px 0;
  color: #111827;
`;

const SliderSection = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SliderTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Slider = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
`;

const SliderCard = styled.div`
  min-width: 250px;
  background: #e5e7eb;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SliderCardText = styled.p`
  font-size: 14px;
  color: #111827;
`;

const Dropdown = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  margin-bottom: 16px;
`;

const Icon = styled.div`
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function HeadOfHousehold() {
  const [selectedApartment, setSelectedApartment] = useState("Apartment no 1");

  return (
    <Container>
      {/* Navbar */}
      <TopNav>
        <TopText>
          <span>Kênh chủ căn hộ</span>
          <span>Kênh người thuê căn hộ</span>
        </TopText>
        <Logo>ABMS</Logo>
        <NavLinks>
          <NavButton to="/forum" activeClassName="active">Diễn đàn</NavButton>
          <NavButton to="/rent" activeClassName="active">Cho thuê</NavButton>
          <NavButton to="/buy" activeClassName="active">Mua bán</NavButton>
          <NavButton to="/profile">
            <UserIcon />
            Head of Household
          </NavButton>
        </NavLinks>
      </TopNav>

      <Wrapper>
        {/* Sidebar */}
        <Sidebar>
          <Dropdown
            value={selectedApartment}
            onChange={(e) => setSelectedApartment(e.target.value)}
          >
            <option value="Apartment no 1">Apartment no 1</option>
            <option value="Apartment no 2">Apartment no 2</option>
            <option value="Apartment no 3">Apartment no 3</option>
          </Dropdown>
          <SidebarMenu>
            <SidebarItem to="/dashboard" activeClassName="active">
              <Icon><FaHome size={20} /></Icon>
              Dashboard
            </SidebarItem>
            <SidebarItem to="/invoices" activeClassName="active">
              <Icon><FaFileInvoice size={20} /></Icon>
              Hóa đơn & Thanh toán
            </SidebarItem>
            <SidebarItem to="/appointments" activeClassName="active">
              <Icon><FaBook size={20} /></Icon>
              Lịch Hẹn
            </SidebarItem>
            <SidebarItem to="/contracts" activeClassName="active">
              <Icon><FaFileInvoice size={20} /></Icon>
              Hợp Đồng
            </SidebarItem>
            <SidebarItem to="/manage-apartments" activeClassName="active">
              <Icon><FaHome size={20} /></Icon>
              Quản lý Căn hộ
            </SidebarItem>
            <SidebarItem to="/ads" activeClassName="active">
              <Icon><FaHome size={20} /></Icon>
              Quản lý Bài Đăng
            </SidebarItem>
          </SidebarMenu>
        </Sidebar>

        {/* Content */}
        <Content>
          {/* Chi tiết căn hộ */}
          <ApartmentDetail>
            <ApartmentInfo>
              <ApartmentTitle>{selectedApartment} (đã cho thuê)</ApartmentTitle>
              <ApartmentText>Fpt Plaza 1, đường với chỉ hàn...</ApartmentText>
              <ApartmentText><strong>Mức giá:</strong> 8,5 triệu / tháng</ApartmentText>
              <ApartmentText><strong>Diện tích:</strong> 68 m2</ApartmentText>
              <ApartmentText><strong>Phòng ngủ:</strong> 2 PN</ApartmentText>
            </ApartmentInfo>
            <ApartmentImage />
          </ApartmentDetail>

          {/* Thông tin căn hộ */}
          <InfoSection>
            <InfoTitle>Thông Tin Căn Hộ</InfoTitle>
            <InfoItem><strong>Họ tên:</strong> Nguyễn Văn A</InfoItem>
            <InfoItem><strong>Liên Hệ:</strong> 0901 234 567 / nguyenvana@email.com</InfoItem>
            <InfoItem><strong>CCCD/CMND:</strong> 123 123 123 123</InfoItem>
          </InfoSection>

          {/* Thông tin người thuê căn hộ (Slider) */}
          <SliderSection>
            <SliderTitle>Thông tin người thuê căn hộ</SliderTitle>
            <Slider>
              <SliderCard>
                <SliderCardText>Nguyễn Văn B - Liên hệ: 0901 234 567</SliderCardText>
              </SliderCard>
              <SliderCard>
                <SliderCardText>Trần Thị C - Liên hệ: 0901 234 568</SliderCardText>
              </SliderCard>
              <SliderCard>
                <SliderCardText>Phạm Văn D - Liên hệ: 0901 234 569</SliderCardText>
              </SliderCard>
            </Slider>
          </SliderSection>
        </Content>
      </Wrapper>
    </Container>
  );
}
