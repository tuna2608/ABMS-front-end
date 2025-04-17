import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Import individual components
import HeroSection from "./HeroSection";
import SearchSection from "./SearchSection";
import ApartmentSection from ".//ApartmentSection";
import ServiceSection from "./ServiceSection"; // Import the new ServiceSection component

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

// Thêm phần styled component cho divider
const SectionDivider = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 2rem auto;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(30, 58, 138, 0.5), transparent);
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background-color: #f3f4f6;
    border-radius: 50%;
    border: 1px solid rgba(30, 58, 138, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 15px rgba(30, 58, 138, 0.1);
  }
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


  // Đã xóa dữ liệu properties mẫu vì sẽ lấy data từ API

  const navigate = useNavigate();


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
          handleViewMore={handleViewMore}
        />
        
        {/* Section Divider */}
        <SectionDivider />
        
        {/* Service Section */}
        <ServiceSection />
      </Wrapper>
    </Container>
  );
}

export default HomePage;