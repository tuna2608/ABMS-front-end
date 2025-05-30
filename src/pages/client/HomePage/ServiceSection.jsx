import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  LeftOutlined,
  RightOutlined,
  ArrowRightOutlined,
  StarOutlined,
  ClockCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getVerifiedFacilities } from "../../../redux/apiCalls";
import { message } from "antd";

const ServiceSectionWrapper = styled.section`
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
    background: linear-gradient(135deg, #1e40af 0%, rgba(30, 64, 175, 0) 100%);
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

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 0 16px 24px;
  position: relative;
`;

const ServiceCard = styled.div`
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

const ServiceImage = styled.div`
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

const ServiceTag = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  background-color: #c2410c;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  z-index: 2;
`;

const ServiceInfo = styled.div`
  padding: 16px;
`;

const ServicePrice = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
`;

const PriceTag = styled.span`
  font-weight: 700;
  color: #c2410c;
  font-size: 16px;
`;

const RatingTag = styled.span`
  font-weight: 500;
  color: #f59e0b;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ServiceTitle = styled.h3`
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

const ProviderInfo = styled.div`
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

const BookButton = styled.button`
  background: none;
  border: none;
  color: #c2410c;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: #c2410c;
    text-decoration: underline;
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

const ServiceNavigation = styled.div`
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

const ServiceNavButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  background-color: #1e3a8a;
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
    background-color: #1e3a8a;
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

function ServiceSection() {
  const navigate = useNavigate();
  const [servicePosts, setServicePosts] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const servicesPerPage = 4;
  const [totalPages, setTotalPages] = useState(0);
  const indexOfLastService = (currentPage + 1) * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const [currentServices, setCurrentServices] = useState(null);

  // Calculate total pages for pagination indicator
  useEffect(() => {
    callGetAllServicePost();
  }, []);

  async function callGetAllServicePost() {
    try {
      const res = await getVerifiedFacilities();
      if (res.success) {
        // setServicePosts(res.data);
        if (res.data !== null) {
          setTotalPages(Math.ceil(res.data.length / servicesPerPage));
          // Get current services for pagination
          setCurrentServices(
            res.data.slice(indexOfFirstService, indexOfLastService)
          );
        }
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Không thể lấy danh sách dịch vụ đã duyệt");
    }
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  // Pagination state
  const handlePrevService = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNextService = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const handleViewMore = () => {
    navigate("/service");
  };

  return (
    <ServiceSectionWrapper>
      <SectionTitleContainer>
        <SectionTitle>Dịch vụ dành cho bạn</SectionTitle>
        <ViewMoreButton onClick={handleViewMore}>
          Xem thêm <ArrowRightOutlined />
        </ViewMoreButton>
      </SectionTitleContainer>

      <ServiceGrid>
        {currentServices && currentServices.map((service) => (
          <ServiceCard key={service.facilityId}>
            <ServiceImage>
              <img src={service.images[0]} alt={service.facilityHeader} />
              {/* <ServiceTag>{service.category}</ServiceTag> */}
            </ServiceImage>
            <ServiceInfo>
              <ServicePrice>
                <PriceTag>{service.facilityHeader}</PriceTag>
                <RatingTag>
                  <StarOutlined />{service.rating}
                </RatingTag>
              </ServicePrice>
              <ServiceTitle>{service.facilityPostContent}</ServiceTitle>
              <ProviderInfo>
                <TeamOutlined style={{ marginRight: 6 }} /> {service.userName}
              </ProviderInfo>
            </ServiceInfo>
            <CardFooter>
              <span>
                <ClockCircleOutlined style={{ marginRight: 4 }} />
                {formatDate(service.createdAt)}
              </span>
              <BookButton>Đặt lịch</BookButton>
            </CardFooter>
          </ServiceCard>
        ))}
      </ServiceGrid>

      {/* Pagination Indicator */}
      <PaginationIndicator>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PageDot key={index} $active={currentPage === index} />
        ))}
      </PaginationIndicator>

      {/* Service Navigation Buttons */}
      <ServiceNavigation>
        <ServiceNavButton onClick={handlePrevService} type="button">
          <LeftOutlined />
        </ServiceNavButton>

        <ServiceNavButton onClick={handleNextService} type="button">
          <RightOutlined />
        </ServiceNavButton>
      </ServiceNavigation>
    </ServiceSectionWrapper>
  );
}

export default ServiceSection;
