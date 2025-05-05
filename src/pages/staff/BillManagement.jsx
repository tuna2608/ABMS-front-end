import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Space,
  Tag,
  Flex,
  message,
  Col,
  Divider,
  Row,
} from "antd";
import {
  FileAddOutlined,
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { createBillManagement, getAllBill, getApartments } from "../../redux/apiCalls";
import { Option } from "antd/es/mentions";
import { useSelector } from "react-redux";

const BillManagement = () => {
  const [currentUser, setCurrentUser] = useState(
    useSelector((state) => state.user.currentUser)
  );
  const defaultValue = moment().subtract(1, "months");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createBillVisible, setCreateBillVisible] = useState(false);
  const [apartmentHouseholder, setApartmentHouseholder] = useState(null);
  const [currentBill, setCurrentBill] = useState(null);
  const [form] = Form.useForm();
  const [bills, setBills] = useState([
    // {
    //   billId: 1,
    //   billContent: "Hóa đơn tháng 3",
    //   amount: 15000.0,
    //   lastMonthWaterConsumption: 40.0,
    //   waterConsumption: 41.5,
    //   billDate: "2025-04-06T04:54:00.588012",
    //   status: "unpaid",
    //   username: "Chủ căn hộ Tú1",
    //   apartmentName: "A201",
    //   billType: "water",
    //   surcharge: 0.0,
    //   createBillUserId: 5,
    //   apartmentStatus: "rented",
    // },
  ]);

  useEffect(() => {
    callGetAllBill();
    callGetAllApartment();
  }, []);

  async function callGetAllApartment() {
    setLoading(true);
    try {
      const res = await getApartments();
      // console.log(res.data.length === 0);
      if (res.success) {
        const apartmentsChoice = res.data.filter(
          (apartment) => apartment.householder !== null
        );
        setApartmentHouseholder(apartmentsChoice);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message("Không thể lấy danh sách căn hộ!");
    } finally {
      setLoading(false);
    }
  }

  async function callGetAllBill() {
    setLoading(true);
    try {
      const res = await getAllBill();
      // console.log(res.data.length === 0);
      if (res.success) {
        setBills(res.data);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message("Không thể lấy danh sách hóa đơn!");
    } finally {
      setLoading(false);
    }
    // setBills(res.data);
  }

  // Modal for creating/editing bill
  const showBillModal = (bill = null) => {
    setCurrentBill(bill);
    setIsModalVisible(true);

    // Reset form and set initial values
    form.resetFields();
    if (bill) {
      form.setFieldsValue({
        ...bill,
        dueDate: bill.dueDate ? moment(bill.dueDate) : null,
        createdDate: bill.createdDate ? moment(bill.createdDate) : null,
      });
    }
  };
  // Delete bill
  const handleDeleteBill = (billId) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc muốn xóa hóa đơn này?",
      onOk() {
        setBills(bills.filter((bill) => bill.id !== billId));
        message.success("Hóa đơn đã được xóa");
      },
    });
  };

  // Columns for bill table
  const columns = [
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
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colorMap = {
          Paid: "green",
          unpaid: "red",
          Overdue: "orange",
        };
        return <Tag color={colorMap[status] || "default"}>{status}</Tag>;
      },
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => showBillModal(record)}
            type="primary"
            ghost
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteBill(record.id)}
            type="primary"
            ghost
          ></Button>
          <Button icon={<FilePdfOutlined />} type="default">
            Xuất PDF
          </Button>
        </Space>
      ),
    },
  ];

  const showCreateBillModal = () => {
    form.resetFields();
    setCreateBillVisible(true);
  };
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
      const res = await createBillManagement(formData);
      if (res.success) {
        message.success(res.message);
        setCreateBillVisible(false);
        window.location.href = "/staffHome/bill-management";
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Không thể tạo hóa đơn");
    }
  };

  return (
    <Card
      title={
        <Space>
          <Flex justify="space-between" align="center" gap={20}>
            <div>
              <FileAddOutlined />
              <span> Quản Lý Hóa Đơn</span>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showCreateBillModal}
              style={{ borderRadius: "4px" }}
            >
              Tạo hóa đơn mới
            </Button>
          </Flex>
        </Space>
      }
    >
      {/* Bill Table */}
      <Table
        columns={columns}
        dataSource={bills}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
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
                  <Option value="Hóa đơn quản lý căn hộ">Phí quản lý căn hộ</Option>
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
                  {apartmentHouseholder &&
                    apartmentHouseholder.map((apartment) => (
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
    </Card>
  );
};

export default BillManagement;
