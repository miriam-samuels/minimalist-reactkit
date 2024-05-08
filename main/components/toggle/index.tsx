import React from 'react';
import './index.scss'


interface Props {
   checked: boolean;
   name: string;
   onChange: () => void
   color?: string
}

function Toggle(props: Props) {
   const { checked, name, onChange } = props
   return (
      <div className='toggle-con'>
         <span className='toggle-btn'></span>
         <input type="checkbox" className="toggle" checked={checked} onChange={onChange} name={name} />
      </div>
   )
}

export default Toggle  