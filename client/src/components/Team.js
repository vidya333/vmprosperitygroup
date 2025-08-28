import React from "react";
import { EnvelopeFill, Instagram, Whatsapp } from "react-bootstrap-icons"; 

const teamMembers = [
  {
    name: "Mayur Patil",
    role: " Co-Founder & Director",
    image: "./images/mayur.jpg",
    email: "mailto:mayur@vmprosperitygroup.com",
    instagram: "https://www.instagram.com/vm_prosperitygroup?igsh=M3c5NjZsZHB0N280",
    whatsapp: "https://wa.me/918149248222",
  },
  {
    name: "Virendrasingh Deshmukh",
    role: " Co-Founder & Director",
    image: "./images/virendrasingh.jpeg",
    email: "mailto:virendrasingh@vmprosperitygroup.com",
    instagram: "https://www.instagram.com/vm_prosperitygroup?igsh=M3c5NjZsZHB0N280",
    whatsapp: "https://wa.me/919112456000",
  },


];

const Team = () => {
  return (
    <div className="container py-5">
      <div className="row g-4">
        {teamMembers.map((member, idx) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={idx}>
            <div className="team-card position-relative overflow-hidden rounded shadow">
              {/* Member Photo */}
              <img
                src={member.image}
                alt={member.name}
                className="img-fluid w-100"
              />

              {/* Overlay */}
              <div className="overlay d-flex flex-column justify-content-center align-items-center text-white text-center">
                <h5 className="mb-1">{member.name}</h5>
                <p className="mb-3 small">{member.role}</p>
                <div className="d-flex gap-3">
                  <a href={member.email} className="text-white fs-5">
                    <EnvelopeFill />
                  </a>
                  <a href={member.instagram} className="text-white fs-5">
                    <Instagram />
                  </a>
                  <a href={member.whatsapp} className="text-white fs-5">
                    <Whatsapp />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .team-card {
          height: 300px;
        }
        .team-card img {
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .team-card:hover img {
          transform: scale(1.1);
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.65);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .team-card:hover .overlay {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Team;
