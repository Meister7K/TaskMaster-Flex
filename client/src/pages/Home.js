import React from "react";
import "../../src/App.css";
import HomeSection from "../components/home-section/HomeSection";
import Rules from "../components/rules/Rules";
import Footer from "../components/footer/Footer";

function Home() {
  return (
    <>
      <HomeSection />
      <Rules />
      <Footer />
    </>
  );
}

export default Home;
