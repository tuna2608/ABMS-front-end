import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  message,
  Typography,
  Tag,
  Modal,
  Space,
  Alert,
  Table,
  Drawer,
  Descriptions,
  Divider,
  Image,
} from "antd";
import {
  MoneyCollectOutlined,
  BankOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  QrcodeOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { acceptReCoin, getAllReCoin, login, rejectReCoin } from "../../redux/apiCalls";

const { Text } = Typography;

// Hàm định dạng số tiền mới thay thế cho toLocaleString()
const formatCurrency = (amount) => {
  // Chuyển số thành string
  const numStr = String(amount);
  // Thêm dấu phẩy ngăn cách hàng nghìn
  let result = "";
  let counter = 0;

  for (let i = numStr.length - 1; i >= 0; i--) {
    counter++;
    result = numStr[i] + result;
    if (counter % 3 === 0 && i !== 0) {
      result = "," + result;
    }
  }

  return result;
};



const CoinManagement = () => {
  const navigate = useNavigate();
  const userCurrent = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(false);
  const [reCoins, setReCoins] = useState([
    // {
    //   reCoinId: 1,
    //   bankNumber: "53110009169999",
    //   bankName: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam",
    //   bankPin: "970418",
    //   accountName: "NGUYEN ANH TU",
    //   amount: 5000.0,
    //   imgQR:
    //     "https://img.vietqr.io/image/970418-53110009169999-compact2.jpg?amount=5000.0&addInfo=Rut+coin&accountName=NGUYEN+ANH+TU",
    //   imgBill: null,
    //   status: "processing",
    //   userRequestId: 4,
    //   content: null,
    //   dateTime: null,
    //   fullName: "Chủ căn hộ Tú1",
    // },
  ]);

  
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);

  useEffect(() => {
    callGetAllReCoin();
  }, []);

  async function callGetAllReCoin() {
    setLoading(true);
    try {
      const res = await getAllReCoin();
      console.log(res.data);
      if (res.success) {
        if (res.data) {
          if (typeof res.data === 'object' && res.data !== null && !Array.isArray(res.data)) {
            message.success(res.message);
            return;
          }
          setReCoins(res.data);
        }
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Không thể lấy danh sách tất cả yêu cầu rút tiền");
    } finally {
      setLoading(false);
    }
  }

  // Status tag renderer
  const renderStatus = (status) => {
    const statusMap = {
      pending: { color: "orange", text: "Chờ Xử Lý" },
      processing: { color: "blue", text: "Đang chờ xác nhận" },
      completed: { color: "green", text: "Đã Hoàn Thành" },
      reject: { color: "red", text: "Đã Từ Chối" },
    };

    const { color, text } = statusMap[status] || {
      color: "default",
      text: status,
    };
    return <Tag color={color}>{text}</Tag>;
  };

  // View request details
  const viewRequestDetails = (record) => {
    setSelectedRequest(record);
    setDrawerVisible(true);
  };

  // Handle approval action
  const handleApprove = (record) => {
    setSelectedRequest(record);
    setQrModalVisible(true);
  };

  // Handle rejection action
  const handleReject = (record) => {
    setSelectedRequest(record);
    setRejectModalVisible(true);
  };

  // Confirm transfer completion
  const confirmTransferCompleted = async () => {
    if (!selectedRequest) return;

    const formData = {
      reCoinId: selectedRequest.reCoinId,
      imgBill: "",
      reason: "",
    };

    try {
      const res = await acceptReCoin(formData);
      // console.log(res);
      if (res.success) {
        message.success(res.message);
        window.location.href = "/adminHome/coin";
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Không thể xác nhận chuyển tiền thành công");
    } finally {
    }
    // Close QR modal
    setQrModalVisible(false);
  };

  // Confirm rejection
  const confirmReject = async () => {
    if (!selectedRequest) return;

    const formData = {
      reCoinId: selectedRequest.reCoinId,
      imgBill: "",
      reason: "",
    };

    try {
      const res = await rejectReCoin(formData);
      // console.log(res);
      if (res.success) {
        message.success(res.message);
        window.location.href = "/adminHome/coin";
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Không thể từ chối yêu cầu rút tiền");
    } finally {
    }

    // Update the request status
    // const updatedRequests = transferRequests.map((req) =>
    //   req.id === selectedRequest.id ? { ...req, status: "rejected" } : req
    // );
    // setTransferRequests(updatedRequests);

    // // Show success message
    // message.success(
    //   `Đã từ chối yêu cầu chuyển coin của ${selectedRequest.fullName}`
    // );

    // Close reject modal
    setRejectModalVisible(false);
  };

  // Table columns configuration
  const columns = [
    {
      title: "Người Yêu Cầu",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary">{record.username}</Text>
        </>
      ),
    },
    {
      title: "Số Tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <Text strong style={{ color: "#1890ff" }}>
          {formatCurrency(amount)} VND
        </Text>
      ),
    },
    {
      title: "Ngày Yêu Cầu",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Ngày Phản hồi",
      dataIndex: "dateAcceptReject",
      key: "dateAcceptReject",
    },
    {
      title: "Ngày Hoàn Thành",
      dataIndex: "dateComplete",
      key: "dateComplete",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: renderStatus,
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<EyeOutlined />}
            onClick={() => viewRequestDetails(record)}
            title="Xem chi tiết"
          />
          {record.status === "pending" && (
            <>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleApprove(record)}
                title="Duyệt"
              />
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => handleReject(record)}
                title="Từ chối"
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={
        <Space>
          <MoneyCollectOutlined />
          <span>Quản lý Yêu Cầu Chuyển Coin</span>
        </Space>
      }
    >
      {/* Table of transfer requests */}
      <Table
        dataSource={reCoins}
        columns={columns}
        rowKey={record => record.reCoinId}
        pagination={{ pageSize: 10 }}
        loading={loading}
      />

      {/* Request Details Drawer */}
      <Drawer
        title="Chi Tiết Yêu Cầu Chuyển Coin"
        placement="right"
        width={400}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        extra={
          selectedRequest?.status === "pending" && (
            <Space>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => {
                  setDrawerVisible(false);
                  handleApprove(selectedRequest);
                }}
              >
                Duyệt
              </Button>
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => {
                  setDrawerVisible(false);
                  handleReject(selectedRequest);
                }}
              >
                Từ Chối
              </Button>
            </Space>
          )
        }
      >
        {selectedRequest && (
          <>
            <Descriptions title="Thông Tin Người Dùng" column={1}>
              <Descriptions.Item label="Họ Tên">
                {selectedRequest.fullName}
              </Descriptions.Item>
              {/* <Descriptions.Item label="Tên Đăng Nhập">
                {selectedRequest.username}
              </Descriptions.Item> */}
              <Descriptions.Item label="Số Tiền Yêu Cầu">
                <Text strong style={{ color: "#1890ff" }}>
                  {formatCurrency(selectedRequest.amount)} VND
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Trạng Thái">
                {renderStatus(selectedRequest.status)}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày Yêu Cầu">
                {selectedRequest.requestDate}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Thông Tin Tài Khoản Ngân Hàng" column={1}>
              <Descriptions.Item label="Tên Ngân Hàng">
                {selectedRequest.bankName}
              </Descriptions.Item>
              <Descriptions.Item label="Số Tài Khoản">
                {selectedRequest.bankNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Tên Tài Khoản">
                {selectedRequest.accountName}
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Drawer>

      {/* QR Code Modal for Transfer */}
      <Modal
        title={
          <Space>
            <QrcodeOutlined />
            <span>Xác Nhận Chuyển Khoản</span>
          </Space>
        }
        open={qrModalVisible}
        onCancel={() => setQrModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setQrModalVisible(false)}>
            Hủy
          </Button>,
          <Button
            key="confirm"
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={confirmTransferCompleted}
          >
            Đã Chuyển Khoản
          </Button>,
        ]}
      >
        {selectedRequest && (
          <>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Người Nhận">
                {selectedRequest.accountName}
              </Descriptions.Item>
              <Descriptions.Item label="Số Tài Khoản">
                {selectedRequest.bankNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Ngân Hàng">
                {selectedRequest.bankName}
              </Descriptions.Item>
              <Descriptions.Item label="Số Tiền">
                <Text strong style={{ color: "#1890ff" }}>
                  {formatCurrency(selectedRequest.amount)} VND
                </Text>
              </Descriptions.Item>
            </Descriptions>

            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <Image
                src={selectedRequest.imgQR}
                alt="QR Code for Bank Transfer"
                style={{ maxWidth: "200px" }}
              />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">Quét mã QR để chuyển khoản</Text>
              </div>
            </div>

            <Alert
              message="Xác nhận sau khi chuyển khoản"
              description="Sau khi hoàn tất chuyển khoản, vui lòng nhấn nút 'Đã Chuyển Khoản' để xác nhận và hoàn tất yêu cầu."
              type="info"
              showIcon
            />
          </>
        )}
      </Modal>
      {/* Rejection Confirmation Modal */}
      <Modal
        title="Xác Nhận Từ Chối Yêu Cầu"
        open={rejectModalVisible}
        onOk={confirmReject}
        onCancel={() => setRejectModalVisible(false)}
        okText="Xác Nhận Từ Chối"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        {selectedRequest && (
          <>
            <p>
              Bạn có chắc muốn từ chối yêu cầu chuyển{" "}
              {formatCurrency(selectedRequest.amount)} VND của{" "}
              {selectedRequest.fullName} không?
            </p>
            <Alert
              message="Lưu ý"
              description="Thao tác này không thể hoàn tác sau khi xác nhận."
              type="warning"
              showIcon
            />
          </>
        )}
      </Modal>
    </Card>
  );
};

export default CoinManagement;
