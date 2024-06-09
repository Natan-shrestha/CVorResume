import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: <Home />
  }
  ]
  }
])

const MyRoutes = () => {
  return <RouterProvider router={router}></RouterProvider>
}
export default MyRoutes; 