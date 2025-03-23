import React, { useState } from 'react';
import { 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  Checkbox, 
  Typography, 
  Button, 
  Space, 
  Alert,
  Divider,
  Select
} from 'antd';
import { 
  CheckCircleOutlined, 
  ExclamationCircleOutlined 
} from '@ant-design/icons';

const { Text, Paragraph } = Typography;
const { Option } = Select;

// Sample Apartments Data
const sampleApartments = [
  {
    id: 1,
    name: "Căn hộ 2PN Vinhomes Central Park",
    address: "Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
    price: 5800000,
    status: "Còn trống",
    maxDeposit: 17400000 // 3 tháng tiền thuê
  },
  {
    id: 2,
    name: "Căn hộ 3PN Masteri Thảo Điền",
    address: "Đường Mai Chí Thọ, Quận 2, TP.HCM",
    price: 7200000,
    status: "Còn trống",
    maxDeposit: 21600000 // 3 tháng tiền thuê
  },
  {
    id: 3,
    name: "Studio The Sun Avenue",
    address: "Đại lộ Mai Chí Thọ, Quận 2, TP.HCM",
    price: 3500000,
    status: "Đã đặt cọc",
    maxDeposit: 10500000 // 3 tháng tiền thuê
  }
];

const DepositPage = () => {
  const [form] = Form.useForm();
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showFullTerms, setShowFullTerms] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (!termsAgreed) {
        Modal.error({
          title: 'Điều khoản chưa được đồng ý',
          content: 'Vui lòng đọc và đồng ý với các điều khoản trước khi gửi yêu cầu.'
        });
        return;
      }

      console.log('Deposit Request:', values);
      Modal.success({
        title: 'Yêu Cầu Đặt Cọc Thành Công',
        content: `Yêu cầu đặt cọc cho ${values.apartmentName} đã được gửi. Vui lòng chờ xác nhận.`
      });
    });
  };

  const handleApartmentSelect = (value) => {
    const apartment = sampleApartments.find(apt => apt.id === value);
    setSelectedApartment(apartment);
    form.setFieldsValue({
      apartmentName: apartment.name,
      monthlyRent: apartment.price
    });
  };

  return (
    <Modal
      title="Yêu Cầu Đặt Cọc"
      open={true}  // Set to true for demonstration
      width={600}
      footer={[
        <Button key="back">
          Hủy
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
          disabled={!termsAgreed}
        >
          Gửi Yêu Cầu Đặt Cọc
        </Button>
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="apartmentSelect"
          label="Chọn Căn Hộ"
          rules={[{ required: true, message: 'Vui lòng chọn căn hộ' }]}
        >
          <Select 
            placeholder="Chọn căn hộ"
            onChange={handleApartmentSelect}
          >
            {sampleApartments.map(apt => (
              <Option 
                key={apt.id} 
                value={apt.id}
                disabled={apt.status !== "Còn trống"}
              >
                {apt.name} - {apt.address} 
                {apt.status !== "Còn trống" && " (Đã đặt cọc)"}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {selectedApartment && (
          <>
            <Form.Item
              name="apartmentName"
              label="Thông Tin Căn Hộ"
            >
              <Input 
                value={`${selectedApartment.name} - ${selectedApartment.address}`} 
                readOnly 
              />
            </Form.Item>

            <Form.Item
              name="monthlyRent"
              label="Giá Thuê Hàng Tháng"
            >
              <InputNumber 
                style={{ width: '100%' }}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                value={selectedApartment.price}
                readOnly
                addonAfter="VNĐ/tháng"
              />
            </Form.Item>

            <Form.Item
              name="depositAmount"
              label="Số Tiền Đặt Cọc"
              rules={[
                { required: true, message: 'Vui lòng nhập số tiền đặt cọc' },
                {
                  validator: (_, value) => {
                    if (value > selectedApartment.maxDeposit) {
                      return Promise.reject(new Error(`Số tiền đặt cọc tối đa là ${selectedApartment.maxDeposit.toLocaleString()} VNĐ`));
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            >
              <InputNumber 
                style={{ width: '100%' }}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                addonAfter="VNĐ"
                placeholder="Nhập số tiền đặt cọc"
                max={selectedApartment.maxDeposit}
              />
            </Form.Item>
          </>
        )}

        <Divider>Điều Khoản Đặt Cọc</Divider>

        {!showFullTerms ? (
          <Alert 
            message="Điều Khoản Đặt Cọc" 
            description="Nhấn để xem đầy đủ điều khoản"
            type="info"
            showIcon
            onClick={() => setShowFullTerms(true)}
            style={{ cursor: 'pointer', marginBottom: 16 }}
          />
        ) : (
          <div style={{ 
            maxHeight: 300, 
            overflowY: 'auto', 
            border: '1px solid #d9d9d9', 
            padding: 16, 
            marginBottom: 16,
            borderRadius: 4
          }}>
            {/* Terms content remains the same as previous example */}
          </div>
        )}

        <Checkbox 
          checked={termsAgreed}
          onChange={(e) => setTermsAgreed(e.target.checked)}
        >
          Tôi đã đọc và đồng ý với các điều khoản đặt cọc
        </Checkbox>
      </Form>
    </Modal>
  );
};

export default DepositPage;