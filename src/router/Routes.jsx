import { createBrowserRouter } from "react-router";
import Roots from "../Roots";
import Home from "../Pages/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import UserDashboard from "../dashboard/userdasboard/UserDashboard";
import AdminDashboard from "../dashboard/Admin dashboard/AdminDashboard";
import VendorDashboard from "../dashboard/Vender dashboard/VendorDashboard";
import PrivateRoute from "./Privaterouter";
import UserProfile from "../dashboard/userdasboard/userrouter/UserProfile";
import Rightbar from "../dashboard/userdasboard/userrouter/Rightbar";
import Booked from "../dashboard/userdasboard/userrouter/Booked";
import Transection from "../dashboard/userdasboard/userrouter/Transection";
import Setting from "../dashboard/userdasboard/userrouter/Setting";

export const router= createBrowserRouter([
  {
    path:'/',
    element:<Roots></Roots>,
    children:[{
      path:'/',
      index:true,
      element:<Home/>

    },

    // users

    {
      path: "/dashboard/user",
      element:<PrivateRoute><UserDashboard></UserDashboard></PrivateRoute>,
      children:[{
        index:true,
        path:"/dashboard/user/home",
        element:<PrivateRoute><Rightbar/></PrivateRoute>
      },
      {
        path:'/dashboard/user/profile',
        element:<PrivateRoute><UserProfile/></PrivateRoute>
      },
    {
      path:'/dashboard/user/booked-tickets',
      element:<PrivateRoute><Booked/></PrivateRoute>
    },
  {
  path:'/dashboard/user/transactions',
  element:<PrivateRoute><Transection></Transection></PrivateRoute>
  },
{
  path:'/dashboard/user/settings',
  element:<PrivateRoute><Setting/></PrivateRoute>
}]

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