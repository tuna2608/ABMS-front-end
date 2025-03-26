import React, { useState } from 'react';
import { 
  Card, 
  Space, 
  Form, 
//   Select, 
//   InputNumber, 
  Input, 
//   Checkbox, 
//   Button, 
//   Alert, 
  Modal, 
  Typography 
} from 'antd';
import { FormOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Text } = Typography;

const CreatePostView = ({ 
  postTypes, 
  apartments, 
  depositTerms 
}) => {
  const [postForm] = Form.useForm();
  const [selectedPostType, setSelectedPostType] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);

  const handlePostTypeChange = (value) => {
    setSelectedPostType(value);
    postForm.setFieldsValue({ 
      apartmentId: undefined,
      depositAmount: undefined 
    });
  };

  const handleApartmentSelect = (value) => {
    const apartment = apartments.find(apt => apt.id === value);
    setSelectedApartment(apartment);
    
    postForm.setFieldsValue({ 
      depositAmount: apartment.price * 3 
    });
  };

  const handlePostSubmit = (values) => {
    postForm.validateFields().then(validatedValues => {
      if (!validatedValues.depositTerms) {
        Modal.error({
          title: 'Điều khoản chưa được đồng ý',
          content: 'Vui lòng đọc và đồng ý với các điều khoản đặt cọc trước khi gửi bài.'
        });
        return;
      }

      Modal.success({
        title: 'Gửi Bài Viết Thành Công',
        content: 'Bài viết của bạn đã được gửi và đang chờ duyệt.',
        onOk: () => {
          postForm.resetFields();
          setSelectedApartment(null);
          setSelectedPostType(null);
        }
      });
    }).catch(errorInfo => {
      console.log('Validation Failed:', errorInfo);
    });
  };

  return (
    <Card 
      title={
        <Space>
          <FormOutlined /> 
          <span>Tạo bài viết mới</span>
        </Space>
      }
    >
      <Form 
        form={postForm} 
        layout="vertical"
        onFinish={handlePostSubmit}
      >
        {/* Form content is the same as in the original component */}
        {/* Keep the entire form code from the original component */}
        {/* ... */}
      </Form>
    </Card>
  );
};

export default CreatePostView;