import { Badge, Button, Col, Dropdown, Flex, Image, Row } from "antd";
import React from "react";
import { BellOutlined, FacebookFilled, InstagramFilled } from "@ant-design/icons";
import styled from "styled-components";
import logoMenu from "../../../assets/common/images/logo-menu.png";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { logoutDispatch } from "../../../redux/apiCalls";
import avtBase from "../../../assets/common/images/avtbase.jpg";

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

const NavItem = styled(Button)`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: white;
  color: var(--cheadline);
  font-size: 20px;
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

const NavItemRole = styled(Button)`
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

function HeaderComponent() {
  const user = useSelector((state) => state.user.currentUser);
  
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const items = [
    {
      key: "1",
      label: <div onClick={() => navigate('/edit-profile')}>Edit profile</div>,
    },
    {
      key: "2",
      label: <div>Kênh chủ căn hộ</div>,
      disable: (user?.role === 'Rentor') ? "false" : "true",
      visible: (user?.role === 'Owner') ? "true" : "false"
    },
    {
      key: "3",
      label: <div>Kênh người thuê căn hộ</div>,
      disable: (user?.role === 'Rentor') ? "false" : "true",
      visible: (user?.role === 'Rentor') ? "true" : "false"
    },
    {
      key: "4",
      label: <div onClick={handleLogout}>Logout</div>,
    },
  ];

  function handleLogout() {
    logoutDispatch(dispatch);
    navigate("/login");
  }

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
        <Logo span={4} onClick={() => navigate("/")}>
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
            {user?.role === 'Owner' && (
              <NavItemRole onClick={() => navigate("/ownerHome")}>
                Kênh chủ căn hộ
              </NavItemRole>
            )}
            {user?.role === 'Rentor' && (
              <NavItemRole onClick={() => navigate("/rentorHome")}>
                Kênh người thuê
              </NavItemRole>
            )}

            <PostLink onClick={() => navigate("/post")}>
              Bài viết
            </PostLink>

            <Dropdown menu={{ items }} placement="bottomLeft">
              <Badge count={13} overflowCount={10}>
                <NavItem>
                  <BellOutlined />
                </NavItem>
              </Badge>
            </Dropdown>

            {user ? (
              <Dropdown menu={{ items }} placement="bottomRight">
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