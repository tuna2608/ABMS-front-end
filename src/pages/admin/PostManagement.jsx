import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Table,
  Space,
  Modal,
  Upload,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileAddOutlined,
  BellOutlined,
} from "@ant-design/icons";

const PostManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postForm] = Form.useForm();

  const postsColumns = [
    {
      title: "Tiêu Đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tác Giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Hành Động",
      key: "actions",
      render: () => (
        <Space>
          <Button icon={<EditOutlined />} type="primary" ghost>
            Chỉnh Sửa
          </Button>
          <Button icon={<DeleteOutlined />} danger>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={
        <Space>
          <BellOutlined />
          <span>Danh Sách Bài Viết</span>
        </Space>
      }
      extra={
        <Button
          type="primary"
          icon={<FileAddOutlined />}
          onClick={() => setIsModalVisible(true)}
          style={{ 
            background: 'rgba(30, 58, 138, 0.92)',
          }}
        >
          Tạo Bài Viết Mới
        </Button>
      }
    >
      <Table columns={postsColumns} dataSource={[]} />

      <Modal
        title="Tạo Bài Viết Mới"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form form={postForm} layout="vertical">
          <Form.Item name="title" label="Tiêu Đề" rules={[{ required: true }]}>
            <Input placeholder="Nhập tiêu đề bài viết" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Chuyên Mục"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn chuyên mục">
              <Select.Option value="news">Tin Tức</Select.Option>
              <Select.Option value="guide">Hướng Dẫn</Select.Option>
              <Select.Option value="announcement">Thông Báo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="content"
            label="Nội Dung"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={10} placeholder="Nhập nội dung bài viết" />
          </Form.Item>
          <Form.Item name="coverImage" label="Ảnh Bìa">
            <Upload
              name="coverImage"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={true}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải Ảnh</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Xuất Bản Bài Viết
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default PostManagement;
