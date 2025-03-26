import React, { useState } from "react";
import { 
  Card, 
  Space, 
  Table, 
  Tabs 
} from "antd";
import { 
  DollarOutlined, 
  ThunderboltOutlined, 
  HomeOutlined 
} from "@ant-design/icons";

const { TabPane } = Tabs;

const UtilityManagement = () => {
  const [setUtilityType] = useState("electric");

  const electricColumns = [
    {
      title: 'Số căn hộ',
      dataIndex: 'apartmentId',
      key: 'apartmentId',
    },
    {
      title: 'Tên căn hộ',
      dataIndex: 'apartmentName',
      key: 'apartmentName',
    },
    {
      title: 'Chỉ số đầu',
      dataIndex: 'startIndex',
      key: 'startIndex',
    },
    {
      title: 'Chỉ số cuối',
      dataIndex: 'endIndex',
      key: 'endIndex',
    },
    {
      title: 'Tổng tiêu thụ',
      dataIndex: 'consumption',
      key: 'consumption',
      render: (consumption) => `${consumption} kWh`,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => `${new Intl.NumberFormat('vi-VN').format(amount)} VNĐ`,
    },
    {
      title: 'Ngày ghi nhận',
      dataIndex: 'recordDate',
      key: 'recordDate',
    }
  ];

  return (
    <Card 
      title={
        <Space>
          <DollarOutlined /> 
          <span>Quản lý khoản phí</span>
        </Space>
      } 
    >
      <Tabs 
        defaultActiveKey="electric" 
        onChange={(key) => setUtilityType(key)}
      >
        <TabPane 
          tab={
            <span>
              <ThunderboltOutlined />
              Điện
            </span>
          } 
          key="electric"
        >
          <Table 
            columns={electricColumns} 
            dataSource={[]} 
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </TabPane>
        <TabPane 
          tab={
            <span>
              <HomeOutlined />
              Nước
            </span>
          } 
          key="water"
        >
          <Table 
            columns={electricColumns} 
            dataSource={[]} 
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default UtilityManagement;