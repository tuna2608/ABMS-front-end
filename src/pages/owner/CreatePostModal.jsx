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
    Checkbox,
    Alert,
    Typography
} from 'antd';
import {
    PlusOutlined,
    InfoCircleOutlined,
    LoadingOutlined,
    FormOutlined,
    EyeOutlined
} from "@ant-design/icons";
import { createPost, checkExistingPost, getPostsByUserId } from '../../redux/apiCalls';
import { generateAIPostContent } from '../../services/CreatePostAIService';

const { TextArea } = Input;
const { Text } = Typography;

const CreatePostModal = ({ isModalOpen, setIsModalOpen, apartments, currentUser, dispatch }) => {
    const [postForm] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [postExists, setPostExists] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);

    // Options
    const postTypes = [
        { value: 'Cho thuê', label: 'Cho Thuê Căn Hộ' },
        { value: 'Bán', label: 'Bán Căn Hộ' }
    ];

    // Terms and Conditions Content
    const TermsContent = () => (
        <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '0 10px' }}>
            <h3>Điều Khoản Và Điều Kiện Đăng Tin</h3>
            <ol>
                <li>
                    <strong>Tính Chính Xác Thông Tin</strong>
                    <p>Người đăng tin cam kết cung cấp thông tin chính xác, đầy đủ và trung thực về căn hộ.</p>
                </li>
                <li>
                    <strong>Trách Nhiệm Pháp Lý</strong>
                    <p>Mọi thông tin sai lệch sẽ chịu trách nhiệm pháp lý và có thể bị khóa tài khoản.</p>
                </li>
                <li>
                    <strong>Quyền Sở Hữu</strong>
                    <p>Người đăng tin phải là chủ sở hữu hợp pháp hoặc được ủy quyền quản lý căn hộ.</p>
                </li>
                <li>
                    <strong>Bảo Mật Thông Tin</strong>
                    <p>Thông tin cá nhân và căn hộ sẽ được bảo mật và chỉ sử dụng cho mục đích cho thuê.</p>
                </li>
                <li>
                    <strong>Phí Dịch Vụ</strong>
                    <p>Việc đăng tin có thể phải chịu các khoản phí dịch vụ theo quy định của nền tảng.</p>
                </li>
            </ol>
        </div>
    );

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

    const handleApartmentSelect = async (value) => {
        const selectedApartment = apartments.find(apt => apt.apartmentId === value);
        const postType = postForm.getFieldValue('postType');

        if (selectedApartment) {
            postForm.setFieldsValue({
                numberOfBathrooms: selectedApartment.numberOfBathrooms,
                numberOfBedrooms: selectedApartment.numberOfBedrooms,
                floor: selectedApartment.floor,
                area: selectedApartment.area,
                direction: selectedApartment.direction
            });
            if (postType) {
                try {
                    const response = await checkExistingPost(
                        selectedApartment.apartmentName,
                        postType
                    );

                    if (response.success) {
                        setPostExists(response.exists);
                        if (response.exists) {
                            message.warning('Căn hộ này đã có bài đăng với loại này');
                        }
                    }
                } catch (error) {
                    console.error('Lỗi kiểm tra bài đăng:', error);
                }
            }
        }
    };

    const handlePostTypeChange = async (value) => {
        const selectedApartmentId = postForm.getFieldValue('apartmentId');
        const selectedApartment = apartments.find(apt => apt.apartmentId === selectedApartmentId);

        if (selectedApartment) {
            try {
                const response = await checkExistingPost(
                    selectedApartment.apartmentName,
                    value
                );

                if (response.success) {
                    setPostExists(response.exists);
                    if (response.exists) {
                        message.warning('Căn hộ này đã có bài đăng với loại này');
                    }
                }
            } catch (error) {
                console.error('Lỗi kiểm tra bài đăng:', error);
            }
        }
    };

    // Post submission handler
    const handlePostSubmit = async (values) => {
        if (!fileList || fileList.length === 0) {
            message.error('Vui lòng tải lên ít nhất 1 hình ảnh');
            return;
        }
        Modal.confirm({
            title: 'Xác Nhận Đăng Bài',
            content: 'Bạn có chắc muốn đăng bài viết này?',
            async onOk() {
                try {
                    const formData = new FormData();
                    formData.append('title', values.title);
                    formData.append('content', values.content);
                    formData.append('price', values.price);
                    formData.append('depositPrice', values.depositPrice || 0);
                    formData.append('depositCheck', values.depositCheck || 'none');
                    formData.append('apartmentName',
                        apartments.find(apt => apt.apartmentId === values.apartmentId)?.apartmentName || ''
                    );
                    formData.append('postType', values.postType);
                    formData.append('userName', currentUser.userName);

                    fileList.forEach((file) => {
                        const fileObject = file.originFileObj || file;
                        if (fileObject) {
                            formData.append('imageFile', fileObject);
                        }
                    });

                    const response = await createPost(formData);

                    if (response.success) {
                        message.success('Bài viết đã được tạo thành công!');
                        postForm.resetFields();
                        setFileList([]);
                    } else {
                        message.error(response.message || 'Có lỗi xảy ra khi tạo bài đăng');
                    }
                } catch (error) {
                    console.error('Lỗi khi tạo bài đăng:', error);
                    message.error('Có lỗi xảy ra khi tạo bài đăng');
                }
            }
        });
    };

    const handleGenerateAIContent = async () => {
        const formValues = postForm.getFieldsValue();
        if (!formValues.apartmentId) {
            message.warning('Vui lòng chọn căn hộ trước khi tạo nội dung');
            return;
        }

        try {
            setAiLoading(true);
            const selectedApartment = apartments.find(apt => apt.apartmentId === formValues.apartmentId);
            const aiContent = await generateAIPostContent({
                postType: formValues.postType || 'Cho thuê',
                numberOfBedrooms: selectedApartment.numberOfBedrooms,
                numberOfBathrooms: selectedApartment.numberOfBathrooms,
                area: selectedApartment.area,
                floor: selectedApartment.floor,
                direction: selectedApartment.direction
            });

            postForm.setFieldValue('content', aiContent);

            message.success('Đã tạo nội dung thành công!');
        } catch (error) {
            console.error('Lỗi khi tạo nội dung AI:', error);
            message.error('Không thể tạo nội dung AI: ' + error.message);
        } finally {
            setAiLoading(false);
        }
    };

    return (
        <Modal
            title="Tạo Bài Viết Mới"
            open={isModalOpen}
            onOk={() => postForm.submit()}
            onCancel={() => {
                setIsModalOpen(false);
                postForm.resetFields();
                setFileList([]);
                setTermsAgreed(false);
            }}
            width={800}
            okText="Tạo Bài Viết"
            okButtonProps={{ disabled: !termsAgreed }}
            cancelText="Hủy"
        >
            <Form
                form={postForm}
                layout="vertical"
                onFinish={handlePostSubmit}
            >
                <Alert
                    message="Thông Tin Tiền Cọc"
                    description={
                        <Text>
                            Tiền cọc sẽ do <strong>ADMIN quản lý</strong>. Bài viết chỉ được
                            đăng sau khi admin xác nhận.
                        </Text>
                    }
                    type="warning"
                    showIcon
                    icon={<InfoCircleOutlined />}
                    style={{ marginBottom: 16 }}
                />

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
                                onChange={handlePostTypeChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="apartmentId"
                            label="Căn Hộ Liên Quan"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn căn hộ'
                                },
                                {
                                    validator: (_, value) => {
                                        if (postExists) {
                                            return Promise.reject(new Error('Căn hộ này đã có bài đăng với loại này'));
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                        >
                            <Select
                                placeholder="Chọn căn hộ"
                                options={apartments.map(apt => ({
                                    value: apt.apartmentId,
                                    label: `${apt.apartmentName}`
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
                    <div>
                        <Form.Item name="content" noStyle>
                            <TextArea
                                rows={6}
                                placeholder="Nhập nội dung bài viết hoặc sử dụng nút 'Tạo nội dung bằng AI'"
                                showCount
                                maxLength={255}
                            />
                        </Form.Item>
                        <Button
                            onClick={handleGenerateAIContent}
                            style={{ marginTop: 8 }}
                            icon={aiLoading ? <LoadingOutlined /> : <FormOutlined />}
                            loading={aiLoading}
                        >
                            {aiLoading ? 'Đang tạo nội dung...' : 'Tạo nội dung bằng AI'}
                        </Button>
                    </div>
                </Form.Item>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="floor"
                            label="Tầng"
                        >
                            <InputNumber
                                min={1}
                                style={{ width: '100%' }}
                                placeholder="Nhập tầng"
                                disabled
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="numberOfBedrooms"
                            label="Phòng Ngủ"
                        >
                            <InputNumber
                                min={0}
                                style={{ width: '100%' }}
                                placeholder="Số phòng ngủ"
                                disabled
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="numberOfBathrooms"
                            label="Phòng Tắm"
                        >
                            <InputNumber
                                min={0}
                                style={{ width: '100%' }}
                                placeholder="Số phòng tắm"
                                disabled
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
                                placeholder="Nhập diện tích"
                                disabled
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="direction"
                            label="Hướng"
                        >
                            <Input
                                placeholder="Nhập hướng"
                                disabled
                            />
                        </Form.Item>
                    </Col>
                </Row>

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

                <Form.Item>
                    <Checkbox
                        checked={termsAgreed}
                        onChange={(e) => setTermsAgreed(e.target.checked)}
                    >
                        Tôi đồng ý với các điều khoản và điều kiện đăng tin
                    </Checkbox>
                </Form.Item>

                <Modal
                    open={previewOpen}
                    footer={null}
                    onCancel={() => setPreviewOpen(false)}
                >
                    <img alt="preview" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Form>

            <TermsContent />
        </Modal>
    );
};

export default CreatePostModal;