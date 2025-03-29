import React, { useState } from "react";
import { 
  Layout, 
  Card, 
  Button
} from "antd";
import { 
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";

// Import custom components
import SidebarMenu from "./SidebarMenu";
import DepositManagement from "./DepositManagement";
import ApartmentList from "./ApartmentList";
import UtilityManagement from "./UtilityManagement";
import AccountManagement from "./AccountManagement";
import MessageManagement from "./MessageManagement";
import CardManagement from "./CardManagement";  // Add this import
import DepositDetailModal from "./DepositDetailModal";
import ReplyMessageModal from "./ReplyMessageModal";

const { Content, Header } = Layout;

const StaffHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("apartment-list");
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [isDepositDetailVisible, setIsDepositDetailVisible] = useState(false);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);

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
      case "card-management":  // Add this case
        return <CardManagement />;
      case "utility-management":
        return <UtilityManagement />;
      case "account-management":
        return <AccountManagement />;
      case "messages":
        return (
          <MessageManagement 
            onReplyMessage={(message) => {
              setCurrentMessage(message);
              setIsReplyModalVisible(true);
            }}
          />
        );
      default:
        return <Card title="Không tìm thấy nội dung" />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidebarMenu 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />
      
      <Layout>
        <Header style={{ 
          background: "#fff", 
          padding: 0, 
          display: "flex", 
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ marginRight: 20 }}></div>
        </Header>
        
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff" }}>
          {renderContent()}
        </Content>
      </Layout>
      
      <ReplyMessageModal 
        visible={isReplyModalVisible}
        onCancel={() => setIsReplyModalVisible(false)}
        message={currentMessage}
      />
      
      <DepositDetailModal 
        visible={isDepositDetailVisible}
        onCancel={() => setIsDepositDetailVisible(false)}
        deposit={selectedDeposit}
      />
      
    </Layout>
  );
};

export default StaffHome;