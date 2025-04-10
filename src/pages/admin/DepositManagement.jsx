import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Space,
  Button,
  Input,
  Select,
  Tag,
  Flex,
  message,
} from "antd";
import { SafetyOutlined, SearchOutlined,EyeOutlined } from "@ant-design/icons";
import { getAllDeposits } from "../../redux/apiCalls";

const { Option } = Select;

const DepositManagement = () => {
  const [loading, setLoading] = useState(false);
  const [depositFilterStatus, setDepositFilterStatus] = useState("all");

  const [deposits, setDeposits] = useState([
    {
      depositId: 1,
      apartmentName: "A201",
      depositUserName: "Người dùng Tú",
      depositPrice: 9000.0,
      status: "done",
      postOwnerName: "Chủ căn hộ Tú1",
    },
  ]);


  useEffect(()=>{
    callGetAllDeposits();
  },[])

  async function callGetAllDeposits(){
    setLoading(true)
    try {
      const res = await getAllDeposits();
      if (res.success) {
        setDeposits(res.data)
        message.success(res.message)
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message("Không thể thực hiện lấy danh sách đặt cọc!");
    } finally {
      setLoading(false)
    }
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VNĐ";
  };

  // Deposit statistics
  const depositStats = {
    total: 3,
    pending: 1,
    confirmed: 1,
    completed: 1,
    cancelled: 0,
    totalAmount: 418200000,
  };

  const depositColumns = [
    {
      title: "Căn hộ",
      dataIndex: "apartmentName",
      key: "apartmentName",
    },
    {
      title: "Người đặt cọc",
      dataIndex: "depositUserName",
      key: "depositUserName",
    },
    {
      title: "Số tiền",
      dataIndex: "depositPrice",
      key: "depositPrice",
      render: (price) => `${price} VND`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colorMap = {
          ongoing: "blue",
          done: "green",
        };
        const textMap = {
          ongoing: "Đang thực hiện",
          done: "Đã chuyển tiền",
        };
        return <Tag color={colorMap[status] || "default"}>{textMap[status]}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Flex gap={12}>
          <Button
            type="primary"
            icon={<EyeOutlined />}
          >
            Xem chi tiết
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <Card
      title={
        <Space>
          <SafetyOutlined />
          <span>Quản lý đặt cọc</span>
        </Space>
      }
      extra={
        <Button type="primary" onClick={() => {}}>
          Tạo giao dịch đặt cọc mới
        </Button>
      }
    >
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card onClick={() => setDepositFilterStatus("all")} hoverable>
            <Statistic
              title="Tổng số"
              value={depositStats.total}
              valueStyle={{ color: "#1890ff" }}
              suffix="giao dịch"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5}>
          <Card onClick={() => setDepositFilterStatus("pending")} hoverable>
            <Statistic
              title="Chờ xác nhận"
              value={depositStats.pending}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5}>
          <Card onClick={() => setDepositFilterStatus("confirmed")} hoverable>
            <Statistic
              title="Đã xác nhận"
              value={depositStats.confirmed}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5}>
          <Card onClick={() => setDepositFilterStatus("completed")} hoverable>
            <Statistic
              title="Hoàn thành"
              value={depositStats.completed}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5}>
          <Card onClick={() => setDepositFilterStatus("cancelled")} hoverable>
            <Statistic
              title="Đã hủy"
              value={depositStats.cancelled}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col span={24}>
          <Card>
            <Statistic
              title="Tổng giá trị giao dịch"
              value={formatCurrency(depositStats.totalAmount)}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
      </Row>

      <Space style={{ marginBottom: 20 }} size="large" wrap>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm kiếm mã giao dịch, căn hộ"
          style={{ width: 300 }}
          allowClear
        />

        <Space>
          <Select
            value={depositFilterStatus}
            style={{ width: 150 }}
            onChange={setDepositFilterStatus}
          >
            <Option value="all">Tất cả trạng thái</Option>
            <Option value="pending">Chờ xác nhận</Option>
            <Option value="confirmed">Đã xác nhận</Option>
            <Option value="completed">Hoàn thành</Option>
            <Option value="cancelled">Đã hủy</Option>
          </Select>
        </Space>
      </Space>

      <Table
        columns={depositColumns}
        dataSource={deposits}
        rowKey="id"
        pagination={{
          pageSize: 5,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} giao dịch`,
        }}
        loading={loading}
        scroll={{ x: 1100 }}
      />
    </Card>
  );
};

export default DepositManagement;
