import React, { useContext } from 'react'
import landingPageImg from "../assets/images/12085316_20944142.svg"
import img1 from "../assets/images/18771503_6029655.jpg"
import img2 from "../assets/images/4167276_18771.jpg"
import img3 from "../assets/images/4951570_19963.jpg"
import "../../Style/landingpage.css"

import Button from '@mui/material/Button';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { myContext } from '../MyContext';
import Navbar from './Navbar';
const LandingPage = () => {
  const navigate = useNavigate()
  let data = useContext(myContext)
  let { isLoggedIn, setIsLoggedIn } = data
  return (
    <div>
      {/* <Navbar></Navbar> */}
      <main className='flex h-[90vh]' id='landingMain'>
        <section className='w-[59%] h-[100%] bg-[#ffffff] flex justify-center items-center' id='landingImg'><img src={img1} alt="" /></section>
        <section className='w-[41%] h-[90%] p-10 bg-[#ffffff] flex flex-col justify-around items-start' id='landingSection' >
        <div className='typewriter'>
          <h1 className='font-semibold text-3xl line title-text' id='landingH1'>
            Let create a professional CV
          </h1>
        </div>
          <p className='font-medium text-lg ' id='landingPara'>No matter if you're seeking a position as a creative lead, financial expert, or embarking on your initial internship, we offer a complimentary CV Builder that simplifies the process of crafting your CV.</p>
          <div className='w-[85%] flex justify-around' id='imgContainerButtons'>
            <Button id='getButton' variant="contained" color='success' className='w-52' onClick={
              () => {
                navigate("/home")
                setIsLoggedIn(!isLoggedIn)
              }}>Get Started Now!</Button>
            <Button variant="contained" color='secondary' className='w-40' id='learnButton'>Learn More</Button>
          </div>
        </section>
      </main>
      {<Outlet />}
    </div >
  )
}
export default LandingPage