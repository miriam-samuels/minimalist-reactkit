import React, { HTMLInputTypeAttribute } from 'react';
import './index.scss'


export interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
   checked: boolean;
   name: string;
   onChange: () => void
}

export function Toggle(props: ToggleProps) {
   const { checked, name, onChange } = props
   return (
      <div className='toggle-con'>
         <span className='toggle-btn'></span>
         <input  {...props} type="checkbox" className="toggle" checked={checked} onChange={onChange} name={name}/>
      </div>
   )
}
