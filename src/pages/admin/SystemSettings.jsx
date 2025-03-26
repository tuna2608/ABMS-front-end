import React from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Select, 
  Switch, 
  Button, 
  Row, 
  Col, 
  Typography,
  Space 
} from 'antd';
import { 
  SettingOutlined, 
  GlobalOutlined, 
  LockOutlined,
  SaveOutlined 
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const SystemSettings = () => {
  const [generalForm] = Form.useForm();
  const [securityForm] = Form.useForm();

  const handleGeneralSettingsSave = (values) => {
    console.log('General Settings:', values);
  };

  const handleSecuritySettingsSave = (values) => {
    console.log('Security Settings:', values);
  };

  return (
    <Card 
      title={
        <Space>
          <SettingOutlined />
          <span>Cài Đặt Hệ Thống</span>
        </Space>
      }
    >
      <Row gutter={16}>
        <Col span={12}>
          <Card 
            type="inner" 
            title={
              <Space>
                <GlobalOutlined />
                <span>Cài Đặt Chung</span>
              </Space>
            }
          >
            <Form 
              form={generalForm} 
              layout="vertical"
              onFinish={handleGeneralSettingsSave}
            >
              <Form.Item 
                name="systemName" 
                label="Tên Hệ Thống"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập tên hệ thống" />
              </Form.Item>
              
              <Form.Item 
                name="language" 
                label="Ngôn Ngữ Mặc Định"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="vi">Tiếng Việt</Select.Option>
                  <Select.Option value="en">Tiếng Anh</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<SaveOutlined />}
                >
                  Lưu Cài Đặt Chung
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card 
            type="inner" 
            title={
              <Space>
                <LockOutlined />
                <span>Cài Đặt Bảo Mật</span>
              </Space>
            }
          >
            <Form 
              form={securityForm} 
              layout="vertical"
              onFinish={handleSecuritySettingsSave}
            >
              <Form.Item 
                name="passwordPolicy" 
                label="Chính Sách Mật Khẩu"
              >
                <Switch 
                  checkedChildren="Bật" 
                  unCheckedChildren="Tắt" 
                />
              </Form.Item>

              <Form.Item 
                name="maxLoginAttempts" 
                label="Số Lần Đăng Nhập Sai Tối Đa"
              >
                <Select defaultValue={5}>
                  {[3, 5, 7, 10].map(num => (
                    <Select.Option key={num} value={num}>
                      {num} Lần
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<SaveOutlined />}
                >
                  Lưu Cài Đặt Bảo Mật
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default SystemSettings;