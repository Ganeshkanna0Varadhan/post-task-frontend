import './App.css'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='text-red-500 bg-red-200'>
      <Header/>
      <div>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
