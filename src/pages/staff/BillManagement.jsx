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
} from "antd";
import {
  FileAddOutlined,
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { getAllBill } from "../../redux/apiCalls";

const BillManagement = () => {
  const defaultValue = moment().subtract(1, "months");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);
  const [form] = Form.useForm();
  const [bills, setBills] = useState([
    {
      billId: 1,
      billContent: "Hóa đơn tháng 3",
      amount: 15000.0,
      lastMonthWaterConsumption: 40.0,
      waterConsumption: 41.5,
      billDate: "2025-04-06T04:54:00.588012",
      status: "unpaid",
      username: "Chủ căn hộ Tú1",
      apartmentName: "A201",
      billType: "water",
      surcharge: 0.0,
      createBillUserId: 5,
      apartmentStatus: "rented",
    },
  ]);

  useEffect(() => {
    callGetAllBill();
  }, []);

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

  // Handle bill creation/update
  const handleSaveBill = (values) => {
    const newBill = {
      ...values,
      id: currentBill
        ? currentBill.id
        : `HD-${moment().format("YYYY-MM")}-${bills.length + 1}`,
      dueDate: values.dueDate ? values.dueDate.format("YYYY-MM-DD") : null,
      createdDate: values.createdDate
        ? values.createdDate.format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),
    };

    if (currentBill) {
      // Update existing bill
      setBills(
        bills.map((bill) => (bill.id === currentBill.id ? newBill : bill))
      );
    } else {
      // Add new bill
      setBills([...bills, newBill]);
    }

    setIsModalVisible(false);
    message.success("Hóa đơn đã được lưu thành công");
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

  return (
    <Card
      title={
        <Space>
          <FileAddOutlined />
          <span>Quản Lý Hóa Đơn</span>
        </Space>
      }
      extra={
        <Button
          type="primary"
          icon={<FileAddOutlined />}
          onClick={() => showBillModal()}
        >
          Tạo Hóa Đơn Mới
        </Button>
      }
    >
      {/* Filtering Section */}
      <Flex style={{ marginBottom: "16px" }} justify="space-between">
        <Flex align="center" style={{ gap: "20px" }}>
          <DatePicker picker="month" placeholder="Chọn tháng" />
          <Select placeholder="Trạng Thái" style={{ width: 120 }}>
            <Select.Option value="Paid">Đã Thanh Toán</Select.Option>
            <Select.Option value="Unpaid">Chưa Thanh Toán</Select.Option>
            <Select.Option value="Overdue">Quá Hạn</Select.Option>
          </Select>
          <Button type="default">Lọc</Button>
        </Flex>
        <Button>Xuất Báo Cáo</Button>
      </Flex>

      {/* Bill Table */}
      <Table
        columns={columns}
        dataSource={bills}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Create/Edit Bill Modal */}
      <Modal
        title={currentBill ? "Chỉnh Sửa Hóa Đơn" : "Tạo Hóa Đơn Mới"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveBill}>
          <Form.Item
            name="apartmentId"
            label="Căn Hộ"
            rules={[{ required: true, message: "Vui lòng nhập mã căn hộ" }]}
          >
            <Input placeholder="Nhập mã căn hộ" />
          </Form.Item>

          <Form.Item
            name="tenantName"
            label="Tên Người Thuê"
            rules={[
              { required: true, message: "Vui lòng nhập tên người thuê" },
            ]}
          >
            <Input placeholder="Nhập tên người thuê" />
          </Form.Item>

          <Form.Item
            name="billType"
            label="Loại Hóa Đơn"
            rules={[{ required: true, message: "Vui lòng chọn loại hóa đơn" }]}
          >
            <Select placeholder="Chọn loại hóa đơn">
              <Select.Option value="Điện">Điện</Select.Option>
              <Select.Option value="Maintenance">Bảo Trì</Select.Option>
              <Select.Option value="Rent">Tiền Thuê</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Số Tiền"
            rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
          >
            <Input type="number" placeholder="Nhập số tiền" suffix="VND" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng Thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Select.Option value="Paid">Đã Thanh Toán</Select.Option>
              <Select.Option value="Unpaid">Chưa Thanh Toán</Select.Option>
              <Select.Option value="Overdue">Quá Hạn</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Ngày Đến Hạn"
            rules={[{ required: true, message: "Vui lòng chọn ngày đến hạn" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="details" label="Chi Tiết">
            <Input.TextArea
              rows={3}
              placeholder="Nhập chi tiết hóa đơn (không bắt buộc)"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {currentBill ? "Cập Nhật Hóa Đơn" : "Tạo Hóa Đơn"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default BillManagement;
