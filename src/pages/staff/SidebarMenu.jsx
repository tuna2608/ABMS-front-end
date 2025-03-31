import React from "react"; 
import { Layout, Menu } from "antd"; 
import {
   HomeOutlined,
   DollarOutlined,
   UserOutlined,
   SafetyOutlined,
   CreditCardOutlined  // Add this import
} from "@ant-design/icons";  

const { Sider } = Layout;  
const SidebarMenu = ({ collapsed, setCollapsed, activeMenuItem, setActiveMenuItem }) => {
   const menuItems = [
     {
       key: "apartment-list",
       icon: <HomeOutlined />,
       label: "Danh sách căn hộ",
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
       label: "Chi phí điện nước",
       onClick: () => setActiveMenuItem("utility-management"),
     },
     {
       key: "account-management",
       icon: <UserOutlined />,
       label: "Quản lý tài khoản",
       onClick: () => setActiveMenuItem("account-management"),
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