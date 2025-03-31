import React, { useState } from "react";
import { Layout, Button, FloatButton, Card } from "antd";
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined, 
  CommentOutlined 
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// Import components
import SideMenu from "./SideMenu";
import ApartmentListView from "./ApartmentListView";
import PostManagementView from "./PostManagementView";
import ContractView from "./ContractView";
import PaymentView from "./PaymentView";
import DocumentUploadView from "./DocumentUploadView";

const { Sider, Content, Header } = Layout;
const OwnerHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState("list");
  const navigate = useNavigate();

  // Sample data (move these from the original component)
  const apartments = [
    { 
      id: 1, 
      title: "Căn hộ 2PN Vinhomes Central Park",
      price: 5800000 
    },
    { 
      id: 2, 
      title: "Căn hộ 3PN Masteri Thảo Điền", 
      price: 7200000 
    }
  ];

  const postTypes = ["Cho thuê", "Bán"];

  const documentTypes = [
    { value: "sodo", label: "Sơ đồ căn hộ" },
    { value: "thongtin", label: "Thông tin pháp lý" },
    { value: "hinh", label: "Hình ảnh" },
    { value: "khac", label: "Tài liệu khác" }
  ];

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
- Mọi thắc mắc vui lòng liên hệ trực tiếp với chủ nhà để được giải đáp`; // Copy from original component

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const navigateToChatPage = () => {
    navigate('/chat-page');
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
      case "upload":
        return (
          <DocumentUploadView 
            apartments={apartments}
            documentTypes={documentTypes}
          />
        );
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
        <div style={{ height: 64, padding: 16, textAlign: "center" }}>
          
        </div>
        <SideMenu setCurrentView={setCurrentView} />
      </Sider>
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
      
      <FloatButton
        icon={<CommentOutlined />}
        type="primary"
        tooltip="Chat với khách hàng"
        onClick={navigateToChatPage}
        style={{ 
          right: 24,
          background: 'rgba(30, 58, 138, 0.92)', 
        }}
      />
    </Layout>
  );
};

export default OwnerHome;