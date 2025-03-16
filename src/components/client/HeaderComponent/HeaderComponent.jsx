import { Badge, Button, Col, Dropdown, Flex, Image, Row } from "antd";
import React from "react";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import logoMenu from "../../../assets/common/images/logo-menu.png";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const WrapperHeader = styled(Row)`
  height: 100px;
  padding: 0 120px;
  background-color: var(--cheadline);
  align-items: center;
`;

const TopBar = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  background: white;
  color: #dc2626;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
`;

const Logo = styled(Col)`
  color: white;
  height: 100%;
  &:hover{
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

const TopBarItem = styled.div`
  &:hover {
    cursor: pointer;
  }
`

function HeaderComponent() {
  const userLocal = localStorage.getItem("user");
  let user;

  if (typeof userLocal === "string" && userLocal !== null) {
    try {
      user = JSON.parse(userLocal);
    } catch (error) {
      console.error("Lỗi khi parse dữ liệu:", error);
      user = null;
    }
  }
  console.log(user);

  const navigate = useNavigate();
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Edit profile
        </a>
      ),
    },
    {
      key: "2",
      label: <div onClick={handleLogout}>Logout</div>,
    },
  ];

  function handleLogout(){
    localStorage.clear();
    navigate('/login');
  }

  return (
    <>
      <WrapperHeader>
        <Logo span={4} onClick={()=> navigate('/')}>
          <Image
            src={logoMenu}
            width="175px"
            height="100%"
            preview={false}
          ></Image>
        </Logo>
        <Col span={10}>
          <Search
            placeholder="Tìm kiếm dịch vụ bạn muốn ?"
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            onSearch={onSearch}
          />
        </Col>
        <Col span={10}>
          <NavbarListItem>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
            >
              <Badge count={13} overflowCount={10}>
                <NavItem>
                  <BellOutlined />
                </NavItem>
              </Badge>
            </Dropdown>
            {user ? (
              <Dropdown menu={{ items }} placement="bottomRight">
                <NavItemAVT>
                  <p>
                    {user.user} - {user.role}
                  </p>
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
      <TopBar>
        {user?.role === "Chủ căn hộ" && (
          <TopBarItem onClick={() => navigate("/ownerHome")}>Kênh chủ căn hộ</TopBarItem>
        )}
        {user?.role === "Người thuê" && <TopBarItem>Kênh người thuê căn hộ</TopBarItem>}
      </TopBar>
    </>
  );
}

export default HeaderComponent;
