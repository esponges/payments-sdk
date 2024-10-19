import { create } from 'zoid/dist/zoid.frameworks';

const PaymentSDK = create({
  tag: 'payment-sdk',
  url: '/index.html', // This will be the URL of your built React app

  dimensions: {
    width: '100%',
    height: '300px',
  },

  props: {
    config: {
      type: 'object',
      required: true,
    },
    onSuccess: {
      type: 'function',
      required: true,
    },
    onError: {
      type: 'function',
      required: true,
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).PaymentSDK = PaymentSDK;

export default PaymentSDK;
