import React from 'react';
import Navbar from './Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from './Shared/Footer';

const Roots = () => {
  return (
    <div>
      <nav>
        <Navbar/>
      </nav>

      <main>
        <Outlet/>
      </main>

      <footer>
        <Footer/>
      </footer>
      
    </div>
  );
};

export default Roots;