import React, { useState, useEffect } from "react";
import {
  Card, Table, Button, Space, Modal, Form, Input, Select, DatePicker, Tag, Typography, Row, Col, message, Popconfirm, Badge, Tooltip, Image
} from "antd";
import {
  CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, 
  EyeOutlined, EditOutlined, UserOutlined, MailOutlined, PhoneOutlined, 
  HomeOutlined, CalendarOutlined, FileOutlined, SearchOutlined
} from "@ant-design/icons";
import moment from 'moment';

const { Option } = Select;
const { Text, Title } = Typography;

const UpdateContract = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [approveForm] = Form.useForm();

  // Simulated data fetching
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        // Simulazione di chiamata API
        setTimeout(() => {
          const sampleContracts = [
            {
              id: 1,
              user_name: "user1",
              full_name: "Nguyen Van A",
              email: "user1@example.com",
              phone_number: "0123456789",
              apartment_name: "A101",
              verification_type: 1,
              verification_type_name: "Hợp đồng thuê căn hộ",
              contract_start_date: "2023-01-01",
              contract_end_date: "2024-01-01",
              verified: 0,
              status: "Đang chờ duyệt",
              documents: [
                {
                  id: 1,
                  name: "CMND.jpg",
                  url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                },
                {
                  id: 2,
                  name: "HopDongThue.pdf",
                  url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                }
              ],
              created_at: "2023-01-01T10:30:00"
            },
            {
              id: 2,
              user_name: "user2",
              full_name: "Tran Thi B",
              email: "user2@example.com",
              phone_number: "0987654321",
              apartment_name: "C301",
              verification_type: 2,
              verification_type_name: "Hợp đồng mua căn hộ",
              contract_start_date: "2023-02-01",
              contract_end_date: null,
              verified: 0,
              status: "Đang chờ duyệt",
              documents: [
                {
                  id: 3,
                  name: "CCCD.jpg",
                  url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                },
                {
                  id: 4,
                  name: "HopDongMua.pdf",
                  url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                }
              ],
              created_at: "2023-02-01T09:15:00"
            },
            {
              id: 3,
              user_name: "user3",
              full_name: "Le Van C",
              email: "user3@example.com",
              phone_number: "0369852147",
              apartment_name: "B202",
              verification_type: 1,
              verification_type_name: "Hợp đồng thuê căn hộ",
              contract_start_date: "2023-03-01",
              contract_end_date: "2024-03-01",
              verified: 1,
              status: "Đã duyệt",
              documents: [
                {
                  id: 5,
                  name: "CMND.jpg",
                  url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                },
                {
                  id: 6,
                  name: "HopDongThue.pdf",
                  url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                }
              ],
              created_at: "2023-03-01T14:20:00",
              approved_at: "2023-03-02T10:15:00",
              approved_by: "admin"
            },
            {
              id: 4,
              user_name: "user4",
              full_name: "Pham Thi D",
              email: "user4@example.com",
              phone_number: "0741258963",
              apartment_name: "D401",
              verification_type: 2,
              verification_type_name: "Hợp đồng mua căn hộ",
              contract_start_date: "2023-04-01",
              contract_end_date: null,
              verified: 2,
              status: "Đã từ chối",
              reject_reason: "Tài liệu không hợp lệ",
              documents: [
                {
                  id: 7,
                  name: "CCCD.jpg",
                  url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                },
                {
                  id: 8,
                  name: "HopDongMua.pdf",
                  url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                }
              ],
              created_at: "2023-04-01T16:45:00",
              rejected_at: "2023-04-02T11:30:00",
              rejected_by: "admin"
            }
          ];
          
          setContracts(sampleContracts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching contracts:", error);
        message.error("Lỗi khi tải danh sách hợp đồng");
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const handleViewContract = (record) => {
    setSelectedContract(record);
    setViewModalVisible(true);
  };

  const handleApproveClick = (record) => {
    setSelectedContract(record);
    
    const startDate = record.contract_start_date ? moment(record.contract_start_date) : null;
    const endDate = record.contract_end_date ? moment(record.contract_end_date) : null;
    
    approveForm.setFieldsValue({
      full_name: record.full_name,
      email: record.email,
      phone_number: record.phone_number,
      apartment_name: record.apartment_name,
      verification_type: record.verification_type,
      contract_start_date: startDate,
      contract_end_date: endDate
    });
    
    setApproveModalVisible(true);
  };

  const handleRejectClick = (record) => {
    setSelectedContract(record);
    setRejectReason("");
    setRejectModalVisible(true);
  };

  const handleApproveSubmit = () => {
    approveForm.validateFields().then(values => {
      // In una vera applicazione, qui si effettuerebbe una chiamata API
      console.log("Approve form values:", values);
      
      setTimeout(() => {
        // Aggiorna lo stato dei contratti
        const updatedContracts = contracts.map(item => {
          if (item.id === selectedContract.id) {
            return {
              ...item,
              full_name: values.full_name,
              email: values.email,
              phone_number: values.phone_number,
              apartment_name: values.apartment_name,
              verification_type: values.verification_type,
              verification_type_name: values.verification_type === 1 ? "Hợp đồng thuê căn hộ" : "Hợp đồng mua căn hộ",
              contract_start_date: values.contract_start_date.format("YYYY-MM-DD"),
              contract_end_date: values.contract_end_date ? values.contract_end_date.format("YYYY-MM-DD") : null,
              verified: 1,
              status: "Đã duyệt",
              approved_at: new Date().toISOString(),
              approved_by: "admin"
            };
          }
          return item;
        });
        
        setContracts(updatedContracts);
        setApproveModalVisible(false);
        setSelectedContract(null);
        message.success("Đã duyệt hợp đồng thành công!");
      }, 1000);
    });
  };

  const handleRejectSubmit = () => {
    if (!rejectReason) {
      message.error("Vui lòng nhập lý do từ chối!");
      return;
    }
    
    // In una vera applicazione, qui si effettuerebbe una chiamata API
    console.log("Reject reason:", rejectReason);
    
    setTimeout(() => {
      // Aggiorna lo stato dei contratti
      const updatedContracts = contracts.map(item => {
        if (item.id === selectedContract.id) {
          return {
            ...item,
            verified: 2,
            status: "Đã từ chối",
            reject_reason: rejectReason,
            rejected_at: new Date().toISOString(),
            rejected_by: "admin"
          };
        }
        return item;
      });
      
      setContracts(updatedContracts);
      setRejectModalVisible(false);
      setSelectedContract(null);
      setRejectReason("");
      message.success("Đã từ chối hợp đồng!");
    }, 1000);
  };

  const handlePreview = (image) => {
    setPreviewImage(image);
    setPreviewVisible(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredContracts = contracts.filter(contract => {
    const searchValue = searchText.toLowerCase();
    return (
      contract.user_name.toLowerCase().includes(searchValue) ||
      contract.full_name.toLowerCase().includes(searchValue) ||
      contract.email.toLowerCase().includes(searchValue) ||
      contract.apartment_name.toLowerCase().includes(searchValue)
    );
  });

  const getStatusTag = (verified) => {
    switch (verified) {
      case 0:
        return <Tag color="blue" icon={<ExclamationCircleOutlined />}>Đang chờ duyệt</Tag>;
      case 1:
        return <Tag color="green" icon={<CheckCircleOutlined />}>Đã duyệt</Tag>;
      case 2:
        return <Tag color="red" icon={<CloseCircleOutlined />}>Đã từ chối</Tag>;
      default:
        return <Tag color="default">Không xác định</Tag>;
    }
  };

  const renderDocumentList = (documents) => {
    return (
      <Space direction="vertical">
        {documents.map(doc => (
          <div key={doc.id} style={{ display: 'flex', alignItems: 'center' }}>
            <FileOutlined style={{ marginRight: 8 }} />
            <Text 
              style={{ cursor: 'pointer', color: '#1890ff' }}
              onClick={() => handlePreview(doc.url)}
              ellipsis={{ tooltip: doc.name }}
            >
              {doc.name}
            </Text>
          </div>
        ))}
      </Space>
    );
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (text, record) => (
        <Space>
          <UserOutlined />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Họ tên',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => (
        <Space>
          <MailOutlined />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Căn hộ',
      dataIndex: 'apartment_name',
      key: 'apartment_name',
      render: (text) => (
        <Space>
          <HomeOutlined />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Loại hợp đồng',
      dataIndex: 'verification_type_name',
      key: 'verification_type_name',
      render: (text, record) => (
        <Tag color={record.verification_type === 1 ? 'blue' : 'purple'}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'contract_start_date',
      key: 'contract_start_date',
      render: (text) => (
        <Space>
          <CalendarOutlined />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'verified',
      key: 'verified',
      render: (verified) => getStatusTag(verified),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button 
              icon={<EyeOutlined />} 
              onClick={() => handleViewContract(record)}
              type="default"
              size="small"
            />
          </Tooltip>
          
          {record.verified === 0 && (
            <>
              <Tooltip title="Phê duyệt">
                <Button 
                  icon={<CheckCircleOutlined />} 
                  onClick={() => handleApproveClick(record)}
                  type="primary"
                  size="small"
                />
              </Tooltip>
              
              <Tooltip title="Từ chối">
                <Button 
                  icon={<CloseCircleOutlined />} 
                  onClick={() => handleRejectClick(record)}
                  danger
                  size="small"
                />
              </Tooltip>
            </>
          )}
          
          {record.verified !== 0 && (
            <Tooltip title="Chỉnh sửa">
              <Button 
                icon={<EditOutlined />} 
                onClick={() => handleApproveClick(record)}
                size="small"
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="update-contract-container">
      <Card 
        title={
          <Space>
            <Title level={4}>Quản lý và duyệt hợp đồng</Title>
            <Badge 
              count={contracts.filter(c => c.verified === 0).length} 
              style={{ backgroundColor: '#1890ff' }}
            />
          </Space>
        }
        extra={
          <Input.Search
            placeholder="Tìm kiếm theo tên, email, căn hộ..."
            allowClear
            enterButton={<SearchOutlined />}
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />
        }
      >
        <Table
          columns={columns}
          dataSource={filteredContracts}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Modal xem chi tiết hợp đồng */}
      <Modal
        title="Chi tiết hợp đồng"
        visible={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setViewModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={700}
      >
        {selectedContract && (
          <Card>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div>
                    <Text strong><UserOutlined /> Tên người dùng: </Text>
                    <Text>{selectedContract.user_name}</Text>
                  </div>
                  <div>
                    <Text strong><UserOutlined /> Họ và tên: </Text>
                    <Text>{selectedContract.full_name}</Text>
                  </div>
                  <div>
                    <Text strong><MailOutlined /> Email: </Text>
                    <Text>{selectedContract.email}</Text>
                  </div>
                  <div>
                    <Text strong><PhoneOutlined /> Số điện thoại: </Text>
                    <Text>{selectedContract.phone_number}</Text>
                  </div>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div>
                    <Text strong><HomeOutlined /> Căn hộ: </Text>
                    <Text>{selectedContract.apartment_name}</Text>
                  </div>
                  <div>
                    <Text strong>Loại hợp đồng: </Text>
                    <Tag color={selectedContract.verification_type === 1 ? 'blue' : 'purple'}>
                      {selectedContract.verification_type_name}
                    </Tag>
                  </div>
                  <div>
                    <Text strong><CalendarOutlined /> Ngày bắt đầu: </Text>
                    <Text>{selectedContract.contract_start_date}</Text>
                  </div>
                  {selectedContract.contract_end_date && (
                    <div>
                      <Text strong><CalendarOutlined /> Ngày kết thúc: </Text>
                      <Text>{selectedContract.contract_end_date}</Text>
                    </div>
                  )}
                </Space>
              </Col>
              <Col span={24}>
                <Text strong>Trạng thái: </Text>
                {getStatusTag(selectedContract.verified)}
              </Col>
              {selectedContract.verified === 2 && selectedContract.reject_reason && (
                <Col span={24}>
                  <Text strong>Lý do từ chối: </Text>
                  <Text type="danger">{selectedContract.reject_reason}</Text>
                </Col>
              )}
              <Col span={24}>
                <Text strong>Tài liệu đính kèm: </Text>
                {renderDocumentList(selectedContract.documents)}
              </Col>
              <Col span={24}>
                <Text strong>Ngày tạo: </Text>
                <Text>{moment(selectedContract.created_at).format('DD/MM/YYYY HH:mm:ss')}</Text>
              </Col>
              {selectedContract.approved_at && (
                <Col span={24}>
                  <Text strong>Ngày duyệt: </Text>
                  <Text>{moment(selectedContract.approved_at).format('DD/MM/YYYY HH:mm:ss')}</Text>
                </Col>
              )}
              {selectedContract.rejected_at && (
                <Col span={24}>
                  <Text strong>Ngày từ chối: </Text>
                  <Text>{moment(selectedContract.rejected_at).format('DD/MM/YYYY HH:mm:ss')}</Text>
                </Col>
              )}
            </Row>
          </Card>
        )}
      </Modal>

      {/* Modal phê duyệt hợp đồng */}
      <Modal
        title="Phê duyệt hợp đồng"
        visible={approveModalVisible}
        onCancel={() => setApproveModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setApproveModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleApproveSubmit}>
            Phê duyệt
          </Button>,
        ]}
        width={700}
      >
        <Form form={approveForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="full_name"
                label="Họ và tên"
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Nhập email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone_number"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="apartment_name"
                label="Tên căn hộ"
                rules={[{ required: true, message: 'Vui lòng nhập tên căn hộ!' }]}
              >
                <Input prefix={<HomeOutlined />} placeholder="Nhập tên căn hộ" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="verification_type"
                label="Loại hợp đồng"
                rules={[{ required: true, message: 'Vui lòng chọn loại hợp đồng!' }]}
              >
                <Select placeholder="Chọn loại hợp đồng">
                  <Option value={1}>Hợp đồng thuê căn hộ</Option>
                  <Option value={2}>Hợp đồng mua căn hộ</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Row gutter={8}>
                <Col span={selectedContract?.verification_type === 2 ? 24 : 12}>
                  <Form.Item
                    name="contract_start_date"
                    label="Ngày bắt đầu"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
                  >
                    <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>
                {selectedContract?.verification_type !== 2 && (
                  <Col span={12}>
                    <Form.Item
                      name="contract_end_date"
                      label="Ngày kết thúc"
                      rules={[{ required: selectedContract?.verification_type === 1, message: 'Vui lòng chọn ngày kết thúc!' }]}
                    >
                      <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
          {selectedContract && (
            <div style={{ marginTop: 16 }}>
              <Text strong>Tài liệu đính kèm:</Text>
              {renderDocumentList(selectedContract.documents)}
            </div>
          )}
        </Form>
      </Modal>

      {/* Modal từ chối hợp đồng */}
      <Modal
        title="Từ chối hợp đồng"
        visible={rejectModalVisible}
        onCancel={() => setRejectModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setRejectModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="submit" danger onClick={handleRejectSubmit}>
            Xác nhận từ chối
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 16 }}>
          <Text>Bạn có chắc chắn muốn từ chối hợp đồng này?</Text>
        </div>
        <Form layout="vertical">
          <Form.Item
            label="Lý do từ chối"
            required
            rules={[{ required: true, message: 'Vui lòng nhập lý do từ chối!' }]}
          >
            <Input.TextArea
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Nhập lý do từ chối..."
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal xem trước tài liệu */}
      <Modal
        visible={previewVisible}
        title="Xem tài liệu"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <Image
          alt="document"
          style={{ width: '100%' }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default UpdateContract;