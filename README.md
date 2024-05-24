# Minimlist Reactkit 

🎉 Minimalist Reactkit provides you with easily restyable components

## Documentation

Check the [documentation](https://minimalist-reactkit.web.app/) to get you started!

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

## Check Out Our Datatables
```jsx
  import {Table} from 'minimalist-reactkit';
  import 'minimalist-reactkit/index.css';

  const tableData = [
   { name: 'Godwin Emmanuel', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth', action: <a>View</a> },
   { name: 'Clara Kaio', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth', action: <a>View</a> },
   { name: 'Joseph Tabina', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth', action: <a>View</a> },
  ]
```
## USAGE 1
```jsx
  <Table
   head={['Applicant Name', 'Status', 'Booking Id', 'Destination', 'Date Created', 'Officer', 'Action']}
   accessor={['name', 'status', 'flightId', 'trip', 'date', 'officer', '']}
   body={tableData}
  />

```
## USAGE 2
```jsx
  <Table
   head={['Applicant Name', 'Status', 'Booking Id', 'Destination', 'Date Created', 'Officer', 'Action']}
   accessor={['name', 'status', 'flightId', 'trip', 'date', 'officer', '']}
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
         <td>{data.date}</td>
         <td>{data.officer}</td>
         <td>{data.action}</td>
      </tr>
   )
}

```
```jsx
interface TableProps {
   head?: React.ReactNode[];
   body: any[];
   accessor?: string[]; // for table header sorting
   itemsPerPage?: number;
   className?: string
   showFilter?: boolean;
   style?: any
   isRow?: boolean
   Row?: any
   rowProps?: any,
   isLoading?: boolean
}
```
