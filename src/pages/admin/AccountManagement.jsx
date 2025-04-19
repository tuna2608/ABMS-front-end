import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  Button,
  Table,
  Space,
  Modal,
  Row,
  Col,
  message,
  Image,
  Typography,
} from "antd";
import {
  CheckOutlined,
  CloseCircleOutlined,
  FileImageOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getResidentList,
  verifyAndAddUser,
  rejectVerificationRequest,
} from "../../redux/apiCalls";
import moment from "moment";

const { Title, Text } = Typography;

const AccountManagement = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("accountList");
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAccountId, setLoadingAccountId] = useState(null);

  // State cho việc xem ảnh
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentAccountName, setCurrentAccountName] = useState("");

  // Lấy dữ liệu từ Redux store
  const users = useSelector((state) => state.users.users);
  const isFetching = useSelector((state) => state.users.isFetching);

  // Load dữ liệu khi component được mount
  useEffect(() => {
    console.log("Component mounted, fetching resident list");
    getResidentList(dispatch);
  }, [dispatch]);

  // Xử lý dữ liệu người dùng
  const processUserData = useMemo(() => {
    console.log("Processing user data:", users);
    if (!users || !Array.isArray(users) || users.length === 0) return [];

    const processedKeys = new Set();

    // Lọc và xử lý các tài khoản chưa được xác minh
    return users
      .filter((user) => user.verified === false)
      .reduce((acc, user, index) => {
        // Tạo key duy nhất cho mỗi người dùng
        const baseKey =
          user.verificationFormId ||
          user.userId ||
          `${user.email}_${user.phoneNumber}`;

        const uniqueKey = `${baseKey}_${index}`;

        // Tránh trùng lặp
        if (processedKeys.has(uniqueKey)) return acc;
        processedKeys.add(uniqueKey);

        // Log thông tin về các ảnh
        console.log(
          `User ${user.username || user.userName} images:`,
          user.imageFiles
        );

        // Định dạng dữ liệu người dùng
        const processedUser = {
          key: uniqueKey,
          accountId: user.verificationFormId || user.userId || `${index + 1}`,
          username: user.userName || user.username,
          email: user.email,
          fullName: user.verificationFormName || user.fullName,
          phone: user.phoneNumber || user.phone,
          apartmentName: user.apartmentName,
          contractStartDate: user.contractStartDate
            ? moment(user.contractStartDate)
            : null,
          contractEndDate: user.contractEndDate
            ? moment(user.contractEndDate)
            : null,
          verificationType: user.verificationFormType || 2,
          role: user.userRole || "Rentor",
          // Đảm bảo imageFiles luôn là một mảng
          imageFiles: Array.isArray(user.imageFiles) ? user.imageFiles : [],
        };

        acc.push(processedUser);
        return acc;
      }, []);
  }, [users]);

  // Cập nhật state khi dữ liệu thay đổi
  useEffect(() => {
    console.log(
      "User data changed, updating pending accounts:",
      processUserData
    );
    if (processUserData.length > 0) {
      setPendingAccounts(processUserData);
    } else {
      setPendingAccounts([]);
    }
  }, [processUserData]);

  // Hàm xử lý hiển thị modal xem ảnh
  const handleViewImages = (record) => {
    console.log("Image files for viewing:", record.imageFiles);

    if (record.imageFiles && record.imageFiles.length > 0) {
      setCurrentImages(record.imageFiles);
      setCurrentAccountName(record.fullName || record.username);
      setIsImageModalVisible(true);
    } else {
      message.info("Không có ảnh nào để hiển thị");
    }
  };

  // Định nghĩa cột cho bảng
  const reviewColumns = [
    {
      title: "Mã Tài Khoản",
      dataIndex: "accountId",
      key: "accountId",
    },
    {
      title: "Tên Người Dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tên Căn Hộ",
      dataIndex: "apartmentName",
      key: "apartmentName",
    },
    {
      title: "Ảnh Hợp Đồng",
      key: "images",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => handleViewImages(record)}
          disabled={!record.imageFiles || record.imageFiles.length === 0}
          type="primary"
          ghost
        >
          Xem ảnh ({record.imageFiles?.length || 0})
        </Button>
      ),
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<CheckOutlined />}
            style={{
              backgroundColor: "#52c41a",
              borderColor: "#52c41a",
              color: "#fff",
            }}
            onClick={() => handleApproveAccount(record.key)}
            loading={loading && record.key === loadingAccountId}
          >
            Duyệt
          </Button>
          <Button
            icon={<CloseCircleOutlined />}
            danger
            onClick={() => handleDeclineAccount(record.key)}
          >
            Từ Chối
          </Button>
        </Space>
      ),
    },
  ];

  // Hàm xử lý duyệt tài khoản
  const handleApproveAccount = async (key) => {
    try {
      setLoading(true);
      setLoadingAccountId(key);

      // Tìm thông tin tài khoản cần duyệt
      const accountToApprove = pendingAccounts.find(
        (account) => account.key === key
      );

      if (!accountToApprove) {
        message.error("Không tìm thấy thông tin tài khoản");
        setLoading(false);
        setLoadingAccountId(null);
        return;
      }

      // Chuẩn bị dữ liệu để gửi API
      const verifyUserData = {
        verificationFormId: accountToApprove.accountId,
        username: accountToApprove.username,
        apartmentName: accountToApprove.apartmentName || "",
        verificationFormName: accountToApprove.fullName,
        verificationFormType: accountToApprove.verificationType || 2,
        email: accountToApprove.email,
        phoneNumber: accountToApprove.phone,
        userRole: accountToApprove.role || "Rentor",
        contractStartDate:
          accountToApprove.contractStartDate?.toISOString() || null,
        contractEndDate:
          accountToApprove.contractEndDate?.toISOString() || null,
      };

      // Gọi API để duyệt tài khoản
      const response = await verifyAndAddUser(dispatch, verifyUserData);

      console.log("API Response:", response);

      // Xử lý kết quả từ API
      if (
        response.success ||
        (response.status >= 200 && response.status < 300) ||
        (response.data &&
          response.data.status >= 200 &&
          response.data.status < 300)
      ) {
        // Cập nhật UI ngay lập tức
        setPendingAccounts((prevData) =>
          prevData.filter((account) => account.key !== key)
        );

        message.success("Tài khoản đã được duyệt thành công");

        // Tải lại danh sách sau khi duyệt thành công
        await getResidentList(dispatch);
      } else {
        // Xử lý lỗi
        const errorMsg =
          response.message ||
          (response.data && response.data.message) ||
          "Có lỗi xảy ra khi duyệt tài khoản";

        message.error(errorMsg);
      }
    } catch (error) {
      console.error("Error in handleApproveAccount:", error);
      message.error("Có lỗi xảy ra khi duyệt tài khoản");
    } finally {
      setLoading(false);
      setLoadingAccountId(null);
    }
  };

  // Hàm xử lý từ chối tài khoản
  // Hàm xử lý từ chối tài khoản
  const handleDeclineAccount = async (key) => {
    Modal.confirm({
      title: "Xác nhận từ chối tài khoản",
      content: "Bạn có chắc chắn muốn từ chối tài khoản này không?",
      okText: "Từ chối",
      okType: "danger",
      cancelText: "Hủy",
      async onOk() {
        try {
          const accountToDecline = pendingAccounts.find(
            (account) => account.key === key
          );
          if (!accountToDecline) {
            message.error("Không tìm thấy thông tin tài khoản");
            return;
          }
          const response = await rejectVerificationRequest(
            dispatch,
            accountToDecline.accountId
          );
          if (response.success) {
            setPendingAccounts((prevData) =>
              prevData.filter((account) => account.key !== key)
            );
            message.success("Đã từ chối tài khoản thành công");
          } else {
            message.error(
              response.message || "Có lỗi xảy ra khi từ chối tài khoản"
            );
          }
        } catch (error) {
          console.error("Error declining account:", error);
          message.error("Có lỗi xảy ra khi từ chối tài khoản");
        }
      },
    });
  };

  return (
    <>
      <Card
        tabList={[
          {
            key: "accountReview",
            tab: (
              <span>
                <CheckOutlined />
                Duyệt Tài Khoản
              </span>
            ),
          },
        ]}
        activeTabKey={activeTab}
        onTabChange={(key) => setActiveTab(key)}
      >
        {pendingAccounts.length === 0 && !isFetching ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Không có tài khoản nào cần duyệt
          </div>
        ) : (
          <Table
            columns={reviewColumns}
            dataSource={pendingAccounts}
            loading={isFetching}
            rowKey="key"
            pagination={{ pageSize: 10 }}
            locale={{ emptyText: "Không có tài khoản nào cần duyệt" }}
          />
        )}
      </Card>

      {/* Modal hiển thị ảnh */}
      {/* Modal hiển thị ảnh */}
      <Modal
        title={
          <div style={{ textAlign: "center" }}>
            <Title level={4}>Ảnh hợp đồng của {currentAccountName}</Title>
            <Text type="secondary">Nhấp vào ảnh để xem chi tiết</Text>
          </div>
        }
        open={isImageModalVisible}
        onCancel={() => setIsImageModalVisible(false)}
        width={1000}
        footer={[
          <Button key="close" onClick={() => setIsImageModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        styles={{
          body: { maxHeight: "70vh", overflow: "auto" },
        }}
      >
        {currentImages.length > 0 ? (
          <div style={{ textAlign: "center" }}>
            <Image.PreviewGroup>
              <Row gutter={[16, 16]}>
                {currentImages.map((imageUrl, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <div
                      style={{
                        marginBottom: "10px",
                        border: "1px solid #f0f0f0",
                        padding: "8px",
                        borderRadius: "4px",
                        height: "300px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        src={imageUrl}
                        alt={`Ảnh hợp đồng ${index + 1}`}
                        style={{
                          maxHeight: "280px",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                        fallback="data:image/png;base64,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"
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "12px",
                          left: "0",
                          right: "0",
                          textAlign: "center",
                        }}
                      >
                        <Text strong>Ảnh {index + 1}</Text>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Image.PreviewGroup>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <FileImageOutlined style={{ fontSize: "48px", color: "#ccc" }} />
            <p>Không có ảnh nào</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AccountManagement;
