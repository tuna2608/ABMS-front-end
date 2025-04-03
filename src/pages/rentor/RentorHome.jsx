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
import DocumentsView from "./DocumentsView";
import ChatPage from "../client/ChatPage/ChatPage";
import MaintenanceRequestView from "./MaintenanceRequestView";

const { Sider, Content, Header } = Layout;

const RentorHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState("list");
  const location = useLocation();
  
  // Sync URL with the current view
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    // Map URL paths to view keys
    const pathToView = {
      'list': 'list',
      'my-bills': 'my-bills',
      'contract': 'contract',
      'payment': 'payment',
      'documents': 'documents',
      'maintenance': 'maintenance',
      'messages': 'chatpage'
    };
    
    const newView = pathToView[path];
    if (newView) {
      setCurrentView(newView);
    } else if (location.pathname === "/rentorHome" || location.pathname === "/rentorHome/") {
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
      case "documents":
        return <DocumentsView />;
      case "maintenance":
        return <MaintenanceRequestView />;
      case "chatpage":
        return <ChatPage />;
      default:
        return <Card title="Không tìm thấy nội dung" />;
    }
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
            <Route path="/" element={<Navigate to="/rentorHome/list" replace />} />
            <Route path="/list" element={renderContent()} />
            <Route path="/my-bills" element={renderContent()} />
            <Route path="/contract" element={renderContent()} />
            <Route path="/payment" element={renderContent()} />
            <Route path="/documents" element={renderContent()} />
            <Route path="/maintenance" element={renderContent()} />
            <Route path="/messages" element={renderContent()} />
            <Route path="*" element={<Navigate to="/rentorHome/list" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RentorHome;