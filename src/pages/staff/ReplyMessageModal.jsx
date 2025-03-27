import React from "react";
import { 
  Modal, 
  Form, 
  Input, 
  Typography,
  message
} from "antd";

const { Text } = Typography;

const ReplyMessageModal = ({ visible, onCancel, message: currentMessage }) => {
  const [replyForm] = Form.useForm();

  const handleReplySubmit = () => {
    replyForm.validateFields().then(values => {
      // Implement reply submission logic
      console.log("Reply submitted:", values);
      message.success("Đã gửi phản hồi thành công!");
      replyForm.resetFields();
      onCancel();
    }).catch(errorInfo => {
      console.log('Validation failed:', errorInfo);
    });
  };

  return (
    <Modal
      title="Trả lời tin nhắn"
      open={visible}
      onCancel={onCancel}
      onOk={handleReplySubmit}
    >
      {currentMessage && (
        <>
          <div style={{ marginBottom: 16 }}>
            <Text strong>Từ:</Text> {currentMessage.sender}
          </div>
          <div style={{ marginBottom: 16 }}>
            <Text strong>Nội dung:</Text> {currentMessage.content}
          </div>
          <Form
            form={replyForm}
            layout="vertical"
          >
            <Form.Item
              name="reply"
              label="Nội dung trả lời"
              rules={[{ required: true,message: 'Vui lòng nhập nội dung trả lời!' 
              }]}
              >
                <Input.TextArea rows={4} placeholder="Nhập nội dung phản hồi..." />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    );
  };
  
  export default ReplyMessageModal;