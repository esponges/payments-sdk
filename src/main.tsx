import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PaymentForm, { Config } from './App';
import './index.css';

function initSDK(container: HTMLElement, config: Config): void {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <PaymentForm config={config} />
    </StrictMode>
  );
}

// for local testing
initSDK(document.getElementById('root')!, {
  merchantId: 'demo-merchant',
  apiKey: 'demo-api-key'
});

// Export the initSDK function as a named export
export { initSDK };

// Also export it as a default export for UMD compatibility
export default { initSDK };
