import React from 'react';
import styled from 'styled-components';
import {
  SearchOutlined
} from "@ant-design/icons";

const SearchSectionWrapper = styled.div`
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

function SearchSection({ 
  searchText, 
  setSearchText, 
  area, 
  setArea, 
  price, 
  setPrice, 
  type, 
  setType, 
  rooms, 
  setRooms, 
  handleSearch 
}) {
  return (
    <SearchSectionWrapper>
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
          <SearchButton onClick={handleSearch}>Tìm kiếm</SearchButton>
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
            <Select
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
            >
              <option value="">Số phòng ngủ</option>
              <option value="1">1 phòng</option>
              <option value="2">2 phòng</option>
              <option value="3">3 phòng</option>
            </Select>
            <SelectArrow>▼</SelectArrow>
          </FilterSelect>

          <FilterSelect>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Hình thức</option>
              <option value="Cho thuê">Cho thuê</option>
              <option value="Bán">Mua bán</option>
            </Select>
            <SelectArrow>▼</SelectArrow>
          </FilterSelect>

          <FilterSelect>
            <Select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Giá tiền</option>
              <option value="2">Dưới 2 triệu</option>
              <option value="3">Dưới 3 triệu</option>
              <option value="5">Dưới 5 triệu</option>
              <option value="10">Dưới 10 triệu</option>
            </Select>
            <SelectArrow>▼</SelectArrow>
          </FilterSelect>
        </FilterSection>
      </SearchContainer>
    </SearchSectionWrapper>
  );
}

export default SearchSection;