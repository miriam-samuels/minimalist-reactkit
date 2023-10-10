import { ReactNode, useState } from 'react'
import './index.scss'
function CodeBlock({ children }: { children: ReactNode }) {
   const [isCopied, setIsCopied] = useState(false)

   const copyText = () => {
      navigator?.clipboard.writeText(`${children}`)
      setIsCopied(true)
      setTimeout(() => {
         setIsCopied(false)
      }, 2000);
   }
   return (
      <div className='code-block'>
         <button className='copy' onClick={copyText}>
            <span>{isCopied ? 'copied' : 'copy'}</span>
         </button>
         <pre>
            <code>
               {children}
            </code>
         </pre>
      </div>

   )
}

export default CodeBlock