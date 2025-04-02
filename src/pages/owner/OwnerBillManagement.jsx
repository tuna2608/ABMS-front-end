import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  Table,
  Divider,
  Tabs,
  Tag,
  Popconfirm,
  Tooltip,
  Statistic,
  Row,
  Col,
  Badge,
  Modal,
  InputNumber
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  FileAddOutlined,
  PrinterOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  HomeOutlined,
  DownloadOutlined,
  CalendarOutlined,
  SendOutlined,
  EyeOutlined
} from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/vi_VN';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

const BillPage = () => {
  const [loading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [createBillVisible, setCreateBillVisible] = useState(false);
  const [form] = Form.useForm();
  const [billDetailsVisible, setbillDetailsVisible] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);
  
  // Table columns for bill list
  const billColumns = [
    {
        title: 'Mã hóa đơn',
        dataIndex: 'billCode',
        key: 'billCode',
        sorter: true,
        render: (text) => (
          <Button 
            type="link" 
            style={{ padding: 0 }} 
            onClick={() => showBillDetails(text)}
          >
            {text}
          </Button>
        ),
      },
    {
      title: 'Căn hộ',
      dataIndex: 'apartment',
      key: 'apartment',
      sorter: true,
      render: (text) => <Space><HomeOutlined /> {text}</Space>,
    },
    {
      title: 'Chủ hộ',
      dataIndex: 'owner',
      key: 'owner',
      sorter: true,
    },
    {
      title: 'Loại hóa đơn',
      dataIndex: 'billType',
      key: 'billType',
      filters: [
        { text: 'Phí quản lý', value: 'management' },
        { text: 'Điện', value: 'electricity' },
        { text: 'Nước', value: 'water' },
        { text: 'Khác', value: 'others' },
      ],
      render: (type) => {
        let color;
        let text;
        switch (type) {
          case 'management':
            color = 'blue';
            text = 'Phí quản lý';
            break;
          case 'electricity':
            color = 'orange';
            text = 'Điện';
            break;
          case 'water':
            color = 'cyan';
            text = 'Nước';
            break;
          default:
            color = 'purple';
            text = 'Khác';
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Kỳ hóa đơn',
      dataIndex: 'period',
      key: 'period',
      sorter: true,
      render: (text) => <Space><CalendarOutlined /> {text}</Space>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      sorter: true,
      render: (amount) => (
        <Text strong style={{ color: '#1890ff' }}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}
        </Text>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Chưa thanh toán', value: 'unpaid' },
        { text: 'Đã thanh toán', value: 'paid' },
        { text: 'Đã gửi', value: 'sent' },
        { text: 'Quá hạn', value: 'overdue' },
      ],
      render: (status) => {
        let color;
        let icon;
        let text;
        switch (status) {
          case 'paid':
            color = 'success';
            icon = <CheckCircleOutlined />;
            text = 'Đã thanh toán';
            break;
          case 'sent':
            color = 'processing';
            icon = <SendOutlined />;
            text = 'Đã gửi';
            break;
          case 'overdue':
            color = 'error';
            icon = <ExclamationCircleOutlined />;
            text = 'Quá hạn';
            break;
          default:
            color = 'default';
            icon = <ClockCircleOutlined />;
            text = 'Chưa thanh toán';
        }
        return <Badge status={color} text={<Space>{icon} {text}</Space>} />;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => showBillDetails(record.billCode)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              disabled={record.status === 'paid'} 
            />
          </Tooltip>
          <Tooltip title="In hóa đơn">
            <Button 
              type="text" 
              icon={<PrinterOutlined />} 
            />
          </Tooltip>
          <Tooltip title="Gửi hóa đơn">
            <Button 
              type="text" 
              icon={<SendOutlined />}
              disabled={record.status === 'paid' || record.status === 'sent'} 
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa hóa đơn này?"
              okText="Có"
              cancelText="Không"
            >
              <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />}
                disabled={record.status === 'paid'} 
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Show bill details modal
  const showBillDetails = (billCode) => {
    setCurrentBill({ billCode });
    setbillDetailsVisible(true);
  };

  // Handle row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  // Show create bill modal
  const showCreateBillModal = () => {
    form.resetFields();
    setCreateBillVisible(true);
  };

  // Handle create bill submit
  const handleCreateBill = (values) => {
    console.log('Form values:', values);
    setCreateBillVisible(false);
    // In a real application, you would send this data to your API
  };

  // Handle batch actions
  const handleBatchAction = (action) => {
    console.log(`${action} for IDs:`, selectedRowKeys);
    // Implement actual logic for batch actions
    setSelectedRowKeys([]);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ background: '#fff', padding: '0 24px', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <Space>
            <Title level={4} style={{ margin: 0 }}>
              <DollarOutlined style={{ marginRight: 10 }} />
              Quản lý hóa đơn
            </Title>
          </Space>
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={showCreateBillModal}>
              Tạo hóa đơn mới
            </Button>
          </Space>
        </div>
      </Header>

      <Content style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Tổng số hóa đơn"
                  value={0}
                  prefix={<FileAddOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Chưa thanh toán"
                  value={0}
                  valueStyle={{ color: '#faad14' }}
                  prefix={<ClockCircleOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Đã thanh toán"
                  value={0}
                  valueStyle={{ color: '#52c41a' }}
                  prefix={<CheckCircleOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Quá hạn"
                  value={0}
                  valueStyle={{ color: '#ff4d4f' }}
                  prefix={<ExclamationCircleOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </div>

        <Card
          style={{ marginBottom: 24 }}
          bodyStyle={{ padding: '12px 24px' }}
        >
          <Form layout="inline">
            <Form.Item name="search" style={{ marginBottom: 0, flex: 1 }}>
              <Input
                placeholder="Tìm kiếm theo mã hóa đơn, căn hộ, chủ hộ..."
                prefix={<SearchOutlined />}
                allowClear
              />
            </Form.Item>
            <Form.Item name="dateRange" style={{ marginBottom: 0 }}>
              <RangePicker locale={locale} format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item name="status" style={{ marginBottom: 0 }}>
              <Select 
                placeholder="Trạng thái" 
                style={{ width: 150 }}
                allowClear
              >
                <Option value="unpaid">Chưa thanh toán</Option>
                <Option value="paid">Đã thanh toán</Option>
                <Option value="sent">Đã gửi</Option>
                <Option value="overdue">Quá hạn</Option>
              </Select>
            </Form.Item>
            <Form.Item name="billType" style={{ marginBottom: 0 }}>
              <Select 
                placeholder="Loại hóa đơn" 
                style={{ width: 150 }}
                allowClear
              >
                <Option value="management">Phí quản lý</Option>
                <Option value="electricity">Điện</Option>
                <Option value="water">Nước</Option>
                <Option value="others">Khác</Option>
              </Select>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" icon={<FilterOutlined />}>
                Lọc
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          tabBarStyle={{ marginBottom: 16, background: '#fff', padding: '8px 16px', borderRadius: 2 }}
          tabBarExtraContent={
            <Space>
              {selectedRowKeys.length > 0 && (
                <>
                  <Text strong>{selectedRowKeys.length} hóa đơn đã chọn</Text>
                  <Divider type="vertical" />
                  <Tooltip title="Gửi hóa đơn">
                    <Button 
                      icon={<SendOutlined />} 
                      onClick={() => handleBatchAction('send')}
                    >
                      Gửi
                    </Button>
                  </Tooltip>
                  <Tooltip title="In hóa đơn">
                    <Button 
                      icon={<PrinterOutlined />} 
                      onClick={() => handleBatchAction('print')}
                    >
                      In
                    </Button>
                  </Tooltip>
                  <Tooltip title="Tải xuống">
                    <Button 
                      icon={<DownloadOutlined />} 
                      onClick={() => handleBatchAction('download')}
                    >
                      Tải xuống
                    </Button>
                  </Tooltip>
                  <Tooltip title="Xóa hóa đơn">
                    <Popconfirm
                      title="Bạn có chắc chắn muốn xóa các hóa đơn đã chọn?"
                      okText="Có"
                      cancelText="Không"
                      onConfirm={() => handleBatchAction('delete')}
                    >
                      <Button danger icon={<DeleteOutlined />}>
                        Xóa
                      </Button>
                    </Popconfirm>
                  </Tooltip>
                </>
              )}
            </Space>
          }
        >
          <TabPane 
            tab={<Badge count={0} overflowCount={99} size="small">
              <span style={{ paddingRight: 8 }}>Tất cả</span>
            </Badge>} 
            key="all" 
          />
          <TabPane 
            tab={<Badge count={0} size="small" overflowCount={99}>
              <span style={{ paddingRight: 8 }}>Chưa thanh toán</span>
            </Badge>} 
            key="unpaid" 
          />
          <TabPane 
            tab={<Badge count={0} size="small" overflowCount={99}>
              <span style={{ paddingRight: 8 }}>Đã gửi</span>
            </Badge>} 
            key="sent" 
          />
          <TabPane 
            tab={<Badge count={0} size="small" overflowCount={99}>
              <span style={{ paddingRight: 8 }}>Đã thanh toán</span>
            </Badge>} 
            key="paid" 
          />
          <TabPane 
            tab={<Badge count={0} size="small" overflowCount={99} style={{ backgroundColor: '#ff4d4f' }}>
              <span style={{ paddingRight: 8 }}>Quá hạn</span>
            </Badge>} 
            key="overdue" 
          />
        </Tabs>

        <Card>
          <Table
            rowSelection={rowSelection}
            columns={billColumns}
            dataSource={[]}
            loading={loading}
            rowKey="billCode"
            scroll={{ x: 1200 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `Tổng cộng ${total} hóa đơn`,
            }}
          />
        </Card>
      </Content>

      {/* Modal tạo hóa đơn mới */}
      <Modal
        title="Tạo hóa đơn mới"
        open={createBillVisible}
        onCancel={() => setCreateBillVisible(false)}
        width={800}
        footer={[
          <Button key="back" onClick={() => setCreateBillVisible(false)}>
            Hủy
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={() => form.submit()}
          >
            Tạo hóa đơn
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateBill}
        >
          <Divider orientation="left">Thông tin cơ bản</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="billType"
                label="Loại hóa đơn"
                rules={[{ required: true, message: 'Vui lòng chọn loại hóa đơn' }]}
              >
                <Select placeholder="Chọn loại hóa đơn">
                  <Option value="management">Phí quản lý</Option>
                  <Option value="electricity">Điện</Option>
                  <Option value="water">Nước</Option>
                  <Option value="others">Khác</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="period"
                label="Kỳ hóa đơn"
                rules={[{ required: true, message: 'Vui lòng chọn kỳ hóa đơn' }]}
              >
                <Select placeholder="Chọn kỳ hóa đơn">
                  <Option value="01/2025">Tháng 01/2025</Option>
                  <Option value="02/2025">Tháng 02/2025</Option>
                  <Option value="03/2025">Tháng 03/2025</Option>
                  <Option value="Q1/2025">Quý 1/2025</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="apartment"
                label="Căn hộ"
                rules={[{ required: true, message: 'Vui lòng chọn căn hộ' }]}
              >
                <Select 
                  placeholder="Chọn căn hộ"
                  showSearch
                  optionFilterProp="children"
                >
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dueDate"
                label="Hạn thanh toán"
                rules={[{ required: true, message: 'Vui lòng chọn hạn thanh toán' }]}
              >
                <DatePicker 
                  style={{ width: '100%' }} 
                  format="DD/MM/YYYY"
                  locale={locale}
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Chi tiết hóa đơn</Divider>
          
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row gutter={16} key={key} style={{ marginBottom: 8 }}>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'description']}
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder="Mô tả" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, 'quantity']}
                        rules={[{ required: true, message: 'Nhập số lượng' }]}
                        style={{ marginBottom: 0 }}
                      >
                        <InputNumber 
                          placeholder="Số lượng" 
                          style={{ width: '100%' }}
                          min={1}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item
                        {...restField}
                        name={[name, 'unitPrice']}
                        rules={[{ required: true, message: 'Nhập đơn giá' }]}
                        style={{ marginBottom: 0 }}
                      >
                        <InputNumber 
                          placeholder="Đơn giá" 
                          style={{ width: '100%' }}
                          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                          min={0}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item
                        {...restField}
                        name={[name, 'total']}
                        style={{ marginBottom: 0 }}
                      >
                        <InputNumber 
                          placeholder="Thành tiền" 
                          style={{ width: '100%' }}
                          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                          disabled
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Button 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => remove(name)}
                      />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button 
                    type="dashed" 
                    onClick={() => add()} 
                    block 
                    icon={<PlusOutlined />}
                  >
                    Thêm khoản mục
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="note"
                label="Ghi chú"
              >
                <Input.TextArea rows={4} placeholder="Nhập ghi chú (nếu có)" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Tổng tiền hóa đơn"
                  value={0}
                  precision={0}
                  valueStyle={{ color: '#1890ff' }}
                  suffix="VNĐ"
                />
                <Divider style={{ margin: '12px 0' }} />
                <Row gutter={[16, 8]}>
                  <Col span={12}>
                    <Text>Tổng tiền hàng:</Text>
                  </Col>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Text>0 VNĐ</Text>
                  </Col>
                  <Col span={12}>
                    <Text>Thuế VAT (10%):</Text>
                  </Col>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Text>0 VNĐ</Text>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Modal chi tiết hóa đơn */}
      <Modal
        title={<span><DollarOutlined /> Chi tiết hóa đơn</span>}
        open={billDetailsVisible}
        onCancel={() => setbillDetailsVisible(false)}
        width={800}
        footer={[
          <Button key="back" onClick={() => setbillDetailsVisible(false)}>
            Đóng
          </Button>,
          <Button key="print" icon={<PrinterOutlined />}>
            In hóa đơn
          </Button>,
          <Button key="download" icon={<DownloadOutlined />}>
            Tải xuống
          </Button>,
          <Button 
            key="send" 
            type="primary" 
            icon={<SendOutlined />}
          >
            Gửi hóa đơn
          </Button>,
        ]}
      >
        {currentBill && (
          <div>
            <Row gutter={24}>
              <Col span={12}>
                <Card title="Thông tin hóa đơn" size="small" bordered={false}>
                  <p><strong>Mã hóa đơn:</strong> {currentBill.billCode}</p>
                  <p><strong>Loại hóa đơn:</strong> <Tag color="blue">Phí quản lý</Tag></p>
                  <p><strong>Kỳ hóa đơn:</strong> Tháng 03/2025</p>
                  <p><strong>Ngày tạo:</strong> 15/03/2025</p>
                  <p><strong>Hạn thanh toán:</strong> 25/03/2025</p>
                  <p><strong>Trạng thái:</strong> <Badge status="default" text="Chưa thanh toán" /></p>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Thông tin căn hộ" size="small" bordered={false}>
                  <p><strong>Mã căn hộ:</strong> A1203</p>
                  <p><strong>Tên căn hộ:</strong> Vinhomes Central Park #A1203</p>
                  <p><strong>Chủ hộ:</strong> Nguyễn Văn A</p>
                  <p><strong>Số điện thoại:</strong> 0912345678</p>
                  <p><strong>Email:</strong> nguyenvana@example.com</p>
                </Card>
              </Col>
            </Row>

            <Divider>Chi tiết hóa đơn</Divider>

            <Table 
              size="small" 
              pagination={false}
              columns={[
                {
                  title: 'STT',
                  dataIndex: 'index',
                  key: 'index',
                  width: 60,
                },
                {
                  title: 'Mô tả',
                  dataIndex: 'description',
                  key: 'description',
                },
                {
                  title: 'Số lượng',
                  dataIndex: 'quantity',
                  key: 'quantity',
                  width: 100,
                  align: 'right',
                },
                {
                  title: 'Đơn giá',
                  dataIndex: 'unitPrice',
                  key: 'unitPrice',
                  width: 150,
                  align: 'right',
                  render: (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price),
                },
                {
                  title: 'Thành tiền',
                  dataIndex: 'total',
                  key: 'total',
                  width: 150,
                  align: 'right',
                  render: (total) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total),
                },
              ]}
              dataSource={[]}
            />

            <Row justify="end" style={{ marginTop: 24 }}>
              <Col span={8}>
                <div style={{ textAlign: 'right' }}>
                  <p><Text>Tổng tiền hàng:</Text> <Text strong>0 VNĐ</Text></p>
                  <p><Text>Thuế VAT (10%):</Text> <Text strong>0 VNĐ</Text></p>
                  <Divider style={{ margin: '8px 0' }} />
                  <p><Text strong>Tổng cộng:</Text> <Text strong style={{ fontSize: 16, color: '#1890ff' }}>0 VNĐ</Text></p>
                </div>
              </Col>
            </Row>

            <Divider>Ghi chú</Divider>
            <p>Không có ghi chú.</p>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default BillPage;