import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ProjectCard.css";

export default function ProjectCard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  if (projects.length === 0) {
    return <div className="text-center py-5">Loading projects...</div>;
  }

  return (
    <section className="project-card-section container my-5">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={false} 
      >
        {projects.map((project) => (
          <SwiperSlide key={project._id}>
            <ProjectSlide project={project} />
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <CustomNavButtons />
      </Swiper>
    </section>
  );
}

// 🔹 Single Project Slide Component
function ProjectSlide({ project }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="project-card d-flex flex-column flex-lg-row">
      {/* Left Side - Image Carousel */}
      <div className="image-container mx-auto" style={{ maxWidth: "350px" }}>
        <img
          src={`http://localhost:5000${project.images[currentIndex]}`}
          alt={project.title}
          className="img-fluid"
        />
        <button className="nav-btn left" onClick={prevImage}>
          ❮
        </button>
        <button className="nav-btn right" onClick={nextImage}>
          ❯
        </button>

        {/* Dots for inner images */}
        <div className="dots">
          {project.images.map((_, index) => (
            <span
              key={index}
              className={index === currentIndex ? "dot active" : "dot"}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Right Side - Project Details */}
      <div className="details-container py-4 ps-lg-5 ms-lg-5">
        <h2>{project.title}</h2>
        <h3>{project.subtitle}</h3>
        <p>{project.description}</p>

        <ul>
          {project.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>

        <p className="fw-bold">Where business meets opportunity!</p>
        <p>Book your space now – Limited availability!</p>

        <div className="d-flex gap-2 flex-wrap">
          <a
            href={`http://localhost:5000${project.brochure}`}
            target="_blank"
            rel="noopener noreferrer"
            className="standard-btn w-auto text-decoration-none"
          >
             Download Brochure
          </a>
          <a
            href={`https://wa.me/${project.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="standard-btn w-auto text-decoration-none"
          >
             WhatsApp
          </a>
          <a href={`mailto:${project.email}`} className="standard-btn w-auto text-decoration-none">
             Email Us
          </a>
        </div>
      </div>
    </div>
  );
}

// 🔹 Custom Swiper Navigation Buttons
function CustomNavButtons() {
  const swiper = useSwiper();

  return (
    <div className="custom-nav-buttons text-center mt-3">
      <button
        className="btn btn-outline-dark mx-2"
        onClick={() => swiper.slidePrev()}
      >
        ⬅ Prev Project
      </button>
      <button
        className="btn btn-outline-dark mx-2"
        onClick={() => swiper.slideNext()}
      >
        Next Project ➡
      </button>
    </div>
  );
}
