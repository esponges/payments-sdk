import React from 'react';
import PaymentForm, { PaymentFormProps } from './Form';


const App: React.FC<PaymentFormProps> = ({ config, onSuccess, onError, setSubmitFunction }) => {
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
