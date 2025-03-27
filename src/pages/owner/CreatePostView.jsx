import React, { useState } from 'react';
import { 
  Card, 
  Space, 
  Form, 
  Select, 
  Input, 
  Button, 
  Modal, 
  Upload, 
  Row, 
  Col, 
  Switch,
  Typography,
  message
} from 'antd';
import { 
  FormOutlined, 
  PlusOutlined, 
  UploadOutlined 
} from "@ant-design/icons";

const { TextArea } = Input;
const { Text } = Typography;

const CreatePostView = () => {
  const [postForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  // Post type options
  const postTypes = [
    { value: 'apartment_rent', label: 'Cho Thuê Căn Hộ' },
    { value: 'apartment_sale', label: 'Bán Căn Hộ' },
    { value: 'roommate', label: 'Tìm Bạn Ở Ghép' },
    { value: 'community', label: 'Thông Báo Cộng Đồng' }
  ];

  // Apartment list (mock data)
  const apartments = [
    { id: 1, code: 'A101', name: 'Chung Cư Luxury', price: 2000000 },
    { id: 2, code: 'B202', name: 'Căn Hộ Cao Cấp', price: 2500000 }
  ];

  // Image upload handling
  const handleImageUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  // Convert file to base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Form submission handler
  const handlePostSubmit = (values) => {
    // Validation and submission logic
    Modal.confirm({
      title: 'Xác Nhận Đăng Bài',
      content: 'Bạn có chắc muốn đăng bài viết này?',
      onOk() {
        // Add your submission logic here
        message.success('Bài viết đã được tạo thành công!');
        postForm.resetFields();
        setFileList([]);
      }
    });
  };

  return (
    <Card
      title={
        <Space>
          <FormOutlined />
          <span>Tạo Bài Viết Mới</span>
        </Space>
      }
    >
      <Form
        form={postForm}
        layout="vertical"
        onFinish={handlePostSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="postType"
              label="Loại Bài Viết"
              rules={[{ required: true, message: 'Vui lòng chọn loại bài viết' }]}
            >
              <Select 
                placeholder="Chọn loại bài viết"
                options={postTypes}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="apartment"
              label="Căn Hộ Liên Quan"
            >
              <Select 
                placeholder="Chọn căn hộ (nếu có)"
                options={apartments.map(apt => ({
                  value: apt.id,
                  label: `${apt.code} - ${apt.name}`
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="title"
          label="Tiêu Đề"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <Input placeholder="Nhập tiêu đề bài viết" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Nội Dung"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
        >
          <TextArea 
            rows={6} 
            placeholder="Nhập nội dung chi tiết" 
          />
        </Form.Item>

        <Form.Item
          name="images"
          label="Hình Ảnh"
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleImageUpload}
            onPreview={handlePreview}
            multiple
          >
            {fileList.length < 5 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải Ảnh</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          name="isPublished"
          label="Trạng Thái"
          valuePropName="checked"
        >
          <Switch 
            checkedChildren="Xuất Bản" 
            unCheckedChildren="Bản Nháp" 
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block
          >
            Tạo Bài Viết
          </Button>
        </Form.Item>
      </Form>

      <Modal
        visible={previewVisible}
        title="Xem Trước Hình Ảnh"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img 
          alt="preview" 
          style={{ width: '100%' }} 
          src={previewImage} 
        />
      </Modal>
    </Card>
  );
};

export default CreatePostView;