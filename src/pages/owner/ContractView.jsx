import React from 'react';
import { Card, Space, Empty } from 'antd';
import { FileProtectOutlined } from "@ant-design/icons";

const ContractView = () => {
  return (
    <Card 
      title={
        <Space>
          <FileProtectOutlined /> 
          <span>Quản lý hợp đồng</span>
        </Space>
      }
    >
      <Empty 
        description="Chưa có hợp đồng nào" 
        style={{ margin: '50px 0' }} 
      />
    </Card>
  );
};

export default ContractView;