import React, { useState, useEffect, useCallback } from "react";
import {
  Dropdown,
  Badge,
  List,
  Empty,
  Card,
  Button,
  message,
  Spin,
} from "antd";
import {
  BellOutlined,
  MessageOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  DollarOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { fetchNotifications } from "../../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import webSocketService from "../../../services/WebSocketService";

// Styled components
const NotificationCard = styled(Card)`
  width: 600px;
  max-height: 450px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
`;

const NotificationTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
`;

const NotificationListItem = styled(List.Item)`
  padding: 12px 16px !important;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

const NotificationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

const NotificationContent = styled.div`
  flex-grow: 1;
`;

const NotificationTime = styled.span`
  color: #8c8c8c;
  font-size: 12px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

// New styled component for notification button to match avatar style
const NotificationButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

// Helper functions
const getNotificationIcon = (type) => {
  switch (type?.toLowerCase()) {
    case "deposit":
      return { icon: <DollarOutlined />, color: "#52c41a" };
    case "message":
      return { icon: <MessageOutlined />, color: "#1890ff" };
    case "info":
      return { icon: <InfoCircleOutlined />, color: "#1890ff" };
    case "warning":
      return { icon: <WarningOutlined />, color: "#faad14" };
    default:
      return { icon: <InfoCircleOutlined />, color: "#1890ff" };
  }
};

const formatTime = (timestamp) => {
  if (!timestamp) return "";

  const now = new Date();
  const notificationTime = new Date(timestamp);
  const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

  if (diffInMinutes < 1) return "Vừa xong";
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} giờ trước`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} ngày trước`;

  return notificationTime.toLocaleDateString("vi-VN");
};

const NotificationWrapper = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // Hàm tải thông báo ban đầu
  const loadNotifications = useCallback(async () => {
    if (!currentUser?.userId) {
      setError("Vui lòng đăng nhập để xem thông báo");
      return;
    }

    setLoading(true);
    try {
      const response = await fetchNotifications(currentUser.userId);
      if (response.success) {
        const sortedNotifications = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setNotifications(sortedNotifications);
        setUnreadCount(sortedNotifications.filter((n) => !n.status).length);
        setError(null);
      } else {
        setError(response.message || "Không thể tải thông báo");
        message.error(response.message);
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi tải thông báo");
      console.error("Error loading notifications:", err);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.userId]);

  // Kết nối WebSocket khi component mount và đăng ký listener
  useEffect(() => {
    if (currentUser?.userId) {
      // Đảm bảo kết nối WebSocket
      webSocketService.connect(currentUser.userId);

      // Lắng nghe sự kiện thông báo mới
      const handleNewNotification = (event) => {
        const notification = event.detail.notification;
        // Thêm thông báo mới vào danh sách
        setNotifications((prev) => {
          // Kiểm tra xem thông báo đã tồn tại chưa
          const exists = prev.some((n) => n.id === notification.id);
          if (!exists) {
            // Thêm thông báo mới vào đầu danh sách
            const newNotifications = [notification, ...prev];
            // Cập nhật số lượng chưa đọc
            setUnreadCount(newNotifications.filter((n) => !n.status).length);
            return newNotifications;
          }
          return prev;
        });
      };

      // Đăng ký lắng nghe các sự kiện
      document.addEventListener("new-notification", handleNewNotification);
      document.addEventListener("global-notification", handleNewNotification);

      // Cleanup listener khi component unmount
      return () => {
        document.removeEventListener("new-notification", handleNewNotification);
        document.removeEventListener(
          "global-notification",
          handleNewNotification
        );
      };
    }
  }, [currentUser?.userId]);

  // Tải thông báo khi hiển thị dropdown
  useEffect(() => {
    if (currentUser?.userId) {
      loadNotifications();
    }
  }, [currentUser?.userId, loadNotifications]);

  const handleMarkAllAsRead = async () => {
    try {
      setLoading(true);
      // Lặp qua tất cả thông báo chưa đọc và đánh dấu đã đọc
      const unreadNotifications = notifications.filter((n) => !n.status);

      for (const notification of unreadNotifications) {
        webSocketService.markNotificationAsRead(notification.id);
      }

      // Cập nhật state local
      setNotifications(notifications.map((n) => ({ ...n, status: true })));
      setUnreadCount(0);

      message.success("Đã đánh dấu tất cả là đã đọc");
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      message.error("Không thể đánh dấu thông báo là đã đọc");
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = (notification) => {
    // Đánh dấu thông báo này là đã đọc
    if (!notification.status) {
      webSocketService.markNotificationAsRead(notification.id);

      // Cập nhật state local
      setNotifications(
        notifications.map((n) =>
          n.id === notification.id ? { ...n, status: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }

    // Xử lý điều hướng hoặc hành động khác dựa vào loại thông báo
    console.log("Notification clicked:", notification);
  };

  const itemNotificate = [
    {
      label: (
        <>
          <NotificationCard>
            <NotificationHeader>
              <NotificationTitle>Thông Báo</NotificationTitle>
              <Button
                type="text"
                size="small"
                onClick={handleMarkAllAsRead}
                disabled={loading || unreadCount === 0}
              >
                Đánh dấu đã đọc
              </Button>
            </NotificationHeader>

            {loading ? (
              <LoadingContainer>
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              </LoadingContainer>
            ) : error ? (
              <Empty description={error} style={{ padding: "24px" }} />
            ) : notifications.length > 0 ? (
              <List
                dataSource={notifications}
                renderItem={(item) => {
                  const { icon, color } = getNotificationIcon(
                    item.notificationType
                  );
                  return (
                    <NotificationListItem
                      onClick={() => handleNotificationClick(item)}
                      style={{
                        backgroundColor: !item.status
                          ? "rgba(24, 144, 255, 0.05)"
                          : "transparent",
                        position: "relative",
                      }}
                    >
                      {!item.status && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "4px",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: "#1890ff",
                            transform: "translateY(-50%)",
                          }}
                        />
                      )}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <NotificationIcon
                          style={{ backgroundColor: `${color}1A` }}
                        >
                          {React.cloneElement(icon, {
                            style: { color: color, fontSize: "16px" },
                          })}
                        </NotificationIcon>
                        <NotificationContent>
                          <div style={{ marginBottom: 4 }}>
                            {item.notificationContent}
                          </div>
                          <NotificationTime>
                            {formatTime(item.date)}
                          </NotificationTime>
                        </NotificationContent>
                      </div>
                    </NotificationListItem>
                  );
                }}
              />
            ) : (
              <Empty
                description="Không có thông báo mới"
                style={{ padding: "24px" }}
              />
            )}
          </NotificationCard>
        </>
      ),
      key: "1",
    },
  ];

  const notificationDropdownContent = (
    <NotificationCard>
      <NotificationHeader>
        <NotificationTitle>Thông Báo</NotificationTitle>
        <Button
          type="text"
          size="small"
          onClick={handleMarkAllAsRead}
          disabled={loading || unreadCount === 0}
        >
          Đánh dấu đã đọc
        </Button>
      </NotificationHeader>

      {loading ? (
        <LoadingContainer>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </LoadingContainer>
      ) : error ? (
        <Empty description={error} style={{ padding: "24px" }} />
      ) : notifications.length > 0 ? (
        <List
          dataSource={notifications}
          renderItem={(item) => {
            const { icon, color } = getNotificationIcon(item.notificationType);
            return (
              <NotificationListItem
                onClick={() => handleNotificationClick(item)}
                style={{
                  backgroundColor: !item.status
                    ? "rgba(24, 144, 255, 0.05)"
                    : "transparent",
                  position: "relative",
                }}
              >
                {!item.status && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "4px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#1890ff",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <NotificationIcon style={{ backgroundColor: `${color}1A` }}>
                    {React.cloneElement(icon, {
                      style: { color: color, fontSize: "16px" },
                    })}
                  </NotificationIcon>
                  <NotificationContent>
                    <div style={{ marginBottom: 4 }}>
                      {item.notificationContent}
                    </div>
                    <NotificationTime>{formatTime(item.date)}</NotificationTime>
                  </NotificationContent>
                </div>
              </NotificationListItem>
            );
          }}
        />
      ) : (
        <Empty
          description="Không có thông báo mới"
          style={{ padding: "24px" }}
        />
      )}
    </NotificationCard>
  );

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  return (
    <Dropdown
      menu={{items: itemNotificate }}
      trigger={["click"]}
      placement="bottomRight"
      onOpenChange={handleVisibleChange}
      open={visible}
    >
      <Badge count={unreadCount} overflowCount={10} offset={[-5, 5]}>
        <NotificationButton>
          <BellOutlined />
        </NotificationButton>
      </Badge>
    </Dropdown>
  );
};

export default NotificationWrapper;
