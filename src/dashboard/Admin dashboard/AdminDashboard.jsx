import React from 'react';
import { Outlet } from 'react-router';
import SidebarAdmin from './SidebarAdmin';

const AdminDashboard = () => {
  return (
     <div className="" >
<div className=" flex ">
  
      
        <div className=" flex-1">
          <SidebarAdmin/>
        </div>
        <div className="
        w-11/12 mx-auto mt-20">
         <Outlet/>
        </div>

        
      

</div>

    </div>
  );
};

export default AdminDashboard;