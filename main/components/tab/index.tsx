import React, { useState } from 'react'
import './index.scss'


// PLEASE ENSURE THAT THE INDEX OF HEAD MATCHES THE INDEX OF ITS BODY
export interface TabProps {
   head: React.ReactNode[];
   body: React.ReactNode[];
   className?: string;
   direction?: string;
}
function Tab({ head, body, className, direction = 'horizontal' }: TabProps) {
   const [tab, setTab] = useState(0)

   return (
      <div id='tab'>
         <div className={`tab ${className && className} ${direction}`}>
            <div className='tab-heading'>
               {
                  head.map((item: React.ReactNode, idx: number) => (
                     <div key={idx} className={`tab-item ${tab === idx && 'active'}`} onClick={() => setTab(idx)}>
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
