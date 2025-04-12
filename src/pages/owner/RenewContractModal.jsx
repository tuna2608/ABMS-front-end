import React, { useState } from 'react';
import { Modal, Button, Space, DatePicker, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { updateContractVerification } from '../../redux/apiCalls';

export const RenewalModal = ({ 
  isVisible, 
  onCancel, 
  contract,
  onSuccess,
  selectedApartment 
}) => {
  const [newStartDate, setNewStartDate] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);
  const [newContractFiles, setNewContractFiles] = useState([]);
  const [renewLoading, setRenewLoading] = useState(false);

  const handleRenewSubmit = async () => {
    if (!newContractFiles.length) {
      message.error('Vui lòng tải lên hợp đồng mới');
      return;
    }

    setRenewLoading(true);
    try {
      const files = newContractFiles.map(file => file.originFileObj);

      const response = await updateContractVerification(
        contract.id,
        newStartDate.toDate(),
        newEndDate.toDate(),
        files
      );

      if (response.success) {
        message.success('Gia hạn hợp đồng thành công');
        onSuccess(selectedApartment);
        onCancel();
        setNewStartDate(null);
        setNewEndDate(null);
        setNewContractFiles([]);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi gia hạn hợp đồng');
    } finally {
      setRenewLoading(false);
    }
  };

  return (
    <Modal
      title="Gia Hạn Hợp Đồng"
      open={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleRenewSubmit}
          loading={renewLoading}
        >
          Xác Nhận
        </Button>
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <DatePicker
          label="Ngày bắt đầu"
          value={newStartDate}
          onChange={(date) => setNewStartDate(date)}
          style={{ width: '100%' }}
          format="DD/MM/YYYY"
        />
        <DatePicker
          label="Ngày kết thúc"
          value={newEndDate}
          onChange={(date) => setNewEndDate(date)}
          style={{ width: '100%' }}
          format="DD/MM/YYYY"
        />
        <Upload
          listType="picture-card"
          fileList={newContractFiles}
          onChange={({ fileList }) => setNewContractFiles(fileList)}
          beforeUpload={() => false}
          multiple
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải hợp đồng mới</div>
          </div>
        </Upload>
      </Space>
    </Modal>
  );
};