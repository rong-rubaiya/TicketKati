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
import Contact from "../Pages/Contact";
import Faq from "../Pages/Faq";
import Blog from "../Pages/Blog";
import Chat from "../Pages/Chat";
import Subscription from "../Pages/Subscription";
import Terms from "../Pages/Terms";
import SingleTickets from "../Pages/SingleTickets";
import SuccessPayment from "../dashboard/userdasboard/userrouter/SuccessPayment";
import Error from "../Shared/Error";

export const router= createBrowserRouter([
  {
    path:'/',
    element:<Roots></Roots>,
    errorElement:<Error></Error>,
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
    },{
      path:"/dashboard/user/booked-tickets-success",
      element:<SuccessPayment></SuccessPayment>
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
      element:<PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>,
      children:[{
        path:'/dashboard/admin/profile',
        element:<PrivateRoute><AdminProfile/></PrivateRoute>
      },{
        path:'/dashboard/admin/manage-tickets',
        element:<PrivateRoute><ManageTickets/></PrivateRoute>
      },
    {
      path:"/dashboard/admin/manage-users",
      element:<PrivateRoute><ManageUsers/></PrivateRoute>
    },
  {
    path:"/dashboard/admin/advertise-tickets",
    element:<PrivateRoute><AdvertiseTickets/></PrivateRoute>
  }]

    },

    {
      path: "/dashboard/vendor",
      element:<PrivateRoute>
        <VendorDashboard/>
      </PrivateRoute>,
      children:[{
        path:'/dashboard/vendor/profile',
        element:<PrivateRoute><VendorProfile></VendorProfile></PrivateRoute>
      },
    {
      path:'/dashboard/vendor/add-ticket',
      element:<PrivateRoute><AddTicket></AddTicket></PrivateRoute>
    },{
      path:'/dashboard/vendor/my-tickets',
      element:<PrivateRoute><MyAddedTickets/></PrivateRoute>
    },{
      path:'/dashboard/vendor/requests',
      element:<PrivateRoute><RequestedBookings/></PrivateRoute>
    },
  {
    path:'/dashboard/vendor/revenue',
    element:<PrivateRoute><RevenueOverview/></PrivateRoute>
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
      element:<PrivateRoute><AllTickets></AllTickets></PrivateRoute>
    },
    {
      path:'/ticket/:id',
      element:<PrivateRoute><SingleTickets></SingleTickets></PrivateRoute>,
     
    },
    {
      path:'/reviews',
      element:<Review/>
    },{
      path:'/about',
      element:<About></About>
    },{
      path:"/contact",
      element:<Contact/>
    },{
      path:'/faq',
      element:<Faq/>
    },{
      path:'/blog',
      element:<Blog/>
    },{
      path:'/chat',
      element:<Chat/>
    },
    {
      path:'/subscription',
      element:<Subscription/>
    },{
      path:'/terms',
      element:<Terms/>
    }
  ]
    


}])