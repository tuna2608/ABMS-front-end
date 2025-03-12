import { Badge, Button, Col, Dropdown, Flex, Image, Row } from "antd";
import React from "react";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import logoMenu from "../../../assets/common/images/logo-menu.png";
import { Input } from "antd";
const { Search } = Input;

const WrapperHeader = styled(Row)`
  height: 100px;
  padding: 0 120px;
  background-color: var(--cheadline);
  align-items: center;
`;

const Logo = styled(Col)`
  color: white;
  height: 100%;
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



function HeaderComponent() {
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
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];
  return (
    <WrapperHeader>
      <Logo span={4}>
        <Image
          src={logoMenu}
          width="175px"
          height="100%"
          preview={false}
        ></Image>
      </Logo>
      <Col span={14}>
        <Search
          placeholder="Tìm kiếm dịch vụ bạn muốn ?"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={onSearch}
        />
      </Col>
      <Col span={6}>
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
          <NavItem>
            <UserOutlined />
          </NavItem>
        </NavbarListItem>
      </Col>
    </WrapperHeader>
  );
}

export default HeaderComponent;
