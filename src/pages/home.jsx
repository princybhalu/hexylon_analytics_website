import React, { useState } from "react";
import Navbar from "../components/Navbar2";
import HeroSection from "../components/HeroSection3";
import HowWeWork from "../components/HowWeWork9";
import WhyUs from "../components/WhyUs4";
import IndustriesSection from "../components/IndustriesSection2";
import OurWorkSection from "../components/OurWork4";
import CommitmentSection from "../components/OurCommit1";
import Footer from "../components/Footer";
import EntranceAnimation from "../components/Loading3";

function Home() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  return (
    <>
      {/* {!isAnimationComplete && (
        <EntranceAnimation setIsAnimationComplete={setIsAnimationComplete} />
      )} */}

      {/* {isAnimationComplete && ( */}
        <>
          <Navbar />
          <HeroSection />
          <HowWeWork />
          <WhyUs />
          <IndustriesSection />
          <OurWorkSection />
          <CommitmentSection />
          <Footer />
        </>
      {/* )} */}
    </>
  );
}

export default Home;
