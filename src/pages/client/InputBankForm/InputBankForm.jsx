import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, message } from 'antd';
import { BankOutlined, UserOutlined, CreditCardOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

const { Option } = Select;

const InputBankForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Danh sách các ngân hàng (ví dụ)
  const bankList = [
    'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
    'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)',
    'Ngân hàng TMCP Công Thương Việt Nam (VietinBank)',
    'Ngân hàng TMCP Quân Đội (MBBank)',
    'Ngân hàng TMCP Á Châu (ACB)',
    'Ngân hàng TMCP Kỹ Thương Việt Nam (Techcombank)',
    'Ngân hàng TMCP Xuất Nhập Khẩu Việt Nam (Eximbank)',
    'Ngân hàng TMCP Sài Gòn Thương Tín (Sacombank)',
    'Ngân hàng TMCP Phát triển TP.HCM (HDBank)',
    'Ngân hàng TMCP Việt Á (VietABank)'
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Mô phỏng việc gửi dữ liệu lên hệ thống
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Xử lý dữ liệu ở đây (ví dụ: gọi API)
      console.log('Thông tin ngân hàng:', values);
      
      message.success('Đã gửi thông tin ngân hàng thành công!');
      form.resetFields();
    } catch (error) {
      message.error('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bank-form-container">
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BankOutlined style={{ marginRight: 10 }} />
            Thông Tin Ngân Hàng
          </div>
        }
        style={{ 
          maxWidth: 500, 
          margin: '20px auto', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          {/* Chọn Ngân Hàng */}
          <Form.Item
            name="bankName"
            label="Ngân Hàng"
            rules={[{ required: true, message: 'Vui lòng chọn ngân hàng' }]}
          >
            <Select 
              placeholder="Chọn ngân hàng" 
              suffixIcon={<BankOutlined />}
            >
              {bankList.map((bank, index) => (
                <Option key={index} value={bank}>{bank}</Option>
              ))}
            </Select>
          </Form.Item>

          {/* Tên Chủ Tài Khoản */}
          <Form.Item
            name="accountHolderName"
            label="Tên Chủ Tài Khoản"
            rules={[
              { required: true, message: 'Vui lòng nhập tên chủ tài khoản' },
              { 
                pattern: /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(?: [A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$/,
                message: 'Tên không hợp lệ. Vui lòng nhập tên đúng định dạng'
              }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Nhập tên chủ tài khoản" 
            />
          </Form.Item>

          {/* Số Tài Khoản */}
          <Form.Item
            name="accountNumber"
            label="Số Tài Khoản"
            rules={[
              { required: true, message: 'Vui lòng nhập số tài khoản' },
              { 
                pattern: /^\d{9,14}$/, 
                message: 'Số tài khoản phải có 9-14 chữ số' 
              }
            ]}
          >
            <Input 
              prefix={<CreditCardOutlined />} 
              placeholder="Nhập số tài khoản" 
            />
          </Form.Item>

          {/* Số Điện Thoại */}
          <Form.Item
            name="phoneNumber"
            label="Số Điện Thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { 
                pattern: /^(0[3|5|7|8|9])+([0-9]{8})$/, 
                message: 'Số điện thoại không hợp lệ' 
              }
            ]}
          >
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder="Nhập số điện thoại" 
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { 
                type: 'email', 
                message: 'Địa chỉ email không hợp lệ' 
              }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Nhập địa chỉ email" 
            />
          </Form.Item>

          {/* Nút Submit */}
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              loading={loading}
            >
              Xác Nhận Thông Tin
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default InputBankForm;