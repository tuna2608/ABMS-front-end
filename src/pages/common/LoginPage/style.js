import styled from "styled-components";
import { md, sm } from "../../../utilities/responsive";

export const WrapperContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;

  ${sm`
    padding: 16px 12px;
  `}
`;

/**
 * Khung form đăng nhập/đăng ký.
 * Desktop giữ nguyên 800px và chiều cao truyền qua prop $height;
 * từ tablet dọc trở xuống thì chiếm trọn chiều ngang và cao theo nội dung.
 */
export const AuthCard = styled.div`
  width: 800px;
  max-width: 100%;
  height: ${(props) => props.$height || "auto"};
  display: flex;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 300px rgb(0, 0, 0);
  overflow: hidden;

  ${md`
    width: 100%;
    height: auto;
  `}
`;

export const WrapperContainerLeft = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  min-width: 0;
  overflow-y: auto;

  ${sm`
    padding: 24px 18px;
    gap: 12px;
  `}
`;

/* Cột minh hoạ — ẩn từ tablet dọc trở xuống để nhường chỗ cho form */
export const WrapperContainerRight = styled.div`
  border-radius: 10px;
  width: 400px;
  height: 100%;
  align-content: center;
  background-image: linear-gradient(to right, white, var(--cbutton));
  text-align: center;

  ${md`
display: none;
  `}
`;

export const WrapperTextLight = styled.span`
  color: black;
  &:hover {
    color: var(--chightlight);
  }
`;
