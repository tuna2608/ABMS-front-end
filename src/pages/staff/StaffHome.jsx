import React, { useState, useEffect } from "react";
import { Layout, Card, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// Import custom components
import SidebarMenu from "./SidebarMenu";
import DepositManagement from "./DepositManagement";
import ApartmentList from "./ApartmentList";
import UtilityManagement from "./UtilityManagement";
import AccountManagement from "./AccountManagement";
import CardManagement from "./CardManagement";
import BillManagement from "./BillManagement";
import DepositDetailModal from "./DepositDetailModal";

const { Content, Header } = Layout;

const StaffHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("apartment-list");
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [isDepositDetailVisible, setIsDepositDetailVisible] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Sync URL with active menu item
  useEffect(() => {
    // Extract the current path segment from the URL
    const pathSegment = location.pathname.split('/').pop();
    
    // Check if the URL has a valid menu item path
    const validMenuItems = [
      "apartment-list", 
      "deposit-management", 
      "card-management", 
      "bill-management", 
      "utility-management", 
      "account-management"
    ];
    
    if (validMenuItems.includes(pathSegment)) {
      setActiveMenuItem(pathSegment);
    } else if (location.pathname === "/staffHome" || location.pathname === "/staffHome/") {
      // If we're at the root of staffHome, redirect to the default view
      navigate("/staffHome/apartment-list");
    }
  }, [location.pathname, navigate]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const renderContent = () => {
    switch (activeMenuItem) {
      case "apartment-list":
        return <ApartmentList />;
      case "deposit-management":
        return (
          <DepositManagement
            onViewDepositDetail={(deposit) => {
              setSelectedDeposit(deposit);
              setIsDepositDetailVisible(true);
            }}
          />
        );
      case "card-management":
        return <CardManagement />;
      case "bill-management":
        return <BillManagement />;
      case "utility-management":
        return <UtilityManagement setActiveMenuItem={setActiveMenuItem} />;
      case "account-management":
        return <AccountManagement />;
      default:
        return <Card title="Không tìm thấy nội dung" />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarMenu
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />
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
            <Route path="/" element={<Navigate to="/staffHome/apartment-list" replace />} />
            <Route path="/apartment-list" element={renderContent()} />
            <Route path="/deposit-management" element={renderContent()} />
            <Route path="/card-management" element={renderContent()} />
            <Route path="/bill-management" element={renderContent()} />
            <Route path="/utility-management" element={renderContent()} />
            <Route path="/account-management" element={renderContent()} />
            <Route path="*" element={<Navigate to="/staffHome/apartment-list" replace />} />
          </Routes>
        </Content>
      </Layout>
      <DepositDetailModal
        visible={isDepositDetailVisible}
        onCancel={() => setIsDepositDetailVisible(false)}
        deposit={selectedDeposit}
      />
    </Layout>
  );
};

export default StaffHome;