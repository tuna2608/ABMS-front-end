import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  DollarOutlined,
  CreditCardOutlined,
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
      key: "contract",
      icon: <CreditCardOutlined />,
      label: "Danh sách chuyển Coin",
      onClick: () => {
        setCurrentView("coin-request");
        navigate("/rentorHome/coin-request");
      },
    }
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