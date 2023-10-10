import './index.scss'

export type AlertProps = {
   className?: string;
   text: string;
   show: boolean;
   hide?: () => void;
}
function Alert(props: AlertProps) {
   const { className, text, show } = props;
   if(show){
      return (
         <div className={`alert ${className ? className : 'default'}`}>
            {text}
         </div>
      )
   } else return <></>
  
}

export default Alert