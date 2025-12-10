import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Rightbar from "./userrouter/Rightbar";
import { Outlet } from "react-router";
import Footer from "../../Shared/Footer";

const UserDashboard = () => {
  return (
    <div className="" >
<div className=" flex ">
  
      
        <div className=" flex-1">
          <Sidebar/>
        </div>
        <div className="md:flex-4 mr-0  sm:mr-30 md:mr-0 mt-20">
         <Outlet/>
        </div>

        
      

</div>

    </div>
  );
};

export default UserDashboard;
