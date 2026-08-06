import React from "react";
import { Button, Result, Typography } from "antd";
import { HomeOutlined, ReloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { sm } from "../../../utilities/responsive";

const { Paragraph, Text } = Typography;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: #f3f4f6;

  ${sm`
    padding: 16px 12px;
  `}
`;

const Panel = styled.div`
  width: 100%;
  max-width: 640px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

  .ant-result {
    padding: 40px 24px;
  }

  ${sm`
    .ant-result { padding: 28px 16px; }
    .ant-result-title { font-size: 20px; }
    .ant-result-subtitle { font-size: 14px; }
  `}
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;

  ${sm`
    width: 100%;

    .ant-btn {
      flex: 1 1 100%;
    }
  `}
`;

/* Chi tiết kỹ thuật chỉ hiện khi chạy dev, người dùng cuối không cần thấy */
const Details = styled.pre`
  margin: 20px 0 0;
  padding: 12px;
  max-height: 180px;
  overflow: auto;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  font-size: 12px;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-word;
`;

/**
 * Trang báo lỗi chung. Dùng cho cả ErrorBoundary (crash khi render)
 * và các lỗi không gọi được API.
 *
 * @param {Error}    error   lỗi gốc, chỉ hiển thị ở môi trường dev
 * @param {Function} onRetry ghi đè hành vi nút "Try again"
 */
const ErrorPage = ({ error, onRetry }) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      return;
    }
    window.location.reload();
  };

  return (
    <Wrapper>
      <Panel>
        <Result
          status="500"
          title="Sorry for the inconvenience"
          subTitle={
            <>
              <Paragraph type="secondary" style={{ marginBottom: 4 }}>
                Something went wrong on our end and we could not complete your request.
              </Paragraph>
              <Text type="secondary">
                Our team has been notified. Please try again in a moment.
              </Text>
            </>
          }
          extra={
            <Actions>
              <Button type="primary" icon={<ReloadOutlined />} onClick={handleRetry}>
                Try again
              </Button>
              <Button icon={<HomeOutlined />} onClick={() => navigate("/")}>
                Back to home
              </Button>
            </Actions>
          }
        />

        {import.meta.env.DEV && error && (
          <div style={{ padding: "0 24px 24px" }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Chi tiết lỗi (chỉ hiển thị khi chạy dev):
            </Text>
            <Details>{error.stack || String(error)}</Details>
          </div>
        )}
      </Panel>
    </Wrapper>
  );
};

export default ErrorPage;
