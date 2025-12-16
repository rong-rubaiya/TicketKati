import React from 'react';
import Sidebarvendor from './Sidebarvendor';
import { Outlet } from 'react-router';

const VendorDashboard = () => {
  return (
   <div className="" >
<div className=" flex ">
  
      
        <div className=" flex-1">
         <Sidebarvendor/>
        </div>
        <div className=" w-11/12  mx-auto mt-20">
         <Outlet/>
        </div>

        
      

</div>

    </div>
  );
};

export default VendorDashboard;