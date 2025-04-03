import React, { useState, useEffect } from "react";
import { Layout, Button, Card } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Import components
import SideMenu from "./SideMenu";
import ApartmentListView from "./ApartmentListView";
import PostManagementView from "./PostManagementView";
import BillPage from "./OwnerBillManagement";
import ContractView from "./ContractView";
import PaymentView from "./PaymentView";
import FormManagement from "./FormManagement";
import ChatPage from "../client/ChatPage/ChatPage";

const { Sider, Content, Header } = Layout;
const OwnerHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState("list");
  const location = useLocation();

  // Sample data (move these from the original component)
  const apartments = [
    {
      id: 1,
      title: "Căn hộ 2PN Vinhomes Central Park",
      price: 5800000,
    },
    {
      id: 2,
      title: "Căn hộ 3PN Masteri Thảo Điền",
      price: 7200000,
    },
  ];

  const postTypes = ["Cho thuê", "Bán"];


  const depositTerms = `ĐIỀU KHOẢN HOÀN TRẢ TIỀN ĐẶT CỌC...`;
  
  // Sync URL with the current view
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    // Map URL paths to view keys
    const pathToView = {
      'list': 'list',
      'post-management': 'post',
      'contract-management': 'contract',
      'payment-management': 'payment',
      'bill-management': 'bill-management',
      'document-upload': 'upload',
      'messages': 'chatpage'
    };
    
    const newView = pathToView[path];
    if (newView) {
      setCurrentView(newView);
    } else if (location.pathname === "/ownerHome" || location.pathname === "/ownerHome/") {
      // Redirect to default view if at root
      window.history.pushState({}, "", "/ownerHome/list");
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
      case "post":
        return (
          <PostManagementView
            postTypes={postTypes}
            apartments={apartments}
            depositTerms={depositTerms}
          />
        );
      case "contract":
        return <ContractView />;
      case "payment":
        return <PaymentView />;
      case "bill-management":
        return <BillPage />;
        case "form-management": // Add case for form-management
        return <FormManagement />;
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
            <Route path="/" element={<Navigate to="/ownerHome/list" replace />} />
            <Route path="/list" element={renderContent()} />
            <Route path="/post-management" element={renderContent()} />
            <Route path="/contract-management" element={renderContent()} />
            <Route path="/payment-management" element={renderContent()} />
            <Route path="/bill-management" element={renderContent()} />
            <Route path="/form-management" element={renderContent()} />
            <Route path="/messages" element={renderContent()} />
            <Route path="*" element={<Navigate to="/ownerHome/list" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default OwnerHome;