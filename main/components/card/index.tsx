import React from 'react'
import './index.scss'

export function Card({ children, heading, className }: { children: React.ReactNode; heading?:string, className?:string }) {
  return (
    <div id='card' className={`${className && className}`}>
      <div className='card'>
        {heading &&  <h1 className='card-heading'>{heading}</h1>}
      {children}
      </div>
    </div>
  )
}