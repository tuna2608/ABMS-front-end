import React, { useState } from "react";
import {
  Modal,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Divider,
  Row,
  Col,
  message,
} from "antd";
import { useSelector } from "react-redux";
import { depositCreate } from "../../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

// Sample Post Detail Data
const samplePostDetail = {
  id: "post001",
  title: "Căn Hộ Cao Cấp Vinhomes Grand Park",
  address: "Đường Nguyễn Xiển, Quận 9, TP.HCM",
  monthlyRent: 8500000,
  maxDeposit: 1500000,
  depositRefundPercentage: "90%",
  refundPeriod: "10 ngày",
  propertyType: "Chung cư",
  area: "72m²",
  bedrooms: 2,
  bathrooms: 2,
};

const DepositPage = ({
  postDetail = samplePostDetail,
  isOpen,
  onCancel,
  onSubmit,
}) => {
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [modalVisible, setModalVisible] = useState(isOpen);

  const userCurrent = useSelector((state) => state.user.currentUser);

  const handleSubmit = async () => {
    if (!termsAgreed) {
      Modal.error({
        title: "Điều khoản chưa được đồng ý",
        content:
          "Vui lòng đọc và đồng ý với các điều khoản trước khi gửi yêu cầu.",
      });
      return;
    }

    const depositRequest = {
      depositUserId: userCurrent.userId,
      postId: postDetail.postId,
      depositPrice: postDetail.depositPrice,
    };

    try {
      const res = await depositCreate(depositRequest);
      if(res.success){
        message.success(res.message);
        const data = res.data;
        const formData ={
          ...depositRequest,
          depositId: data.depositId
        }
        localStorage.setItem("depositRequest", JSON.stringify(formData));
        const url = res?.data?.checkoutUrl;
        window.location.href = url;
      }else{
        
      }
      const messageAPI = res.data.message;
      if (res.status === 401 || res.status === 400 || res.status === 403) {
        message.error(messageAPI);
      } else {
        
      }
    } catch (error) {}
  };

  const handleCancel = () => {
    setModalVisible(false);
    if (onCancel) onCancel();
  };

  const depositTerms = `
ĐIỀU KHOẢN HOÀN TRẢ TIỀN ĐẶT CỌC

1. Quy Định Hoàn Trả Tiền Đặt Cọc
- Chủ nhà sẽ hoàn trả ${postDetail.depositPrice} số tiền đặt cọc sau khi:
  a) Người thuê thực hiện đúng các cam kết trong hợp đồng
  b) Không có hư hỏng vượt quá mức sử dụng bình thường
  c) Thông báo và bàn giao lại mặt bằng đúng thời hạn

2. Điều Kiện Mất Tiền Đặt Cọc
Khách hàng có thể mất một phần hoặc toàn bộ tiền đặt cọc nếu:
- Vi phạm các điều khoản trong hợp đồng thuê
- Hủy hợp đồng trước thời hạn không có lý do chính đáng
- Gây hư hỏng tài sản vượt quá mức độ sử dụng bình thường

3. Thời Gian Và Phương Thức Hoàn Trả
- Thời gian hoàn trả: ${postDetail.refundPeriod} làm việc sau khi kết thúc hợp đồng
- Phương thức: Chuyển khoản ngân hàng theo thông tin do người thuê cung cấp

4. Cam Kết
- Chúng tôi cam kết minh bạch và rõ ràng trong việc hoàn trả tiền đặt cọc
- Mọi thắc mắc vui lòng liên hệ trực tiếp với chủ nhà để được giải đáp
  `;

  return (
    <Modal
      title="Xác Nhận Yêu Cầu Đặt Cọc"
      open={isOpen}
      width={600}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Xác Nhận Đặt Cọc
        </Button>,
      ]}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h3>Thông Tin Bất Động Sản</h3>
          <Input
            value={`${postDetail.title} - ${postDetail.address}`}
            readOnly
            style={{ marginBottom: 10 }}
            disabled
          />
          <Input
            value={`${postDetail.propertyType} - ${postDetail.area}, ${postDetail.bedrooms} PN, ${postDetail.bathrooms} WC`}
            readOnly
            style={{ marginBottom: 10 }}
            disabled
          />
        </Col>
        <Col span={12}>
          <h3>Giá Thuê</h3>
          <InputNumber
            style={{ width: "100%" }}
            value={postDetail.price}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            readOnly
            addonAfter="VNĐ/tháng"
            disabled
          />
        </Col>

        <Col span={12}>
          <h3>Số Tiền Đặt Cọc</h3>
          <InputNumber
            style={{ width: "100%" }}
            value={postDetail.depositPrice}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            readOnly
            addonAfter="VNĐ"
            disabled
          />
        </Col>

        <Col span={24}>
          <Divider>Điều Khoản Đặt Cọc</Divider>
          <div
            style={{
              maxHeight: 250,
              overflowY: "auto",
              border: "1px solid #d9d9d9",
              padding: 16,
              borderRadius: 4,
            }}
          >
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
              {depositTerms}
            </pre>
          </div>
        </Col>

        <Col span={24}>
          <Checkbox
            checked={termsAgreed}
            onChange={(e) => setTermsAgreed(e.target.checked)}
          >
            Tôi đã đọc và đồng ý với các điều khoản đặt cọc
          </Checkbox>
        </Col>
      </Row>
    </Modal>
  );
};

export default DepositPage;
