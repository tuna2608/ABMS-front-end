import { Col} from "antd";
import React from "react";
import { WrapperHeader } from "./style";

function HeaderComponent() {
  return (
    <div>
      <WrapperHeader>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
      </WrapperHeader>
    </div>
    
  );
}

export default HeaderComponent;
