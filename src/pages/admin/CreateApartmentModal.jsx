import { React } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Row, Col, message } from 'antd';
import { createApartment } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';

const CreateApartmentModal = ({ visible, onCancel, onSuccess }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
            const response = await createApartment(dispatch, {
                ...values,
                status: 'unrented',
            });

            if (response.success) {
                message.success('Tạo căn hộ thành công');
                form.resetFields();
                onSuccess?.();
                onCancel();
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error('Không thể tạo căn hộ: ' + error.message);
        }
    };

    return (
        <Modal
            title="Thêm Căn Hộ Mới"
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                {/* ...existing form items... */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="apartmentName"
                            label="Số Căn Hộ"
                            rules={[{ required: true, message: 'Vui lòng nhập số căn hộ' }]}
                        >
                            <Input placeholder="Nhập số căn hộ" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="floor"
                            label="Tầng"
                            rules={[{ required: true, message: 'Vui lòng nhập tầng' }]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={1}
                                placeholder="Nhập tầng"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="numberOfBedrooms"
                            label="Số Phòng Ngủ"
                            rules={[{ required: true, message: 'Vui lòng nhập số phòng ngủ' }]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                placeholder="Nhập số phòng ngủ"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="numberOfBathrooms"
                            label="Số Phòng Tắm"
                            rules={[{ required: true, message: 'Vui lòng nhập số phòng tắm' }]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                placeholder="Nhập số phòng tắm"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="area"
                            label="Diện Tích (m²)"
                            rules={[{ required: true, message: 'Vui lòng nhập diện tích' }]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                placeholder="Nhập diện tích"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="direction"
                            label="Hướng"
                            rules={[{ required: true, message: 'Vui lòng chọn hướng' }]}
                        >
                            <Select placeholder="Chọn hướng">
                                <Select.Option value="Đông">Đông</Select.Option>
                                <Select.Option value="Tây">Tây</Select.Option>
                                <Select.Option value="Nam">Nam</Select.Option>
                                <Select.Option value="Bắc">Bắc</Select.Option>
                                <Select.Option value="Đông Nam">Đông Nam</Select.Option>
                                <Select.Option value="Đông Bắc">Đông Bắc</Select.Option>
                                <Select.Option value="Tây Nam">Tây Nam</Select.Option>
                                <Select.Option value="Tây Bắc">Tây Bắc</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="note"
                    label="Ghi Chú"
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Nhập ghi chú về căn hộ (nếu có)"
                        maxLength={500}
                        showCount
                    />
                </Form.Item>

                <Form.Item className="mb-0">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <Button onClick={onCancel}>
                            Hủy
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Tạo Căn Hộ
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateApartmentModal;