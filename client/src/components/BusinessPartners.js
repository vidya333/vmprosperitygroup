import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./BusinessPartner.css";

const partners = [
  "/images/BusinessPartners/nandedcity.jpeg",
  "/images/BusinessPartners/abhinandan.jpeg",
  "/images/BusinessPartners/bramha.jpeg",
  "/images/BusinessPartners/godrej.jpeg",
  "/images/BusinessPartners/hiranandani.jpeg",
  "/images/BusinessPartners/kalpataru.jpeg",
  "/images/BusinessPartners/koltepatil.jpeg",
  "/images/BusinessPartners/krisala.jpeg",
  "/images/BusinessPartners/kumarproperties.jpeg",
  "/images/BusinessPartners/lodha.jpeg",
  "/images/BusinessPartners/magarpatta.jpeg",
  "/images/BusinessPartners/nyati.jpeg",
  "/images/BusinessPartners/panchratna.jpeg",
  "/images/BusinessPartners/paranjape.jpeg",
  "/images/BusinessPartners/riverview.jpeg",
  "/images/BusinessPartners/shapoorji.jpeg",
  "/images/BusinessPartners/tatacapital.jpeg",
  "/images/BusinessPartners/vanaha.jpeg",
  "/images/BusinessPartners/vilasjavdekar.jpeg",
  "/images/BusinessPartners/vtp.jpeg",
  
];

const BusinessPartners = () => {
  return (
    <div className="partners-container">
      <h2 className="partners-title py-4">Our Business Partners</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        
      >
        {partners.map((logo, index) => (
          <SwiperSlide key={index} >
            <img src={logo} alt={`Partner ${index + 1}`} className="partner-logo" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BusinessPartners;
