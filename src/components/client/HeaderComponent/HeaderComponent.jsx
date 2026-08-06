import { Button, Drawer, Dropdown, Flex, Image, Menu } from "antd";
import React, { useState, useEffect } from "react";
import {
  FileTextOutlined,
  UserOutlined,
  LogoutOutlined,
  FormOutlined,
  HomeOutlined,
  DollarOutlined,
  EditOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import logoMenu from "../../../assets/common/images/logo-menu.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutDispatch } from "../../../redux/apiCalls";
import avtBase from "../../../assets/common/images/avtbase.jpg";
import NotificationWrapper from "./NotificationWrapper";
import { lg, md, sm } from "../../../utilities/responsive";

const WrapperHeader = styled.div`
  height: var(--header-height);
  padding: 0 var(--page-gutter);
  background-color: var(--cheadline);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: box-shadow 0.3s ease;
  box-shadow: ${(props) => (props.scrolled ? "0 2px 10px rgba(0, 0, 0, 0.15)" : "none")};
`;

const Logo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  &:hover {
    cursor: pointer;
  }

  .ant-image {
    width: 140px;
  }

  .ant-image img {
    width: 100%;
    height: auto;
  }

  ${lg`
    .ant-image { width: 110px; }
  `}

  ${sm`
    .ant-image { width: 92px; }
  `}
`;

const NavbarContainer = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  ${lg`
    padding: 0 8px;
  `}
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-left: 25px;

  ${lg`
    gap: 8px;
    margin-left: 0;
  `}

  /* Trên mobile các link chuyển vào Drawer */
  ${md`
display: none;
  `}
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  ${lg`
    gap: 10px;
  `}
`;

const NavLink = styled(Button)`
  color: white;
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: 500;
  padding: 5px 10px;
  height: auto;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;

  &:hover {
    color: var(--csecondary);
    background-color: transparent;
  }

  ${lg`
    font-size: 14px;
    padding: 4px 6px;
  `}
`;

const AvatarWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

/* Khối tên vai trò + avatar; giấu chữ vai trò khi màn hình hẹp */
const UserBadge = styled(Flex)`
  background-color: white;
  padding: 5px 20px;
  border-radius: 10px;

  h3 {
    color: var(--cstroke);
    margin: 0;
    white-space: nowrap;
  }

  ${lg`
    padding: 4px 10px;
    gap: 10px !important;

    h3 { font-size: 14px; }
  `}

  ${sm`
    padding: 3px;
    border-radius: 50%;

    h3 { display: none; }
  `}
`;

/* Nút hamburger chỉ xuất hiện từ tablet dọc trở xuống */
const MenuToggle = styled(Button)`
  display: none;
  color: white;

  &:hover,
  &:focus {
    color: var(--csecondary) !important;
  }

  ${md`
display: inline-flex;
  `}
`;

/* Cụm nút đăng nhập / đăng ký — luôn hiển thị vì đây là thao tác chính,
   chỉ thu nhỏ dần khi màn hình hẹp. */
const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  ${lg`
    gap: 6px;

    .ant-btn {
      padding: 0 8px;
      font-size: 13px;
    }
  `}

  ${sm`
    gap: 4px;

    .ant-btn {
      padding: 0 6px;
      font-size: 12px;
    }
  `}
`;

// Spacer component to prevent content from being hidden under fixed header
const HeaderSpacer = styled.div`
  height: var(--header-height);
  width: 100%;
`;

function HeaderComponent() {
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Điều hướng từ Drawer thì đóng Drawer lại
  const navigateAndClose = (path) => {
    setDrawerOpen(false);
    navigate(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleLogout() {
    logoutDispatch(dispatch);
    navigate("/login");
  }

  // Define dropdown items based on user role
  const getDropdownItems = () => {
    const baseItems = [
      {
        key: "1",
        icon: <UserOutlined />,
        label: <div onClick={() => navigate("/edit-profile")}>Thông tin cá nhân</div>,
      },
    ];
    // Add role-specific channel options
    if (user?.role === "Owner") {
      baseItems.push({
        key: "2",
        icon: <HomeOutlined />,
        label: <div onClick={() => navigate("/ownerHome")}>Kênh chủ căn hộ</div>,
      });
    } else if (user?.isRentor === true) {
      baseItems.push({
        key: "2",
        icon: <HomeOutlined />,
        label: <div onClick={() => navigate("/rentorHome")}>Kênh người thuê</div>,
      });
    }
    if (user?.role === "User") {
      baseItems.push({
        key: "3",
        icon: <HomeOutlined />,
        label: <div onClick={() => navigate("/deposit-apartment")}>Căn hộ đã đặt cọc</div>,
      });
    }
    if (user?.role !== "Admin" && user?.role !== "Staff")
      baseItems.push({
        key: "4",
        icon: <DollarOutlined />,
        label: <div onClick={() => navigate("/coin-request")}>Yêu cầu hoàn tiền</div>,
      });
    baseItems.push({
      key: "5",
      icon: <EditOutlined />,
      label: <div onClick={() => navigate("/change-password")}>Đổi mật khẩu</div>,
    });

    // Add logout option
    baseItems.push({
      key: "6",
      icon: <LogoutOutlined />,
      label: <div onClick={handleLogout}>Đăng xuất</div>,
    });

    return baseItems;
  };

  const items = getDropdownItems();

  // Form items for dropdown
  const formItems = [
    {
      key: "1",
      icon: <FormOutlined />,
      label: <div onClick={() => navigate("/form-request")}>Gửi đơn</div>,
    },
    {
      key: "2",
      icon: <FileTextOutlined />,
      label: <div onClick={() => navigate("/form-list")}>Danh sách đơn</div>,
    },
  ];

  // Cùng bộ điều hướng như NavbarLeft, hiển thị dạng Menu dọc trong Drawer
  const getMobileNavItems = () => {
    const navItems = [];

    if (user?.role !== "Staff" && user?.role !== "Admin") {
      navItems.push(
        {
          key: "post",
          icon: <FileTextOutlined />,
          label: "Bài viết",
          onClick: () => navigateAndClose("/post"),
        },
        {
          key: "service",
          icon: <HomeOutlined />,
          label: "Dịch vụ",
          onClick: () => navigateAndClose("/service"),
        }
      );
    }

    if (user?.role === "Owner" || user?.isRentor === true) {
      navItems.push({
        key: "form",
        icon: <FormOutlined />,
        label: "Đơn từ",
        children: [
          {
            key: "form-request",
            icon: <FormOutlined />,
            label: "Gửi đơn",
            onClick: () => navigateAndClose("/form-request"),
          },
          {
            key: "form-list",
            icon: <FileTextOutlined />,
            label: "Danh sách đơn",
            onClick: () => navigateAndClose("/form-list"),
          },
        ],
      });
    }

    return navItems;
  };

  const mobileNavItems = getMobileNavItems();

  return (
    <>
      <WrapperHeader>
        <Logo
          onClick={() => {
            const roleUser = user?.role;
            if (roleUser === "Admin") {
              navigate("/adminHome");
            } else if (roleUser === "Staff") {
              navigate("/staffHome");
            } else {
              navigate("/");
            }
          }}
        >
          <Image src={logoMenu} preview={false} />
        </Logo>

        <NavbarContainer>
          <NavbarLeft>
            {user?.role !== "Staff" && user?.role !== "Admin" && (
              <>
                <NavLink onClick={() => navigate("/post")}>Bài viết</NavLink>
                <NavLink onClick={() => navigate("/service")}>Dịch vụ</NavLink>
              </>
            )}
            {(user?.role === "Owner" || user?.isRentor === true) && (
              <Dropdown menu={{ items: formItems }} placement="bottom">
                <NavLink>Đơn từ</NavLink>
              </Dropdown>
            )}
          </NavbarLeft>

          <NavbarRight>
            {/* Chưa đăng nhập thì không có thông báo nào để xem, ẩn đi
                để nhường chỗ cho nút Đăng nhập / Đăng ký trên màn hình hẹp */}
            {user && <NotificationWrapper />}
            {user ? (
              <Dropdown menu={{ items: items }} placement="bottomRight">
                <AvatarWrapper>
                  <UserBadge align="center" justify="center" gap={20}>
                    <h3>{`${user.role}`}</h3>
                    <Image
                      preview={false}
                      style={{ borderRadius: "100%" }}
                      width="40px"
                      height="40px"
                      src={user.userImgUrl || avtBase}
                    />
                  </UserBadge>
                </AvatarWrapper>
              </Dropdown>
            ) : (
              <AuthButtons>
                <Button type="primary" ghost size="middle" onClick={() => navigate("/login")}>
                  Đăng nhập
                </Button>
                <Button type="primary" size="middle" onClick={() => navigate("/register")}>
                  Đăng ký
                </Button>
              </AuthButtons>
            )}

            {mobileNavItems.length > 0 && (
              <MenuToggle
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setDrawerOpen(true)}
                aria-label="Mở menu"
              />
            )}
          </NavbarRight>
        </NavbarContainer>
      </WrapperHeader>
      <HeaderSpacer />

      <Drawer
        title="Menu"
        placement="right"
        width={280}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        styles={{ body: { padding: 0 } }}
      >
        <Menu mode="inline" items={mobileNavItems} selectable={false} />
      </Drawer>
    </>
  );
}

export default HeaderComponent;
