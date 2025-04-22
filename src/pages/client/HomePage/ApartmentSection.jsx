import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  CameraOutlined,
  LeftOutlined,
  RightOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined,
  HeartOutlined
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { getAllPosts } from "../../../redux/apiCalls"; // Adjust the path based on your project structure

const ApartmentSectionWrapper = styled.section`
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

const SectionTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 24px 16px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #c2410c;
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

const ViewMoreButton = styled.button`
  background: none;
  border: none;
  color: #1e3a8a;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #c2410c;
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
  cursor: pointer; /* Add cursor pointer to indicate clickable */

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
  z-index: 10; /* Ensure heart button is above the card for separate clicks */

  &:hover {
    color: #ef4444;
  }
`;

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
  background-color: ${(props) => (props.$active ? "#1e3a8a" : "#d1d5db")};
  transition: background-color 0.2s;
`;

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

function ApartmentSection({ handleViewMore }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const propertiesPerPage = 4;
  
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const response = await getAllPosts(dispatch);
        if (response && response.data) {
          setProperties(response.data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProperties();
  }, [dispatch]);

  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  
  const currentProperties = properties.slice(
    currentPage * propertiesPerPage,
    (currentPage + 1) * propertiesPerPage
  );

  const handlePrevApartment = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextApartment = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  // Function to navigate to the detail page
  const goToDetails = (postId, event) => {
    navigate(`/post-detail/${postId}`);
    console.log(`Đang chuyển đến trang chi tiết của căn hộ ID: ${postId}`);
  };

  // Handle heart button click separately (stop propagation)
  const handleHeartClick = (event) => {
    event.stopPropagation(); // Prevent triggering the card click
    // Here you could add favorite logic
  };

  // Format price function from PostList component
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ/tháng";
  };
  
  // If data is loading or not available yet, we could return a loading state
  if (loading) {
    return (
      <ApartmentSectionWrapper>
        <SectionTitleContainer>
          <SectionTitle>Căn hộ dành cho bạn</SectionTitle>
        </SectionTitleContainer>
        <div style={{ padding: "20px", textAlign: "center" }}>
          Đang tải dữ liệu...
        </div>
      </ApartmentSectionWrapper>
    );
  }

  // Mapping the fetched data to match the expected format for the component
  const mappedProperties = currentProperties.map(property => ({
    id: property.postId,
    image: property.postImages && property.postImages.length > 0 ? property.postImages[0] : '/placeholder-image.jpg',
    imageCount: property.postImages ? property.postImages.length : 0,
    price: formatPrice(property.price),
    area: `${property.apartment?.area || 200} m²`,
    title: property.title,
    location: property.apartment?.apartmentName || 'Unknown',
    createdAt: new Date(property.createdAt || new Date()).toLocaleDateString('vi-VN')
  }));

  return (
    <ApartmentSectionWrapper>
      <SectionTitleContainer>
        <SectionTitle>Căn hộ dành cho bạn</SectionTitle>
        <ViewMoreButton onClick={handleViewMore}>
          Xem thêm <ArrowRightOutlined />
        </ViewMoreButton>
      </SectionTitleContainer>

      <ApartmentGrid>
        {mappedProperties.map((property) => (
          <ApartmentCard 
            key={property.id} 
            onClick={(e) => goToDetails(property.id, e)}
          >
            <ApartmentImage>
              <img src={property.image} alt={property.title} />
              <ImageCount>
                <CameraOutlined style={{ marginRight: 4 }} />{" "}
                {property.imageCount}
              </ImageCount>
            </ApartmentImage>

            <ApartmentInfo>
              <ApartmentPrice>
                <PriceTag>{property.price}</PriceTag>
                <AreaTag>{property.area}</AreaTag>
              </ApartmentPrice>

              <ApartmentTitle>{property.title}</ApartmentTitle>

              <LocationInfo>
                <EnvironmentOutlined style={{ marginRight: 6 }} />{" "}
                {property.location}
              </LocationInfo>
            </ApartmentInfo>

            <CardFooter>
              <span>{property.createdAt}</span>
              <HeartButton onClick={(e) => handleHeartClick(e)}>
                <HeartOutlined />
              </HeartButton>
            </CardFooter>
          </ApartmentCard>
        ))}
      </ApartmentGrid>

      {/* Pagination Indicator */}
      <PaginationIndicator>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PageDot key={index} $active={currentPage === index} />
        ))}
      </PaginationIndicator>

      {/* Apartment Navigation Buttons */}
      <ApartmentNavigation>
        <ApartmentNavButton onClick={handlePrevApartment} type="button">
          <LeftOutlined />
        </ApartmentNavButton>

        <ApartmentNavButton onClick={handleNextApartment} type="button">
          <RightOutlined />
        </ApartmentNavButton>
      </ApartmentNavigation>
    </ApartmentSectionWrapper>
  );
}

export default ApartmentSection;