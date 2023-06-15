import React from 'react'
import '../../src/App.css';
import HomeSection from '../components/home-section/HomeSection';
import Rules from '../components/rules/Rules';
import Footer from '../components/footer/Footer';
import Music from '../components/music/Music';


function Home () {
  return (
    <>
      <HomeSection />
      <Music/>
      <Rules />
      <Footer />
    </>
  );
}

export default Home;