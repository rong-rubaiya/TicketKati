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
import VendorProfile from "../dashboard/Vender dashboard/route/VendorProfile";
import AddTicket from "../dashboard/Vender dashboard/route/AddTicket";
import MyAddedTickets from "../dashboard/Vender dashboard/route/MyAddedTickets";
import RequestedBookings from "../dashboard/Vender dashboard/route/RequestedBookings";
import RevenueOverview from "../dashboard/Vender dashboard/route/RevenueOverview";
import AdminProfile from "../dashboard/Admin dashboard/route/AdminProfile";
import ManageTickets from "../dashboard/Admin dashboard/route/ManageTickets";
import ManageUsers from "../dashboard/Admin dashboard/route/ManageUsers";
import Advertise from "../Component/home/Advertise";
import AdvertiseTickets from "../dashboard/Admin dashboard/route/AdvertiseTickets";
import AllTickets from "../Pages/AllTickets";
import Review from "../Pages/Review";
import About from "../Pages/About";

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
      element:<AdminDashboard></AdminDashboard>,
      children:[{
        path:'/dashboard/admin/profile',
        element:<AdminProfile/>
      },{
        path:'/dashboard/admin/manage-tickets',
        element:<ManageTickets/>
      },
    {
      path:"/dashboard/admin/manage-users",
      element:<ManageUsers/>
    },
  {
    path:"/dashboard/admin/advertise-tickets",
    element:<AdvertiseTickets/>
  }]

    },

    {
      path: "/dashboard/vendor",
      element:<PrivateRoute>
        <VendorDashboard/>
      </PrivateRoute>,
      children:[{
        path:'/dashboard/vendor/profile',
        element:<VendorProfile></VendorProfile>
      },
    {
      path:'/dashboard/vendor/add-ticket',
      element:<AddTicket></AddTicket>
    },{
      path:'/dashboard/vendor/my-tickets',
      element:<MyAddedTickets/>
    },{
      path:'/dashboard/vendor/requests',
      element:<RequestedBookings/>
    },
  {
    path:'/dashboard/vendor/revenue',
    element:<RevenueOverview/>
  }]

    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/>
    },{
      path:'/tickets',
      element:<AllTickets></AllTickets>
    },
    {
      path:'/reviews',
      element:<Review/>
    },{
      path:'/about',
      element:<About></About>
    }
  ]
    


}])