import React,{ Fragment, ReactNode } from 'react'
import './index.scss'


export interface PickerProps {
   options: OptionProps[]
   setOptions: any;
   type?: 'multi' | 'single'
}

export interface OptionProps {
   id?: string | number
   content: ReactNode;
   checked: boolean;
   disabled?: boolean
}
function Picker({ options, type = 'multi', setOptions }: PickerProps) {

   const handleSelect = (idx: number, option: OptionProps) => {
      if (option.disabled) {
         return
      }
      const newData = options.map((option, index) => {
         // unselect all selected so only one will be selected
         if (type === 'single') {
            option.checked = false
         }

         // select the one picked
         if (index === idx) {
            option.checked = !option?.checked
         }
         return option
      })

      setOptions(newData)
   }
   return (
      <Fragment>
         {
            options?.map((option: OptionProps, idx: number) => (
               <div className='picks' onClick={() => handleSelect(idx, option)}  key={idx}>
                  <PickerMain key={idx} option={option} />
               </div>
            ))
         }
      </Fragment>
   )
}

export default Picker

// handle state by yourself
export const PickerMain = ({ option, onClick }: { option: OptionProps, onClick?: any }) => {
   return (
      <div id='picker' className='picker' onClick={onClick}>
         <div className={`picker-item ${option.checked ? 'picker-active' : 'picker-inactive'}`}>
            <div>{option.content}</div>
            <span className='material-icons'>check_circle</span>
         </div>
      </div>
   )
}