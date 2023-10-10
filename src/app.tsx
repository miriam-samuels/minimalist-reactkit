import Sidebar from './components/sidebar'
import Main from './views/main'
import './App.css'
import './styles/index.scss'
function App() {
  return (
    <>
      <div className="container-fluid documentation">
        <Sidebar />
        <Main />
      </div>
    </>
  )
}

export default App
