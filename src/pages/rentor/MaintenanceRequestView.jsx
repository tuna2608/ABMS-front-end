import React, { useState } from "react";
import {
  Card,
  Space,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  Tag,
  Flex,
} from "antd";
import {
  ToolOutlined,
  PlusOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

const MaintenanceRequestView = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [form] = Form.useForm();

  // Mock data for maintenance requests
  const [maintenanceRequests, setMaintenanceRequests] = useState([
    {
      id: 1,
      apartmentName: "Căn hộ 2PN Vinhomes Central Park",
      issueType: "Điện",
      description: "Đèn phòng khách không hoạt động",
      requestDate: "01/04/2025",
      status: "Đang xử lý",
      notes: "Nhân viên sẽ đến trong vòng 24 giờ",
      images: ["image1.jpg"]
    },
    {
      id: 2,
      apartmentName: "Căn hộ 2PN Vinhomes Central Park",
      issueType: "Nước",
      description: "Vòi nước bị rò rỉ trong phòng tắm",
      requestDate: "25/03/2025",
      status: "Hoàn thành",
      notes: "Đã sửa chữa và thay thế vòi nước mới",
      images: []
    },
    {
      id: 3,
      apartmentName: "Căn hộ 2PN Vinhomes Central Park",
      issueType: "Khác",
      description: "Cửa chính bị kẹt",
      requestDate: "15/03/2025",
      status: "Đã hủy",
      notes: "Người thuê đã tự sửa",
      images: ["image3.jpg", "image4.jpg"]
    },
  ]);

  // Issue type options
  const issueTypes = [
    { value: "electric", label: "Điện" },
    { value: "water", label: "Nước" },
    { value: "furniture", label: "Nội thất" },
    { value: "appliance", label: "Thiết bị gia dụng" },
    { value: "structure", label: "Công trình" },
    { value: "other", label: "Khác" },
  ];

  // Function to handle submit new maintenance request
  const handleSubmit = (values) => {
    console.log("Form values:", values);
    
    // In a real app, this would be an API call
    const newRequest = {
      id: maintenanceRequests.length + 1,
      apartmentName: "Căn hộ 2PN Vinhomes Central Park", // This would come from the user's profile
      issueType: values.issueType,
      description: values.description,
      requestDate: moment().format("DD/MM/YYYY"),
      status: "Chờ xử lý",
      notes: "",
      images: values.images ? values.images.map(img => img.name || "uploaded_image.jpg") : []
    };
    
    setMaintenanceRequests([newRequest, ...maintenanceRequests]);
    message.success("Yêu cầu bảo trì đã được gửi thành công");
    setIsModalVisible(false);
    form.resetFields();
  };

  // Function to view maintenance request details
  const viewRequestDetails = (record) => {
    setSelectedRequest(record);
    setIsViewModalVisible(true);
  };

  // Table columns
  const columns = [
    {
      title: "Loại vấn đề",
      dataIndex: "issueType",
      key: "issueType",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Ngày yêu cầu",
      dataIndex: "requestDate",
      key: "requestDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "Hoàn thành") color = "green";
        if (status === "Đã hủy") color = "red";
        if (status === "Đang xử lý") color = "orange";
        if (status === "Chờ xử lý") color = "blue";
        
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<EyeOutlined />}
          onClick={() => viewRequestDetails(record)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <Card
      title={
        <Space>
          <ToolOutlined />
          <span>Yêu cầu bảo trì</span>
        </Space>
      }
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Tạo yêu cầu mới
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={maintenanceRequests}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Create Maintenance Request Modal */}
      <Modal
        title="Tạo yêu cầu bảo trì mới"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="issueType"
            label="Loại vấn đề"
            rules={[{ required: true, message: "Vui lòng chọn loại vấn đề" }]}
          >
            <Select placeholder="Chọn loại vấn đề">
              {issueTypes.map(type => (
                <Option key={type.value} value={type.label}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Mô tả chi tiết"
            rules={[{ required: true, message: "Vui lòng nhập mô tả chi tiết" }]}
          >
            <TextArea rows={4} placeholder="Mô tả chi tiết vấn đề của bạn" />
          </Form.Item>
          
          <Form.Item
            name="images"
            label="Hình ảnh (nếu có)"
          >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent auto upload
              maxCount={5}
            >
              <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
            </Upload>
          </Form.Item>
          
          <Form.Item>
            <Flex justify="end" gap={12}>
              <Button onClick={() => setIsModalVisible(false)}>
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                Gửi yêu cầu
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Request Details Modal */}
      <Modal
        title="Chi tiết yêu cầu bảo trì"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        {selectedRequest && (
          <div>
            <p><strong>Căn hộ:</strong> {selectedRequest.apartmentName}</p>
            <p><strong>Loại vấn đề:</strong> {selectedRequest.issueType}</p>
            <p><strong>Mô tả:</strong> {selectedRequest.description}</p>
            <p><strong>Ngày yêu cầu:</strong> {selectedRequest.requestDate}</p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              <Tag 
                color={
                  selectedRequest.status === "Hoàn thành" ? "green" : 
                  selectedRequest.status === "Đã hủy" ? "red" : 
                  selectedRequest.status === "Đang xử lý" ? "orange" : "blue"
                }
              >
                {selectedRequest.status}
              </Tag>
            </p>
            <p><strong>Ghi chú:</strong> {selectedRequest.notes || "Không có ghi chú"}</p>
            <div>
              <strong>Hình ảnh:</strong>{" "}
              {selectedRequest.images && selectedRequest.images.length > 0 ? (
                <span>{selectedRequest.images.length} hình ảnh đã đính kèm</span>
              ) : (
                <span>Không có hình ảnh</span>
              )}
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default MaintenanceRequestView;