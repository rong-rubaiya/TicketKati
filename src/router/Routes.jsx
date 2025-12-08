import { createBrowserRouter } from "react-router";
import Roots from "../Roots";
import Home from "../Pages/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

export const router= createBrowserRouter([
  {
    path:'/',
    element:<Roots></Roots>,
    children:[{
      path:'/',
      index:true,
      element:<Home/>

    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/>
    }
  ]
    


}])