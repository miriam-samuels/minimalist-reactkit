import './index.scss'


interface Props {
   checked: boolean;
   name: string;
   change: () => void
}

function Toggle(props: Props) {
   const { checked, name, change } = props
   return (
      <div>
         <input type="checkbox" className="toggle" checked={checked} onChange={change} name={name} />
      </div>
   )
}

export default Toggle