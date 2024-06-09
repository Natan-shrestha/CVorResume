import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { myContext } from '../MyContext';
import logo from "../assets/images/Logo.png"

const Navbar = () => {
  const navigate = useNavigate()
  let handleLogo = () => {
    navigate("/")
    setIsLoggedIn(!isLoggedIn)
  }
  let data = useContext(myContext)
  // console.log(data);
  let { isLoggedIn, setIsLoggedIn } = data
  return (
    <div>
      <header className='w-[100%] h-[10vh] bg-[#ffffff]'>
        <nav className='flex' id='navbarMain'>
          <section className='w-[20%] h-[10vh] flex items-center justify-center'>
            <img src={logo} alt="" width="100px" style={{marginRight: '10px'}} /> 
            <Button onClick={handleLogo}>Hamro CV Creation</Button>
          </section>
        </nav>
      </header>
      {<Outlet />}
    </div>
  )
}

export default Navbar
