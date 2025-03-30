import React, { useState, useEffect } from 'react';
import {
  Card,
  Space,
  Form,
  Select,
  Input,
  Button,
  Modal,
  Upload,
  Row,
  Col,
  InputNumber,
  message
} from 'antd';
import {
  FormOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getOwnApartments, createPost, checkExistingPost } from '../../redux/apiCalls';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

const CreatePostView = () => {
  const [postForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [apartments, setApartments] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [postExists, setPostExists] = useState(false);

  const postTypes = [
    { value: 'Cho thuê', label: 'Cho Thuê Căn Hộ' },
    { value: 'Bán', label: 'Bán Căn Hộ' }
  ];

  useEffect(() => {
    const fetchOwnApartments = async () => {
      if (!currentUser) {
        message.error('Vui lòng đăng nhập');
        return;
      }

      try {
        const response = await getOwnApartments(currentUser.userId);

        if (response.success) {
          setApartments(response.data);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching own apartments:", error);
        message.error("Có lỗi xảy ra khi tải danh sách căn hộ");
      }
    };

    fetchOwnApartments();
  }, [currentUser]);

  const handleImageUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleApartmentSelect = async (value) => {
    const selectedApartment = apartments.find(apt => apt.apartmentId === value);
    const postType = postForm.getFieldValue('postType');

    if (selectedApartment && postType) {
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
  };


  const handlePostSubmit = async (values) => {
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

  return (
    <Card
      title={
        <Space>
          <FormOutlined />
          <span>Tạo Bài Viết Mới</span>
        </Space>
      }
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
              name="apartmentId"
              label="Căn Hộ Liên Quan"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn căn hộ'
                },
                {
                  // Thêm validate không cho phép chọn căn hộ đã có bài đăng
                  validator: (_, value) => {
                    if (postExists) {
                      return Promise.reject(new Error('Căn hộ này đã có bài đăng'));
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
          <Col span={12}>
            <Form.Item
              name="price"
              label="Giá"
              rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Nhập giá"
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="depositPrice"
              label="Giá Đặt Cọc"
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Nhập giá đặt cọc"
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                min={0}
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
            onPreview={handlePreview}
            multiple
          >
            {fileList.length < 5 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải Ảnh</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
          >
            Tạo Bài Viết
          </Button>
        </Form.Item>
      </Form>

      <Modal
        open={previewVisible}
        title="Xem Trước Hình Ảnh"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img
          alt="preview"
          style={{ width: '100%' }}
          src={previewImage}
        />
      </Modal>
    </Card>
  );
};

export default CreatePostView;