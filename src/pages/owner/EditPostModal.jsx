import React, { useState } from 'react';
import {
    Modal,
    Form,
    Select,
    Input,
    Row,
    Col,
    InputNumber,
    Upload,
    Button,
    message,
    Space
} from 'antd';
import {
    PlusOutlined,
    InfoCircleOutlined
} from "@ant-design/icons";
import { updatePost, getPostsByUserId } from '../../redux/apiCalls';

const { TextArea } = Input;

const EditPostModal = ({ 
    isEditModalOpen, 
    setIsEditModalOpen, 
    currentEditPost, 
    editForm, 
    currentUser, 
    dispatch, 
    setPosts 
}) => {
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    // Options
    const postTypes = [
        { value: 'Cho thuê', label: 'Cho Thuê Căn Hộ' },
        { value: 'Bán', label: 'Bán Căn Hộ' }
    ];

    // Image handling methods
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageUpload = ({ fileList }) => {
        setFileList(fileList);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    // Handle Edit Form Submit
    const handleEditSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);
            formData.append('price', values.price);
            formData.append('depositPrice', values.depositPrice || 0);
            formData.append('depositCheck', values.depositCheck || 'none');
            formData.append('apartmentName', currentEditPost.apartment.apartmentName);
            formData.append('postType', values.postType);
            formData.append('userName', currentUser.userName);

            // Check if there are any new files to upload
            const hasNewFiles = fileList.some(file => file.originFileObj);

            if (hasNewFiles) {// Only append files that are newly uploaded
                fileList.forEach((file) => {
                    if (file.originFileObj) {
                        formData.append('imageFile', file.originFileObj);
                    }
                });
            } else {
                // If no new files, append empty array to keep existing images
                formData.append('imageFile', new Blob([], { type: 'application/octet-stream' }));
            }

            const response = await updatePost(currentEditPost.postId, formData);

            if (response.success) {
                message.success('Cập nhật bài viết thành công!');
                const postsResponse = await getPostsByUserId(dispatch, currentUser.userId);
                if (postsResponse.success) {
                    setPosts(postsResponse.data);
                } else {
                    message.error(postsResponse.message);
                }

                setIsEditModalOpen(false);
                setFileList([]); // Reset fileList after successful update
            } else {
                message.error(response.message || 'Có lỗi xảy ra khi cập nhật bài viết');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật bài đăng:', error);
            message.error('Có lỗi xảy ra khi cập nhật bài đăng');
        }
    };

    return (
        <Modal
            title="Sửa Thông Tin Căn Hộ"
            open={isEditModalOpen}
            onCancel={() => setIsEditModalOpen(false)}
            footer={null}
            width={800}
        >
            {currentEditPost && (
                <Form
                    form={editForm}
                    layout="vertical"
                    onFinish={handleEditSubmit}
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
                                label="Căn Hộ"
                            >
                                <Input
                                    value={currentEditPost.apartment ? currentEditPost.apartment.apartmentName : ''}
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="title"
                        label="Tiêu Đề"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tiêu đề bài' },
                            { min: 10, message: 'Tiêu đề phải có ít nhất 10 ký tự' }
                        ]}
                    >
                        <Input placeholder="Nhập tiêu đề bài viết" />
                    </Form.Item>


                    <Form.Item
                        name="content"
                        label="Nội Dung"
                        rules={[
                            { required: true, message: 'Vui lòng nhập nội dung bài viết' },
                            { min: 20, message: 'Nội dung phải có ít nhất 20 ký tự' }
                        ]}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Nhập nội dung bài viết"
                            showCount
                            maxLength={1000}
                        />
                    </Form.Item>



                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Giá"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập giá' },
                                    () => ({
                                        validator(_, value) {
                                            if (!value || value >= 0) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Giá phải lớn hơn hoặc bằng 0'));
                                        },
                                    }),
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    step={1000000}
                                    addonAfter="VNĐ"
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                    placeholder="Nhập giá"
                                    controls={{
                                        upIcon: <PlusOutlined />,
                                        downIcon: <span style={{ fontSize: '12px' }}>-</span>,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="depositPrice"
                                label="Tiền Cọc"
                                tooltip={{
                                    title: 'Tiền cọc sẽ được giữ và quản lý bởi Admin',
                                    icon: <InfoCircleOutlined />,
                                }}
                            >
                                <InputNumber
                                    min={0}
                                    step={1000000}
                                    addonAfter="VNĐ"
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                    placeholder="Nhập tiền cọc"
                                    controls={{
                                        upIcon: <PlusOutlined />,
                                        downIcon: <span style={{ fontSize: '12px' }}>-</span>,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="imageFile"
                        label="Hình Ảnh"
                        valuePropName="fileList"
                        getValueFromEvent={handleImageUpload}
                    >
                        <Upload
                            action="/upload.do"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            beforeUpload={() => false}
                        >
                            {fileList.length >= 8 ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Modal
                        open={previewOpen}
                        footer={null}
                        onCancel={() => setPreviewOpen(false)}
                    >
                        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
                    </Modal>

                    <Form.Item>
                        <Space style={{ float: 'right' }}>
                            <Button onClick={() => {
                                setIsEditModalOpen(false);
                                setFileList([]);
                            }}>
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Cập Nhật
                            </Button>
                        </Space>
                    </Form.Item>

                    <Modal
                        open={previewOpen}
                        footer={null}
                        onCancel={() => setPreviewOpen(false)}
                    >
                        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Form>
            )}
        </Modal>
    );
};

export default EditPostModal;