import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Table,
  Space,
  message,
  Tag,
  Input,
  InputNumber,
  Select,
  Form,
  Popconfirm
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  HomeOutlined,
  SaveOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { getApartments, updateApartment, deleteApartment } from '../../redux/apiCalls';
import CreateApartmentModal from './CreateApartmentModal';
import { useDispatch } from 'react-redux';

const ApartmentManagement = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
        const row = await form.validateFields();
        const item = apartments.find(item => item.apartmentId === key);
        
        if (!item) {
            message.error('Không tìm thấy căn hộ để cập nhật');
            return;
        }

        // Remove values that shouldn't be sent to API
        const { key: _, ...updateData } = row;

        const response = await updateApartment(dispatch, key, {
            ...updateData,
            apartmentId: key
        });

        if (response.success) {
            message.success('Cập nhật căn hộ thành công');
            setEditingKey('');
            fetchApartments();
        } else {
            message.error(response.message);
        }
    } catch (errInfo) {
        console.error('Validate Failed:', errInfo);
        message.error('Vui lòng kiểm tra lại thông tin nhập');
    }
};

  const handleDelete = async (apartmentId) => {
    try {
      const response = await deleteApartment(dispatch, apartmentId);
      if (response.success) {
        message.success('Xóa căn hộ thành công');
        fetchApartments(); // Refresh list after deletion
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error('Không thể xóa căn hộ: ' + error.message);
    }
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    let inputNode;
    
    switch (inputType) {
      case 'number':
        inputNode = <InputNumber min={0} style={{ width: '100%' }} />;
        break;
      case 'select-direction':
        inputNode = (
          <Select style={{ width: '100%' }}>
            <Select.Option value="Đông">Đông</Select.Option>
            <Select.Option value="Tây">Tây</Select.Option>
            <Select.Option value="Nam">Nam</Select.Option>
            <Select.Option value="Bắc">Bắc</Select.Option>
            <Select.Option value="Đông Nam">Đông Nam</Select.Option>
            <Select.Option value="Đông Bắc">Đông Bắc</Select.Option>
            <Select.Option value="Tây Nam">Tây Nam</Select.Option>
            <Select.Option value="Tây Bắc">Tây Bắc</Select.Option>
          </Select>
        );
        break;
      case 'select-status':
        inputNode = (
          <Select style={{ width: '100%' }}>
            <Select.Option value="unrented">Còn Trống</Select.Option>
            <Select.Option value="rented">Đã Cho Thuê</Select.Option>
            <Select.Option value="MAINTENANCE">Đang Bảo Trì</Select.Option>
          </Select>
        );
        break;
      default:
        inputNode = <Input />;
    }

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Vui lòng nhập ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const fetchApartments = async () => {
    setLoading(true);
    try {
      const response = await getApartments();
      if (response.success) {
        setApartments(response.data.map(apt => ({
          ...apt,
          key: apt.apartmentId
        })));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching apartments:", error);
      message.error("Không thể tải danh sách căn hộ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);
  
  const handleSuccess = () => {
    fetchApartments(); // Refresh the apartment list
  };

  const apartmentColumns = [
    {
      title: 'Số Nhà',
      dataIndex: 'apartmentName',
      key: 'apartmentName',
      editable: true,
    },
    {
      title: 'Chủ Nhà',
      dataIndex: 'householder',
      key: 'householder',
      editable: true,
      render: (text) => text || 'Chưa có'
    },
    {
      title: 'Số Phòng Ngủ',
      dataIndex: 'numberOfBedrooms',
      key: 'numberOfBedrooms',
      width: 120,
      editable: true,
    },
    {
      title: 'Số Phòng Tắm',
      dataIndex: 'numberOfBathrooms',
      key: 'numberOfBathrooms',
      width: 120,
      editable: true,
    },
    {
      title: 'Tình Trạng',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      render: (status) => {
        const statusMap = {
          'unrented': 'Còn Trống',
          'rented': 'Đã Cho Thuê',
          'MAINTENANCE': 'Đang Bảo Trì'
        };
        const colorMap = {
          'unrented': 'green',
          'rented': 'blue',
          'MAINTENANCE': 'orange'
        };
        return (
          <Tag color={colorMap[status] || 'default'}>
            {statusMap[status] || status}
          </Tag>
        );
      }
    },
    {
      title: 'Số Người Ở',
      dataIndex: 'totalNumber',
      key: 'totalNumber',
      width: 100,
      render: (text) => text || '0'
    },
    {
      title: 'Diện Tích',
      dataIndex: 'area',
      key: 'area',
      width: 120,
      editable: false,
      render: (text) => `${text} m²`
    },
    {
      title: 'Hướng',
      dataIndex: 'direction',
      key: 'direction',
      editable: true,
    },
    {
      title: 'Tầng',
      dataIndex: 'floor',
      key: 'floor',
      width: 80,
      editable: true,
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      width: 150,
      fixed: 'right',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button
              icon={<SaveOutlined />}
              type="primary"
              onClick={() => save(record.key)}
            >
              Lưu
            </Button>
            <Popconfirm title="Hủy chỉnh sửa?" onConfirm={cancel}>
              <Button icon={<CloseOutlined />}>Hủy</Button>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Button
              icon={<EditOutlined />}
              type="primary"
              ghost
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              Sửa
            </Button>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa căn hộ này?"
              onConfirm={() => handleDelete(record.apartmentId)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button
                icon={<DeleteOutlined />}
                danger
              >
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  const mergedColumns = apartmentColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'numberOfBedrooms' || 
                  col.dataIndex === 'numberOfBathrooms' || 
                  col.dataIndex === 'area' ? 'number' : 
                  col.dataIndex === 'direction' ? 'select-direction' :
                  col.dataIndex === 'status' ? 'select-status' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Card
      title={
        <Space>
          <HomeOutlined />
          <span>Quản Lý Căn Hộ</span>
        </Space>
      }
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          style={{
            background: 'rgba(30, 58, 138, 0.92)',
          }}
        >
          Thêm Căn Hộ Mới
        </Button>
      }
    >
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          dataSource={apartments}
          loading={loading}
          pagination={{
            onChange: cancel,
            total: apartments.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} căn hộ`
          }}
        />
      </Form>

      <CreateApartmentModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSuccess={handleSuccess}
      />
    </Card>
  );
};

export default ApartmentManagement;