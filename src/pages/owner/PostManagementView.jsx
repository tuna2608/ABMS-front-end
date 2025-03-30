import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Space, 
  Button, 
  Table, 
  Tag, 
  Modal, 
  Form, 
  Select, 
  Input, 
  Upload, 
  Row, 
  Col, 
  message,
  InputNumber
} from 'antd';
import { 
  FormOutlined, 
  PlusOutlined, 
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { getAllPosts } from "../../redux/apiCalls";

const { TextArea } = Input;

const PostManagementView = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [postForm] = Form.useForm();
  const [posts, setPosts] = useState([]);
  const [fileList, setFileList] = useState([]);

  const dispatch = useDispatch();

  // Fetch posts on component mount
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await getAllPosts(dispatch);
        setPosts(res.data);
      } catch (error) {
        message.error('Không thể tải danh sách bài viết');
      }
    }
    fetchPosts();
  }, [dispatch]);

  // Post type options
  const postTypes = [
    { value: 'apartment_rent', label: 'Cho Thuê Căn Hộ' },
    { value: 'apartment_sale', label: 'Bán Căn Hộ' },
    { value: 'roommate', label: 'Tìm Bạn Ở Ghép' },
    { value: 'community', label: 'Thông Báo Cộng Đồng' }
  ];

  // Status options
  const statusOptions = [
    { value: '0', label: 'Đã Đăng', color: 'green' },
    { value: '1', label: 'Chờ Xét Duyệt', color: 'orange' }
  ];

  // Image upload handling
  const handleImageUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  // Form submission handler
  const handlePostSubmit = (values) => {
    Modal.confirm({
      title: 'Xác Nhận Gửi Bài',
      content: 'Bạn có chắc muốn gửi bài viết này?',
      onOk() {
        // Prepare post data matching the expected structure
        const newPostData = {
          title: values.title,
          content: values.content,
          price: values.price,
          postType: values.postType,
          depositCheck: '1', // Default to pending
          userName: 'Người dùng hiện tại', // TODO: Replace with actual user
          postImages: fileList.map(file => URL.createObjectURL(file.originFileObj)),
          apartment: {
            apartmentName: values.apartmentName,
            numberOfBedrooms: values.numberOfBedrooms || 0,
            numberOfBathrooms: values.numberOfBathrooms || 0
          },
          views: 0
        };

        // If editing existing post
        if (currentPost) {
          const updatedPosts = posts.map(post => 
            post.postId === currentPost.postId 
              ? { ...post, ...newPostData } 
              : post
          );
          setPosts(updatedPosts);
          message.success('Bài viết đã được cập nhật!');
        } else {
          // Add new post
          const newPost = {
            ...newPostData,
            postId: (posts.length + 1).toString()
          };
          setPosts([...posts, newPost]);
          message.success('Bài viết đã được gửi chờ xét duyệt!');
        }
        
        postForm.resetFields();
        setFileList([]);
        setIsModalVisible(false);
        setCurrentPost(null);
      }
    });
  };

  // Handle post actions
  const handlePostAction = (action, record) => {
    switch(action) {
      case 'delete':
        Modal.confirm({
          title: 'Xóa Bài Viết',
          content: 'Bạn có chắc muốn xóa bài viết này?',
          onOk() {
            setPosts(posts.filter(post => post.postId !== record.postId));
            message.success('Bài viết đã được xóa');
          }
        });
        break;
      case 'view':
        Modal.info({
          title: 'Chi Tiết Bài Viết',
          content: (
            <div>
              <p><strong>Tiêu đề:</strong> {record.title}</p>
              <p><strong>Loại:</strong> {postTypes.find(type => type.value === record.postType)?.label}</p>
              <p>
                <strong>Trạng thái:</strong> 
                <Tag color={statusOptions.find(s => s.value === record.depositCheck)?.color}>
                  {statusOptions.find(s => s.value === record.depositCheck)?.label}
                </Tag>
              </p>
              <p><strong>Nội dung:</strong> {record.content}</p>
              <p><strong>Giá:</strong> {new Intl.NumberFormat('vi-VN').format(record.price)} VNĐ/tháng</p>
              <p><strong>Người đăng:</strong> {record.userName}</p>
            </div>
          )
        });
        break;
      case 'edit':
        // Populate form with existing post data
        setCurrentPost(record);
        postForm.setFieldsValue({
          postType: record.postType,
          title: record.title,
          content: record.content,
          price: record.price,
          apartmentName: record.apartment?.apartmentName,
          numberOfBedrooms: record.apartment?.numberOfBedrooms,
          numberOfBathrooms: record.apartment?.numberOfBathrooms
        });
        setIsModalVisible(true);
        break;
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Tiêu Đề',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Loại Bài Viết',
      dataIndex: 'postType',
      key: 'postType',
      render: (type) => {
        const postType = postTypes.find(t => t.value === type);
        return postType ? postType.label : type;
      }
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'depositCheck',
      key: 'depositCheck',
      render: (status) => {
        const statusInfo = statusOptions.find(s => s.value === status);
        return statusInfo ? (
          <Tag color={statusInfo.color}>
            {statusInfo.label}
          </Tag>
        ) : status;
      }
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => handlePostAction('view', record)}
            type="text"
          >
            Xem
          </Button>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handlePostAction('edit', record)}
            type="text"
          >
            Chỉnh Sửa
          </Button>
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handlePostAction('delete', record)}
            type="text" 
            danger
          >
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
          <FormOutlined />
          <span>Quản Lý Bài Viết</span>
        </Space>
      }
      extra={
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => {
            postForm.resetFields();
            setFileList([]);
            setIsModalVisible(true);
            setCurrentPost(null);
          }}
        >
          Thêm Bài Viết
        </Button>
      }
    >
      <Table 
        columns={columns} 
        dataSource={posts}
        pagination={false}
      />

      <Modal
        title={currentPost ? "Chỉnh Sửa Bài Viết" : "Tạo Bài Viết Mới"}
        visible={isModalVisible}
        onOk={() => postForm.submit()}
        onCancel={() => {
          setIsModalVisible(false);
          setCurrentPost(null);
          postForm.resetFields();
          setFileList([]);
        }}
        width={800}
        okText={currentPost ? "Cập Nhật" : "Gửi Bài Viết"}
        cancelText="Hủy"
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
                name="price"
                label="Giá Thuê"
                rules={[{ required: true, message: 'Vui lòng nhập giá thuê' }]}
              >
                <InputNumber 
                  style={{ width: '100%' }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  addonAfter="VNĐ/tháng"
                  placeholder="Nhập giá thuê"
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

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="apartmentName"
                label="Tên Căn Hộ"
                rules={[{ required: true, message: 'Vui lòng nhập tên căn hộ' }]}
              >
                <Input placeholder="Nhập tên căn hộ" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="numberOfBedrooms"
                label="Số Phòng Ngủ"
              >
                <InputNumber 
                  style={{ width: '100%' }} 
                  min={0} 
                  placeholder="Nhập số phòng ngủ" 
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="numberOfBathrooms"
                label="Số Phòng Tắm"
              >
                <InputNumber 
                  style={{ width: '100%' }} 
                  min={0} 
                  placeholder="Nhập số phòng tắm" 
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="images"
            label="Hình Ảnh"
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleImageUpload}
              multiple
              beforeUpload={() => false} // Prevent auto upload
            >
              {fileList.length < 5 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải Ảnh</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default PostManagementView;