

import { useState } from "react";
import CodeBlock from "../../components/code-block";
import { accordionItems } from "../../variables";
import { Pill,  Accordion, Input, Form, Modal, Tab, Toggle, OTPInput } from "minimalist-reactkit";
import { Table } from "../../components/table";
import { Select } from "../../components/select";

function Main() {
   const [showAlert, setShowAlert] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [isOn, setIsOn] = useState(false);
   return (
      // <div className="col-md-9 col-xl-10 main-panel">
      <div className="main-panel">
         <div className="main-panel-wrapper">
            <h2
               id="introduction"
               className="mt-2 text-center font-weight-light text-muted text-uppercase mb-4"
            >
               Documentation
            </h2>
            <div className="card grid-margin">
               <div className="card-body">
                  <h3 className="mb-4">Introduction</h3>
                  <p>
                     Minimalist Reactkit provides you with easily restyable components.
                  </p>
                  <p>
                     Lightweight, flexible and highly customizable reusable components
                     for React-devs designed for easy integration into your projects,
                     providing a clean and modern aesthetic.
                  </p>
               </div>
            </div>

            <div className="card grid-margin">
               <div className="card-body" id="packageInstallation">
                  <h3>Installation</h3>
                  <h4 className="pt-4">Set up the Development Environment</h4>
                  <p>
                     Install{" "}
                     <a href="https://nodejs.org/en/" target="_blank">
                        Node.js and the package manager of choice
                     </a>
                     , if they are not already on your machine.
                  </p>
                  <div>
                     <h4 className="pt-4">NPM Install</h4>
                     <CodeBlock>npm i minimalist-reactkit</CodeBlock>
                     <h4 className="pt-4">Yarn Add</h4>
                     <CodeBlock>yarn add minimalist-reactkit</CodeBlock>
                     <h4 className="pt-4">PNPM Add</h4>
                     <CodeBlock>pnpm add minimalist-reactkit</CodeBlock>
                  </div>
               </div>
            </div>
            <div className="card grid-margin" id="getStarted">
               <div className="card-body">
                  <h3 className="mb-4">Get Started</h3>
                  <p>Once you have download the package, try this</p>
                  <CodeBlock>

                     {`import React from 'react';

import {BtnPrimary} from 'minimalist-reactkit';

function App(){
   return (
       <BtnPrimary>Click Me</BtnPrimary>
   );
}
`}
                  </CodeBlock>
                  <p>Ensure to import styles at root file</p>

                  <CodeBlock>import 'minimalist-reactkit/index.css';</CodeBlock>
               </div>
            </div>

            <div className="card grid-margin" id="accordion">
               <div className="card-body">
                  <h3 className="mb-4">Accordion</h3>
                  <CodeBlock>
                     {`
import {Accordion} from 'minimalist-reactkit';

const items = [
   { id: 1, heading: 'option 1', body: <Option1/> },
   { id: 2, heading: 'option 2', body: <Option2/> },
   { id: 3, heading: 'option 3', body: <Option3/> }
];

<Accordion
   item = {items}
/>
`}
                  </CodeBlock>

                  <h3 className="mb-4">Types</h3>
                  <CodeBlock>
                     {`
type AccordionProps = {
   item: AccordionItem;
   controls?: boolean;     // show accordion control icon
   icon?: ReactNode       // choose icon for accordion control
   alwaysOpen?: boolean; // open all accordion options by default
}

type AccordionItem = {
   id: string | number;
   heading: ReactNode;
   body: ReactNode;
}
`}
                  </CodeBlock>
                  <h3 className="mb-4">Preview</h3>
                  <Accordion item={accordionItems} />
               </div>
            </div>
            <div className="card grid-margin" id="form">
               <div className="card-body">
                  <h3 className="mb-4">Form</h3>
                  <CodeBlock>
                     {`
import {Form, InputField} from 'minimalist-reactkit';
<Form onSubmit = {() => {...}}>
   <InputField
      label="Name"
      required
   />
   <BtnSecondary className="btn-success" type="submit">Submit</BtnSecondary>
</Form>

`}
                  </CodeBlock>
                  <h3 className="mb-4">Form With Normal HTML</h3>

                  <CodeBlock>
                     {`
import {Form, InputField} from 'minimalist-reactkit';
<Form onSubmit = {() => {...}}>
   <input
      type="text"
      required
      data-mtk-input // compulsory for form validation
   />
   <button type="submit">Submit</button>
</Form>

`}
                  </CodeBlock>

                  <h3 className="mb-4">Types</h3>
                  <CodeBlock>
                     {`
FormHTMLAttributes<HTMLFormElement>
`}
                  </CodeBlock>
                  <h3 className="mb-4">Preview</h3>
                  <Form onSubmit={() => { }}>
                     <InputField
                        label="Name"
                        required
                     /> <br />
                     <BtnSecondary className="btn-success" type="submit">Submit</BtnSecondary>
                  </Form>
               </div>
            </div>
            <div className="card grid-margin" id="inputField">
               <div className="card-body">
                  <h3 className="mb-4">Input Field</h3>
                  <CodeBlock>
                     {`
import {InputField} from 'minimalist-reactkit';

<Input
   label="Name"
   required
/>
`}
                  </CodeBlock>

                  <h3 className="mb-4">Types</h3>
                  <CodeBlock>
                     {`
interface InputProps extends React.InputHTMLAttributes<any> {
	label?: string;
	className?: string;
	warning?: string;
	showWarning?: boolean;
	onChange?:
	| React.ChangeEventHandler<HTMLInputElement>
	| React.ChangeEventHandler<HTMLTextAreaElement>
	| any;
	as?: "textarea";
	rows?: number;
	required?: boolean;
}
`}
                  </CodeBlock>
                  <h3 className="mb-4">Preview</h3>
                  <Input label="Name" required />
               </div>
            </div>
            <div className="card grid-margin" id="modal">
               <div className="card-body">
                  <h3 className="mb-4">Modal</h3>
                  <CodeBlock>
                     {`
import {Modal} from 'minimalist-reactkit';

// initialize state
const [showModal, setShowModal] = useState(false)

<button onClick={() => { setShowModal(!showModal) }}>Click to show modal</button>

<Modal
   heading="React"
   show={showModal}
   hide={() => setShowModal(false)}
>
   <img src="/react.svg" alt="react" style={{ width: '300px' }} />
</Modal>
`}
                  </CodeBlock>

                  <h3 className="mb-4">Types</h3>
                  <CodeBlock>
                     {`
interface ModalProps {
	heading?: string;
	sub?: string;
	children?: React.ReactNode | Array<React.ReactNode>;
	show?: boolean;
	className?: string;
	hide: () => void;
};
`}
                  </CodeBlock>
                  <h3 className="mb-4">Preview</h3>
                  <p>Note : click outside the modal to close</p>
                  <BtnPrimary
                     onClick={() => {
                        setShowModal(!showAlert);
                     }}
                  >
                     Click to {showAlert ? "hide" : "show"} modal
                  </BtnPrimary>
                  <Modal
                     heading="React"
                     show={showModal}
                     hide={() => setShowModal(false)}
                  >
                     <img src="/react.svg" alt="react" style={{ width: "300px" }} />
                  </Modal>
               </div>
            </div>
            <div className="card grid-margin" id="otp">
               <div className="card-body">
                  <h3 className="mb-4">OTP Input</h3>
                  <CodeBlock>
                     {`
  import {OTPInput} from 'minimalist-reactkit';
  import 'minimalist-reactkit/index.css';

  const [otp, setOtp] = useState<string>('');

  const handleChange = (otp: string) => {
    setOtp(otp);
  };

  <Form onSubmit={...}> // the form tag is for validation
        <OTPInput num={8} getOTP={handleChange}/>  // by default it gives 6 otp inputs
   </Form>
`}
                  </CodeBlock>

                  <h3 className="mb-4">Types</h3>
                  <CodeBlock>
                     {`
interface OTPInputProps {
	num?: number;
   getOTP:(otp:string) => void
};
`}
                  </CodeBlock>
                  <h3 className="mb-4">Preview</h3>
                  <Form onSubmit={(e) => { e.preventDefault() }}>
                     <OTPInput num={8} />
                     <BtnPrimary >Submit</BtnPrimary>
                  </Form>
               </div>
            </div>
            <div className="card grid-margin" id="search-select">
               <div className="card-body">
                  <h3 className="mb-4">Select</h3>
                  <CodeBlock>
                     {`
import {Select} from 'minimalist-reactkit';

<Select
name="option"
label="Options"
isSearchable={true}
options={[{ label: "Option 1", value: "1" }, { label: "Option 2", value: "2" }]}
handleChange={(option: string, name: string, idx?: number | undefined) => {
   console.log(option, name, idx);
}}
/>
`}
                  </CodeBlock>

                  <h3 className="mb-4">Types</h3>
                  <CodeBlock>
                     {`
interface Props {
   idx?: number
   name: string;
   label?: string;
   options?: any[] | Option[];
   defaultValue?: Option;
   className?: string;
   isSearchable?: boolean;
   placeholder?: string;
   handleChange: (value: string, name: string, idx?: number) => void;
}

type Option = { label: any; value: any; disabled?: boolean; }

`}
                  </CodeBlock>
                  <h3 className="mb-4">Preview</h3>
                  <Select
                     name="option"
                     label="Options"
                     isSearchable={true}
                     options={[{ label: "Option 1", value: "1" }, { label: "Option 2", value: "2" }]}
                     handleChange={(option: string, name: string, idx?: number | undefined) => {
                        console.log(option, name, idx);
                     }}
                  />
               </div>
            </div>
            <div className="card grid-margin" id="toggle">
               <div className="card-body">
                  <h3 className="mb-4">Toggle</h3>
                  <CodeBlock>
                     {`
import {Toggle} from 'minimalist-reactkit';

<Toggle
   checked={isOn}
   name="switch"
   onChange={() => setIsOn(current => !current)}
   />
`}
                  </CodeBlock>

                  <h3 className="mb-4">Types</h3>
                  <CodeBlock>
                     {`
interface Props {
   checked: boolean;
   name: string;
   onChange: () => void
}

`}
                  </CodeBlock>
                  <h3 className="mb-4">Preview</h3>
                  <Toggle
                     checked={isOn}
                     name="switch"
                     onChange={() => setIsOn((current) => !current)}
                  />
               </div>
            </div>

            <div className="card grid-margin" id="tab">
               <div className="card-body">
                  <h3 className="mb-4">Tab</h3>
                  <CodeBlock>
                     {`
import {Tab} from 'minimalist-reactkit';

<Tab
   head={['Greetings', 'People', 'Exercises']}
   body={[
      <p>Welcome to the greetings tab</p>,
      <p>Welcome to the people tab</p>,
      <p>Welcome to the exercises tab</p>,
   ]}
/>
`}
                  </CodeBlock>

                  <h3 className="mb-4">Types</h3>
                  <CodeBlock>
                     {`
interface TabProps {
   head: React.ReactNode[];
   body: React.ReactNode[];
   className?: string;
   setCurrent?: (idx: number) => void
}

`}
                  </CodeBlock>
                  <h3 className="mb-4">Preview</h3>
                  <Tab
                     head={['Greetings', 'People', 'Exercises']}
                     body={[
                        <p>Welcome to the greetings tab</p>,
                        <p>Welcome to the people tab</p>,
                        <p>Welcome to the exercises tab</p>,
                     ]}
                  />
               </div>
            </div>

            <div className="card grid-margin" id="table">
               <div className="card-body">
                  <h3 className="mb-4">Table</h3>
                  <CodeBlock>
                     {`
               import {Table} from 'minimalist-reactkit';

               const headers = [
                  { name: 'Applicant Name', accessor: 'name' },
                  { name: 'Status', accessor: 'status' },
                  { name: 'Booking Id', accessor: 'flightId' },
                  { name: 'Destination', accessor: 'trip' },
                  { name: 'Date Created', accessor: 'date' },
                  { name: 'Officer', accessor: 'officer' },
                  { name: 'Action', accessor: '' }
               ];

               <Table
                  headers={headers}
                  body={[
                     { name: 'Godwin Emmanuel', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth' },
                     { name: 'Clara Kaio', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth' },
                     { name: 'Joseph Tabina', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth' },
                  ]}
               />
               `}
                  </CodeBlock>

                  <h3 className="mb-4">Table Usage 2</h3>

                  <CodeBlock>
                     {`
               import {Table} from 'minimalist-reactkit';

               const header = [
                  { name: 'Applicant Name', accessor: 'name' },
                  { name: 'Status', accessor: 'status' },
                  { name: 'Booking Id', accessor: 'flightId' },
                  { name: 'Destination', accessor: 'trip' },
                  { name: 'Date Created', accessor: 'date' },
                  { name: 'Officer', accessor: 'officer' }
               ];

               <Table
                  header={header}
                  body={[
                     { name: 'Godwin Emmanuel', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth' },
                     { name: 'Clara Kaio', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth' },
                  ]}
                  isRow={true}
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
               `}
                  </CodeBlock>

                  <h3 className="mb-4">Types</h3>
                  <CodeBlock>
                     {`
               interface TableProps {
                  header: { name: string; accessor: string }[];
                  body: any[];
                  itemsPerPage?: number;
                  className?: string
                  showFilter?: boolean;
                  style?: any
                  isRow?: boolean
                  Row?: any
                  rowProps?: any,
                  isLoading?: boolean
               }
               `}
                  </CodeBlock>
                  <h3 className="mb-4">Preview </h3>
                  {/*
                     Example usage with headers array
                  */}
                  <Table
                     header={[
                        { name: 'Applicant Name', accessor: 'name' },
                        { name: 'Status', accessor: 'status' },
                        { name: 'Booking Id', accessor: 'flightId' },
                        { name: 'Destination', accessor: 'trip' },
                        { name: 'Date Created', accessor: 'date' },
                        { name: 'Officer', accessor: 'officer' }
                     ]}
                     body={[
                        { name: 'Godwin Emmanuel', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai (DXB) - Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth' },
                        { name: 'Clara Kaio', status: <Pill text='Ongoing' className='warning' />, flightId: 'A2093845QR7', trip: 'New York (JFK) - Paris (CDG)', date: 'Sep 10, 2022, 14:00', officer: 'Sophia Wright' },
                        { name: 'Joseph Tabina', status: <Pill text='Completed' className='success' />, flightId: 'B3021943KL5', trip: 'London (LHR) - Tokyo (HND)', date: 'Jul 15, 2022, 08:45', officer: 'Michael Brown' },
                        { name: 'Alice Johnson', status: <Pill text='Cancelled' className='danger' />, flightId: 'C4019283MN8', trip: 'Los Angeles (LAX) - Sydney (SYD)', date: 'Jun 20, 2022, 22:15', officer: 'Emma Davis' },
                        { name: 'David Smith', status: <Pill text='Ongoing' className='warning' />, flightId: 'T5048392BJ9', trip: 'Berlin (BER) - Rome (FCO)', date: 'Aug 18, 2022, 11:30', officer: 'James Ruth' },
                        { name: 'Maria Lopez', status: <Pill text='Completed' className='success' />, flightId: 'D6023947OP3', trip: 'Toronto (YYZ) - Vancouver (YVR)', date: 'May 05, 2022, 16:00', officer: 'Sophia Wright' },
                        { name: 'Samuel Okafor', status: <Pill text='Ongoing' className='warning' />, flightId: 'E7038492QR2', trip: 'Johannesburg (JNB) - Nairobi (NBO)', date: 'Oct 12, 2022, 09:15', officer: 'Michael Brown' },
                        { name: 'Grace Lin', status: <Pill text='Cancelled' className='danger' />, flightId: 'F8049473TY5', trip: 'Singapore (SIN) - Kuala Lumpur (KUL)', date: 'Nov 03, 2022, 20:50', officer: 'Emma Davis' },
                        { name: 'Ethan Green', status: <Pill text='Ongoing' className='warning' />, flightId: 'G9058392WN1', trip: 'Seoul (ICN) - Beijing (PEK)', date: 'Dec 25, 2022, 13:00', officer: 'James Ruth' },
                        { name: 'Olivia Martinez', status: <Pill text='Completed' className='success' />, flightId: 'H1067384LM4', trip: 'Mumbai (BOM) - Delhi (DEL)', date: 'Jan 30, 2022, 18:30', officer: 'Sophia Wright' },
                     ]}
                  />
               </div>  </div>
            <div className="card">
               <div className="card-body">
                  <h3 id="customerSupport" className="mb-4">
                     Customer Support
                  </h3>
                  <p>
                     If you face any issue while building with Minimalist Reactkit,
                     please create a GitHub issue via{" "}
                     <a
                        href="https://github.com/miriam-samuels/minimalist-reactkit/issues"
                        target="_blank"
                     >
                        #CreateIssue
                     </a>{" "}
                     .
                  </p>
                  <p>We will respond to you as quickly as we can. Thank you!!!</p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Main;
