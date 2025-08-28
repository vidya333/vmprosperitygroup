import React, { useState, useEffect } from "react";
import "./Banner.css";
import EnquiryModal from "./EnquiryModal";

const images = [
  "/images/banner1.jpg",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
];

const Banner = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="banner-container"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
      }}
    >
      <div className="banner-overlay">

        <div className="banner-content">
          <img src="/images/vmlogo.png" alt="logo" style={{height:"250px",marginBottom:"-40px"}}  />
          <h2 className="banner-title -mt-5 -pt-5">Welcome to VM Prosperity Group !</h2>
          <p className="banner-subtext">
            Your trusted partner in finding dream homes and properties !
          </p>
          <button className="banner-button" onClick={() => setShowModal(true)}>
            Enquire Now
          </button>
          {showModal && <EnquiryModal onClose={() => setShowModal(false)} />}
        </div>

        {/* Stats section */}
        <div className="banner-stats">
          <div className="stat-item">
            <div className="stat-number">43+</div>
            <div className="stat-label">Properties</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">1K+</div>
            <div className="stat-label">Satisfied Clients</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Years Experience</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
