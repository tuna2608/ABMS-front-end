import React, { useState, useRef } from "react";
import styled from "styled-components";
import { SearchOutlined, HeartOutlined, CameraOutlined, LeftOutlined, RightOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Carousel} from "antd";

/* Navigation Buttons for Apartment Section */
const ApartmentNavigation = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: calc(100% + 120px);
  left: -60px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  pointer-events: none;
`;

const ApartmentNavButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  background-color: rgba(30, 58, 138, 0.92);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.08);
  position: relative;
  
  &:hover {
    background-color: rgba(30, 58, 138, 1);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 6px 10px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(1px) scale(0.98);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 6px;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
    opacity: 0;
    transition: opacity 0.25s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

// const LocationIcon = styled.span`
//   margin-right: 6px;
//   font-size: 16px;
//   color: #6b7280;
// `;

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

/* ----------- Styled-components (container and wrapper) ----------- */
const Container = styled.div`
  background: linear-gradient(180deg, #1e3a8a 30%, #f3f4f6 70%);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: radial-gradient(ellipse at bottom right, #ffffff 0%, transparent 70%);
    z-index: 0;
    pointer-events: none;
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
`;

/* Hero Section with Banner */
const HeroSection = styled.div`
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

// const HeroBanner = styled.div`
//   width: 100%;
//   height: 100%;
//   background-size: cover;
//   background-position: center;
//   position: relative;
// `;

const HeroContentContainer = styled.div`
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

const HeroImageContainer = styled.div`
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

const HeroContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  background-color: transparent;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 30px;
  color: #1e3a8a;
  margin-bottom: 16px;
  font-weight: 700;
  text-align: left;
`;

const HeroDescription = styled.p`
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

/* Carousel Wrapper for Custom Navigation */
const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  
  .ant-carousel {
    position: static !important;
  }
  
  .slick-slider, .slick-list, .slick-track {
    position: static !important;
  }
`;

/* Carousel Navigation Controls */
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

/* Search Section */
const SearchSection = styled.div`
  background-color: #1e3a8a;
  padding: 30px 0;
  position: relative;
  border-radius: 0 0 30px 30px;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 999px;
  padding: 10px 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchIcon = styled.span`
  color: #6b7280;
  margin-right: 10px;
  font-size: 22px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 8px 0;
  font-size: 16px;
`;

const SearchButton = styled.button`
  background-color: #c2410c;
  color: white;
  border: none;
  border-radius: 999px;
  padding: 8px 20px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #b45309;
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

const FilterSelect = styled.div`
  position: relative;
  flex: 1;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  background-color: white;
  appearance: none;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SelectArrow = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #6b7280;
`;

/* Apartment Section */
const ApartmentSection = styled.section`
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  background-color: white;
  overflow: visible;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #1e3a8a 0%, rgba(30, 58, 138, 0) 100%);
    opacity: 0.02;
    z-index: -1;
    border-radius: 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #c2410c;
  margin: 20px 0 24px 16px;
  font-weight: 600;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: #c2410c;
    border-radius: 2px;
  }
`;

const ApartmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 0 16px 24px;
  position: relative;
`;

const ApartmentCard = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ApartmentImage = styled.div`
  height: 180px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ImageCount = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 2;
`;

const ApartmentInfo = styled.div`
  padding: 16px;
`;

const ApartmentPrice = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
`;

const PriceTag = styled.span`
  font-weight: 700;
  color: #c2410c;
  font-size: 16px;
`;

const AreaTag = styled.span`
  font-weight: 500;
  color: #4b5563;
  font-size: 16px;
`;

const ApartmentTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 42px;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  color: #6b7280;
  font-size: 14px;
  margin-top: 10px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 16px;
  color: #6b7280;
  font-size: 14px;
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    color: #ef4444;
  }
`;

/* Pagination Indicator */
const PaginationIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  gap: 8px;
  padding-bottom: 16px;
`;

const PageDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#1e3a8a' : '#d1d5db'};
  transition: background-color 0.2s;
`;

/* --------------------- Main Component --------------------- */
function HomePage() {
  // Search state
  const [searchText, setSearchText] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState("");
  
  // Carousel functionality
  const carouselRef = useRef(null);
  
  // Custom navigation handlers with forced re-rendering
  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };
  
  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  // Handle apartment navigation
  const [currentPage, setCurrentPage] = useState(0);
  const propertiesPerPage = 4;
  
  const handlePrevApartment = () => {
    setCurrentPage(prev => 
      prev === 0 ? Math.ceil(properties.length / propertiesPerPage) - 1 : prev - 1
    );
  };
  
  const handleNextApartment = () => {
    setCurrentPage(prev => 
      prev === Math.ceil(properties.length / propertiesPerPage) - 1 ? 0 : prev + 1
    );
  };

  const navigate = useNavigate();

  // Sample property data with real estate listings
  const properties = [
    {
      id: 1,
      title: "Căn góc Vĩnh Thiên Đường đối diện mặt biển vịnh biển bồng lai",
      price: "17.7 tỷ",
      area: "75 m²",
      location: "Vân Giang, Hưng Yên",
      imageCount: 5,
      createdAt: "Đăng hôm nay",
      image: "https://via.placeholder.com/300x180/e6e6e6/808080?text=Real+Estate"
    },
    {
      id: 2,
      title: "Bán tòa CHDV Thái Hà, 18p kk, DT 90m²/1h, ba gác, 20m ra ô tô",
      price: "15.5 tỷ",
      area: "78 m²",
      location: "Đống Đa, Hà Nội",
      imageCount: 7,
      createdAt: "Đăng hôm nay",
      image: "https://via.placeholder.com/300x180/e6e6e6/808080?text=Property"
    },
    {
      id: 3,
      title: "Bán cặp đất đường Trường Sa, Ngũ Hành Sơn, đường 15m, mặt tiền",
      price: "13 tỷ",
      area: "200 m²",
      location: "Ngũ Hành Sơn, Đà Nẵng",
      imageCount: 3,
      createdAt: "Đăng hôm nay",
      image: "https://via.placeholder.com/300x180/e6e6e6/808080?text=Land"
    },
    {
      id: 4,
      title: "Tin thật 100%! Góc 2 mặt tiền khu Nguyễn Văn Trỗi, PN. DT 75x13m",
      price: "17.5 tỷ",
      area: "97.5 m²",
      location: "Phú Nhuận, Hồ Chí Minh",
      imageCount: 8,
      createdAt: "Đăng hôm nay",
      image: "https://via.placeholder.com/300x180/e6e6e6/808080?text=Apartment"
    },
    {
      id: 5,
      title: "Biệt thự vườn cao cấp view sông tại Phú Hữu, Nhơn Trạch",
      price: "9.8 tỷ",
      area: "320 m²",
      location: "Nhơn Trạch, Đồng Nai",
      imageCount: 6,
      createdAt: "Đăng hôm nay",
      image: "https://via.placeholder.com/300x180/e6e6e6/808080?text=Villa"
    },
    {
      id: 6,
      title: "Căn hộ chung cư 2 phòng ngủ tại dự án Sky Garden",
      price: "3.5 tỷ",
      area: "68 m²",
      location: "Quận 7, Hồ Chí Minh",
      imageCount: 4,
      createdAt: "Đăng hôm nay",
      image: "https://via.placeholder.com/300x180/e6e6e6/808080?text=Apartment"
    }
  ];

  // Get current properties for pagination
  const indexOfLastProperty = (currentPage + 1) * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
  
  // Calculate total pages for pagination indicator
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      search: searchText,
      area,
      price,
      type,
      rooms,
    }).toString();
    navigate(`/post?${queryParams}`);
  };
  
  return (
    <Container>
      <Wrapper>
        {/* Hero Banner Section with Carousel */}
        <HeroSection>
          <CarouselWrapper>
            <Carousel
              ref={carouselRef}
              dots={false}
              autoplay
              autoplaySpeed={5000}
              style={{ width: '100%', height: '400px' }}
              easing="linear"
              effect="fade"
            >
              <div>
                <div style={{ display: "flex", flexDirection: "row", height: "400px", width: "100%", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
                  <HeroContentContainer>
                    <HeroContent>
                      <HeroTitle>Chào mừng bạn đến với trang web</HeroTitle>
                      <HeroDescription>
                        Website quản lý chung cư A là nền tảng trực tuyến giúp bạn quản lý 
                        và cư dân chung cư dễ dàng kết nối, trao đổi thông tin và thực hiện 
                        các thủ tục quan trọng. Hệ thống hỗ trợ đăng ký cư trú, thanh toán 
                        phí dịch vụ.
                      </HeroDescription>
                      <RegisterButton>
                        Đăng ký →
                      </RegisterButton>
                    </HeroContent>
                  </HeroContentContainer>
                  <HeroImageContainer>
                    <img 
                      src="https://images.cenhomes.vn/2020/03/1585033148-can-ho-mau-an-land-complex.jpg"
                      alt="Apartment management system"
                    />
                  </HeroImageContainer>
                </div>
              </div>
              
              <div>
                <div style={{ display: "flex", flexDirection: "row", height: "400px", width: "100%", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
                  <HeroContentContainer>
                    <HeroContent>
                      <HeroTitle>Hệ thống quản lý thông minh</HeroTitle>
                      <HeroDescription>
                        Với giao diện thân thiện, tích hợp các tính năng hiện đại, website giúp 
                        tối ưu hóa quy trình quản lý, nâng cao trải nghiệm sống cho cư dân và 
                        đảm bảo sự minh bạch trong vận hành chung cư.
                      </HeroDescription>
                      <RegisterButton>
                        Đăng ký →
                      </RegisterButton>
                    </HeroContent>
                  </HeroContentContainer>
                  <HeroImageContainer>
                    <img 
                      src="https://images.cenhomes.vn/2020/03/1585033149-can-ho-mau-cosmo-tay-ho.jpg"
                      alt="Smart management system"
                    />
                  </HeroImageContainer>
                </div>
              </div>
              
              <div>
                <div style={{ display: "flex", flexDirection: "row", height: "400px", width: "100%", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
                  <HeroContentContainer>
                    <HeroContent>
                      <HeroTitle>Trải nghiệm sống hiện đại</HeroTitle>
                      <HeroDescription>
                        Hệ thống quản lý căn hộ thông minh, giúp bạn theo dõi, quản lý và vận hành 
                        căn hộ một cách dễ dàng và hiệu quả. Trải nghiệm sự tiện lợi ngay hôm nay!
                      </HeroDescription>
                      <RegisterButton>
                        Đăng ký →
                      </RegisterButton>
                    </HeroContent>
                  </HeroContentContainer>
                  <HeroImageContainer>
                    <img 
                      src="https://images.cenhomes.vn/2020/03/1585033155-can-ho-mau-imperia-sky-garden.jpg"
                      alt="Modern apartment interior"
                    />
                  </HeroImageContainer>
                </div>
              </div>
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
        </HeroSection>

        {/* Search Section */}
        <SearchSection>
          <SearchContainer>
            <SearchBox>
              <SearchIcon>
                <SearchOutlined />
              </SearchIcon>
              <SearchInput
                placeholder="Tìm kiếm"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <SearchButton onClick={handleSearch}>
                Tìm kiếm
              </SearchButton>
            </SearchBox>
            
            <FilterSection>
              <FilterSelect>
                <Select value={area} onChange={(e) => setArea(e.target.value)}>
                  <option value="">Diện tích</option>
                  <option value="30">Dưới 30m²</option>
                  <option value="50">Dưới 50m²</option>
                  <option value="80">Dưới 80m²</option>
                </Select>
                <SelectArrow>▼</SelectArrow>
              </FilterSelect>
              
              <FilterSelect>
                <Select value={rooms} onChange={(e) => setRooms(e.target.value)}>
                  <option value="">Số phòng</option>
                  <option value="1">1 phòng</option>
                  <option value="2">2 phòng</option>
                  <option value="3">3 phòng</option>
                </Select>
                <SelectArrow>▼</SelectArrow>
              </FilterSelect>
              
              <FilterSelect>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">Hình thức</option>
                  <option value="chothue">Cho thuê</option>
                  <option value="ban">Mua bán</option>
                </Select>
                <SelectArrow>▼</SelectArrow>
              </FilterSelect>
              
              <FilterSelect>
                <Select value={price} onChange={(e) => setPrice(e.target.value)}>
                  <option value="">Giá tiền</option>
                  <option value="3">Dưới 3 triệu</option>
                  <option value="5">Dưới 5 triệu</option>
                  <option value="10">Dưới 10 triệu</option>
                </Select>
                <SelectArrow>▼</SelectArrow>
              </FilterSelect>
            </FilterSection>
          </SearchContainer>
        </SearchSection>

        {/* Apartment Listings Section */}
        <ApartmentSection>
          <SectionTitle>Căn hộ dành cho bạn</SectionTitle>
          
          <ApartmentGrid>
            {currentProperties.map((property) => (
              <ApartmentCard key={property.id}>
                <ApartmentImage>
                  <img 
                    src={property.image}
                    alt={property.title}
                  />
                  <ImageCount>
                    <CameraOutlined style={{ marginRight: 4 }} /> {property.imageCount}
                  </ImageCount>
                </ApartmentImage>
                
                <ApartmentInfo>
                  <ApartmentPrice>
                    <PriceTag>{property.price}</PriceTag>
                    <AreaTag>{property.area}</AreaTag>
                  </ApartmentPrice>
                  
                  <ApartmentTitle>{property.title}</ApartmentTitle>
                  
                  <LocationInfo>
                    <EnvironmentOutlined style={{ marginRight: 6 }} /> {property.location}
                  </LocationInfo>
                </ApartmentInfo>
                
                <CardFooter>
                  <span>{property.createdAt}</span>
                  <HeartButton>
                    <HeartOutlined />
                  </HeartButton>
                </CardFooter>
              </ApartmentCard>
            ))}
          </ApartmentGrid>
          
          {/* Pagination Indicator */}
          <PaginationIndicator>
            {Array.from({ length: totalPages }).map((_, index) => (
              <PageDot key={index} active={currentPage === index} />
            ))}
          </PaginationIndicator>
          
          {/* Apartment Navigation Buttons */}
          <ApartmentNavigation>
            <ApartmentNavButton 
              onClick={handlePrevApartment}
              type="button"
            >
              <LeftOutlined />
            </ApartmentNavButton>
            
            <ApartmentNavButton 
              onClick={handleNextApartment}
              type="button"
            >
              <RightOutlined />
            </ApartmentNavButton>
          </ApartmentNavigation>
        </ApartmentSection>
      </Wrapper>
    </Container>
  );
}

export default HomePage;