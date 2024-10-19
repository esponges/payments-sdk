import { create } from 'zoid/dist/zoid.frameworks';

/* 
  This would be the SDK bridge component
  This is the shared component that will be used to render the payment form.
  Should be imported by the parent and the child.
*/

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
