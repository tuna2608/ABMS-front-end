import React, { useState, useEffect } from 'react';
import {
    Card,
    Space,
    Form,
    Button,
    Modal,
    Table,
    message,
    Tag
} from 'antd';
import {
    FormOutlined,
    PlusOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux';
import {
    getOwnApartments,
    getAllPosts,
    deletePost,
    getPostsByUserId
} from '../../redux/apiCalls';
import CreatePostModal from './CreatePostModal';
import EditPostModal from './EditPostModal';

const PostManagementView = () => {
    const [apartments, setApartments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    // State for edit modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentEditPost, setCurrentEditPost] = useState(null);
    const [editForm] = Form.useForm();

    // Handle Edit Button Click
    const handleEditClick = (record) => {
        setCurrentEditPost(record);
        editForm.setFieldsValue({
            title: record.title,
            content: record.content,
            price: record.price,
            area: record.area,
            direction: record.direction,
            floor: record.floor,
            numberOfBedrooms: record.numberOfBedrooms,
            numberOfBathrooms: record.numberOfBathrooms,
            depositPrice: record.depositPrice || 0,
            postType: record.postType
        });
        setIsEditModalOpen(true);
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

                        const postsResponse = await getPostsByUserId(dispatch, currentUser.userId);
                        if (postsResponse.success) {
                            setPosts(postsResponse.data);
                        } else {
                            message.error(postsResponse.message);
                            setPosts(postsResponse.data || []);
                        }
                    } else {
                        message.error(response.message);
                        setPosts([]);
                    }
                } catch (error) {
                    console.error('Lỗi khi xóa bài đăng:', error);
                    message.error('Có lỗi xảy ra khi xóa bài đăng');
                    setPosts([]);
                }
            }
        });
    };
    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            if (!currentUser) {
                message.error('Vui lòng đăng nhập');
                return;
            }
            setLoading(true);
            try {
                const apartmentsResponse = await getOwnApartments(currentUser.userId);
                if (apartmentsResponse.success) {
                    setApartments(apartmentsResponse.data);
                }
                try {
                    const postsResponse = await getPostsByUserId(dispatch, currentUser.userId);
                    if (postsResponse.success) {
                        setPosts(postsResponse.data);
                    } else {
                        message.error(postsResponse.message);
                    }
                } catch (error) {
                    console.error("Error fetching posts:", error);
                    message.error("Có lỗi xảy ra khi tải bài viết");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                message.error("Có lỗi xảy ra khi tải dữ liệu");
            }
            setLoading(false);
        };
        fetchData();
    }, [currentUser, dispatch]);

    // Table columns
    const columns = [
        {
            title: 'Tiêu Đề',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Loại Bài Viết',
            dataIndex: 'postType',
            key: 'postType'
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ'
        },
        {
            title: 'Trạng Thái Đặt Cọc',
            dataIndex: 'depositCheck',
            key: 'depositCheck',
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
            title: 'Số Căn Hộ',
            key: 'apartmentNumber',
            render: (_, record) => {
                // Check if apartment data exists and has apartmentNumber
                if (record.apartment && record.apartment.apartmentNumber) {
                    return record.apartment.apartmentNumber;
                } else {
                    // Try to derive from name if possible or show placeholder
                    const apartmentName = record.apartment ? record.apartment.apartmentName : '';
                    const match = apartmentName.match(/\d{2,3}/); // Look for 2-3 digit numbers
                    return match ? match[0] : 'N/A';
                }
            }
        },
        {
            title: 'Người Đăng',
            dataIndex: 'userName',
            key: 'userName'
        },
        {
            title: 'Thao Tác',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<FormOutlined />}
                        type="text"
                        onClick={() => handleEditClick(record)}
                    >
                        Sửa
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        type="text"
                        danger
                        onClick={() => handleDeletePost(record)}
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
                        setIsModalOpen(true);
                    }}
                    style={{
                        background: 'rgba(30, 58, 138, 0.92)',
                    }}
                >
                    Thêm Bài Viết
                </Button>
            }
        >
            <Table
                columns={columns}
                dataSource={posts || []}
                loading={loading}
                rowKey="postId"
                pagination={{
                    total: posts?.length || 0,
                    showSizeChanger: true,
                    showQuickJumper: true
                }}
            />

            <CreatePostModal 
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                apartments={apartments}
                currentUser={currentUser}
                dispatch={dispatch}
            />

            <EditPostModal 
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                currentEditPost={currentEditPost}
                editForm={editForm}
                currentUser={currentUser}
                dispatch={dispatch}
                setPosts={setPosts}
            />
        </Card>
    );
};

export default PostManagementView;