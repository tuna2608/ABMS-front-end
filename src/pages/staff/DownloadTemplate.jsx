import React from "react";
import { Button, Typography, Card, Layout, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const DownloadTemplatePage = () => {
  const handleDownload = () => {
    // Sample Google Drive link with a public accessible document
    const sampleDocumentLink = 
      "https://drive.google.com/drive/folders/1F5E7XpvsAoIrVOXZ0KBq3t3ryOsy28QA?usp=drive_link";
    
    try {
      // Open the link in a new tab
      window.open(sampleDocumentLink, '_blank');
      
      // Optional: Show a success message
      message.success('Đang tải mẫu đơn. Vui lòng kiểm tra trình duyệt của bạn.');
    } catch (error) {
      // Handle any potential errors
      message.error('Có lỗi xảy ra khi tải mẫu đơn. Vui lòng thử lại.');
      console.error('Download error:', error);
    }
  };

  return (
    <Content 
      style={{
        padding: 24,
        minHeight: 360,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
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