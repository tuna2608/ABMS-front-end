import { Badge, Button, Col, Dropdown, Flex, Image, Row } from "antd";
import React from "react";
import { FacebookFilled, InstagramFilled } from "@ant-design/icons";
import styled from "styled-components";
import logoMenu from "../../../assets/common/images/logo-menu.png";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { logoutDispatch } from "../../../redux/apiCalls";
import avtBase from "../../../assets/common/images/avtbase.jpg";
import NotificationWrapper from "./NotificationWrapper";

const { Search } = Input;



const WrapperHeader = styled.div`
  height: 70px;
  padding: 0 120px;
  background-color: var(--cheadline);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  
  &:hover {
    cursor: pointer;
  }
`;

const NavbarListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const NavLink = styled(Button)`
  color: white;
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: 500;
  padding: 0;
  height: auto;
  transition: color 0.3s;

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

function HeaderComponent() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  function handleLogout() {
    logoutDispatch(dispatch);
    navigate("/login");
  }

  // Define dropdown items based on user role
  const getDropdownItems = () => {
    const baseItems = [
      {
        key: "1",
        label: <div onClick={() => navigate('/edit-profile')}>Thông tin cá nhân</div>,
      }
    ];
    
    // Add role-specific channel options
    if (user?.role === 'Owner') {
      baseItems.push({
        key: "2",
        label: <div onClick={() => navigate("/ownerHome")}>Kênh chủ căn hộ</div>,
      });
    } else if (user?.role === 'Rentor') {
      baseItems.push({
        key: "2",
        label: <div onClick={() => navigate("/rentorHome")}>Kênh người thuê</div>,
      });
    }
    if (user?.role === 'User') {
      baseItems.push({
        key: "3",
        label: <div onClick={() => navigate("/deposit-apartment")}>Căn hộ đã đặt cọc</div>,
      });
    }
    baseItems.push({
      key: "4",
      label: <div onClick={() => navigate("/coin-request")}>Yêu cầu hoàn tiền</div>,
    });
    
    // Add logout option
    baseItems.push({
      key: "5",
      label: <div onClick={handleLogout}>Đăng xuất</div>,
    });
    
    return baseItems;
  };

  const items = getDropdownItems();

  // Form items for dropdown
  const formItems = [
    {
      key: "1",
      label: <div onClick={() => navigate("/form-request")}>Gửi đơn</div>,
    },
    {
      key: "2",
      label: <div onClick={() => navigate("/form-list")}>Danh sách đơn</div>,
    }
  ];

  const getDropdownNotis = () => {
    const baseItems = [
      {
        key: "1",
        label: <div onClick={() => {console.log('tat ca thong bao');}}>Tất cả thông báo</div>,
      }
    ];
    
    // Add role-specific channel options
    if (user?.role === 'Owner') {
      baseItems.push({
        key: "2",
        label: <div onClick={() => navigate("/ownerHome")}>Kênh chủ căn hộ</div>,
      });
    } else if (user?.role === 'Rentor') {
      baseItems.push({
        key: "2",
        label: <div onClick={() => navigate("/rentorHome")}>Kênh người thuê</div>,
      });
    }
    
    // Add notifications
    baseItems.push({
      key: "4",
      label: <div onClick={handleLogout}>Thông báo 1 </div>,
    });
    baseItems.push({
      key: "5",
      label: <div onClick={handleLogout}>Thông báo 2 </div>,
    });
    
    return baseItems;
  };

  const notis = getDropdownNotis();

  return (
    <>
      
      <WrapperHeader>
        <Logo onClick={() => {
          const roleUser = user?.role;
          if(roleUser === 'Admin'){
            navigate('/adminHome')
          } else if(roleUser === 'Staff'){
            navigate('/staffHome')
          } else {
            navigate('/')
          } 
        }}>
          <Image
            src={logoMenu}
            width="140px"
            preview={false}
          />
        </Logo>

        <NavbarListItem>
          <NavLink onClick={() => navigate("/post")}>
            Bài viết
          </NavLink>
          <NavLink onClick={() => navigate("/service")}>
            Dịch vụ
          </NavLink>
          {(user?.role === 'Owner' || user?.role === 'Rentor') && (
            <Dropdown menu={{ items: formItems }} placement="bottom">
              <NavLink>
                Đơn từ
              </NavLink>
            </Dropdown>
          )}
          
          <NotificationWrapper />
          
          {user ? (
            <Dropdown menu={{ items: items }} placement="bottomRight">
              <AvatarWrapper>
                <Image 
                  preview={false} 
                  style={{borderRadius:'100%'}} 
                  width='40px' 
                  height='40px' 
                  src={user.userImgUrl || avtBase}
                />
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
        </NavbarListItem>
      </WrapperHeader>
    </>
  );
}

export default HeaderComponent;