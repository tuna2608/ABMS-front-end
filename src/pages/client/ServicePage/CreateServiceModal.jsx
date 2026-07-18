import React from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export const CreateServiceModal = ({ visible, onCancel, onSubmit, loading, currentUser }) => {
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      // Append basic fields
      formData.append("userId", currentUser?.userId);
      formData.append("facilityHeader", values.title);
      formData.append("facilityPostContent", values.content);

      // Handle file uploads
      const fileList = values.images?.fileList;
      if (fileList?.length > 0) {
        fileList.forEach((file) => {
          if (file.originFileObj) {
            formData.append("file", file.originFileObj);
          }
        });
      }

      await onSubmit(values);
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo bài viết");
    }
  };

  return (
    <Modal title="Tạo bài viết mới" open={visible} onCancel={onCancel} footer={null} width={600}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Tiêu đề bài viết"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề bài viết!" }]}
        >
          <Input placeholder="Nhập tiêu đề bài viết..." maxLength={200} />
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
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                message.error("Chỉ hỗ trợ file ảnh!");
                return false;
              }
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                message.error("Kích thước ảnh phải nhỏ hơn 2MB!");
                return false;
              }
              return false; // Return false to prevent auto upload
            }}
            maxCount={5}
            accept="image/*"
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải ảnh</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
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
