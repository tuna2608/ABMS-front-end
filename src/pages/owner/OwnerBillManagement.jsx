import React, { useEffect, useState } from "react";
import {
  Layout,
  Typography,
  Button,
  Space,
  Table,
  Badge,
  Modal,
  Form,
  Select,
  Input,
  Row,
  Col,
  Divider,
  Tooltip,
  Popconfirm, 
  message,
  Tag,
  Card
} from "antd";
import {
  PlusOutlined,
  DollarOutlined,
  EyeOutlined,
  PrinterOutlined,
  DeleteOutlined,
  PayCircleOutlined,
  CheckCircleOutlined,
  SendOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  createBillMonthPaid,
  getAllBillOwner,
  getOwnApartmentRented,
  paymentBill,
} from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Option } = Select;

const BillPage = () => {
  const [currentUser, setCurrentUser] = useState(
    useSelector((state) => state.user.currentUser)
  );
  const defaultValue = moment().subtract(1, "months");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [createBillVisible, setCreateBillVisible] = useState(false);
  const [form] = Form.useForm();
  const [billDetailsVisible, setbillDetailsVisible] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);
  const [selectedDate, setSelectedDate] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const [myApartment, setMyApartment] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);

  useEffect(() => {
    callGetAllBillOwner(currentUser.userId);
    callGetMyApartment(currentUser.userId);
  }, [currentUser]);

  async function callGetAllBillOwner(userId) {
    setLoading(true);
    try {
      const res = await getAllBillOwner(dispatch, userId);
      if (res.success) {
        setBills(res.data);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Không thể lấy danh sách hóa đơn!");
    } finally {
      setLoading(false);
    }
  }

  async function callGetMyApartment(userId) {
    try {
      const res = await getOwnApartmentRented(userId);
      if (res.success) {
        setMyApartment(res.data);
      }
    } catch (error) {
      message.error("Không thể lấy danh sách căn hộ đã cho thuê");
    }
  }

  // Table columns for bill list
  const billColumns = [
    {
      title: "Nội dung",
      dataIndex: "billContent",
      key: "billContent",
    },
    {
      title: "Tên căn hộ",
      dataIndex: "apartmentName",
      key: "apartmentName",
    },
    {
      title: "Ngày xuất hóa đơn",
      dataIndex: "billDate",
      key: "billDate",
    },
    {
      title: "Loại Hóa Đơn",
      dataIndex: "billType",
      key: "billType",
      render: (billType) => {
        const colorMap = {
          water: "blue",
          Maintenance: "green",
          Rent: "purple",
          monthPaid: "orange"
        };
        return <Tag color={colorMap[billType] || "default"}>{billType}</Tag>;
      },
    },
    {
      title: "Số Tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${amount} VND`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        let icon;
        let text;
        switch (status) {
          case "paid":
            color = "success";
            icon = <CheckCircleOutlined />;
            text = "Đã thanh toán";
            break;
          case "sent":
            color = "processing";
            icon = <SendOutlined />;
            text = "Đã gửi";
            break;
          case "overdue":
            color = "error";
            icon = <ExclamationCircleOutlined />;
            text = "Quá hạn";
            break;
          default:
            color = "default";
            icon = <ClockCircleOutlined />;
            text = "Chưa thanh toán";
        }
        return (
          <Badge
            status={color}
            text={
              <Space>
                {icon} {text}
              </Space>
            }
          />
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => showBillDetails(record.billCode)}
            />
          </Tooltip>
          {record.status === "unpaid" && ((record.billType === "water" && record.apartmentStatus === "unrented") || record.billType === "managementFee" )&& (
            <Button
              type="primary"
              size="small"
              icon={<PayCircleOutlined />}
              disabled={record.status === "paid"}
              onClick={() => handlePayment(record)}
            >
              Thanh toán
            </Button>
          )}
          <Tooltip title="In hóa đơn">
            <Button type="text" icon={<PrinterOutlined />} />
          </Tooltip>
          {currentUser.userId === record.createBillUserId && (
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
                  disabled={record.status === "paid"}
                />
              </Popconfirm>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const handlePayment = async (record) => {
    const formData = {
      billId: record.billId,
      productName: record.billContent,
      description: record.billContent,
      returnUrl: "https://abms-front-end.vercel.app/payment/success",
      cancelUrl: "https://abms-front-end.vercel.app/payment/cancel",
      price: record.amount,
    };
    try {
      const res = await paymentBill(formData);
      if (res.success) {
        localStorage.setItem("paymentBillRequest", JSON.stringify(formData));
        const url = res?.data?.checkoutUrl;
        window.location.href = url;
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Không thể thực hiện thanh toán hóa đơn!");
    }
  };

  // Show bill details modal
  const showBillDetails = (billCode) => {
    setCurrentBill({ billCode });
    setbillDetailsVisible(true);
  };

  // Show create bill modal
  const showCreateBillModal = () => {
    form.resetFields();
    setCreateBillVisible(true);
  };

  // Handle create bill submit
  const handleCreateBill = async (values) => {
    const month = defaultValue.month() + 1;
    const year = defaultValue.year();
    const formData = {
      apartmentName: values.apartment,
      billContent: `${values.billType} ${values.period} ${month}/${year}`,
      userName: currentUser.userName,
      consumptionId: null,
      createdUserId: currentUser.userId,
      surcharge: 0,
      period: values.period,
      amount: values.amount,
    };
    
    try {
      const res = await createBillMonthPaid(dispatch, formData);
      if(res.success){
        message.success(res.message);
        setCreateBillVisible(false);
        window.location.href = "/ownerHome/bill-management";
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Không thể tạo hóa đơn");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", padding: "20px" }}>
      {/* Header section - exactly matching Quản Lý Bài Viết */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <DollarOutlined style={{ marginRight: "8px" }} />
          <Typography.Text strong>Quản lý hóa đơn</Typography.Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={showCreateBillModal}
          style={{ borderRadius: "4px" }}
        >
          Tạo hóa đơn mới
        </Button>
      </div>

      {/* Content section with white background - matching Quản Lý Bài Viết */}
      <div style={{ 
        background: "#fff", 
        borderRadius: "4px", 
        padding: "0" 
      }}>
        <Table
          columns={billColumns}
          dataSource={bills}
          loading={loading}
          rowKey="billCode"
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Tổng cộng ${total} hóa đơn`,
          }}
          style={{ 
            borderRadius: "4px",
            overflow: "hidden" 
          }}
        />
      </div>

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
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Tạo hóa đơn
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateBill}>
          <Divider orientation="left">Thông tin cơ bản</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="billType"
                label="Loại hóa đơn"
                rules={[
                  { required: true, message: "Vui lòng chọn loại hóa đơn" },
                ]}
              >
                <Select placeholder="Chọn loại hóa đơn">
                  <Option value="Hóa đơn thuê nhà">Tiền thuê theo tháng</Option>
                  <Option value="Hóa đơn khác">Khác</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="apartment"
                label="Căn hộ"
                rules={[{ required: true, message: "Vui lòng chọn căn hộ" }]}
              >
                <Select placeholder="Chọn căn hộ">
                  {myApartment &&
                    myApartment.map((apartment) => (
                      <Option
                        key={apartment.apartmentId}
                        value={apartment.apartmentName}
                      >
                        {apartment.apartmentName}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="amount"
                label="Số tiền"
                rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
              >
                <Input placeholder="Số tiền" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="period"
                label="Hóa đơn theo kỳ hạn:"
                rules={[
                  { required: true, message: "Vui lòng chọn kỳ hóa đơn" },
                ]}
              >
                <Select placeholder="Chọn kỳ hóa đơn">
                  <Option value="Tháng">Tháng</Option>
                  <Option value="Quý">Quý</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Modal chi tiết hóa đơn */}
      <Modal
        title={
          <span>
            <DollarOutlined /> Chi tiết hóa đơn
          </span>
        }
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
        ]}
      >
        {currentBill && (
          <div>
            <Row gutter={24}>
              <Col span={12}>
                <Card title="Thông tin hóa đơn" size="small" bordered={false}>
                  <p>
                    <strong>Mã hóa đơn:</strong> {currentBill.billCode}
                  </p>
                  <p>
                    <strong>Loại hóa đơn:</strong>{" "}
                    <Tag color="blue">Phí quản lý</Tag>
                  </p>
                  <p>
                    <strong>Kỳ hóa đơn:</strong> Tháng 03/2025
                  </p>
                  <p>
                    <strong>Ngày tạo:</strong> 15/03/2025
                  </p>
                  <p>
                    <strong>Hạn thanh toán:</strong> 25/03/2025
                  </p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    <Badge status="default" text="Chưa thanh toán" />
                  </p>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Thông tin căn hộ" size="small" bordered={false}>
                  <p>
                    <strong>Mã căn hộ:</strong> A1203
                  </p>
                  <p>
                    <strong>Tên căn hộ:</strong> Vinhomes Central Park #A1203
                  </p>
                  <p>
                    <strong>Chủ hộ:</strong> Nguyễn Văn A
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> 0912345678
                  </p>
                  <p>
                    <strong>Email:</strong> nguyenvana@example.com
                  </p>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BillPage;