import { Button, Dropdown, Flex, Image } from "antd";
import React, { useState, useEffect } from "react";
import {
  FileTextOutlined,
  UserOutlined,
  LogoutOutlined,
  FormOutlined,
  HomeOutlined,
  DollarOutlined,
  EditOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import logoMenu from "../../../assets/common/images/logo-menu.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutDispatch } from "../../../redux/apiCalls";
import avtBase from "../../../assets/common/images/avtbase.jpg";
import NotificationWrapper from "./NotificationWrapper";

const WrapperHeader = styled.div`
  height: 70px;
  padding: 0 120px;
  background-color: var(--cheadline);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: box-shadow 0.3s ease;
  box-shadow: ${(props) =>
    props.scrolled ? "0 2px 10px rgba(0, 0, 0, 0.15)" : "none"};
`;

const Logo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const NavbarContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-left: 25px;
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
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

  &:hover {
    color: var(--csecondary);
    background-color: transparent;
  }
`;

const AvatarWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

// Spacer component to prevent content from being hidden under fixed header
const HeaderSpacer = styled.div`
  height: 70px;
  width: 100%;
`;

function HeaderComponent() {
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  
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
        label: (
          <div onClick={() => navigate("/edit-profile")}>Thông tin cá nhân</div>
        ),
      },
    ];
    // Add role-specific channel options
    if (user?.role === "Owner") {
      baseItems.push({
        key: "2",
        icon: <HomeOutlined />,
        label: (
          <div onClick={() => navigate("/ownerHome")}>Kênh chủ căn hộ</div>
        ),
      });
    } else if (user?.isRentor === true) {
      baseItems.push({
        key: "2",
        icon: <HomeOutlined />,
        label: (
          <div onClick={() => navigate("/rentorHome")}>Kênh người thuê</div>
        ),
      });
    }
    if (user?.role === "User") {
      baseItems.push({
        key: "3",
        icon: <HomeOutlined />,
        label: (
          <div onClick={() => navigate("/deposit-apartment")}>
            Căn hộ đã đặt cọc
          </div>
        ),
      });
    }
    if (user?.role !== "Admin" && user?.role !== "Staff")
      baseItems.push({
        key: "4",
        icon: <DollarOutlined />,
        label: (
          <div onClick={() => navigate("/coin-request")}>Yêu cầu hoàn tiền</div>
        ),
      });
    baseItems.push({
      key: "5",
      icon: <EditOutlined />,
      label: (
        <div onClick={() => navigate("/change-password")}>Đổi mật khẩu</div>
      ),
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
          <Image src={logoMenu} width="140px" preview={false} />
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
            <NotificationWrapper />
            {user ? (
              <Dropdown menu={{ items: items }} placement="bottomRight">
                <AvatarWrapper>
                  <Flex align="center" justify="center" gap={20}  style={{backgroundColor: "white", padding: '5px 20px', borderRadius: '10px'}}>
                    <h3 style={{color: "var(--cstroke)"}}>{`${user.role}`}</h3>
                    <Image
                      preview={false}
                      style={{ borderRadius: "100%" }}
                      width="40px"
                      height="40px"
                      src={user.userImgUrl || avtBase}
                    />
                  </Flex>
                </AvatarWrapper>
              </Dropdown>
            ) : (
              <>
                <Button
                  type="primary"
                  ghost
                  size="middle"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </Button>
                <Button
                  type="primary"
                  size="middle"
                  onClick={() => navigate("/register")}
                >
                  Đăng ký
                </Button>
              </>
            )}
          </NavbarRight>
        </NavbarContainer>
      </WrapperHeader>
      <HeaderSpacer />
    </>
  );
}

export default HeaderComponent;
