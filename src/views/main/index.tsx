

import { useState } from "react";
import Accordion from "../../components/accordion";
import Alert from "../../components/alert";
import CodeBlock from "../../components/code-block";
import { accordionItems } from "../../variables";
import { BtnPrimary, BtnSecondary } from "../../components/button";
import InputField from "../../components/inputfield";
import Modal from "../../components/modal";
import Select from "../../components/select";
import Toggle from "../../components/toggle";
import Tab from "../../components/tab";
import Table from "../../components/table";
import Pill from "../../components/pill";
import Form from "../../components/form";

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
            <div className="card grid-margin" id="alert">
               <div className="card-body">
                  <h3 className="mb-4">Alert</h3>
                  <CodeBlock>
                     {`
import {Alert} from 'minimalist-reactkit';

<Alert
   text = "Hello World" 
   className = "info"
/>
`}
                  </CodeBlock>

                  <h3 className="mb-4">Types</h3>
                  <CodeBlock>
                     {`
type AlertProps = {
   className?: string; // danger, info, warning, success
   text: string;
   show: boolean;
   hide?: () => void;
}
`}
                  </CodeBlock>
                  <h3 className="mb-4">Preview</h3>
                  <BtnPrimary
                     onClick={() => {
                        setShowAlert(!showAlert);
                     }}
                  >
                     Click to {showAlert ? "hide" : "show"} alert
                  </BtnPrimary>
                  <Alert text="Hello World" show={showAlert} className="info" />
               </div>
            </div>
            <div className="card grid-margin" id="button">
               <div className="card-body">
                  <h3 className="mb-4">Button</h3>
                  <CodeBlock>
                     {`
import {BtnPrimary, BtnSecondary, BtnTetiary, BtnAlternate} from 'minimalist-reactkit';

<BtnPrimary className="btn-success">Click Me</BtnPrimary>
<BtnPrimary className="btn-info">Click Me</BtnPrimary>
<BtnPrimary className="btn-danger">Click Me</BtnPrimary>
<BtnPrimary className="btn-warning">Click Me</BtnPrimary>

<BtnSecondary className="btn-success">Click Me</BtnSecondary>
<BtnSecondary className="btn-info">Click Me</BtnSecondary>
<BtnSecondary className="btn-danger">Click Me</BtnSecondary>
<BtnSecondary className="btn-warning">Click Me</BtnSecondary>
`}
                  </CodeBlock>

                  <h3 className="mb-4">Types</h3>
                  <CodeBlock>
                     {`
interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
   onClick?:
   | ((event?: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>)
   | undefined | any;
   children?: React.ReactNode | Array<React.ReactNode>;
}
`}
                  </CodeBlock>
                  <h3 className="mb-4">Preview</h3>
                  <div className="flex-2">
                     <BtnPrimary className="btn-success">Click Me</BtnPrimary>
                     <BtnPrimary className="btn-info">Click Me</BtnPrimary>
                     <BtnPrimary className="btn-danger">Click Me</BtnPrimary>
                     <BtnPrimary className="btn-warning">Click Me</BtnPrimary>
                  </div>

                  <br />
                  <br />
                  <div className="flex-2">
                     <BtnSecondary className="btn-success">Click Me</BtnSecondary>
                     <BtnSecondary className="btn-info">Click Me</BtnSecondary>
                     <BtnSecondary className="btn-danger">Click Me</BtnSecondary>
                     <BtnSecondary className="btn-warning">Click Me</BtnSecondary>
                  </div>
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
                     /> <br/>
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

<InputField
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
                  <InputField label="Name" required />
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
            <div className="card grid-margin" id="select">
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

<Table
   head={['Applicant Name', 'Status', 'Booking Id', 'Destination', 'Date Created', 'Officer', 'Action']}
   accessor={['name', 'status', 'flightId', 'trip', 'date', 'officer', '']}
   body={[
      { name: 'Godwin Emmanuel', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth', action: <a>View</a> },
      { name: 'Clara Kaio', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth', action: <a>View</a> },
      { name: 'Joseph Tabina', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth', action: <a>View</a> },
   ]}
/>
`}
                  </CodeBlock>

                  <h3 className="mb-4">Table Usage 2</h3>

                  <CodeBlock>
                     {`
import {Table} from 'minimalist-reactkit';

const tableData = [
   { name: 'Godwin Emmanuel', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth', action: <a>View</a> },
   { name: 'Clara Kaio', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth', action: <a>View</a> },
   { name: 'Joseph Tabina', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth', action: <a>View</a> },
]

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
`}
                  </CodeBlock>

                  <h3 className="mb-4">Types</h3>
                  <CodeBlock>
                     {`
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

`}
                  </CodeBlock>
                  <h3 className="mb-4">Preview </h3>
                  <Table
                     head={['Applicant Name', 'Status', 'Booking Id', 'Destination', 'Date Created', 'Officer', 'Action']}
                     accessor={['name', 'status', 'flightId', 'trip', 'date', 'officer', '']}
                     body={[
                        { name: 'Godwin Emmanuel', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth', action: <a>View</a> },
                        { name: 'Clara Kaio', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth', action: <a>View</a> },
                        { name: 'Joseph Tabina', status: <Pill text='Ongoing' className='warning' />, flightId: 'T2089392BJ9', trip: 'Dubai  (DXB) -  Lagos (LOS)', date: 'Aug 05, 2022, 18:30', officer: 'James Ruth', action: <a>View</a> },
                     ]}
                  />
               </div>
            </div>
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
