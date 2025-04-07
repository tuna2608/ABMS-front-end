import React from "react";
import { Button, Typography, Card, Layout } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const DownloadTemplatePage = () => {
  const handleDownload = () => {
    // Logic tải file sẽ được thêm sau
    console.log("Tải mẫu đơn");
  };

  return (
    <Content style={{ 
      padding: 24, 
      minHeight: 360, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Card
        style={{ 
          width: 600, 
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
        }}
      >
        <Title level={3}>Tải Mẫu Đơn</Title>
        
        <Paragraph>
          Nhấn nút bên dưới để tải mẫu đơn về máy của bạn
        </Paragraph>
        
        <Button 
          type="primary" 
          icon={<DownloadOutlined />} 
          size="large"
          onClick={handleDownload}
          style={{ 
            marginTop: 16,
            padding: '10px 30px' 
          }}
        >
          Tải Mẫu Đơn
        </Button>
      </Card>
    </Content>
  );
};

export default DownloadTemplatePage;