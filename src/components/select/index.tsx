import {  useState } from 'react'
import useClose from '../../hooks/useClose'
import './index.scss'


interface Props {
   idx?: number
   name: string;
   label?: string;
   options?: any[] | Option[];
   defaultValue?: Option;
   className?: string;
   showWarning?: boolean;
   handleChange: (option: string, name: string, idx?: number) => void;
   // children?: React.ReactNode | React.ReactNode[];
}

type Option = { label: any; value: any; disabled?: boolean; clickable?: boolean }

function Select(props: Props) {
   const { idx, label, name, options, defaultValue, className, showWarning, handleChange: change } = props;
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [value, setValue] = useState<Option | undefined>(defaultValue);
   const ref: any = useClose(() => setIsOpen(false))

   const toggleSelect = () => setIsOpen(!isOpen);

   const setOption = (option: Option) => {
      change(option.value, name, idx);
      if (option.clickable === false) {
         setValue({ ...option, label: option.value, value: option.value });
      } else {
         setValue(option);
         setIsOpen(false);
      }
   };


   return (
      <div ref={ref} id='select'>
         <div className='select'>
            <div className={`select-input ${className}`} onClick={toggleSelect} style={showWarning ? { borderColor: 'red' } : {}}>
               {label && <label className='select-input_label'>{label}</label>}
               <div className='select-input_field'>
                  {value?.label}
                  <span className='material-icons'>arrow_drop_down</span>
               </div>
            </div>
            <div className='select-list_con'>
               {isOpen && (
                  <ul className='select-list' id="select">
                     {options?.map((option: Option, index: number) => (
                        <li
                           className='select-list_item'
                           key={index}
                           onClick={() => {
                              if (!option.disabled) setOption(option);
                           }}
                           style={{ opacity: `${option.disabled ? 0.5 : 1}` }}
                        >
                           {option?.label}
                        </li>
                     ))}
                  </ul>
               )}
            </div>
         </div>
      </div>
   )
}

export default Select
