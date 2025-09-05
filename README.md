# Minimalist Reactkit 

🎉 Minimalist Reactkit provides you with only the important easily restyable components. There are many other libraries that help you with the others

## Documentation

Check the [documentation](https://minimalist-reactkit.web.app/) to get you started!

## Installation

```
npm i minimalist-reactkit
```

```
yarn add minimalist-reactkit
```
## How To Use
Get validated inputs 
```jsx

 import React from 'react';

  import { Form, Input } from 'minimalist-reactkit';
  import 'minimalist-reactkit/index.css'; // add to root file
  
  function App(){

    const handleSubmit = () => {
      // more code here
    }

    return (
      <div>
      <Form onSubmit={handleSubmit}>
        <Input required />
      </Form>
      </div>
    );
  }

```

## Check out Our Select Component
```jsx
  import React, {useState} from 'react';
  import { Form, Select, BtnPrimary } from 'minimalist-reactkit'; // flexible react select 
  import 'minimalist-reactkit/index.css'; // add to root file
  
  function App(){

    const [car, setCar] = useState({label:"Honda", value:"hda"})

    const carOptions = [
      {label:"Honda", value:"hda"},
      { label:<span>Toyota</span>, value: "tyt" } // you can also use jsx as label and style as see fit
    ]

    const handleSelectChange = (selected: any, name: string) => {
      setCar(selected)
    }

    return (
      <Form>
       <Select
         name="car"
         label="Select Car Choice"
         isSearchable={true}
         defaultValue={car}
         options={carOptions}
         handleChange={handleSelectChange}
        />
        <BtnPrimary>Submit Car</BtnPrimary>
      </Form>
    );
  }
```

## Check Out Our Datatables
```jsx
  import {Table} from 'minimalist-reactkit';
  import 'minimalist-reactkit/index.css';

  const tableData = [
   { name: 'Godwin Emmanuel', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', action: <a>View</a> },
   { name: 'Clara Kaio', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', action: <a>View</a> },
   { name: 'Joseph Tabina', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', action: <a>View</a> },
  ]

  const handlePagination = (limit: number, page: number) => {
    // api call 
  };
```
## USAGE 1
```jsx

  <Table
   head={[
        { name: 'Applicant Name', accessor: 'name' },// add assesor if you want sortable columns
        { name: 'Status', accessor: 'status' },
        { name: 'Booking Id', accessor: 'flightId' },
        { name: 'Destination', accessor: 'trip' },
        { name: 'Date Created', accessor: 'date' },
        { name: 'Officer', accessor: 'officer' },
        { name: 'Action', accessor: '' }
        ];}
   refetch={handlePagination} // table also handles internal pagination for when api fetch not needed
   body={tableData}
  />

```
## USAGE 2
```jsx

  <Table
     head={[
        { name: 'Applicant Name', accessor: 'name' },// add assesor if you want sortable columns
        { name: 'Status', accessor: 'status' },
        { name: 'Booking Id', accessor: 'flightId' },
        { name: 'Destination', accessor: 'trip' },
        { name: 'Date Created', accessor: 'date' },
        { name: 'Officer', accessor: 'officer' },
        { name: 'Action', accessor: '' }
        ];}
   body={tableData}
   isRow = {true}
   Row={TableRow}
   refetch={handlePagination} // table also handles internal pagination for when api fetch not needed
   rowProps={{ currentTime: '24h' }} // pass more props to row component 
/>

const TableRow = ({data, currentTime}) => { // data is passed by default
   return(
      <tr>
         <td>{data.name}</td>
         <td>{data.status}</td>
         <td>{data.flightId}</td>
         <td>{data.trip}</td>
         <td>{data.action}</td>
      </tr>
   )
}

```
![Table Image](https://github.com/miriam-samuels/minimalist-reactkit/blob/8a081195197c12dadfea90498244b98e2ea587ad/image.png?raw=true)

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

![OTP Image](https://github.com/miriam-samuels/minimalist-reactkit/blob/docs/public/otp.png?raw=true)

## Documentation

Check the [documentation](https://minimalist-reactkit.web.app/) to get you started!
