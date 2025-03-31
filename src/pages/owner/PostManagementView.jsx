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
  Table,
  InputNumber,
  message,
  Checkbox,
  Alert,
  Typography
} from 'antd';
import {
  FormOutlined,
  PlusOutlined,
  EyeOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux'; // Added useDispatch
import { 
  getOwnApartments, 
  createPost, 
  getAllPosts,
  checkExistingPost
} from '../../redux/apiCalls';

const { TextArea } = Input;
const { Text } = Typography;

const PostManagementView = () => {
  const [postForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false); 
  const [previewImage, setPreviewImage] = useState('');
  const [apartments, setApartments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postExists, setPostExists] = useState(false);
  const [customPrice, setCustomPrice] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch(); // We DO need dispatch for getAllPosts

  // Options
  const postTypes = [
    { value: 'Cho thuê', label: 'Cho Thuê Căn Hộ' },
    { value: 'Bán', label: 'Bán Căn Hộ' }
  ];

  const areaOptions = [
    { value: 'district1', label: 'Quận 1' },
    { value: 'district2', label: 'Quận 2' },
    { value: 'district3', label: 'Quận 3' },
    { value: 'binh_thanh', label: 'Quận Bình Thạnh' },
    { value: 'thu_duc', label: 'TP. Thủ Đức' }
  ];

  const directionOptions = [
    { value: 'east', label: 'Đông' },
    { value: 'west', label: 'Tây' },
    { value: 'south', label: 'Nam' },
    { value: 'north', label: 'Bắc' },
    { value: 'southeast', label: 'Đông Nam' },
    { value: 'southwest', label: 'Tây Nam' }
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

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        message.error('Vui lòng đăng nhập');
        return;
      }

      setLoading(true);
      try {
        // Fetch apartments
        const apartmentsResponse = await getOwnApartments(currentUser.userId);
        if (apartmentsResponse.success) {
          setApartments(apartmentsResponse.data);
        }

        // Fetch posts - Using dispatch properly like in PostList
        try {
          const postsResponse = await getAllPosts(dispatch);
          if (postsResponse && postsResponse.data) {
            // Filter posts by current user if needed
            const userPosts = postsResponse.data.filter(
              post => post.userName === currentUser.userName
            );
            setPosts(userPosts);
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
  }, [currentUser, dispatch]); // Added dispatch back to dependency array

  // Image handling
  const handleImageUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true); // Changed from setPreviewVisible to setPreviewOpen
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

  // Post submission handler
  const handlePostSubmit = async (values) => {
    // Check terms agreement
    if (!termsAgreed) {
      message.error('Vui lòng đồng ý với các điều khoản');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);
      formData.append('price', values.price);
      formData.append('depositPrice', values.depositPrice || 0);
      formData.append('postType', values.postType);
      formData.append('userName', currentUser.userName);

      // Additional fields
      formData.append('area', values.area);
      formData.append('direction', values.direction);
      formData.append('floor', values.floor);
      formData.append('numberOfBedrooms', values.numberOfBedrooms);
      formData.append('numberOfBathrooms', values.numberOfBathrooms);
      formData.append('apartmentId', values.apartmentId);

      fileList.forEach((file) => {
        const fileObject = file.originFileObj || file;
        if (fileObject) {
          formData.append('imageFile', fileObject);
        }
      });

      // Create new post
      const response = await createPost(formData, dispatch); // Added dispatch parameter back

      if (response.success) {
        message.success('Bài viết đã được tạo thành công!');

        // Refresh posts - Using dispatch properly
        const postsResponse = await getAllPosts(dispatch);
        if (postsResponse && postsResponse.data) {
          // Filter posts by current user if needed
          const userPosts = postsResponse.data.filter(
            post => post.userName === currentUser.userName
          );
          setPosts(userPosts);
        }

        // Reset form and modal
        postForm.resetFields();
        setFileList([]);
        setIsModalOpen(false); // Changed from setIsModalVisible to setIsModalOpen
        setTermsAgreed(false);
      } else {
        message.error(response.message || 'Có lỗi xảy ra khi thực hiện');
      }
    } catch (error) {
      console.error('Lỗi khi thực hiện:', error);
      message.error('Có lỗi xảy ra');
    }
  };

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

  // Handle Edit Form Submit
  const handleEditSubmit = (values) => {
    message.success('Thông tin đã được cập nhật (chỉ hiển thị UI, chưa lưu vào API)');
    
    // Update the local state without API call
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.postId === currentEditPost.postId 
          ? { ...post, ...values } 
          : post
      )
    );
    
    setIsEditModalOpen(false);
  };

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
      title: 'Khu Vực',
      dataIndex: 'area',
      key: 'area'
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
            icon={<EyeOutlined />} 
            type="text"
            onClick={() => {
              Modal.info({
                title: 'Chi Tiết Bài Viết',
                content: (
                  <div>
                    <p><strong>Tiêu đề:</strong> {record.title}</p>
                    <p><strong>Nội dung:</strong> {record.content}</p>
                    <p><strong>Giá:</strong> {new Intl.NumberFormat('vi-VN').format(record.price)} VNĐ</p>
                    <p><strong>Khu vực:</strong> {record.area}</p>
                    <p><strong>Hướng:</strong> {record.direction}</p>
                    <p><strong>Tầng:</strong> {record.floor}</p>
                    <p><strong>Số phòng ngủ:</strong> {record.numberOfBedrooms}</p>
                    <p><strong>Số phòng tắm:</strong> {record.numberOfBathrooms}</p>
                    {record.apartment && (
                      <p><strong>Căn hộ:</strong> {record.apartment.apartmentName}</p>
                    )}
                  </div>
                )
              });
            }}
          >
            Xem
          </Button>
          <Button 
            icon={<FormOutlined />} 
            type="text"
            onClick={() => handleEditClick(record)}
          >
            Sửa
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
            setIsModalOpen(true); // Changed from setIsModalVisible to setIsModalOpen
            setTermsAgreed(false);
          }}
        >
          Thêm Bài Viết
        </Button>
      }
    >
      <Table 
        columns={columns} 
        dataSource={posts}
        loading={loading}
        rowKey="postId" // Added rowKey to avoid warnings
        pagination={{
          total: posts.length,
          showSizeChanger: true,
          showQuickJumper: true
        }}
      />

      <Modal
        title="Tạo Bài Viết Mới"
        open={isModalOpen} // Changed from visible to open
        onOk={() => postForm.submit()}
        onCancel={() => {
          setIsModalOpen(false); // Changed from setIsModalVisible to setIsModalOpen
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
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="apartmentId"
                label="Căn Hộ"
                rules={[
                  { required: true, message: 'Vui lòng chọn căn hộ' },
                  {
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
                  onChange={handleApartmentSelect}
                >
                  {apartments.map(apartment => (
                    <Select.Option 
                      key={apartment.apartmentId} 
                      value={apartment.apartmentId}
                    >
                      {apartment.apartmentName}
                    </Select.Option>
                  ))}
                </Select>
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
                name="area"
                label="Khu Vực"
                rules={[{ required: true, message: 'Vui lòng chọn khu vực' }]}
              >
                <Select placeholder="Chọn khu vực">
                  {areaOptions.map(area => (
                    <Select.Option key={area.value} value={area.value}>
                      {area.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="direction"
                label="Hướng"
              >
                <Select placeholder="Chọn hướng">
                  {directionOptions.map(direction => (
                    <Select.Option key={direction.value} value={direction.value}>
                      {direction.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>  
            <Col span={8}>
              <Form.Item
                name="floor"
                label="Tầng"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (!value || value >= 1) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Tầng phải lớn hơn hoặc bằng 1'));
                    },
                  }),
                ]}
              >
                <InputNumber 
                  min={1}
                  style={{ width: '100%' }}
                  placeholder="Nhập tầng" 
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item  
                name="numberOfBedrooms"
                label="Phòng Ngủ"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (!value || value >= 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Số phòng ngủ phải lớn hơn hoặc bằng 0'));
                    },
                  }),
                ]}
              >
                <InputNumber 
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="Số phòng ngủ"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="numberOfBathrooms"  
                label="Phòng Tắm"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (!value || value >= 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Số phòng tắm phải lớn hơn hoặc bằng 0'));
                    },
                  }),  
                ]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }} 
                  placeholder="Số phòng tắm"
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
            open={previewOpen} // Changed from visible to open
            footer={null}
            onCancel={() => setPreviewOpen(false)} // Changed from setPreviewVisible to setPreviewOpen
          >
            <img alt="preview" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Form>

        <TermsContent />
      </Modal>

      {/* Edit Modal */}
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
                  name="area"
                  label="Khu Vực"
                  rules={[{ required: true, message: 'Vui lòng chọn khu vực' }]}
                >
                  <Select placeholder="Chọn khu vực">
                    {areaOptions.map(area => (
                      <Select.Option key={area.value} value={area.value}>
                        {area.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="direction"
                  label="Hướng"
                >
                  <Select placeholder="Chọn hướng">
                    {directionOptions.map(direction => (
                      <Select.Option key={direction.value} value={direction.value}>
                        {direction.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>  
              <Col span={8}>
                <Form.Item
                  name="floor"
                  label="Tầng"
                  rules={[
                    () => ({
                      validator(_, value) {
                        if (!value || value >= 1) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Tầng phải lớn hơn hoặc bằng 1'));
                      },
                    }),
                  ]}
                >
                  <InputNumber 
                    min={1}
                    style={{ width: '100%' }}
                    placeholder="Nhập tầng" 
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item  
                  name="numberOfBedrooms"
                  label="Phòng Ngủ"
                  rules={[
                    () => ({
                      validator(_, value) {
                        if (!value || value >= 0) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Số phòng ngủ phải lớn hơn hoặc bằng 0'));
                      },
                    }),
                  ]}
                >
                  <InputNumber 
                    min={0}
                    style={{ width: '100%' }}
                    placeholder="Số phòng ngủ"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="numberOfBathrooms"  
                  label="Phòng Tắm"
                  rules={[
                    () => ({
                      validator(_, value) {
                        if (!value || value >= 0) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Số phòng tắm phải lớn hơn hoặc bằng 0'));
                      },
                    }),  
                  ]}
                >
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }} 
                    placeholder="Số phòng tắm"
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

            <Form.Item>
              <Space style={{ float: 'right' }}>
                <Button onClick={() => setIsEditModalOpen(false)}>
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit">
                  Cập Nhật
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </Card>
  );
};

export default PostManagementView;