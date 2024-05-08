import React from 'react';
import './index.scss'


export interface ToggleProps {
   checked: boolean;
   name: string;
   onChange: () => void
   color?: string
}

export function Toggle(props: ToggleProps) {
   const { checked, name, onChange } = props
   return (
      <div className='toggle-con'>
         <span className='toggle-btn'></span>
         <input type="checkbox" className="toggle" checked={checked} onChange={onChange} name={name} />
      </div>
   )
}
