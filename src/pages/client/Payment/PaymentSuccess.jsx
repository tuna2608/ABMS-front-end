import React, { useEffect, useState } from "react";
import { Result, Button } from "antd";
import { message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { depositSuccess, paymentBillSuccess } from "../../../redux/apiCalls";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { LoadingComponent } from "../../../components/common/LoadingComponent/LoadingComponent";

const PaymentSuccess = () => {
  const [currentUser] = useState(
    useSelector((state) => state.user.currentUser)
  );
  const navigate = useNavigate();
  const depositRequest = JSON.parse(localStorage.getItem("depositRequest"));
  // console.log(depositRequest);

  const paymentBillRequest = JSON.parse(
    localStorage.getItem("paymentBillRequest")
  );
  // console.log(paymentBillRequest);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (depositRequest) {
      // console.log(depositRequest);
      callDepositeSuccess();
      localStorage.removeItem("depositRequest");
    }
    if (paymentBillRequest) {
      // console.log(paymentBillRequest);
      callPaymentBillSuccess(currentUser);
      localStorage.removeItem("paymentBillRequest");
    }
  }, [currentUser]);

  async function callDepositeSuccess() {
    setLoading(true);
    try {
      const res = await depositSuccess(depositRequest);
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Không thể thực hiện thanh toán thành công");
    } finally {
      setLoading(false);
    }
  }

  async function callPaymentBillSuccess(currentUser) {
    setLoading(true);
    const formData = {
      billId: paymentBillRequest.billId,
      paymentInfo: paymentBillRequest.description,
      amount: paymentBillRequest.price,
      userPaymentId: currentUser.userId,
    };

    try {
      const res = await paymentBillSuccess(formData);
      if (res.success) {
        message.success(res.message);

      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Không thể thực hiện thanh toán hóa đơn thành công");
    } finally {
      setLoading(false);
      setTimeout(() => {
        navigate('/')
      }, 1500);
    }
  }

  return (
    <LoadingComponent isPending={loading}>
      <div className="payment-success bg-white min-h-screen flex items-center justify-center">
        <Result
          icon={
            <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 72 }} />
          }
          title={
            <h1 className="text-4xl font-bold mb-4 text-center">
              Payment Successful!
            </h1>
          }
          extra={
            <>
              <div className="text-lg mb-8 text-center text-gray-600">
                <p>Thank you for your payment.</p>
                <p>Your transaction has been completed successfully.</p>
              </div>
              <div className="text-center">
                <Button
                  onClick={() => navigate("/")}
                  type="primary"
                  size="large"
                >
                  Back to Home
                </Button>
              </div>
            </>
          }
        />
      </div>
    </LoadingComponent>
  );
};

export default PaymentSuccess;
