import React from "react";
import { Button, Result } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { sm } from "../../../utilities/responsive";

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

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Panel>
        <Result
          status="404"
          title="Page not found"
          subTitle="Sorry, the page you are looking for does not exist or has been moved."
          extra={
            <Button type="primary" icon={<HomeOutlined />} onClick={() => navigate("/")}>
              Back to home
            </Button>
          }
        />
      </Panel>
    </Wrapper>
  );
}

export default NotFoundPage;
