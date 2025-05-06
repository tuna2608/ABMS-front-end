import React, { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Card,
  Badge,
  Button,
  Modal,
  Descriptions,
  Empty,
  message,
} from "antd";
import {
  EyeOutlined,
  DownloadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFormsByUserId } from "../../../redux/apiCalls";

const { Title, Text, Paragraph } = Typography;

// Styled Components
const StyledCard = styled(Card)`
  margin: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const HeaderSection = styled.div`
  background: linear-gradient(to right, #4b7bec, #3867d6);
  padding: 24px;
  color: white;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormListSection = styled.div`
  padding: 24px;
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #f0f5ff;
    color: #3867d6;
  }
`;

const EmptyStateContainer = styled.div`
  padding: 40px;
  text-align: center;
`;

const DetailsContainer = styled.div`
  padding: 24px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const StatusSection = styled.div`
  background-color: #f8f9fa;
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 4px;
  border-left: 4px solid #3867d6;
`;

const BackLink = styled(Button)`
  margin-right: 10px;
`;

const UserFormList = () => {
  const userCurrent = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [forms, setForms] = useState([]);
  useEffect(() => {
    async function fetchForms() {
      setLoading(true);
      try {
        const res = await getFormsByUserId(userCurrent.userId);
        if (res.success) {
          const mapped = res.data.map((item, index) => ({
            id: item.formId,
            formType: item.formType,
            apartmentNumber: item.apartmentName || "N/A",
            submissionDate: item.createdAt,
            status: item.status,
            reason: item.reason || "-",
            fileUrl: item.fileUrl,
            fileName: item.fileName,
            responseNote: item.feedback || null,
            responseDate: item.executedAt || null,
          }));
          setForms(mapped);
        } else {
          message.error(res.message);
        }
      } catch (error) {
        message.error("Không thể lấy danh sách đơn từ");
      }
      setLoading(false);
    }
    fetchForms();
  }, [userCurrent]);

  // Bản đồ loại đơn
  const formTypeMap = {
    apartment_renovation: "Đăng ký thi công nội thất",
    apartment_transfer: "Đơn chuyển căn hộ",
    maintenance_request: "Đơn yêu cầu bảo trì",
    complaint_form: "Đơn khiếu nại",
    facility_booking: "Đơn đăng ký sử dụng tiện ích",
  };

  const handleViewDetails = (record) => {
    setSelectedForm(record);
    setModalVisible(true);
  };

  const getStatusTag = (status) => {
    switch (status) {
      case "pending":
        return <Badge status="warning" text="Đang chờ duyệt" />;
      case "approved":
        return <Badge status="success" text="Đã duyệt" />;
      case "rejected":
        return <Badge status="error" text="Từ chối" />;
      default:
        return <Badge status="default" text={status} />;
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Căn hộ",
      dataIndex: "apartmentNumber",
      key: "apartmentNumber",
      width: 150,
    },
    {
      title: "Loại đơn",
      dataIndex: "formType",
      key: "formType",
      render: (text) => formTypeMap[text] || text,
    },
    {
      title: "Ngày gửi",
      dataIndex: "submissionDate",
      key: "submissionDate",
      render: (date) => new Date(date).toLocaleString("vi-VN"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(record)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <StyledCard>
      <HeaderSection>
        <div style={{ display: "flex", alignItems: "center" }}>
          <BackLink
            type="text"
            icon={<ArrowLeftOutlined />}
            style={{ color: "white" }}
            onClick={() => navigate(-1)}
          />
          <Title level={2} style={{ color: "white", margin: 0 }}>
            Danh sách đơn đã gửi
          </Title>
        </div>
        <Button type="primary" ghost onClick={() => navigate("/form-request")}>
          + Gửi đơn mới
        </Button>
      </HeaderSection>

      <StatusSection>
        <Paragraph>
          <Text>
            Từ trang này, bạn có thể theo dõi trạng thái của các đơn đã gửi cho
            Ban Quản lý. Các đơn sẽ được xử lý trong vòng 48 giờ làm việc.
          </Text>
        </Paragraph>
      </StatusSection>

      <FormListSection>
        {forms.length > 0 ? (
          <StyledTable
            loading={loading}
            columns={columns}
            dataSource={forms}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Tổng cộng ${total} đơn`,
            }}
          />
        ) : (
          <EmptyStateContainer>
            <Empty
              description="Bạn chưa gửi đơn nào"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
            <Button
              type="primary"
              style={{ marginTop: 16 }}
              onClick={() => navigate("/form-request")}
            >
              Gửi đơn mới
            </Button>
          </EmptyStateContainer>
        )}
      </FormListSection>

      <Modal
        title={<Title level={4}>Chi tiết đơn</Title>}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={800}
      >
        {selectedForm && (
          <DetailsContainer>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Loại đơn">
                {formTypeMap[selectedForm.formType] || selectedForm.formType}
              </Descriptions.Item>
              <Descriptions.Item label="Số căn hộ">
                {selectedForm.apartmentNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày gửi">
                {new Date(selectedForm.submissionDate).toLocaleString("vi-VN")}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {getStatusTag(selectedForm.status)}
              </Descriptions.Item>
              <Descriptions.Item label="Lý do">
                {selectedForm.reason}
              </Descriptions.Item>
              <Descriptions.Item label="Tệp đính kèm">
                <Button
                  type="link"
                  icon={<DownloadOutlined />}
                  href={selectedForm.fileUrl}
                  target="_blank"
                >
                  {selectedForm.fileName}
                </Button>
              </Descriptions.Item>

              {selectedForm.responseNote && (
                <Descriptions.Item
                  label="Phản hồi từ Ban quản lý"
                  className="response-note"
                >
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    {selectedForm.responseNote}
                  </div>
                  {selectedForm.responseDate && (
                    <div
                      style={{
                        marginTop: 8,
                        fontStyle: "italic",
                        color: "#888",
                      }}
                    >
                      Phản hồi lúc:{" "}
                      {new Date(selectedForm.responseDate).toLocaleString(
                        "vi-VN"
                      )}
                    </div>
                  )}
                </Descriptions.Item>
              )}
            </Descriptions>
          </DetailsContainer>
        )}
      </Modal>
    </StyledCard>
  );
};

export default UserFormList;
