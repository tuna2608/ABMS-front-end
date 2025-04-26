import React from 'react';
import { Modal, Form, Input, Upload, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export const UpdateServiceModal = ({ visible, onCancel, onSubmit, loading, initialValues }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('userId', initialValues.userId);
      formData.append('facilityHeader', values.title);
      formData.append('facilityPostContent', values.content);

      // Chỉ gửi file mới
      const fileList = values.images?.fileList || [];
      fileList.forEach(file => {
        if (file.originFileObj) {
          formData.append('file', file.originFileObj);
        }
      });

      await onSubmit(initialValues.id, formData);
    } catch (error) {
      console.error("Error updating facility:", error);
      message.error(error.message || 'Có lỗi xảy ra khi cập nhật bài viết');
    }
  };

  // Reset form when initialValues change
  React.useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue({
        title: initialValues.title,
        content: initialValues.content,
        images: { fileList: initialValues.images || [] }
      });
    }
  }, [visible, initialValues, form]);

  return (
    <Modal
      title="Cập nhật bài viết"
      open={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
      width={600}
    >
      <Form 
        form={form}
        layout="vertical" 
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label="Tiêu đề bài viết"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề bài viết!" }]}
        >
          <Input 
            placeholder="Nhập tiêu đề bài viết..." 
            maxLength={200}
          />
        </Form.Item>

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
          extra="Hỗ trợ: .PNG, .JPG, .JPEG (Tối đa 5 ảnh)"
        >
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              const isImage = file.type.startsWith('image/');
              if (!isImage) {
                message.error('Chỉ hỗ trợ file ảnh!');
                return false;
              }
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                message.error('Kích thước ảnh phải nhỏ hơn 2MB!');
                return false;
              }
              return false; // Return false to prevent auto upload
            }}
            maxCount={5}
            defaultFileList={initialValues?.images}
            accept="image/*"
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải ảnh</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Button 
            style={{ marginRight: 8 }} 
            onClick={() => {
              form.resetFields();
              onCancel();
            }}
          >
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