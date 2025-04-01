import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Select, 
  Button, 
  Table, 
  Space, 
  Modal, 
  InputNumber, 
  Row, 
  Col 
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  HomeOutlined 
} from '@ant-design/icons';

const ApartmentManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [apartmentForm] = Form.useForm();

  const apartmentColumns = [
    {
      title: 'Mã Căn Hộ',
      dataIndex: 'apartmentCode',
      key: 'apartmentCode',
    },
    {
      title: 'Diện Tích (m²)',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Số Phòng Ngủ',
      dataIndex: 'bedrooms',
      key: 'bedrooms',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Hành Động',
      key: 'actions',
      render: () => (
        <Space>
          <Button icon={<EditOutlined />} type="primary" ghost>
            Chỉnh Sửa
          </Button>
          <Button icon={<DeleteOutlined />} danger>
            Xóa
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Card 
      title={
        <Space>
          <HomeOutlined />
          <span>Quản Lý Căn Hộ</span>
        </Space>
      }
      extra={
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => setIsModalVisible(true)}
          style={{ 
            background: 'rgba(30, 58, 138, 0.92)',
          }}
        >
          Thêm Căn Hộ Mới
        </Button>
      }
    >
      <Table columns={apartmentColumns} dataSource={[]} />

      <Modal
        title="Thêm Căn Hộ Mới"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={apartmentForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="apartmentCode" 
                label="Mã Căn Hộ" 
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập mã căn hộ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="area" 
                label="Diện Tích (m²)" 
                rules={[{ required: true }]}
              >
                <InputNumber 
                  style={{ width: '100%' }} 
                  placeholder="Nhập diện tích" 
                  min={0} 
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="bedrooms" 
                label="Số Phòng Ngủ" 
                rules={[{ required: true }]}
              >
                <InputNumber 
                  style={{ width: '100%' }} 
                  min={1} 
                  max={10} 
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="status" 
                label="Trạng Thái" 
                rules={[{ required: true }]}
              >
                <Select placeholder="Chọn trạng thái">
                  <Select.Option value="available">Còn Trống</Select.Option>
                  <Select.Option value="occupied">Đã Cho Thuê</Select.Option>
                  <Select.Option value="maintenance">Bảo Trì</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item 
            name="description" 
            label="Mô Tả Thêm"
          >
            <Input.TextArea rows={3} placeholder="Nhập mô tả chi tiết" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Tạo Căn Hộ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ApartmentManagement;