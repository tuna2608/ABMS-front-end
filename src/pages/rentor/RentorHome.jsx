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
import UserCoinRequests from "../client/UserCoinRequests/UserCoinRequests";

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
      messages: "chatpage",
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
      case "coin-request":
        return <UserCoinRequests />;
      case "payment":
        return <PaymentView />;
      default:
        return <Card title="Không tìm thấy nội dung" />;
    }
  };

  const zaloButtonStyle = {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#0068FF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    zIndex: 1000,
    border: 'none'
  };

  const handleZaloClick = () => {
    window.open('https://zalo.me/g/xyhqkf988', '_blank');
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        theme="light"
        width={250}
      >
        <div style={{ height: 64, padding: 16, textAlign: "center" }}></div>
        <SideMenu setCurrentView={setCurrentView} />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
          <div style={{ marginRight: 20 }}></div>
        </Header>
        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
        >
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/rentorHome/list" replace />}
            />
            <Route path="/list" element={renderContent()} />
            <Route path="/my-bills" element={renderContent()} />
            <Route path="/coin-request" element={renderContent()} />
            <Route path="/contract" element={renderContent()} />
            <Route path="/payment" element={renderContent()} />
            <Route
              path="*"
              element={<Navigate to="/rentorHome/list" replace />}
            />
          </Routes>
        </Content>
      </Layout>

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