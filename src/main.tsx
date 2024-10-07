import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PaymentForm, { Config, PaymentResult } from './App';
import './index.css';

interface SDKConfig extends Config {
  onSuccess?: (result: PaymentResult) => void;
  onError?: (error: Error) => void;
}

interface SDK {
  submit: () => Promise<void>;
}

function initSDK(container: HTMLElement, config: SDKConfig): SDK {
  let submitFunction: () => Promise<void> = async () => {
    console.warn('Form not yet rendered');
  };

  const root = createRoot(container);
  root.render(
    <StrictMode>
      <PaymentForm 
        config={config} 
        onSuccess={config.onSuccess}
        onError={config.onError}
        setSubmitFunction={(fn) => {
          submitFunction = fn;
        }}
      />
    </StrictMode>
  );

  return {
    submit: async () => {
      await submitFunction();
    }
  };
}

export { initSDK };
export default { initSDK };

// for local testing
// initSDK(document.getElementById('root')!, {
//   merchantId: 'demo-merchant',
//   apiKey: 'demo-api-key'
// });
