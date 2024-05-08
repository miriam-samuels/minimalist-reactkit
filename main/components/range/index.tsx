import React from 'react'
import './index.scss'


export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
   disabled?: boolean;
   label?: string;
   name?: string;
   double?: boolean;
}
export const DoubleRange: React.FC<Props> = ({ className = '', label, name, min = 0, max = 100, defaultValue = 25, double, ...props }) => {
   return (
      <div id='range'>
         <div className='range'>
            <div className="range-slider">
               <span className="range-selected"></span>
            </div>
            <div className='range_input'>
               <input
                  type='range'
                  className={className}
                  min={min}
                  max={max}
                  defaultValue={30}
                  {...props}
               />
               {
                  double &&
                  <input
                     type='range'
                     className={className}
                     min={min}
                     max={max}
                     defaultValue={70}
                     {...props}
                  />
               }

            </div>
            {/* <div className="range-price">
               <label htmlFor="min">Min</label>
               <input type="number" name="min" value="300" />
               <label htmlFor="max">Max</label>
               <input type="number" name="max" value="700" />
            </div> */}
         </div>

      </div>
   )
}
