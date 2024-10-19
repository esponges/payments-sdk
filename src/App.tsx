import React, { /* useEffect */ } from 'react';
// import PaymentForm, { PaymentFormProps } from './Form';
import Form, { Config, PaymentResult } from './Form';

// TODO: uncomment this when we want to serve the SDK as a library
// const App: React.FC<PaymentFormProps> = ({ config, onSuccess, onError, setSubmitFunction }) => {
//   useEffect(() => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const handleSendAuth = (event: any) => {
//       console.log('Received sendAuth event:', event.data);
//       // Handle the authentication data here
//     };

//     window.addEventListener('sendAuth', handleSendAuth);

//     return () => {
//       window.removeEventListener('sendAuth', handleSendAuth);
//     };
//   }, []);

//   // here we can setup a context provider for the form instead of prop drilling
  
//   return (
//     <PaymentForm
//       config={config}
//       onSuccess={onSuccess}
//       onError={onError}
//       setSubmitFunction={setSubmitFunction}
//     />
//   )
// };

// export default App;

declare global {
  interface Window {
    xprops?: {
      onSuccess?: (result: PaymentResult) => void;
      onError?: (error: Error) => void;
      config?: Config;
    };
  }
}

interface AppProps {
  config?: Config;
}

const App: React.FC<AppProps> = ({ config }) => {
  console.log({ config, props: window.xprops });
  const handleSuccess = (result: PaymentResult) => {
    window.xprops?.onSuccess?.(result);
  };

  const handleError = (error: Error) => {
    window.xprops?.onError?.(error);
  };

  return (
    <div className="App">
      <Form
        config={config || { merchantId: '', apiKey: '' }}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
};

export default App;
