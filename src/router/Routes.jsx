import { createBrowserRouter } from "react-router";
import Roots from "../Roots";
import Home from "../Pages/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import UserDashboard from "../dashboard/userdasboard/UserDashboard";
import AdminDashboard from "../dashboard/Admin dashboard/AdminDashboard";
import VendorDashboard from "../dashboard/Vender dashboard/VendorDashboard";
import PrivateRoute from "./Privaterouter";

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
      path: "/dashboard/user",
      element:<PrivateRoute><UserDashboard></UserDashboard></PrivateRoute>

    },
    {
      path: "/dashboard/admin",
      element:<AdminDashboard></AdminDashboard>

    },

    {
      path: "/dashboard/vendor",
      element:<PrivateRoute>
        <VendorDashboard/>
      </PrivateRoute>

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