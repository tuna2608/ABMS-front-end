import React from 'react';
import { Modal, Form, Input, Upload, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export const CreateServiceModal = ({ visible, onCancel, onSubmit, loading }) => {
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('facilityPostContent', values.content);
      
      // Handle file upload - change 'files' to 'file'
      const files = values.images?.fileList;
      if (files?.length > 0) {
        files.forEach(file => {
          if (file.originFileObj) {
            formData.append('file', file.originFileObj); // Changed from 'files' to 'file'
          }
        });
      }

      await onSubmit(formData);
    } catch (error) {
      console.error("Error creating facility:", error);
      message.error('Có lỗi xảy ra khi tạo bài viết');
    }
  };

  return (
    <Modal
      title="Tạo bài viết mới"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="content"
          label="Nội dung bài viết"
          rules={[{ required: true, message: "Vui lòng nhập nội dung bài viết!" }]}
        >
          <TextArea 
            rows={6} 
            placeholder="Mô tả chi tiết về dịch vụ của bạn..." 
            showCount
            maxLength={1000}
          />
        </Form.Item>

        <Form.Item
          name="images"
          label="Hình ảnh"
          rules={[{ required: true, message: "Vui lòng tải lên ít nhất 1 hình ảnh!" }]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            maxCount={5}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải ảnh</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Button style={{ marginRight: 8 }} onClick={onCancel}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Đăng bài
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const UpdateServiceModal = ({ visible, onCancel, onSubmit, loading, initialValues }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      
      formData.append('userId', initialValues.userId);
      formData.append('facilityPostContent', values.content);
      
      // Handle file upload - change 'files' to 'file'
      const files = values.images?.fileList;
      if (files?.length > 0) {
        files.forEach(file => {
          if (file.originFileObj) {
            formData.append('file', file.originFileObj); // Changed from 'files' to 'file'
          }
        });
      }

      await onSubmit(initialValues.id, formData);
      form.resetFields();
    } catch (error) {
      console.error("Error updating facility:", error);
      message.error('Có lỗi xảy ra khi cập nhật bài viết');
    }
  };

  return (
    <Modal
      title="Cập nhật bài viết"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <Form 
        form={form}
        layout="vertical" 
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          name="content"
          label="Nội dung bài viết"
          rules={[{ required: true, message: "Vui lòng nhập nội dung bài viết!" }]}
        >
          <TextArea 
            rows={6} 
            placeholder="Mô tả chi tiết về dịch vụ của bạn..." 
            showCount
            maxLength={1000}
          />
        </Form.Item>

        <Form.Item
          name="images"
          label="Hình ảnh"
          rules={[{ required: true, message: "Vui lòng tải lên ít nhất 1 hình ảnh!" }]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            maxCount={5}
            defaultFileList={initialValues?.images?.map((url, index) => ({
              uid: `-${index}`,
              name: `image-${index}`,
              status: 'done',
              url: url
            }))}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải ảnh</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Button style={{ marginRight: 8 }} onClick={onCancel}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};