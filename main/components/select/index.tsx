import React, { useState } from 'react'
import useClose from '../../hooks/useClose'
import './index.scss'

export interface SelectProps {
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

export type Option = { label: any; value: any; disabled?: boolean; }

export function Select(props: SelectProps) {
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

      // validation remove
      const el: any = ref.current?.querySelector('[data-mtk-input]')

      el.classList.remove('invalid')

      if (el.nextElementSibling?.classList.contains('input-error')) el.nextElementSibling.remove()
   };

   const handleSearch = (e: any) => {
      const val = { label: e.target.value, value: e.target.value }
      setValue(val)
      change(val.value, name, idx);
      setFilteredOptions(options?.filter((op: Option) => op.label.toLowerCase().includes(e.target.value?.toLowerCase())));
      if (!isOpen) setIsOpen(true)
   }
   return (
      <div ref={ref} id='select'>
         <div className='select'>
            <div className='select-input' onClick={toggleSelect}>
               {label && <label className='select-input_label'>{label}</label>}
               <div className='select-input_field'>

                  <input type="text" className={className} defaultValue={value?.label} placeholder={placeholder} readOnly={!isSearchable} onChange={handleSearch} data-mtk-input={true} />
                  <span>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
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

