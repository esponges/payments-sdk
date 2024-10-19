import React, { useEffect } from 'react';
import PaymentForm, { PaymentFormProps } from './Form';


const App: React.FC<PaymentFormProps> = ({ config, onSuccess, onError, setSubmitFunction }) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSendAuth = (event: any) => {
      console.log('Received sendAuth event:', event.data);
      // Handle the authentication data here
    };

    window.addEventListener('sendAuth', handleSendAuth);

    return () => {
      window.removeEventListener('sendAuth', handleSendAuth);
    };
  }, []);

  // here we can setup a context provider for the form instead of prop drilling
  
  return (
    <PaymentForm
      config={config}
      onSuccess={onSuccess}
      onError={onError}
      setSubmitFunction={setSubmitFunction}
    />
  )
};

export default App;
