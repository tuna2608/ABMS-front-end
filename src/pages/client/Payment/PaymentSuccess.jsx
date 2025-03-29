import React from 'react';
import { Result, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const PaymentSuccess = () => {
  return (
    <div className="payment-success bg-white min-h-screen flex items-center justify-center">
      <Result
        icon={<CheckCircleOutlined style={{ color: '#52c41a', fontSize: 72 }} />}
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
              <Button type="primary" size="large">
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