import './App.css'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Header/>
      <div className='h-[84vh]'>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
