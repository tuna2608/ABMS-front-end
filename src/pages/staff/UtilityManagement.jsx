import React, { useEffect, useState } from "react";
import {
  Card,
  Space,
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Flex,
  message,
  Empty,
} from "antd";
import { 
  DollarOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DownloadOutlined 
} from "@ant-design/icons";
import moment from "moment";
import { createBillConsumption, getAllConsumption, importFile } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UtilityManagement = ({ setActiveMenuItem }) => {
  const [currentUser] = useState(
    useSelector((state) => state.user.currentUser)
  );
  const [loading, setLoading] = useState(false);
  const [loadingImport,setLoadingImport] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultValue = moment().subtract(1, "months");
  const [selectedDate, setSelectedDate] = useState(defaultValue);
  const [consumptions, setConsumptions] = useState([]);

  useEffect(() => {
    callGetAllConsumption();
  }, []);

  async function callGetAllConsumption() {
    setLoading(true);
    try {
      const res = await getAllConsumption();
      if (res.success) {
        setConsumptions(res.data);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message("Không thể lấy danh sách lượng tiêu thụ!");
    } finally {
      setLoading(false);
    }
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Hàm tải mẫu đơn
  const handleDownloadTemplate = () => {
    // Thay thế URL này bằng link Google Drive trực tiếp có thể tải xuống
    const templateUrl = 'https://drive.google.com/drive/folders/1F5E7XpvsAoIrVOXZ0KBq3t3ryOsy28QA?usp=drive_link';
    
    try {
      // Mở link tải xuống trong tab mới
      window.open(templateUrl, '_blank');
      
      // Hiển thị thông báo thành công
      message.success('Đang tải mẫu đơn. Vui lòng kiểm tra trình duyệt của bạn.');
    } catch (error) {
      // Xử lý lỗi nếu có
      message.error('Có lỗi xảy ra khi tải mẫu đơn. Vui lòng thử lại.');
      console.error('Download error:', error);
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUtilityType, setCurrentUtilityType] = useState("combined");
  const [currentConsumption, setCurrentConsumption] = useState({});

  // Combined utility columns
  const consumptionColumns = [
    {
      title: "Số Căn hộ",
      dataIndex: "apartmentName",
      key: "apartmentName",
      render: (value) => `${value}`,
    },
    {
      title: "Chủ căn hộ",
      dataIndex: "userName",
      key: "userName",
      render: (value) => `${value}`,
    },
    {
      title: "Tháng Ghi Nhận",
      dataIndex: "consumptionDate",
      key: "consumptionDate",
    },
    {
      title: "Chỉ Số Nước Tháng trước (m³)",
      dataIndex: "lastMonthWaterConsumption",
      key: "lastMonthWaterConsumption",
      render: (value) => `${value} m³`,
    },
    {
      title: "Chỉ Số Nước (m³)",
      dataIndex: "waterConsumption",
      key: "waterConsumption",
      render: (value) => `${value} m³`,
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (_, record) => (
        <Flex gap={20}>
          {record.billCreated === false ? (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleCreateBillConsumption(record)}
            >
              Tạo Hóa Đơn
            </Button>
          ) : (
            <Button type="primary" disabled>
              Hóa đơn này đã tạo
            </Button>
          )}
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => showEditConsumptionModal("combined", record)}
          ></Button>
        </Flex>
      ),
    },
  ];

  // Function to show create bill modal
  const showEditConsumptionModal = (type, record) => {
    setCurrentUtilityType(type);
    setCurrentConsumption(record);
    setIsModalVisible(true);
  };

  // Function to handle modal cancel
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // Function to handle bill creation
  const handleEditConsumption = (values) => {
    console.log("Bill created:", values);
    setIsModalVisible(false);
  };

  const handleCreateBillConsumption = async (record) => {
    const month = defaultValue.month() + 1;
    const year = defaultValue.year();
    const formData = {
      apartmentName: record.apartmentName,
      billContent: `Hóa đơn nước tháng ${month}/${year}`,
      userName: record.userName,
      consumptionId: record.id,
      createdUserId: currentUser.userId,
      surcharge: 0,
      period: `Tháng ${month}/${year}`,
      amount: 0,
    };

    try {
      const res = await createBillConsumption(dispatch, formData);
      const messageAPI = res.message;
      if (res.status === 401 || res.status === 400 || res.status === 403) {
        message.error(messageAPI);
        return;
      } else {
        message.success(messageAPI);
        navigate("/staffHome/bill-management");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo hóa đơn");
      console.error("Error creating bill:", error);
    }
  };

  const handleFilter = () => {
    console.log(selectedDate.format("YYYY-MM"));
  };

  const handleImportFile = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("createdUserId", currentUser.userId);
      setLoadingImport(true);
      try {
        const response = await importFile(formData);
        if(response.success){
          console.log(response.data);
          message.success(response.message);
        }else{
          message.error(response.message)
        }
      } catch (error) {
        console.error('Không thể upload', error);
      } finally {
        setLoadingImport(false);
      }
    }
  };

  return (
    <Card
      title={
        <Space>
          <DollarOutlined />
          <span>Chi phí điện nước</span>
        </Space>
      }
    >
      {/* Date Range Filter */}
      <Flex style={{ marginBottom: "16px" }} justify="space-between">
        <Flex align="center" style={{ gap: "20px" }}>
          <DatePicker
            picker="month"
            value={defaultValue}
            onChange={handleDateChange}
            placeholder="Chọn tháng và năm"
          />
          <Button style={{}} onClick={handleFilter}>
            Lọc
          </Button>
        </Flex>
        <Flex gap={10}>
          <Button
            icon={<DownloadOutlined />}
            style={{ backgroundColor: "var(--fblue)", color: "white" }}
            onClick={handleDownloadTemplate}
          >
            Tải mẫu đơn
          </Button>
          <Input
            type="file"
            onChange={handleImportFile}
            style={{ backgroundColor: "var(--fgreen)", color: "white" }}
            // onClick={handleImportFile}
          />

          {/* <Button
            Import CSV */}
          {/* </Input> */}
        </Flex>
      </Flex>

      {consumptions.length === 0 ? (
        <Empty />
      ) : (
        <Table
          columns={consumptionColumns}
          dataSource={consumptions}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}

      {/* Create Bill Modal with open prop instead of visible */}
      <Modal
        title="Tạo Hóa Đơn Điện & Nước"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleEditConsumption}
          initialValues={{
            billType: currentUtilityType,
            consumption: currentConsumption,
          }}
        >
          <Form.Item name="billType" label="Loại Hóa Đơn" hidden>
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={["consumption", "userName"]}
            label="Chủ căn hộ"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={["consumption", "consumptionDate"]}
            label="Tháng Ghi Nhận"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={["consumption", "lastMonthWaterConsumption"]}
            label="Chỉ Số Nước Tháng trước (m³)"
            rules={[{ required: true, message: "Vui lòng nhập chỉ số nước" }]}
          >
            <Input disabled suffix="m³" />
          </Form.Item>
          <Form.Item
            name={["consumption", "waterConsumption"]}
            label="Chỉ Số Nước Mới (m³)"
            rules={[{ required: true, message: "Vui lòng nhập chỉ số nước" }]}
          >
            <Input suffix="m³" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Edit Consumption
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default UtilityManagement;