import { useState } from 'react'
import useClose from '../../hooks/useClose'
import './index.scss'

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

function Select(props: Props) {
   const { idx, label, name, options, defaultValue, className, isSearchable, placeholder, handleChange: change } = props;
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [value, setValue] = useState<Option | undefined>(defaultValue);
   const [filteredOptions, setFilteredOptions] = useState<Option[] | undefined>(options);
   const ref: any = useClose(() => setIsOpen(false))

   const toggleSelect = () => setIsOpen(!isOpen);

   const setOption = (option: Option) => {
      setValue(option);
      change(option.value, name, idx);
      setIsOpen(false);
   };

   const handleSearch = (e: any) => {
      const val = e.target.value
      setFilteredOptions(options?.filter((op: Option) => op.label.toLowerCase().includes(val?.toLowerCase())))
   }
   return (
      <div ref={ref} id='select'>
         <div className='select'>
            <div className='select-input' onClick={toggleSelect}>
               {label && <label className='select-input_label'>{label}</label>}
               <div className='select-input_field'>
                  <input type="text" className={className} defaultValue={value?.label} placeholder={placeholder} readOnly={!isSearchable} onChange={handleSearch} />
                  <span>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                     </svg>
                  </span>
               </div>
            </div>
            <div className='select-list_con'>
               {isOpen && (
                  <ul className='select-list' id="select">
                     {filteredOptions?.map((option: Option, index: number) => (
                        <li
                           className='select-list_item'
                           key={index}
                           onClick={() => {
                              if (!option.disabled) {
                                 setOption(option);
                              }
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
