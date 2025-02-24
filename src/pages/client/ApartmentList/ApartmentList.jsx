import { useState } from "react";
import styled from "styled-components";
import { FaSearch, FaBed, FaBath, FaCar } from "react-icons/fa";
import { BsHouseDoor } from "react-icons/bs";
/* Import Link từ react-router-dom */
import { Link } from "react-router-dom";

const Container = styled.div`
  background: #f3f4f6;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
`;

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

const MainNavBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const NavItem = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 4px;
  color: #1f2937;
  background: transparent;

  &:hover {
    background: #16a34a;
    color: #fff;
  }
`;

const SearchContainer = styled.div`
  background: #fde68a;
  margin-top: 16px;
  border-radius: 8px;
  padding: 16px;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: none;
  outline: none;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  background: #dc2626;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 500;
`;

const FiltersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSection = styled.div``;

const RightSection = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ListingColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/* Link bọc quanh ListingCard, để click vào sẽ sang /apartment-detail */
const ListingCardLink = styled(Link)`
  text-decoration: none; 
  color: inherit;
`;

const ListingCard = styled.div`
  display: flex;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  gap: 16px;
`;

const ListingImage = styled.div`
  width: 120px;
  height: 120px;
  background: #e5e7eb;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListingInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ListingTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #111827;
`;

const ListingText = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #6b7280;
`;

const PriceText = styled.span`
  color: #f97316;
  font-weight: 500;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
  font-size: 14px;
  color: #374151;

  svg {
    margin-right: 4px;
  }
`;

export default function ApartmentList() {
  const [search, setSearch] = useState("");

  // Vài ví dụ data
  const dummyApartments = [1, 2, 3];

  return (
    <Container>
      <Wrapper>
        <TopBar>
          <span>Kênh chủ căn hộ</span>
          <span>Kênh người thuê căn hộ</span>
        </TopBar>

        <MainNavBar>
          <Logo>ABMS</Logo>
          <NavLinks>
            <NavItem to="/forum">Diễn đàn</NavItem>
            <NavItem to="/rent">Cho thuê</NavItem>
            <NavItem to="/buy">Mua bán</NavItem>
            <Spacer />
            <NavItem to="/signIn">Đăng nhập</NavItem>
            <NavItem to="/signUp">Đăng ký</NavItem>
          </NavLinks>
        </MainNavBar>

        <SearchContainer>
          <SearchRow>
            <FaSearch />
            <SearchInput
              placeholder="Tìm kiếm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchButton>Tìm kiếm</SearchButton>
          </SearchRow>
          <FiltersRow>
            <Select><option>Diện tích</option></Select>
            <Select><option>Giá tiền</option></Select>
            <Select><option>Hình thức</option></Select>
            <Select><option>Số phòng</option></Select>
            <Select><option>Lọc</option></Select>
          </FiltersRow>
        </SearchContainer>

        <MainContent>
          <LeftSection>
            <ListingColumn>
              {dummyApartments.map((item) => (
                /* Bọc ListingCardLink, link tới /apartment-detail */
                <ListingCardLink key={item} to="/apartmentDetail">
                  <ListingCard>
                    <ListingImage>
                      <BsHouseDoor size={40} style={{ color: "#9ca3af" }} />
                    </ListingImage>
                    <ListingInfo>
                      <div>
                        <ListingTitle>Căn hộ view đẹp</ListingTitle>
                        <ListingText>
                          <PriceText>8,5 tr / tháng</PriceText>
                        </ListingText>
                        <ListingText>86m2</ListingText>
                        <MetaRow>
                          <div><FaBed /> 2</div>
                          <div><FaBath /> 2</div>
                          <div><FaCar /> 1</div>
                        </MetaRow>
                        <ListingText>Hòa Hải Ngũ Hành Sơn</ListingText>
                      </div>
                      <ListingText style={{ fontSize: "12px", color: "#9ca3af" }}>
                        2 giờ trước
                      </ListingText>
                    </ListingInfo>
                  </ListingCard>
                </ListingCardLink>
              ))}
            </ListingColumn>
          </LeftSection>

          <RightSection>
            <h3>Lọc theo giá tiền</h3>
            <p>Dưới 3 triệu</p>
            <p>3 - 4 triệu</p>
            <p>4 - 5 triệu</p>
            <p>5 - 6 triệu</p>
          </RightSection>
        </MainContent>
      </Wrapper>
    </Container>
  );
}
