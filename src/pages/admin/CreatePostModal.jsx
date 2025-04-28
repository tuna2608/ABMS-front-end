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
    Alert,
    Space
} from 'antd';
import {
    PlusOutlined,
    InfoCircleOutlined,
    LoadingOutlined,
    FormOutlined
} from "@ant-design/icons";
import { createPost, checkExistingPost } from '../../redux/apiCalls';
import { generateAIPostContent } from '../../services/CreatePostAIService';

const { TextArea } = Input;

const CreatePostModal = ({ isModalVisible, onCancel, apartments, onSuccess, currentUser }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [postExists, setPostExists] = useState(false);

    const postTypes = [
        { value: 'Bán', label: 'Bán Căn Hộ' }
    ];

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
        if (!fileList || fileList.length === 0) {
            message.error('Vui lòng tải lên ít nhất 1 hình ảnh');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);
            formData.append('price', values.price);
            formData.append('depositPrice', values.depositPrice || 0);
            formData.append('depositCheck', values.depositCheck || 'none');
            formData.append('postType', 'Bán');
            formData.append('apartmentName',
                apartments.find(apt => apt.apartmentId === values.apartmentId)?.apartmentName || ''
            );
            formData.append('userName', currentUser.userName);

            fileList.forEach((file) => {
                const fileObject = file.originFileObj || file;
                if (fileObject) {
                    formData.append('imageFile', fileObject);
                }
            });

            const response = await createPost(formData);
            if (response.success) {
                message.success('Tạo bài viết thành công!');
                form.resetFields();
                setFileList([]);
                onSuccess();
            }
        } catch (error) {
            console.error('Lỗi khi tạo bài viết:', error);
            message.error('Có lỗi xảy ra khi tạo bài viết');
        }
    };

    const handleGenerateAIContent = async () => {
        const values = form.getFieldsValue();
        if (!values.apartmentId) {
            message.warning('Vui lòng chọn căn hộ trước khi tạo nội dung');
            return;
        }

        try {
            setAiLoading(true);
            const selectedApartment = apartments.find(apt => apt.apartmentId === values.apartmentId);
            const aiContent = await generateAIPostContent({
                postType: 'Bán', // Always use 'Bán'
                numberOfBedrooms: selectedApartment.numberOfBedrooms,
                numberOfBathrooms: selectedApartment.numberOfBathrooms,
                area: selectedApartment.area,
                floor: selectedApartment.floor,
                direction: selectedApartment.direction
            });

            form.setFieldValue('content', aiContent);
            message.success('Đã tạo nội dung thành công!');
        } catch (error) {
            message.error('Không thể tạo nội dung AI');
        } finally {
            setAiLoading(false);
        }
    };

    const handleApartmentSelect = async (value) => {
        const selectedApartment = apartments.find(apt => apt.apartmentId === value);
        if (selectedApartment) {
            form.setFieldsValue({
                numberOfBathrooms: selectedApartment.numberOfBathrooms,
                numberOfBedrooms: selectedApartment.numberOfBedrooms,
                floor: selectedApartment.floor,
                area: selectedApartment.area,
                direction: selectedApartment.direction
            });

            // Check if post exists for this apartment
            try {
                const response = await checkExistingPost(
                    selectedApartment.apartmentName,
                    'Bán'
                );

                if (response.success && response.exists) {
                    setPostExists(true);
                    message.warning('Căn hộ này đã có bài đăng bán');
                } else {
                    setPostExists(false);
                }
            } catch (error) {
                console.error('Lỗi kiểm tra bài đăng:', error);
            }
        }
    };

    return (
        <Modal
            title="Tạo Bài Viết Mới"
            open={isModalVisible}
            onOk={() => form.submit()}
            onCancel={() => {
                onCancel();
                form.resetFields();
                setFileList([]);
            }}
            width={800}
            okText="Tạo Bài Viết"
            cancelText="Hủy"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="apartmentId"
                            label="Căn Hộ"
                            rules={[
                                { required: true, message: 'Vui lòng chọn căn hộ' },
                                {
                                    validator: async (_, value) => {
                                        if (postExists) {
                                            throw new Error('Căn hộ này đã có bài đăng bán');
                                        }
                                    }
                                }
                            ]}
                            validateTrigger="onChange"
                        >
                            <Select
                                placeholder="Chọn căn hộ"
                                options={apartments.map(apt => ({
                                    value: apt.apartmentId,
                                    label: apt.apartmentName
                                }))}
                                onChange={handleApartmentSelect}
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

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="floor"
                            label="Tầng"
                        >
                            <InputNumber
                                disabled
                                style={{ width: '100%' }}
                                placeholder="Tầng"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="numberOfBedrooms"
                            label="Phòng Ngủ"
                        >
                            <InputNumber
                                disabled
                                style={{ width: '100%' }}
                                placeholder="Số phòng ngủ"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="numberOfBathrooms"
                            label="Phòng Tắm"
                        >
                            <InputNumber
                                disabled
                                style={{ width: '100%' }}
                                placeholder="Số phòng tắm"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="area"
                            label="Diện tích"
                        >
                            <Input
                                disabled
                                placeholder="Diện tích"
                                addonAfter="m²"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="direction"
                            label="Hướng"
                        >
                            <Input
                                disabled
                                placeholder="Hướng"
                            />
                        </Form.Item>
                    </Col>
                </Row>

               

                <Form.Item
                    name="content"
                    label={
                        <Space>
                            Nội Dung
                            <Button
                                type="link"
                                icon={aiLoading ? <LoadingOutlined /> : <FormOutlined />}
                                onClick={handleGenerateAIContent}
                                loading={aiLoading}
                            >
                                Tạo nội dung tự động
                            </Button>
                        </Space>
                    }
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

                <Modal
                    open={previewOpen}
                    footer={null}
                    onCancel={() => setPreviewOpen(false)}
                >
                    <img alt="preview" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Form>
        </Modal>
    );
};

export default CreatePostModal;