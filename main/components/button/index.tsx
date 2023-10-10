import React from 'react'
import './index.scss'

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
   onClick?:
   | ((event?: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>)
   | undefined | any;
   children?: React.ReactNode | Array<React.ReactNode>;
}

export const BtnPrimary: React.FC<ButtonProps> = ({ className, ...props }) => {
   return (
      <button className={`btn btn-primary ${className} `} {...props}>
         {props.children}
      </button>
   )
}

export const BtnSecondary: React.FC<ButtonProps> = ({ className, ...props }) => {
   return (
      <button className={`btn btn-secondary ${className} `} {...props}>
         {props.children}
      </button>
   )
}
