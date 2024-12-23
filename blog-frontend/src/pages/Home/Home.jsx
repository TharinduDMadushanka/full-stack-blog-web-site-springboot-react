import React, { useEffect, useState } from 'react'
import './Home.css'

import video2 from '../../assets/home/video2.mp4'
import arrow_btn from '../../assets/home/arrow_btn.png'
import arrow_icon from '../../assets/home/arrow_icon.svg';

import cat_1 from '../../assets/home/life_style.jpg';
import cat_2 from '../../assets/home/movie.jpg';
import cat_3 from '../../assets/home/science.jpg';
import cat_4 from '../../assets/home/sports.jpg';
import cat_5 from '../../assets/home/tech.jpg';
import cat_6 from '../../assets/home/travel.jpg';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';


const Home = () => {

  // State to keep track of the hovered category

  // Array of paragraphs
  const paragraphs = [
    "Technology",
    "Science",
    "Travel",
    "Entertainment",
    // "Discover the amazing features we offer."
  ];

  // State to keep track of the current paragraph index
  const [currentParagraph, setCurrentParagraph] = useState(0);

  // Use useEffect to change the paragraph every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentParagraph((prevParagraph) => (prevParagraph + 1) % paragraphs.length);
    }, 3000); // 5 seconds interval

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [paragraphs.length]);

  return (
    <div className='home'>

      <Navbar/>

      <video className='background-video' autoPlay loop muted>
        <source src={video2} type='video/mp4' />
      </video>

      <div className='hero'>
        <div className="hero-text">
          {/* Render the current paragraph */}
          <h1>{paragraphs[currentParagraph]}</h1>
        </div>

        <div className="hero-explore">
          <p>Explore the features</p>
          <img src={arrow_btn} alt="" />
        </div>
      </div>

      <div className="category">
        <h2 className="category-title">Categories</h2>

        <div className="category-grid">

          <div className="category-box">
            <img src={cat_1} alt="Lifestyle" />
          </div>

          <div className="category-box">
            <img src={cat_2} alt="Movies" />
          </div>

          <div className="category-box">
            <img src={cat_3} alt="Science" />
          </div>

          <div className="category-box">
            <img src={cat_4} alt="Sports" />
          </div>

          <div className="category-box">
            <img src={cat_5} alt="Tech" />
          </div>

          <div className="category-box">
            <img src={cat_6} alt="Travel" />
          </div>

        </div>

        <div className="cat-showmore">
            <p>Show More</p>
            <img src={arrow_icon} alt="" />
        </div>

      </div>

      <Footer/>

    </div>


  )
}

export default Home
