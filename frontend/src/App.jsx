
// import './App.css'
import { Routes,Route } from 'react-router-dom'
import Login from './components/login'
import Signup from './components/Signup'
import Welcome from './components/Welcome'
import Header from './components/header'

function App() {
  return (
    <div>
      
      <Header/>
      
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/user' element={<Welcome/>}/>
      </Routes>
    </div>
  )
}

export default App
