import React, { useState } from 'react'
import './index.scss'

// PLEASE ENSURE THAT THE INDEX OF HEAD MATCHES THE INDEX OF ITS BODY
export interface TabProps {
   head: React.ReactNode[];
   body: React.ReactNode[];
   className?: string;
   setCurrent?: (idx: number) => void
}
function Tab({ head, body, className, setCurrent }: TabProps) {
   const [tab, setTab] = useState(0)

   const handleTab = (idx: number) => {
      setTab(idx)
      if (setCurrent) {
         setCurrent(idx)
      }
   }

   return (
      <div id='tab'>
         <div className={`tab ${className && className}`}>
            <div className='tab-heading'>
               {
                  head.map((item: React.ReactNode, idx: number) => (
                     <div key={idx} className={`tab-item ${tab === idx && 'active'}`} onClick={() => handleTab(idx)}>
                        {item}
                     </div>
                  ))
               }
            </div>
            <div className='tab-content'>
               {body?.length > 0 && body[tab]}
            </div>
         </div>
      </div>
   )
}

export default Tab