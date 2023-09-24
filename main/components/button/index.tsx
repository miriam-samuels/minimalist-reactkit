import React from 'react'
import './index.scss'

type Props = {
   className?: string | null;
   loading?: boolean | null;
   type?: "button" | "submit" | "reset" | undefined;
   disabled?: boolean;
   onClick?:
   | ((event?: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>)
   | undefined | any;
   children?: React.ReactNode | Array<React.ReactNode>;
   id?: string
}
export const Btn: React.FC<Props> = ({ className, ...props }) => {
   return (
      <button className={`btn ${className} `} {...props}>
         {props.children}
      </button>
   )
}

export const BtnPrimary: React.FC<Props> = ({ className, ...props }) => {
   return (
      <button className={`btn btn-primary ${className} `} {...props}>
         {props.children}
      </button>
   )
}

export const BtnSecondary: React.FC<Props> = ({ className, ...props }) => {
   return (
      <button className={`btn btn-secondary ${className} `} {...props}>
         {props.children}
      </button>
   )
}


export const BtnTetiary: React.FC<Props> = ({ className, ...props }) => {
   return (
      <button className={`btn btn-tetiary ${className} `} {...props}>
         {props.children}
      </button>
   )
}


export const BtnAlternate: React.FC<Props> = ({ className, ...props }) => {
   return (
      <button className={`btn btn-alternate ${className} `} {...props}>
         {props.children}
      </button>
   )
}