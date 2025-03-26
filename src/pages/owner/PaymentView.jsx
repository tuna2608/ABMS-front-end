import React from 'react';
import { Card, Space, Empty } from 'antd';
import { WalletOutlined } from "@ant-design/icons";

const PaymentView = () => {
  return (
    <Card 
      title={
        <Space>
          <WalletOutlined /> 
          <span>Quản lý thanh toán</span>
        </Space>
      }
    >
      <Empty 
        description="Chưa có giao dịch thanh toán" 
        style={{ margin: '50px 0' }} 
      />
    </Card>
  );
};

export default PaymentView;