import React from 'react';
import HeaderComponent from '../../client/HeaderComponent/HeaderComponent';
import FooterComponent from '../../client/FooterComponent/FooterComponent';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.main`
  flex: 1;
  padding: 20px;
`;

const DefaultComponent = ({ children }) => {
  return (
    <LayoutWrapper>
      <HeaderComponent />
      <ContentWrapper>{children}</ContentWrapper>
      <FooterComponent />
    </LayoutWrapper>
  );
};

export default DefaultComponent;
