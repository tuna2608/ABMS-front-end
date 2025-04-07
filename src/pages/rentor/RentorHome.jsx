import React, { useState, useEffect } from "react";
import { Layout, Button, Card } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Import components
import SideMenu from "./SideMenu";
import ApartmentListView from "./ApartmentListView";
import MyBillsPage from "./MyBillsPage";
import ContractView from "./ContractView";
import PaymentView from "./PaymentView";
import zaloLogo from '../../assets/common/images/logo-zalo-vector-7.jpg';

const { Sider, Content, Header } = Layout;

const RentorHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState("list");
  const location = useLocation();

  // Sync URL with the current view
  useEffect(() => {
    const path = location.pathname.split("/").pop();
    // Map URL paths to view keys
    const pathToView = {
      list: "list",
      "my-bills": "my-bills",
      contract: "contract",
      payment: "payment",
      documents: "documents",
      maintenance: "maintenance",
    };

    const newView = pathToView[path];
    if (newView) {
      setCurrentView(newView);
    } else if (
      location.pathname === "/rentorHome" ||
      location.pathname === "/rentorHome/"
    ) {
      // Redirect to default view if at root
      window.history.pushState({}, "", "/rentorHome/list");
      setCurrentView("list");
    }
  }, [location.pathname]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const renderContent = () => {
    switch (currentView) {
      case "list":
        return <ApartmentListView />;
      case "my-bills":
        return <MyBillsPage />;
      case "contract":
        return <ContractView />;
      case "payment":
        return <PaymentView />;
      default:
        return <ApartmentListView />;
    }
  };

  // Define Zalo button style
  const zaloButtonStyle = {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#0068FF', // Zalo blue color
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    zIndex: 1000,
    border: 'none'
  };

  // Handler for Zalo button click
  const handleZaloClick = () => {
    window.open('https://zalo.me/g/xyhqkf988', '_blank');
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#fff" }}
      >
        <div style={{ height: 64, padding: 16, textAlign: "center" }}></div>
        <SideMenu currentView={currentView} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
      
      {/* Zalo Floating Button */}
      <Button
        style={zaloButtonStyle}
        onClick={handleZaloClick}
        aria-label="Join Zalo Group"
      >
        <img 
  src={zaloLogo}
  alt="Zalo"
  style={{ width: '30px', height: '30px' }}
/>
      </Button>
    </Layout>
  );
};

export default RentorHome;