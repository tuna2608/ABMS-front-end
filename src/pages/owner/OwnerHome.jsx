import React, { useState } from "react";
import { Layout, Button, Card } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

// Import components
import SideMenu from "./SideMenu";
import ApartmentListView from "./ApartmentListView";
import PostManagementView from "./PostManagementView";
import BillPage from "./OwnerBillManagement";
import ContractView from "./ContractView";
import PaymentView from "./PaymentView";
import DocumentUploadView from "./DocumentUploadView";
import ChatPage from "../client/ChatPage/ChatPage";

const { Sider, Content, Header } = Layout;
const OwnerHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState("list");

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

  const documentTypes = [
    { value: "sodo", label: "Sơ đồ căn hộ" },
    { value: "thongtin", label: "Thông tin pháp lý" },
    { value: "hinh", label: "Hình ảnh" },
    { value: "khac", label: "Tài liệu khác" },
  ];

  const depositTerms = `ĐIỀU KHOẢN HOÀN TRẢ TIỀN ĐẶT CỌC...`; // Keep existing deposit terms

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
      case "upload":
        return (
          <DocumentUploadView
            apartments={apartments}
            documentTypes={documentTypes}
          />
        );
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
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default OwnerHome;