import { css } from "styled-components";

/**
 * Breakpoint dùng chung cho toàn bộ app.
 * Giá trị khớp với breakpoint của antd (Grid/Row/Col) để layout đồng nhất
 * giữa styled-components và các component antd.
 */
export const breakpoints = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const maxWidth = (px) => (props) => css`
  @media only screen and (max-width: ${px}px) {
    ${props}
  }
`;

const minWidth = (px) => (props) => css`
  @media only screen and (min-width: ${px + 1}px) {
    ${props}
  }
`;

/* --- max-width: áp dụng từ breakpoint trở xuống (mobile-down) --- */

/** <= 480px — điện thoại nhỏ */
export const xs = maxWidth(breakpoints.xs);

/** <= 576px — điện thoại */
export const sm = maxWidth(breakpoints.sm);

/** <= 768px — tablet dọc, mốc chuyển layout 1 cột */
export const md = maxWidth(breakpoints.md);

/** <= 992px — tablet ngang / laptop nhỏ */
export const lg = maxWidth(breakpoints.lg);

/** <= 1200px — desktop nhỏ */
export const xl = maxWidth(breakpoints.xl);

/* --- min-width: áp dụng từ breakpoint trở lên (desktop-up) --- */

export const upMd = minWidth(breakpoints.md);
export const upLg = minWidth(breakpoints.lg);

/* --- Alias giữ tương thích với code cũ --- */

/** Alias của `sm` (<= 576px). Trước đây là 430px. */
export const mobile = sm;

/** Alias của `lg` (<= 992px). Trước đây là 1050px. */
export const tablet = lg;
