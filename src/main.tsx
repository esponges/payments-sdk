import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './zoid-component';

import App from './App';

// import type { Config, PaymentResult } from './Form';

import './styles/main.scss';

// interface SDKConfig extends Config {
//   onSuccess?: (result: PaymentResult) => void;
//   onError?: (error: Error) => void;
// }

// interface SDK {
//   submit: () => Promise<void>;
// }

// function initSDK(container: HTMLElement, config: SDKConfig): SDK {
//   let submitFunction: () => Promise<void> = async () => {
//     console.warn('Form not yet rendered');
//   };

//   const root = createRoot(container);
//   root.render(
//     <StrictMode>
//       <App 
//         config={config} 
//         onSuccess={config.onSuccess}
//         onError={config.onError}
//         // allow child to set submit function
//         setSubmitFunction={(fn) => {
//           submitFunction = fn;
//         }}
//       />
//     </StrictMode>
//   );

//   return {
//     submit: async () => {
//       await submitFunction();
//     }
//   };
// }

// export type { Config, PaymentResult } from './Form';
// export { initSDK };
// export default { initSDK };

// uncomment to run locally with `npm run vite`
// initSDK(document.getElementById('root')!, {
//   merchantId: '123',
//   apiKey: '456',
// });

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <App config={window.xprops?.config} />
  </StrictMode>
);
