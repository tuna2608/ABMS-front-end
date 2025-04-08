import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getApartmentsWithoutHouseholder, deletePost, getPostsByUserId } from "../../redux/apiCalls";
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
  Tag,
  message,
  DatePicker,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileAddOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import CreatePostModal from './CreatePostModal';
import EditPostModal from './EditPostModal';

const { Search } = Input;

const ROLE_OPTIONS = [
  { value: 'all', label: 'Tất cả bài đăng' },
  { value: 'Owner', label: 'Bài đăng của Owner' },
  { value: 'Admin', label: 'Bài đăng của Admin' }
];

const PostManagement = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postForm] = Form.useForm();
  const [roleFilter, setRoleFilter] = useState('all');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [apartments, setApartments] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    fetchPosts();
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const response = await getApartmentsWithoutHouseholder(dispatch);
      if (response.success) {
        setApartments(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching apartments:", error);
      message.error("Không thể tải danh sách căn hộ");
    }
  };

  const getFilteredData = () => {
    if (!posts) return [];

    let data = [...posts]; // Tạo bản sao của posts

    // Áp dụng filter theo role
    if (roleFilter !== 'all') {
      data = data.filter(post => post.role === roleFilter);
    }

    // Áp dụng search text nếu có
    if (searchText) {
      data = data.filter(post =>
        post.title.toLowerCase().includes(searchText.toLowerCase()) ||
        post.apartment?.apartmentName?.toLowerCase().includes(searchText.toLowerCase()) ||
        post.fullName?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return data;
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getAllPosts(dispatch);
      if (response.data) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      message.error("Không thể tải danh sách bài viết");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = (record) => {
    Modal.confirm({
        title: 'Xác Nhận Xóa Bài Viết',
        content: 'Bạn có chắc chắn muốn xóa bài viết này?',
        onOk: async () => {
            try {
                const response = await deletePost(record.postId);

                if (response.success) {
                    message.success('Xóa bài viết thành công!');
                    // Gọi lại fetchPosts để lấy danh sách mới nhất
                    fetchPosts();
                } else {
                    message.error(response.message);
                }
            } catch (error) {
                console.error('Lỗi khi xóa bài đăng:', error);
                message.error('Có lỗi xảy ra khi xóa bài đăng');
            }
        }
    });
};

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleEdit = (record) => {
    setSelectedPost(record);
    setIsEditModalVisible(true);
  };

  const handleRoleFilterChange = (value) => {
    setRoleFilter(value);
  };

  const postsColumns = [
    {
      title: "Tiêu Đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Người đăng",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Loại Tin",
      dataIndex: "postType",
      key: "postType",
      render: (type) => {
        const colorMap = {
          'Cho thuê': 'blue',
          'Bán': 'green',
        };
        return <Tag color={colorMap[type] || 'default'}>{type}</Tag>;
      }
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price)
    },
    {
      title: "Tiền Cọc",
      dataIndex: "depositPrice",
      key: "depositPrice",
      render: (price) => new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price)
    },
    {
      title: "Ngày Tạo",
      dataIndex: "postDate",
      key: "postDate",
      render: (date) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      title: "Trạng Thái Đặt Cọc",
      dataIndex: "depositCheck",
      key: "depositCheck",
      render: (status) => {
        let color = 'default';
        let text = 'Chưa Đặt Cọc';

        switch (status) {
          case 'ongoing':
            color = 'processing';
            text = 'Đang Đặt Cọc';
            break;
          case 'done':
            color = 'success';
            text = 'Đã Đặt Cọc';
            break;
          case 'none':
          default:
            color = 'default';
            text = 'Chưa Đặt Cọc';
        }

        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: "Căn Hộ",
      dataIndex: ["apartment", "apartmentName"],
      key: "apartmentName"
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (_, record) => (
        <Space>
          {record.role !== 'Owner' && (
            <Button
              icon={<EditOutlined />}
              type="primary"
              ghost
              onClick={() => handleEdit(record)}
            >
              Chỉnh Sửa
            </Button>
          )}
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeletePost(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
    }
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
        <Space>
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={handleRoleFilterChange}
            options={ROLE_OPTIONS}
            value={roleFilter}
          />
          <Search
            placeholder="Tìm kiếm bài viết"
            allowClear
            onSearch={handleSearch}
            style={{ width: 200 }}
            value={searchText}
          />
          <Button
            type="primary"
            icon={<FileAddOutlined />}
            onClick={() => setIsModalVisible(true)}
            style={{ background: 'rgba(30, 58, 138, 0.92)' }}
          >
            Tạo Bài Viết Mới
          </Button>
        </Space>
      }
    >
      <Table
        columns={postsColumns}
        dataSource={getFilteredData()}
        loading={loading}
        rowKey="postId"
        pagination={{
          total: getFilteredData().length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} bài viết`
        }}
      />

      <CreatePostModal
        isModalVisible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        postForm={postForm}
        apartments={apartments} 
        onSuccess={() => {
          setIsModalVisible(false);
          fetchPosts();
        }}
        currentUser={currentUser}
      />

      <EditPostModal
        isModalVisible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        initialValues={selectedPost}
        onSuccess={fetchPosts}
        currentUser={currentUser}
      />
    </Card>
  );
};

export default PostManagement;