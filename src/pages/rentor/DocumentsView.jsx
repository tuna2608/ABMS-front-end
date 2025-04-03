import React, { useState, useEffect } from "react";
import { 
  Card, 
  Table, 
  Button, 
  Space,
  Upload, 
  message 
} from "antd";
import { 

  FilePdfOutlined, 
  DownloadOutlined, 
  UploadOutlined 
} from "@ant-design/icons";
import moment from "moment";


const DocumentsView = () => {
    const [documents, setDocuments] = useState([]);
    const [fileList, setFileList] = useState([]);
  
    // Mock documents data
    useEffect(() => {
      const mockDocuments = [
        {
          id: 1,
          name: "Hóa đơn nước tháng 2",
          type: "pdf",
          uploadDate: "2024-02-15",
          size: "128 KB"
        },
        {
          id: 2,
          name: "Giấy đăng ký xe",
          type: "pdf",
          uploadDate: "2023-12-01",
          size: "512 KB"
        }
      ];
      setDocuments(mockDocuments);
    }, []);
  
    const documentColumns = [
      {
        title: "Tên tài liệu",
        dataIndex: "name",
        key: "name",
        render: (name, record) => (
          <Space>
            <FilePdfOutlined style={{ color: 'red' }} />
            {name}
          </Space>
        )
      },
      {
        title: "Loại",
        dataIndex: "type",
        key: "type",
        render: (type) => type.toUpperCase()
      },
      {
        title: "Ngày tải lên",
        dataIndex: "uploadDate",
        key: "uploadDate",
        render: (date) => moment(date).format("DD/MM/YYYY")
      },
      {
        title: "Kích thước",
        dataIndex: "size",
        key: "size"
      },
      {
        title: "Hành động",
        key: "actions",
        render: (_, record) => (
          <Space>
            <Button 
              type="link" 
              icon={<DownloadOutlined />}
              onClick={() => {
                // Simulate download logic
                message.success(`Đang tải xuống ${record.name}`);
              }}
            >
              Tải xuống
            </Button>
          </Space>
        ),
      }
    ];
  
    const handleUpload = (info) => {
      let newFileList = [...info.fileList];
  
      // Limit the number of files and file types
      newFileList = newFileList.slice(-5).map(file => {
        if (file.type !== 'application/pdf') {
          message.error(`${file.name} không phải là file PDF`);
          return null;
        }
        return file;
      }).filter(file => file !== null);
  
      setFileList(newFileList);
  
      // Simulate upload success
      if (info.file.status === 'done') {
        message.success(`${info.file.name} tải lên thành công`);
        
        // Add new document to list
        const newDocument = {
          id: documents.length + 1,
          name: info.file.name,
          type: 'pdf',
          uploadDate: moment().format("YYYY-MM-DD"),
          size: `${(info.file.size / 1024).toFixed(2)} KB`
        };
        setDocuments([...documents, newDocument]);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} tải lên thất bại`);
      }
    };
  
    const uploadProps = {
      multiple: true,
      accept: '.pdf',
      fileList,
      onChange: handleUpload,
      beforeUpload: (file) => {
        const isPDF = file.type === 'application/pdf';
        if (!isPDF) {
          message.error(`${file.name} không phải là file PDF`);
        }
        return isPDF || Upload.LIST_IGNORE;
      }
    };
  
    return (
      <Card 
        title="Tài liệu của tôi" 
        extra={
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Tải lên tài liệu</Button>
          </Upload>
        }
      >
        <Table 
          dataSource={documents} 
          columns={documentColumns}
          rowKey="id"
        />
      </Card>
    );
  };
  
  export default DocumentsView ;