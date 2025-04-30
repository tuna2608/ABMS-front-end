import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Space,
  Tag,
  message,
} from "antd";
import { SafetyOutlined} from "@ant-design/icons";
import { getAllDeposits } from "../../redux/apiCalls";


const DepositManagement = () => {
  const [loading, setLoading] = useState(false);
  const [setDepositFilterStatus] = useState("all");

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
        // message.success(res.message)
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

  // Fetch deposits
  useEffect(() => {
    const fetchDeposits = async () => {
      const result = await getAllDeposits();
      if (result.success) {
        setDeposits(result.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchDeposits();
  }, []);

  // Calculate deposit statistics
  const depositStats = {
    total: deposits.length,
    ongoing: deposits.filter(d => d.status === 'ongoing').length,
    done: deposits.filter(d => d.status === 'done').length,
    none: deposits.filter(d => d.status === 'none').length,
    totalAmount: deposits.reduce((sum, deposit) => sum + deposit.depositPrice, 0)
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
          cancel: "orange" 
        };
        const textMap = {
          ongoing: "Đang thực hiện",
          done: "Đã chuyển tiền",
          cancel: "Hủy chuyển tiền"
        };
        return <Tag color={colorMap[status] || "default"}>{textMap[status]}</Tag>;
      },
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
    >
      {/* Phần còn lại của component giữ nguyên như cũ */}
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
