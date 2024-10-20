import React, { useState, FormEvent, useEffect, useCallback } from 'react';
import postRobot from 'post-robot';

export interface Config {
  merchantId: string;
  apiKey: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export interface PaymentFormProps {
  config: Config;
  onSuccess?: (result: PaymentResult) => void;
  onError?: (error: Error) => void;
  setSubmitFunction?: (fn: () => Promise<void>) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ config, onSuccess, onError, setSubmitFunction }) => {
  const [amount, setAmount] = useState<string>('');

  const handleSubmit = useCallback(async () => {
    console.log('handleSubmit');
    try {
      // Simulate API call to downstream service

      // const response = await fetch('https://api.example.com/authenticate', {
      //   method: 'POST',
      //   body: JSON.stringify({ amount, ...config }),
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // const result: PaymentResult = await response.json();
      const fakeResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            transactionId: '1234567890',
          });
        }, 1500);
      });
      const result: PaymentResult = await fakeResponse as PaymentResult;
      
      // Call onSuccess callback
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      console.error('Error:', error);
      // Call onError callback
      if (onError && error instanceof Error) {
        onError(error);
      }
    }
  }, [/* amount, config,  */onSuccess, onError]);

  // TODO: Figure out how this affects the `zoid-component` and breaks
  // the app. Gotta think how to listen to parent events without postRobot
  useEffect(() => {
    // const submit = postRobot.on('submit', async (evt) => {
    //   console.log('submitting via parent click', { evt });
    //   // handleSubmit();
    // });

    // return () => {
    //   submit.cancel();
    // }
  }, []);

  useEffect(() => {
    setSubmitFunction?.(handleSubmit);
  }, [config, onSuccess, onError, handleSubmit, setSubmitFunction]);

  return (
    <form onSubmit={(e: FormEvent) => e.preventDefault()} className="payment-form">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        required
      />
    </form>
  );
};

export default PaymentForm;
