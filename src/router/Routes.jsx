import { createBrowserRouter } from "react-router";
import Roots from "../Roots";
import Home from "../Pages/Home";

export const router= createBrowserRouter([
  {
    path:'/',
    element:<Roots></Roots>,
    children:[{
      path:'/',
      index:true,
      element:<Home/>

    },
  ]
    


}])