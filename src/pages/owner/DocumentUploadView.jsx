import React, { useState } from 'react';
import { 
  Card, 
  Space, 
  Select, 
  Upload, 
  Button, 
  message 
} from 'antd';
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { Option } = Select;

const DocumentUploadView = ({ 
  apartments, 
  documentTypes 
}) => {
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [uploadType, setUploadType] = useState(null);
  const [fileList, setFileList] = useState([]);

  const uploadProps = {
    name: 'file',
    multiple: true,
    fileList,
    onChange(info) {
      let newFileList = [...info.fileList];
      newFileList = newFileList.slice(-5);
      newFileList = newFileList.filter(file => {
        const isValidType = [
          'image/jpeg', 
          'image/png', 
          'application/pdf', 
          'application/msword'
        ].includes(file.type);
        
        if (!isValidType) {
          message.error(`${file.name} không phải định dạng được hỗ trợ`);
        }
        
        return isValidType;
      });

      setFileList(newFileList);
    },
    beforeUpload: () => false
  };

  const handleUpload = () => {
    if (!selectedApartment || !uploadType || fileList.length === 0) {
      message.error("Vui lòng chọn căn hộ, loại tài liệu và tải lên file");
      return;
    }

    message.success("Tải lên tài liệu thành công!");
    
    setFileList([]);
    setUploadType(null);
    setSelectedApartment(null);
  };

  return (
    <Card 
      title={
        <Space>
          <UploadOutlined /> 
          <span>Tải lên tài liệu</span>
        </Space>
      }
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Select
          style={{ width: '100%' }}
          placeholder="Chọn căn hộ"
          value={selectedApartment}
          onChange={(value) => setSelectedApartment(value)}
        >
          {apartments.map(apt => (
            <Option key={apt.id} value={apt.id}>
              {apt.title}
            </Option>
          ))}
        </Select>

        <Select
          style={{ width: '100%' }}
          placeholder="Chọn loại tài liệu"
          value={uploadType}
          onChange={(value) => setUploadType(value)}
        >
          {documentTypes.map(type => (
            <Option key={type.value} value={type.value}>
              {type.label}
            </Option>
          ))}
        </Select>

        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Nhấp hoặc kéo file vào khu vực này để tải lên
          </p>
          <p className="ant-upload-hint">
            Hỗ trợ tải lên nhiều file (tối đa 5 file)
            Hỗ trợ các định dạng: JPG, PNG, PDF, DOC (tối đa 10MB/file)
          </p>
        </Dragger>

        <Button 
          type="primary" 
          onClick={handleUpload} 
          disabled={fileList.length === 0}
          block
        >
          Tải lên
        </Button>
      </Space>
    </Card>
  );
};

export default DocumentUploadView;