import React from 'react'
import MyRoutes from './MyRoutes';
import MyContext, { myContext } from './MyContext';
const App = () => {
  return (
    <MyContext>
      <MyRoutes></MyRoutes>
    </MyContext>
  )
}

export default App