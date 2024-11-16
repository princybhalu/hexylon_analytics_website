import React, { useState } from "react";
import Navbar from "../components/Navbar1";
import HeroSection from "../components/HeroSection";
import HowWeWork from "../components/HowWeWork12";
import WhyUs from "../components/WhyUs4";
import IndustriesSection from "../components/IndustriesSection2";
import OurWorkSection from "../components/OurWork4";
import CommitmentSection from "../components/OurCommit1";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleNavigateToContactPage = () => {
    // navigate("/contact-us");
    window.location.href = "/contact-us";
  }

  return (
    <>
        <>
          <Navbar handleNavigateToContactPage={handleNavigateToContactPage}/>
          <HeroSection handleNavigateToContactPage={handleNavigateToContactPage}/>
          <HowWeWork />
          <WhyUs />
          <IndustriesSection />
          <OurWorkSection />
          <CommitmentSection handleNavigateToContactPage={handleNavigateToContactPage} />
          <Footer handleNavigateToContactPage={handleNavigateToContactPage}/>
        </>
    </>
  );
}

export default Home;
