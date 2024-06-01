# Minimlist Reactkit 

🎉 Minimalist Reactkit provides you with easily restyable components (UNDER CONSTRUCTION -- use at your own discretion)

## Installation

```
$ npm i minimalist-reactkit
$ yarn add minimalist-reactkit
```

## How To Use

```jsx
  import React from 'react';

  import { BtnPrimary } from 'minimalist-reactkit';
  import 'minimalist-reactkit/index.css';
  
  function App(){

    return (
      <div>
        <BtnPrimary>Click Me</BtnPrimary>
      </div>
    );
  }
```
## Check Out Our OTP Input
```jsx
  import {OTPInput} from 'minimalist-reactkit';
  import 'minimalist-reactkit/index.css';

  const [otp, setOtp] = useState<string>('');

  const handleChange = (otp: string) => {
    setOtp(otp);
  };
  // by default it gives 6 otp inputs
  <OTPInput num={8} getOTP={handleChange}/>

```
## Add Validation (Works for all forms)
```jsx
  import {OTPInput, Form} from 'minimalist-reactkit';

      <Form onSubmit={...}>
        <OTPInput num={8}/>
      </Form>
```
## Documentation