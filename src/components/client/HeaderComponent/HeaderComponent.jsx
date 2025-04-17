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
import NotificationWrapper from "./NotificationWrapper"; // Import the new component

const { Search } = Input;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f3f3f3;
  padding: 8px 120px;
  font-size: 14px;
  font-weight: 500;
`;

const TopBarInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  color: var(--cheadline);

  span {
    margin-right: 16px;
  }
`;

const TopBarIcon = styled.a`
  color: var(--cheadline);
  font-size: 24px;
  margin-left: 16px;

  &:hover {
    color: var(--csecondary);
  }
`;

const WrapperHeader = styled(Row)`
  height: 100px;
  padding: 0 120px;
  background-color: var(--cheadline);
  align-items: center;
`;

const Logo = styled(Col)`
  color: white;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const NavbarListItem = styled(Flex)`
  gap: 20px;
  justify-content: end;
`;

const PostLink = styled(Button)`
  color: white;
  background-color: transparent;
  border: none;
  font-size: 16px;
  transition: color 0.3s;

  &:hover {
    color: var(--csecondary);
    background-color: transparent;
  }
`;
const ServiceLink = styled(Button)`
  color: white;
  background-color: transparent;
  border: none;
  font-size: 16px;
  transition: color 0.3s;

  &:hover {
    color: var(--csecondary);
    background-color: transparent;
  }
`;

const NavItemAVT = styled.div`
  display: flex;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 50px;
  background-color: white;
  color: var(--cheadline);
  font-size: 20px;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background-color: var(--csecondary);
    color: white;
  }
`;

function HeaderComponent() {
  const user = useSelector((state) => state.user.currentUser);
  
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  function handleLogout() {
    logoutDispatch(dispatch);
    navigate("/login");
  }

  // Define dropdown items based on user role
  const getDropdownItems = () => {
    const baseItems = [
      {
        key: "1",
        label: <div onClick={() => navigate('/edit-profile')}>Edit profile</div>,
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
    if ( user?.role === 'User') {
      baseItems.push({
        key: "3",
        label: <div onClick={() => navigate("/deposit-apartment")}>Căn hộ đã đặt cọc</div>,
      });
    }
    
    // Add logout option
    baseItems.push({
      key: "4",
      label: <div onClick={handleLogout}>Logout</div>,
    });
    
    return baseItems;
  };

  const items = getDropdownItems();

  const getDropdownNotis = () => {
    const baseItems = [
      {
        key: "1",
        label: <div onClick={() => {console.log('tat ca thong bao');
        }}>Tất cả thông báo</div>,
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
    
    // Add logout option
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
      <TopBar>
        <TopBarInfo>
          <span>Phone number: 0775420232</span>
          <span>Email: pnamhuynhle@gmail.com</span>
        </TopBarInfo>

        <div>
          <TopBarIcon href="#">
            <FacebookFilled />
          </TopBarIcon>
          <TopBarIcon href="#">
            <InstagramFilled />
          </TopBarIcon>
        </div>
      </TopBar>
      
      <WrapperHeader>
        <Logo span={4} onClick={() =>{
          const roleUser = user.role;
          if(roleUser === 'Admin'){
            navigate('/adminHome')
          }else if(roleUser === 'Staff'){
            navigate('/staffHome')
          }else {
            navigate('/')
          } 
        } }>
          <Image
            src={logoMenu}
            width="175px"
            height="100%"
            preview={false}
          ></Image>
        </Logo>

        <Col span={10}>
          {(user?.role === 'Owner' || user?.role === 'Rentor') && (
            <Search
              placeholder="Tìm kiếm dịch vụ bạn muốn ?"
              allowClear
              enterButton="Tìm kiếm"
              size="large"
              onSearch={onSearch}
            />
          )}
        </Col>

        <Col span={10}>
          <NavbarListItem>
            
            <PostLink onClick={() => navigate("/post")}>
              Bài viết
            </PostLink>
            <ServiceLink onClick={() => navigate("/service")}>
              Dịch vụ
            </ServiceLink>
            

            <NotificationWrapper />

            {user ? (
              <Dropdown menu={{ items: items }} placement="bottomRight">
                <NavItemAVT>
                  <p>{user.userName} - {user.role}</p>
                  <Image preview={false} style={{borderRadius:'100%'}} width='40px' height='40px' src={user.userImgUrl || avtBase}/>
                </NavItemAVT>
              </Dropdown>
            ) : (
              <>
                <Button onClick={() => navigate("/login")}>Login</Button>
                <Button onClick={() => navigate("/register")}>Register</Button>
              </>
            )}
          </NavbarListItem>
        </Col>
      </WrapperHeader>
    </>
  );
}

export default HeaderComponent;