import React, { useState } from "react";
import { Layout, Card, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

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
          {renderContent()}
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