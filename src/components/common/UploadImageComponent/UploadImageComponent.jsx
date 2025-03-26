import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Dragger } = Upload;

const ImageUploader = () => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = async (options) => {
    const { file } = options;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      message.success('Tải ảnh lên thành công');
      setFileList([...fileList, file]);
    } catch (error) {
      message.error('Tải ảnh lên thất bại');
      console.error('Upload error:', error);
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    onChange(info) {
      const { status } = info.file;
      
      if (status === 'done') {
        message.success(`${info.file.name} tải lên thành công.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} tải lên thất bại.`);
      }
    },
    customRequest: handleUpload
  };

  return (
    <Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Nhấp hoặc kéo file ảnh vào đây để tải lên</p>
      <p className="ant-upload-hint">
        Hỗ trợ tải lên một file ảnh đơn. Chỉ chấp nhận file ảnh.
      </p>
    </Dragger>
  );
};

export default ImageUploader;
