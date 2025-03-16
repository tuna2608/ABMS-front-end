import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/* ----------- Styled-components (navbar, layout) như cũ ----------- */
const Container = styled.div`
  background-color: #f3f4f6;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  // max-width: 1200px;
  margin: 0 auto;
  // padding: 0 16px;
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

  /* Nếu đang active => màu xanh lá */
  ${(props) =>
    props.$active &&
    css`
      background-color: #15803d;
      color: #fff;
      &:hover {
        background-color: #15803d;
      }
    `}
`;

/* Hero (màu cam) + SearchBox (màu vàng) */
const HeroSection = styled.div`
  background-color: #f97316;
  padding: 40px 0;
`;

const SearchBox = styled.div`
  background: #fde68a;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  outline: none;
  border-radius: 4px;
`;

/* Nút Tìm kiếm có thể disable */
const SearchButton = styled.button`
  background: ${(props) => (props.disabled ? "#ccc" : "#dc2626")};
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
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
  border-radius: 4px;
  border: 1px solid #d1d5db;
`;

/* Content bên dưới */
const ContentSection = styled.div`
  background: #fff;
  margin-top: 16px;
  padding: 24px 0;
`;

const TabsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 16px;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #4b5563;

  .active {
    color: #dc2626;
    position: relative;
  }
  .active::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 2px;
    background: #dc2626;
  }

  .see-more {
    margin-left: auto; 
    color: #dc2626;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
  }
`;

const HighlightRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr; 
  gap: 16px;
  padding: 0 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImagePlaceholder = styled.div`
  background: #e5e7eb;
  width: 100%;
  height: 250px;
  border-radius: 8px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9ca3af;
  font-size: 20px;
`;

const ImageTitle = styled.p`
  margin-top: 8px;
  color: #15803d; 
  font-weight: 500;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ListItem = styled.div`
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #d1d5db;
  padding-bottom: 8px;

  &:last-child {
    border-bottom: none;
  }
`;

/* --------------------- Component chính --------------------- */
export default function HomePage() {
  const userLocal = localStorage.getItem("user");
  let user;

  if (typeof userLocal === "string" && userLocal !== null) {
    try {
      user = JSON.parse(userLocal);
    } catch (error) {
      console.error("Lỗi khi parse dữ liệu:", error);
      user = null;
    }
  }
  // console.log(user);
  const [activeMenu, setActiveMenu] = useState("");

  // Các trường search
  const [searchText, setSearchText] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState("");

  const navigate = useNavigate();

  // Giả sử mảng hợp lệ
  const validSearchKeywords = ["FPT", "Plaza", "Căn hộ"];
  const validAreas = ["30","50","80"];
  const validPrices = ["3","5","10"];
  const validTypes = ["chothue","ban"];
  const validRooms = ["1","2","3"];

  // Kiểm tra user có nhập/chọn gì chưa => ít nhất 1 trường
  const isAnythingFilled = (
    searchText.trim() !== "" ||
    area !== "" ||
    price !== "" ||
    type !== "" ||
    rooms !== ""
  );

  // Kiểm tra searchText
  const isSearchValid = 
    !searchText ||  // nếu chưa nhập => true
    validSearchKeywords.some((k) => 
      searchText.toLowerCase().includes(k.toLowerCase())
    );

  const isAreaValid = !area || validAreas.includes(area);
  const isPriceValid = !price || validPrices.includes(price);
  const isTypeValid = !type || validTypes.includes(type);
  const isRoomsValid = !rooms || validRooms.includes(rooms);

  // Tất cả các trường (đã nhập) phải hợp lệ
  const isFormValid = (
    isAnythingFilled && 
    isSearchValid &&
    isAreaValid &&
    isPriceValid &&
    isTypeValid &&
    isRoomsValid
  );

  const handleSearch = () => {
    // Nếu chưa nhập gì hoặc sai => báo
    if (!isFormValid) {
      alert("Không có - Hãy nhập/thay đổi thông tin để tìm kiếm.");
      return;
    }
    // Xây query
    const queryParams = new URLSearchParams({
      search: searchText,
      area,
      price,
      type,
      rooms
    }).toString();
    navigate(`/post?${queryParams}`);
  };

  return (
    <Container>
      <Wrapper>
        {/* Top bar */}
        <HeroSection>
          <SearchBox>
            <SearchRow>
              <FaSearch />
              <SearchInput 
                placeholder="Tìm kiếm"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <SearchButton 
                onClick={handleSearch}
                disabled={!isFormValid}
              >
                Tìm kiếm
              </SearchButton>
            </SearchRow>
            <FiltersRow>
              {/* Diện tích */}
              <Select
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="">Diện tích</option>
                <option value="30">Dưới 30m2</option>
                <option value="50">Dưới 50m2</option>
                <option value="80">Dưới 80m2</option>
              </Select>

              {/* Giá tiền */}
              <Select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="">Giá tiền</option>
                <option value="3">Dưới 3 triệu</option>
                <option value="5">Dưới 5 triệu</option>
                <option value="10">Dưới 10 triệu</option>
              </Select>

              {/* Hình thức */}
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Hình thức</option>
                <option value="chothue">Cho thuê</option>
                <option value="ban">Mua bán</option>
              </Select>

              {/* Số phòng */}
              <Select
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
              >
                <option value="">Số phòng</option>
                <option value="1">1 phòng</option>
                <option value="2">2 phòng</option>
                <option value="3">3 phòng</option>
              </Select>

              {/* Lọc (tuỳ ý) */}
              <Select>
                <option>Lọc</option>
                <option>Phổ biến</option>
                <option>Mới nhất</option>
                <option>Giá tăng dần</option>
                <option>Giá giảm dần</option>
              </Select>
            </FiltersRow>
          </SearchBox>
        </HeroSection>

        {/* Content */}
        <ContentSection>
          <TabsRow>
            <div className="active">Tin nổi bật</div>
            <div>Giới thiệu</div>
            <div>Tin tức</div>
            <div className="see-more">xem thêm →</div>
          </TabsRow>

          <HighlightRow>
            <div>
              <ImagePlaceholder>Hình ảnh</ImagePlaceholder>
              <ImageTitle>
                Căn Hộ Bán Chung Cư FPT Plaza 1, Plaza 2 và Plaza 3
                Tháng 2/2025 - Giá Tốt - Hỗ Trợ Vay
              </ImageTitle>
            </div>
            <ListWrapper>
              <ListItem>
                Căn Hộ Bán Chung Cư FPT Plaza 1, Plaza 2 và Plaza 3
                Tháng 2/2025 - Giá Tốt - Hỗ Trợ Vay
              </ListItem>
              <ListItem>
                Căn Hộ Bán Chung Cư FPT Plaza 1, Plaza 2 và Plaza 3
                Tháng 2/2025 - Giá Tốt - Hỗ Trợ Vay
              </ListItem>
              <ListItem>
                Căn Hộ Bán Chung Cư FPT Plaza 1, Plaza 2 và Plaza 3
                Tháng 2/2025 - Giá Tốt - Hỗ Trợ Vay
              </ListItem>
              <ListItem>
                Căn Hộ Bán Chung Cư FPT Plaza 1, Plaza 2 và Plaza 3
                Tháng 2/2025 - Giá Tốt - Hỗ Trợ Vay
              </ListItem>
              <ListItem>
                Căn Hộ Bán Chung Cư FPT Plaza 1, Plaza 2 và Plaza 3
                Tháng 2/2025 - Giá Tốt - Hỗ Trợ Vay
              </ListItem>
            </ListWrapper>
          </HighlightRow>
        </ContentSection>
      </Wrapper>
    </Container>
  );
}
