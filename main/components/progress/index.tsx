import React from 'react'
import './index.scss'

export interface ProgressProps {
   start: number;
   steps: StepProps[];
   height?: string
}

export interface StepProps {
   label: string;
   check: boolean;
   link?: string;
}
export function ProgressHorizontal({ steps }: ProgressProps) {
// start
   return (
      <div id='progress'>
         <div className='horizontal progress '>
            {
               steps?.map((step: StepProps, idx: number) =>
                  idx !== (steps.length - 1) ?
                     <div className='progress-step' key={idx}>
                        <a>
                           <hr />
                           <button>  {idx + 1}</button>
                        </a>
                        <span>{step.label}</span>
                     </div> :
                     <div className='progress-step' key={idx}>
                        <a>
                           <button>{idx + 1}</button>
                        </a>
                        <span>{step.label}</span>
                     </div>
               )
            }
         </div>
      </div>

   )
}

export function ProgressVertical({ steps, height }: ProgressProps) {
// start
   return (
      <div id='progress'>
         <div className=' vertical progress'>
            {
               steps?.map((step: StepProps, idx: number) =>
                  idx !== (steps.length - 1) ?
                     <div className='progress-step' key={idx}>
                        <a>
                           <div>
                              <button>  {idx + 1}</button>
                              <hr style={{ height }} />
                           </div>
                           <span>{step.label}</span>
                        </a>
                     </div> :
                     <div className='progress-step' key={idx}>
                        <a>
                           <div>
                              <button>{idx + 1}</button>
                           </div>
                           <span>{step.label}</span>
                        </a>
                     </div>
               )
            }
         </div>
      </div>

   )
}


