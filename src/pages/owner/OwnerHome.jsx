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
import ChatPage from "../client/ChatPage/ChatPage";
import UserCoinRequests from "../client/UserCoinRequests/UserCoinRequests";


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


  const depositTerms = `ĐIỀU KHOẢN HOÀN TRẢ TIỀN ĐẶT CỌC

1. Quy Định Hoàn Trả Tiền Đặt Cọc
- Chủ nhà sẽ hoàn trả 90% số tiền đặt cọc sau khi:
  a) Người thuê thực hiện đúng các cam kết trong hợp đồng
  b) Không có hư hỏng vượt quá mức sử dụng bình thường
  c) Thông báo và bàn giao lại mặt bằng đúng thời hạn

2. Điều Kiện Mất Tiền Đặt Cọc
Khách hàng có thể mất một phần hoặc toàn bộ tiền đặt cọc nếu:
- Vi phạm các điều khoản trong hợp đồng thuê
- Hủy hợp đồng trước thời hạn không có lý do chính đáng
- Gây hư hỏng tài sản vượt quá mức độ sử dụng bình thường

3. Thời Gian Và Phương Thức Hoàn Trả
- Thời gian hoàn trả: 10 ngày làm việc sau khi kết thúc hợp đồng
- Phương thức: Chuyển khoản ngân hàng theo thông tin do người thuê cung cấp

4. Cam Kết
- Chúng tôi cam kết minh bạch và rõ ràng trong việc hoàn trả tiền đặt cọc
- Mọi thắc mắc vui lòng liên hệ trực tiếp với chủ nhà để được giải đáp`;
  
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
        case "coin-request":
        return <UserCoinRequests />;
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
            <Route path="/coin-request" element={renderContent()} />
            <Route path="/messages" element={renderContent()} />
            <Route path="*" element={<Navigate to="/ownerHome/list" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default OwnerHome;