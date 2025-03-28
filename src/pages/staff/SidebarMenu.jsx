import React from "react"; 
import { Layout, Menu } from "antd"; 
import {
   HomeOutlined,
   DollarOutlined,
   UserOutlined,
   MessageOutlined,
   SafetyOutlined,
   CreditCardOutlined  // Add this import
} from "@ant-design/icons";  

const { Sider } = Layout;  

const SidebarMenu = ({ collapsed, setCollapsed, activeMenuItem, setActiveMenuItem }) => {
   const menuItems = [
     {
       key: "apartment-list",
       icon: <HomeOutlined />,
       label: "Danh sách nhà",
       onClick: () => setActiveMenuItem("apartment-list"),
     },
     {
       key: "deposit-management",
       icon: <SafetyOutlined />,
       label: "Quản lý đặt cọc",
       onClick: () => setActiveMenuItem("deposit-management"),
     },
     {
       key: "card-management",  // Add this new menu item
       icon: <CreditCardOutlined />,
       label: "Quản lý thẻ",
       onClick: () => setActiveMenuItem("card-management"),
     },
     {
       key: "utility-management",
       icon: <DollarOutlined />,
       label: "Khoản phí",
       onClick: () => setActiveMenuItem("utility-management"),
     },
     {
       key: "account-management",
       icon: <UserOutlined />,
       label: "Quản lý tài khoản",
       onClick: () => setActiveMenuItem("account-management"),
     },
     {
       key: "messages",
       icon: <MessageOutlined />,
       label: "Tin nhắn",
       onClick: () => setActiveMenuItem("messages"),
     },
   ];  

   return (
     <Sider
        width={250}
       collapsible
       collapsed={collapsed}
       onCollapse={setCollapsed}
       trigger={null}
       theme="light"
     >
       <div style={{ height: 64, padding: 16, textAlign: "center" }}>
         <h2 style={{ margin: 0, fontSize: collapsed ? 14 : 18 }}>
           {collapsed ? "ST" : "Staff"}
         </h2>
       </div>
       <Menu
         mode="inline"
         defaultSelectedKeys={['apartment-list']}
         items={menuItems}
       />
     </Sider>
   ); 
};  

export default SidebarMenu;