import React, { FormEvent, useState } from 'react';
import postRobot from 'post-robot';

export interface Config {
  merchantId: string;
  apiKey: string;
}

interface PaymentFormProps {
  config: Config;
}

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ config }: PaymentFormProps) => {
  const [amount, setAmount] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Simulate API call to downstream service
      // const response = await fetch('https://api.example.com/authenticate', {
      //   method: 'POST',
      //   body: JSON.stringify({ amount, ...config }),
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // const result: PaymentResult = await response.json();
      const promise: Promise<PaymentResult> = new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, transactionId: '123456' });
        }, 1000);
      });
      const result = await promise;
      console.log({ result }); 

      // Notify parent frame
      postRobot.send(window.parent, 'payment-result', result);
    } catch (error) {
      console.error('Error:', error);
      postRobot.send(window.parent, 'payment-error', {
        message: (error as Error).message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder='Enter amount'
        required
      />
      <button type='submit'>Pay</button>
    </form>
  );
};

export default PaymentForm;
