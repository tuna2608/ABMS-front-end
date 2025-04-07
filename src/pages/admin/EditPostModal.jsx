import React, { useState } from 'react';
import {
    Modal,
    Form,
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
import { updatePost } from '../../redux/apiCalls';

const { TextArea } = Input;

const EditPostModal = ({ 
    isModalVisible, 
    onCancel, 
    initialValues,
    onSuccess,
    currentUser
}) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    // Image handling methods
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);
            formData.append('price', values.price);
            formData.append('depositPrice', values.depositPrice || 0);
            formData.append('depositCheck', values.depositCheck || 'none');
            formData.append('apartmentName', initialValues.apartment.apartmentName);
            formData.append('postType', 'Bán'); 
            formData.append('userName', currentUser.userName);
            

            // Handle image upload
            const hasNewFiles = fileList.some(file => file.originFileObj);
            if (hasNewFiles) {
                fileList.forEach((file) => {
                    if (file.originFileObj) {
                        formData.append('imageFile', file.originFileObj);
                    }
                });
            } else {
                formData.append('imageFile', new Blob([], { type: 'application/octet-stream' }));
            }

            const response = await updatePost(initialValues.postId, formData);

            if (response.success) {
                message.success('Cập nhật bài viết thành công!');
                onSuccess();
                onCancel();
                setFileList([]);
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
            title="Chỉnh Sửa Bài Viết"
            open={isModalVisible}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            {initialValues && (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        ...initialValues,
                        postType: 'Bán'
                    }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Căn Hộ"
                            >
                                <Input
                                    value={initialValues.apartment?.apartmentName}
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="title"
                        label="Tiêu Đề"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tiêu đề' },
                            { min: 10, message: 'Tiêu đề phải có ít nhất 10 ký tự' }
                        ]}
                    >
                        <Input placeholder="Nhập tiêu đề bài viết" />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label="Nội Dung"
                        rules={[
                            { required: true, message: 'Vui lòng nhập nội dung' },
                            { min: 20, message: 'Nội dung phải có ít nhất 20 ký tự' }
                        ]}
                    >
                        <TextArea
                            rows={6}
                            placeholder="Nhập nội dung bài viết"
                            showCount
                            maxLength={255}
                        />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Giá"
                                rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
                            >
                                <InputNumber
                                    min={0}
                                    style={{ width: '100%' }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    addonAfter="VNĐ"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="depositPrice"
                                label="Tiền Cọc"
                            >
                                <InputNumber
                                    min={0}
                                    style={{ width: '100%' }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    addonAfter="VNĐ"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Hình Ảnh"
                        required
                        tooltip="Tối đa 8 hình ảnh"
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={({ fileList }) => setFileList(fileList)}
                            beforeUpload={() => false}
                        >
                            {fileList.length >= 8 ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Space style={{ float: 'right' }}>
                            <Button onClick={onCancel}>
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