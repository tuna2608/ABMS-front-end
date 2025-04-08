import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


// Import individual components
import HeroSection from "./HeroSection";
import SearchSection from "./SearchSection";
import ApartmentSection from ".//ApartmentSection";

// Styled Components
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
    background: radial-gradient(
      ellipse at bottom right,
      #ffffff 0%,
      transparent 70%
    );
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
      image: "https://placehold.co/300x180/e6e6e6/808080?text=Real+Estate",
    },
    {
      id: 2,
      title: "Bán tòa CHDV Thái Hà, 18p kk, DT 90m²/1h, ba gác, 20m ra ô tô",
      price: "15.5 tỷ",
      area: "78 m²",
      location: "Đống Đa, Hà Nội",
      imageCount: 7,
      createdAt: "Đăng hôm nay",
      image: "https://placehold.co/300x180/e6e6e6/808080?text=Property",
    },
    {
      id: 3,
      title: "Bán cặp đất đường Trường Sa, Ngũ Hành Sơn, đường 15m, mặt tiền",
      price: "13 tỷ",
      area: "200 m²",
      location: "Ngũ Hành Sơn, Đà Nẵng",
      imageCount: 3,
      createdAt: "Đăng hôm nay",
      image: "https://placehold.co/300x180/e6e6e6/808080?text=Land",
    },
    {
      id: 4,
      title: "Tin thật 100%! Góc 2 mặt tiền khu Nguyễn Văn Trỗi, PN. DT 75x13m",
      price: "17.5 tỷ",
      area: "97.5 m²",
      location: "Phú Nhuận, Hồ Chí Minh",
      imageCount: 8,
      createdAt: "Đăng hôm nay",
      image: "https://placehold.co/300x180/e6e6e6/808080?text=Apartment",
    },
    {
      id: 5,
      title: "Biệt thự vườn cao cấp view sông tại Phú Hữu, Nhơn Trạch",
      price: "9.8 tỷ",
      area: "320 m²",
      location: "Nhơn Trạch, Đồng Nai",
      imageCount: 6,
      createdAt: "Đăng hôm nay",
      image: "https://placehold.co/300x180/e6e6e6/808080?text=Villa",
    },
    {
      id: 6,
      title: "Căn hộ chung cư 2 phòng ngủ tại dự án Sky Garden",
      price: "3.5 tỷ",
      area: "68 m²",
      location: "Quận 7, Hồ Chí Minh",
      imageCount: 4,
      createdAt: "Đăng hôm nay",
      image: "https://placehold.co/300x180/e6e6e6/808080?text=Apartment",
    },
  ];

  const navigate = useNavigate();

  // Get current properties for pagination
  const indexOfLastProperty = (currentPage + 1) * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  // Calculate total pages for pagination indicator
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const handlePrevApartment = () => {
    setCurrentPage((prev) =>
      prev === 0
        ? Math.ceil(properties.length / propertiesPerPage) - 1
        : prev - 1
    );
  };

  const handleNextApartment = () => {
    setCurrentPage((prev) =>
      prev === Math.ceil(properties.length / propertiesPerPage) - 1
        ? 0
        : prev + 1
    );
  };

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

  const handleViewMore = () => {
    navigate('/post');
  };

  return (
    <Container>
      <Wrapper>
        {/* Hero Banner Section with Carousel */}
        <HeroSection 
          carouselRef={carouselRef} 
          handlePrev={handlePrev} 
          handleNext={handleNext} 
        />

        {/* Search Section */}
        <SearchSection 
          searchText={searchText}
          setSearchText={setSearchText}
          area={area}
          setArea={setArea}
          price={price}
          setPrice={setPrice}
          type={type}
          setType={setType}
          rooms={rooms}
          setRooms={setRooms}
          handleSearch={handleSearch}
        />

        {/* Apartment Listings Section */}
        <ApartmentSection 
          currentProperties={currentProperties}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePrevApartment={handlePrevApartment}
          handleNextApartment={handleNextApartment}
          handleViewMore={handleViewMore}
        />
      </Wrapper>
    </Container>
  );
}

export default HomePage;