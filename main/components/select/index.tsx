/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from 'react'
import useClose from '../../hooks/useClose'
import './index.scss'

export interface SelectProps {
   idx?: number
   name: string;
   label?: string;
   options?: Option[];
   value?: Option;
   className?: string;
   isSearchable?: boolean;
   placeholder?: string;
   isMulti?: boolean;
   handleChange: (value: any, name: string, idx?: number) => void;
}

export type Option = { label: any; value: any; disabled?: boolean; }

export function Select(props: SelectProps) {
   const { idx, label, name, options, value: val, className, isSearchable, placeholder, handleChange: change, isMulti } = props;
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [value, setValue] = useState<Option | undefined>(val);
   const [filteredOptions, setFilteredOptions] = useState<Option[] | undefined>(options);
   const ref = useClose(() => setIsOpen(false))

   //  for is multi
   const [values, setValues] = useState<Option[]>([]);

   const toggleSelect = () => setIsOpen(!isOpen);

   const removeValidation = () => {
      // validation remove
      const el = ref.current?.querySelector('[data-mtk-input]')

      el.classList.remove('invalid')

      if (el.nextElementSibling?.classList.contains('input-error')) el.nextElementSibling.remove()
   }

   const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      const val = { label: e.target.value, value: e.target.value }
      setValue(val)
      change(val.value, name, idx);
      setFilteredOptions(options?.filter((op: Option) => op.label.toLowerCase().includes(e.target.value?.toLowerCase())));
      if (!isOpen) setIsOpen(true)
   }

   const setOption = (option: Option) => {
      setValue(option);
      change(option.value, name, idx);
      setIsOpen(false);

      removeValidation()
   };

   const setMultiOption = (option: Option) => {
      if (values?.find((v) => v.value === option.value)) {
         return
      }
      setValues([...values, option])
      const v = values?.map((v) => v.value)
      change(v, name, idx);
      setIsOpen(false);

      removeValidation()
   }

   const clearItem = (val: Option) => {
      setValues(() => values.filter(v => v.value != val.value))
   }


   return (
      <div ref={ref} id='select'>
         <div className='select'>
            <div className='select-input' onClick={toggleSelect}>
               {label && <label className='select-input_label'>{label}</label>}
               <div className='select-input_field'>
                  {
                     isMulti ?
                        <div className='select-input_field-multi'>
                           {
                              values?.map((val: Option) => (
                                 <div className='selected-item'>
                                    {val.label?.length > 15 ? (val.label).split(' ')[0] : val.label.split('(')[0]}
                                    <button type='button' className='clear-item' onClick={() => clearItem(val)}>x</button>
                                 </div>
                              ))
                           }
                        </div> :
                        <input type="text" className={className} defaultValue={value?.label || ''} placeholder={placeholder} readOnly={!isSearchable} onChange={handleSearch} data-mtk-input={true} />
                  }
                  <span>
                     <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0522 2.34787L7.42725 7.97287C7.34886 8.05153 7.25571 8.11394 7.15315 8.15653C7.0506 8.19911 6.94064 8.22104 6.82959 8.22104C6.71854 8.22104 6.60858 8.19911 6.50602 8.15653C6.40346 8.11394 6.31032 8.05153 6.23193 7.97287L0.606932 2.34787C0.448424 2.18936 0.359375 1.97438 0.359375 1.75021C0.359375 1.52605 0.448424 1.31107 0.606932 1.15256C0.765441 0.994049 0.980424 0.905 1.20459 0.905C1.42875 0.905 1.64374 0.994049 1.80224 1.15256L6.83029 6.1806L11.8583 1.15185C12.0168 0.993346 12.2318 0.904297 12.456 0.904297C12.6802 0.904297 12.8951 0.993346 13.0536 1.15185C13.2122 1.31036 13.3012 1.52535 13.3012 1.74951C13.3012 1.97368 13.2122 2.18866 13.0536 2.34717L13.0522 2.34787Z" fill="#1E1E1E" />
                     </svg>
                  </span>
               </div>
            </div>
            <div className='select-list_con'>
               {isOpen && (
                  <ul className='select-list' id="select">
                     {
                        (isMulti) &&
                        <input type="text" placeholder='Search' value={value?.label || ''} onChange={handleSearch} />
                     }

                     {filteredOptions?.map((option: Option, index: number) => (
                        <li
                           className='select-list_item'
                           key={index}
                           onClick={() => {
                              if (!option.disabled) {
                                 if (isMulti) setMultiOption(option)
                                 else setOption(option);
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

