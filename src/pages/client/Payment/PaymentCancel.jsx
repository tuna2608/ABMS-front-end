import React, { useEffect, useState } from 'react';
import { Result, Button, message } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { depositCancel } from '../../../redux/apiCalls';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [loadingPayment, setLoadingPayment] = useState(false);
  useEffect(() => {
    setLoadingPayment(true);
    async function callDepositeCancel() {
      const depositRequest = await JSON.parse(localStorage.getItem("depositRequest"));
      const res = await depositCancel(depositRequest);
      const messageAPI = res.data.message;
      console.log(res);
      if (res.status === 401 || res.status === 400 || res.status === 403) {
        message.error(messageAPI);
      } else {
        message.success(messageAPI);
      }
    }
    callDepositeCancel();
    setLoadingPayment(false)
  }, []);

  return (
    <div className="payment-success bg-white min-h-screen flex items-center justify-center">
      <Result
        icon={<CloseCircleOutlined style={{ color: '#52c41a', fontSize: 72 }} />}
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
              <Button onClick={()=> navigate('/')} type="primary" size="large">
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