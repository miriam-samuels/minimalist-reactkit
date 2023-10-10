import { Dispatch, Fragment, ReactNode, SetStateAction, useState } from 'react'

import './index.scss'
// if you don't want to pass an array just can call the AccordionMain component for each  item
// but you'd create the state yourself in the parent component 
//  then pass it as isOpen and setIsOpen

export type AccordionItem = {
   id: string | number;
   heading: ReactNode;
   body: ReactNode;
}
function Accordion({ item, controls, icon, alwaysOpen }: { item: AccordionItem[], controls?: boolean, icon?: ReactNode, alwaysOpen?: boolean }) {
   const [isOpen, setIsOpen] = useState<number | string>(0)
   return (
      <div id='accordion'>
         {/* if you pass an array of objects  */}
         {
            Array.isArray(item) && item?.map((item: AccordionItem, idx: number) => (
               <AccordionMain key={idx} item={item} isOpen={isOpen} setIsOpen={setIsOpen} controls={controls} icon={icon} alwaysOpen={alwaysOpen} />
            ))
         }

      </div>
   )
}

export default Accordion

type AccordionProps = {
   item: AccordionItem;
   isOpen?: string | number;
   setIsOpen: Dispatch<SetStateAction<string | number>> | void
   controls?: boolean;
   icon?: ReactNode
   alwaysOpen?: boolean;
}
export const AccordionMain = (props: AccordionProps) => {
   const { item, isOpen, setIsOpen, controls = true, icon, alwaysOpen = false } = props

   const changeTab = (id: string | number) => {
      if (isOpen === id && setIsOpen) {
         setIsOpen(-1)
      } else if (isOpen !== id && setIsOpen) {
         setIsOpen(id)
      }
   }
   return (
      <div className='accordion' >
         <span onClick={() => changeTab(item.id)} className='accordion-heading'>
            <span>{item.heading}</span>
            {
               controls && (
                  <span className='accordion-indicator'>
                     {
                        icon ? icon :
                           <Fragment>
                              {isOpen !== item.id ? <span className="material-icons">show</span> : <span className="material-icons-outlined">hide</span>}
                           </Fragment>
                     }
                  </span>
               )
            }
         </span>
         {
            (alwaysOpen ? isOpen !== item.id : isOpen === item.id) &&
            <div className='accordion-body'>
               {item.body}
            </div>
         }

      </div>
   )
}

