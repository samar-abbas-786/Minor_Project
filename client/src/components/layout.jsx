import React from "react";
import Home from "./home";
import AboutSection from "./about";
import ContactUs from "./Contact";
import Footer from "./footer";
const layout = () => {
  return (
    <div className="top-0">
      <Home />
      <AboutSection />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default layout;
