import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  DollarOutlined,
  MessageOutlined,
  FileOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ setCurrentView }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "list",
      icon: <HomeOutlined />,
      label: "Căn hộ của tôi",
      onClick: () => {
        setCurrentView("list");
        navigate("/rentorHome/list");
      },
    },
    {
      key: "my-bills",
      icon: <DollarOutlined />,
      label: "Hóa đơn của tôi",
      onClick: () => {
        setCurrentView("my-bills");
        navigate("/rentorHome/my-bills");
      },
    },
    {
      key: "contract",
      icon: <FileTextOutlined />,
      label: "Hợp đồng",
      onClick: () => {
        setCurrentView("contract");
        navigate("/rentorHome/contract");
      },
    },
    {
      key: "payment",
      icon: <DollarOutlined />,
      label: "Thanh toán",
      onClick: () => {
        setCurrentView("payment");
        navigate("/rentorHome/payment");
      },
    },
    {
      key: "documents",
      icon: <FileOutlined />,
      label: "Tài liệu",
      onClick: () => {
        setCurrentView("documents");
        navigate("/rentorHome/documents");
      },
    },
    {
      key: "maintenance",
      icon: <ToolOutlined />,
      label: "Yêu cầu bảo trì",
      onClick: () => {
        setCurrentView("maintenance");
        navigate("/rentorHome/maintenance");
      },
    },
    {
      key: "chatpage",
      icon: <MessageOutlined />,
      label: "Tin nhắn",
      onClick: () => {
        setCurrentView("chatpage");
        navigate("/rentorHome/messages");
      },
    },
  ];

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={["list"]}
      items={menuItems}
    />
  );
};

export default SideMenu;