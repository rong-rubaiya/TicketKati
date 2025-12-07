import React from 'react';
import Slider from '../Component/home/Slider';
import Home2 from '../Component/home/Home2';
import AnimatedPlane from '../Component/home/AnimatedPlane';
import Advertise from '../Component/home/Advertise';
import LatestTickets from '../Component/home/LatestTickets';
import PopularRoutes from '../Component/home/PopularRoutes';
import WhyChooseUs from '../Component/home/WhyChooseUs';
import Testimonials from '../Component/home/Testimonials';
import Partners from '../Component/home/Partners';

const Home = () => {
  return (
    <div className="pt-30 relative overflow-hidden">

      {/* ✈️ Animated plane */}
      <AnimatedPlane />
     

     
        <Slider />
         <Advertise/>

         <LatestTickets/>
         <PopularRoutes/>
         <WhyChooseUs/>
         <Testimonials/>
         <Partners/>
        
      
    </div>
  );
};

export default Home;
