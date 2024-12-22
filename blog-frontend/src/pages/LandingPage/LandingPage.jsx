import React from 'react';
import './LandingPage.css';

import bg_1 from '../../assets/landing/bg-1.jpg';
import bg_2 from '../../assets/landing/bg-2.jpg';
import bg_3 from '../../assets/landing/bg-3.jpg';
// import benefit_bg from '../../assets/landing/benefit-img.png';

const LandingPage = () => {
  return (
    <div className="landing">
      <div className="landing-bg-section">
        <div id="carouselExampleCaptions" className="carousel slide">

          <div className="nav-sec">
            <div className="logo">
              <h1>TDM</h1>
            </div>
            <div className="start-btn">
              <button>Get Started</button>
            </div>
          </div>

          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>

            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>

            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner landing-bg">
            <div className="carousel-item active">
              <img src={bg_1} className="d-block w-100" alt="First slide" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Sports</h5>
                <p>Explore the latest updates and stories from the world of sports.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={bg_2} className="d-block w-100" alt="Second slide" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Technology</h5>
                <p>Dive into the innovations and trends shaping our digital future.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={bg_3} className="d-block w-100" alt="Third slide" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Travel</h5>
                <p>Discover breathtaking destinations and travel tips for your next journey.</p>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="benefits-section">
        {/* Left Section */}
        <div className="benefits-intro">
            <h2>Discover the Power of Blogging</h2>
            <p>Share your stories, explore new ideas, and connect with a global community of readers.</p>
            <button className="browse-button">Start Your Blog</button>
            {/* <img
            src={benefit_bg}
            alt="House Illustration"
            className="intro-image"
          /> */}
        </div>

        {/* Right Section */}
        <div className="benefits-features">
            <div className="feature">
            <div className="icon">✍️</div>
            <h3>Creative Expression</h3>
            <p>Unleash your creativity and write about the topics you're passionate about.</p>
            </div>
            <div className="feature">
            <div className="icon">🌐</div>
            <h3>Global Reach</h3>
            <p>Your blogs can reach readers from all over the world, expanding your influence.</p>
            </div>
            <div className="feature">
            <div className="icon">📈</div>
            <h3>Build Your Brand</h3>
            <p>Establish yourself as an expert and grow your personal or professional brand.</p>
            </div>
            <div className="feature">
            <div className="icon">🤝</div>
            <h3>Community Engagement</h3>
            <p>Interact with readers, exchange ideas, and grow your network in a meaningful way.</p>
            </div>
        </div>
        </div>


    </div>
  );
};

export default LandingPage;
