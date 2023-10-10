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
   handleChange: (value: string, name: string, idx?: number) => void;
}

type Option = { label: any; value: any; disabled?: boolean; }

function SearchSelect(props: Props) {
   const { idx, label, name, options, defaultValue, className, handleChange: change } = props;
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
            <div className={`select-input ${className}`} onClick={toggleSelect}>
               {label && <label className='select-input_label'>{label}</label>}
               <div className='select-input_field'>
                  <input type="text" defaultValue={value?.label} placeholder='' onChange={handleSearch} />
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

export default SearchSelect
