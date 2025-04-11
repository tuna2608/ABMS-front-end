import React, { useEffect, useState } from "react";
import { Result, Button, message } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { depositCancel, paymentBillCancel } from "../../../redux/apiCalls";
import { useSelector } from "react-redux";

const PaymentSuccess = () => {
  const [currentUser] = useState(
    useSelector((state) => state.user.currentUser)
  );
  
  const navigate = useNavigate();
  const depositRequest = JSON.parse(localStorage.getItem("depositRequest"));
  console.log(depositRequest);

  const paymentBillRequest = JSON.parse(
    localStorage.getItem("paymentBillRequest")
  );
  useEffect(() => {
    if (depositRequest) {
      callDepositeCancel(currentUser);
      localStorage.removeItem("depositRequest");
    }
    if (paymentBillRequest) {
      callPaymentBillCancel(currentUser)
      localStorage.removeItem("paymentBillRequest");
    }
  }, [currentUser]);

  async function callDepositeCancel() {
    try {
      const res = await depositCancel(depositRequest);
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Không thể thực hiện thanh toán thất bại");
    }
  }

  async function callPaymentBillCancel(currentUser) {
      const formData = {
        billId: paymentBillRequest.billId,
        paymentInfo: paymentBillRequest.description,
        amount: paymentBillRequest.price,
        userPaymentId: currentUser.userId
      };
  
      try {
        const res = await paymentBillCancel(formData);
        if (res.success) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      } catch (error) {
        message.error("Không thể thực hiện thanh toán hóa đơn thất bại");
      }
    }


  return (
    <div className="payment-success bg-white min-h-screen flex items-center justify-center">
      <Result
        icon={<CloseCircleOutlined style={{ color: "red", fontSize: 72 }} />}
        title={
          <h1 className="text-4xl font-bold mb-4 text-center">
            Payment Canceled!
          </h1>
        }
        extra={
          <>
            <div className="text-lg mb-8 text-center text-gray-600">
              <p>Thank you for your payment.</p>
              <p>Your transaction has been completed successfully.</p>
            </div>
            <div className="text-center">
              <Button onClick={() => navigate("/")} type="primary" size="large">
                Back to Home
              </Button>
            </div>
          </>
        }
      />
    </div>
  );
};

export default PaymentSuccess;
