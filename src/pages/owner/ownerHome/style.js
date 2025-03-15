
import styled from "styled-components";

export const StyledLayout = styled.div`
  min-height: 100vh;
  display: flex;
`;

export const StyledSider = styled.div`
  position: absolute;
  left: 0;
  height: 100vh;
  background: #001529;
`;

export const StyledContentWrapper = styled.div`
  margin-left: ${(props) => (props.collapsed ? "80px" : "200px")};
  padding: 16px;
  flex-grow: 1;
`;

export const StyledCard = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;