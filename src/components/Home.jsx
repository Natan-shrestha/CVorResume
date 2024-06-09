import React, { useRef } from 'react'
import HomeLeft from './HomeLeft'
import HomeRight from "./HomeRight"
const Home = () => {
  const resumeRef = useRef(null);

  return (
    <div className='flex h-[90vh] p-3' id='home'>

      <HomeLeft ref={resumeRef}></HomeLeft>
      <HomeRight ref={resumeRef}></HomeRight>
    </div>
  )
}

export default Home