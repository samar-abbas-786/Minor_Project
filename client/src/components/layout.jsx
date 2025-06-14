import React from "react";
import Home from "./home";
import AboutSection from "./about";
import ContactUs from "./Contact";
import Footer from "./footer";
import MentorsSection from "./mentor";
import FaqSection from "./FAQ";
const layout = () => {
  return (
    <div className="top-0">
      <Home />
      <AboutSection />
      <MentorsSection />
      <ContactUs />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default layout;
