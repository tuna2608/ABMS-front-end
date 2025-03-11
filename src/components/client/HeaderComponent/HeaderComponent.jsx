import React from "react";
import { Col, Row } from "antd";
import { WrapperHeader } from "./style"; // Đảm bảo rằng WrapperHeader được style đúng

function HeaderComponent() {
  return (
    <WrapperHeader>
      <Row gutter={16}>
        {/* Logo */}
        <Col span={6}>
          <h1>ABMS</h1>
        </Col>
        {/* Nav Links */}
        <Col span={12}>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", alignItems: "center" }}>
            <button style={{ padding: "8px 16px", borderRadius: "4px" }}>Diễn đàn</button>
            <button style={{ padding: "8px 16px", borderRadius: "4px" }}>Cho thuê</button>
            <button style={{ padding: "8px 16px", borderRadius: "4px" }}>Mua bán</button>
          </div>
        </Col>
        {/* Đăng nhập và Đăng ký */}
        <Col span={6}>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}>
            <button style={{ padding: "8px 16px", borderRadius: "4px" }}>Đăng nhập</button>
            <button style={{ padding: "8px 16px", borderRadius: "4px" }}>Đăng ký</button>
          </div>
        </Col>
      </Row>
    </WrapperHeader>
  );
}

export default HeaderComponent;
