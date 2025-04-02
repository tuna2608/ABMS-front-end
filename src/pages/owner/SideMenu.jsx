import React from 'react';
import { Menu } from 'antd';
import { 
  HomeOutlined, 
  FormOutlined, 
  FileProtectOutlined, 
  WalletOutlined, 
  UploadOutlined,
  FileAddOutlined,
  MessageOutlined
} from "@ant-design/icons";

const SideMenu = ({ setCurrentView }) => {
  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Danh sách căn hộ",
      onClick: () => setCurrentView("list"),
    },
    {
      key: "2",
      icon: <FormOutlined />,
      label: "Quản lý bài viết",
      onClick: () => setCurrentView("post"),
    },
    {
      key: "3",
      icon: <FileProtectOutlined />,
      label: "Quản lý hợp đồng",
      onClick: () => setCurrentView("contract"),
    },
    {
      key: "4",
      icon: <WalletOutlined />,
      label: "Quản lý thanh toán",
      onClick: () => setCurrentView("payment"),
    },
    {
      key: "5",
      icon: <FileAddOutlined />,
      label: "Quản lý hóa đơn",
      onClick: () => setCurrentView("bill-management"),
    },
    {
      key: "6",
      icon: <UploadOutlined />,
      label: "Tải lên tài liệu",
      onClick: () => setCurrentView("upload"),
    },
    {
      key: "7",
      icon: <MessageOutlined />,
      label: "Tin nhắn",
      onClick: () => setCurrentView("chatpage"),
    },
  ];

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={menuItems}
    />
  );
};

export default SideMenu;