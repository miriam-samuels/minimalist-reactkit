# Minimlist Reactkit 

🎉 Minimalist Reactkit provides you with easily restyable components

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

## Check Out Our Datatables
```jsx
  import {Table} from 'minimalist-reactkit';
  import 'minimalist-reactkit/index.css';

  const tableData = [
   { name: 'Godwin Emmanuel', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', action: <a>View</a> },
   { name: 'Clara Kaio', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', action: <a>View</a> },
   { name: 'Joseph Tabina', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', action: <a>View</a> },
  ]
```
## USAGE 1
```jsx
  <Table
   head={['Applicant Name', 'Status', 'Booking Id', 'Destination', 'Action']}
   accessor={['name', 'status', 'flightId', 'trip', '']} // if sortable column is needed
   body={tableData}
  />

```
## USAGE 2
```jsx
  <Table
   head={['Applicant Name', 'Status', 'Booking Id', 'Destination', 'Action']}
   accessor={['name', 'status', 'flightId', 'trip', '']}
   body={tableData}
   isRow = {true}
   Row={TableRow}
   rowProps={{ currentTime: '24h' }} // pass props to row component 
/>

const TableRow = ({data}:any) => { // data is passed by default
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
![My Logo](image.png 'Table Image')

## Documentation

Check the [documentation](https://minimalist-reactkit.web.app/) to get you started!
