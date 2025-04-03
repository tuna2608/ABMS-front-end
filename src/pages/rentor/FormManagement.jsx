import React, { useState, useEffect } from "react";
import { 
  Table, 
  Card, 
  Button, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  message, 
  Typography,
  Upload
} from "antd";
import { PlusOutlined, UploadOutlined, EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

const FormManagement = () => {
  // State for table data
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // State for modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("create"); // "create" or "view" or "edit"
  const [selectedForm, setSelectedForm] = useState(null);
  
  // Form instance
  const [form] = Form.useForm();
  
  // Mock data - replace with actual API calls in production
  useEffect(() => {
    fetchForms();
  }, []);
  
  const fetchForms = () => {
    setLoading(true);
    // Mock data based on the image
    const mockData = [
      {
        form_id: "FORM001",
        created_at: "2023-05-15",
        file_name: "request_maintenance.pdf",
        file_url: "https://example.com/forms/request_maintenance.pdf",
        form_type: "maintenance",
        user_id: "USER123"
      },
    ];
    
    setForms(mockData);
    setLoading(false);
  };
  
  // Table columns
  const columns = [
    {
      title: "ID Đơn từ",
      dataIndex: "form_id",
      key: "form_id",
      sorter: (a, b) => a.form_id.localeCompare(b.form_id),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Tên file",
      dataIndex: "file_name",
      key: "file_name",
    },
    {
      title: "Loại đơn",
      dataIndex: "form_type",
      key: "form_type",
      render: (text) => {
        const formTypes = {
          "maintenance": "Bảo trì",
          "complaint": "Khiếu nại",
          "extension": "Gia hạn",
          "other": "Khác"
        };
        return formTypes[text] || text;
      },
      filters: [
        { text: "Bảo trì", value: "maintenance" },
        { text: "Khiếu nại", value: "complaint" },
        { text: "Gia hạn", value: "extension" },
        { text: "Khác", value: "other" },
      ],
      onFilter: (value, record) => record.form_type === value,
    },
    {
      title: "ID Người dùng",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            onClick={() => handleViewForm(record)}
          >
            Xem
          </Button>
          <Button 
            type="default" 
            icon={<EditOutlined />} 
            onClick={() => handleEditForm(record)}
          >
            Sửa
          </Button>
          <Button 
            type="danger" 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteForm(record.form_id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Handler functions
  const handleAddForm = () => {
    setModalType("create");
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleViewForm = (record) => {
    setModalType("view");
    setSelectedForm(record);
    setIsModalVisible(true);
  };

  const handleEditForm = (record) => {
    setModalType("edit");
    setSelectedForm(record);
    form.setFieldsValue({
      form_id: record.form_id,
      form_type: record.form_type,
      user_id: record.user_id,
      created_at: moment(record.created_at),
      file_name: record.file_name,
    });
    setIsModalVisible(true);
  };

  const handleDeleteForm = (formId) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa đơn từ có ID ${formId} không?`,
      onOk: () => {
        // In a real application, you would call an API here
        setForms(forms.filter(form => form.form_id !== formId));
        message.success("Đã xóa đơn từ thành công!");
      },
    });
  };

  const handleModalOk = () => {
    if (modalType === "view") {
      setIsModalVisible(false);
      return;
    }

    form.validateFields().then(values => {
      if (modalType === "create") {
        // In a real application, you would call an API here
        const newForm = {
          ...values,
          form_id: `FORM${Math.floor(1000 + Math.random() * 9000)}`,
          created_at: values.created_at.format("YYYY-MM-DD"),
          file_url: values.file ? `https://example.com/forms/${values.file.name}` : "",
          file_name: values.file ? values.file.name : "No file uploaded",
        };
        
        setForms([...forms, newForm]);
        message.success("Đã tạo đơn từ mới thành công!");
      } else if (modalType === "edit") {
        // In a real application, you would call an API here
        const updatedForms = forms.map(form => {
          if (form.form_id === selectedForm.form_id) {
            return {
              ...form,
              form_type: values.form_type,
              user_id: values.user_id,
              created_at: values.created_at.format("YYYY-MM-DD"),
              file_name: values.file ? values.file.name : form.file_name,
              file_url: values.file ? `https://example.com/forms/${values.file.name}` : form.file_url,
            };
          }
          return form;
        });
        
        setForms(updatedForms);
        message.success("Đã cập nhật đơn từ thành công!");
      }
      
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const renderModalContent = () => {
    if (modalType === "view" && selectedForm) {
      return (
        <div>
          <p><strong>ID Đơn từ:</strong> {selectedForm.form_id}</p>
          <p><strong>Ngày tạo:</strong> {moment(selectedForm.created_at).format("DD/MM/YYYY")}</p>
          <p><strong>Tên file:</strong> {selectedForm.file_name}</p>
          <p><strong>URL file:</strong> {selectedForm.file_url}</p>
          <p>
            <strong>Loại đơn:</strong> {
              {
                "maintenance": "Bảo trì",
                "complaint": "Khiếu nại",
                "extension": "Gia hạn",
                "other": "Khác"
              }[selectedForm.form_type] || selectedForm.form_type
            }
          </p>
          <p><strong>ID Người dùng:</strong> {selectedForm.user_id}</p>
        </div>
      );
    }

    return (
      <Form
        form={form}
        layout="vertical"
        name="form_management_form"
      >
        {modalType === "edit" && (
          <Form.Item
            name="form_id"
            label="ID Đơn từ"
          >
            <Input disabled />
          </Form.Item>
        )}
        
        <Form.Item
          name="form_type"
          label="Loại đơn"
          rules={[{ required: true, message: "Vui lòng chọn loại đơn!" }]}
        >
          <Select>
            <Option value="maintenance">Bảo trì</Option>
            <Option value="complaint">Khiếu nại</Option>
            <Option value="extension">Gia hạn</Option>
            <Option value="other">Khác</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="user_id"
          label="ID Người dùng"
          rules={[{ required: true, message: "Vui lòng nhập ID người dùng!" }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="created_at"
          label="Ngày tạo"
          rules={[{ required: true, message: "Vui lòng chọn ngày tạo!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        
        <Form.Item
          name="file"
          label="Tệp đơn từ"
          valuePropName="fileList"
          getValueFromEvent={e => e && e.fileList}
        >
          <Upload 
            beforeUpload={() => false} 
            maxCount={1}
            accept=".pdf,.doc,.docx"
          >
            <Button icon={<UploadOutlined />}>Chọn tệp</Button>
          </Upload>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div>
      <Card 
        title={<Title level={4}>Quản lý đơn từ</Title>}
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddForm}
          >
            Tạo đơn từ mới
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={forms} 
          rowKey="form_id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={
          modalType === "create" ? "Tạo đơn từ mới" : 
          modalType === "edit" ? "Chỉnh sửa đơn từ" : 
          "Chi tiết đơn từ"
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={modalType === "view" ? "Đóng" : "Lưu"}
        cancelText="Hủy"
        okButtonProps={{ style: { display: modalType === "view" ? "none" : "inline-block" } }}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default FormManagement;