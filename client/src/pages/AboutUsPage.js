import React from "react";
import "./AboutUsPage.css";
import Counter from "../components/Counter";
import OurPromise from "../components/OurPromise";
import Team from "../components/Team";

const AboutUsPage = () => {
  return (
    <div className="about-container">
      {/* Header */}
      <section className="about-header mt-5">
        <h1>About VM Prosperity Group</h1>
        <h2>A Bond of Stability, Prosperity & Trust</h2>
      </section>

      {/* Who We Are */}
      <section className="about-section container">
        <h3>Who We Are ?</h3>
        <p>
          VM Prosperity Group is the result of a powerful collaboration between
          two of Maharashtra’s most trusted real estate brands – Reliable Deals
          Real Estate, founded by Mr. Virendra Singh Deshmukh, and Green Earth
          Realty, founded by Mr. Mayur Patil.
        </p>
        <p>
          With a combined legacy of over 15 years, our name is synonymous with
          transparency, integrity, and excellence. Over the years, we have
          served 1000+ satisfied clients, facilitated transactions worth over
          ₹500+ crores, and built a reputation for delivering value-driven
          property solutions.
        </p>
        <p>
          We are more than just a real estate company — we are your partners in
          building a secure and prosperous future.
        </p>
      </section>

      {/* Impact */}
       <section className="about-impact-section text-white text-center container mb-3">
        <div className="impact-overlay">
            <div className="container py-5">
            <h3 className="mb-5">Our Impact – By the Numbers</h3>
            <div className="row">
                <div className="col-md-4 mb-4">
                <Counter target={15} duration={1500} suffix="+" />
                <p className="lead">Years of Combined Experience</p>
                </div>
                <div className="col-md-4 mb-4">
                <Counter target={1000} duration={1500} suffix="+" />
                <p className="lead">Clients Served Across Maharashtra</p>
                </div>
                <div className="col-md-4 mb-4">
                <Counter target={500} duration={1500} suffix="+ Cr" />
                <p className="lead">Crores in Property Transactions</p>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6 mb-4">
                <Counter target={250} duration={1500} suffix="+" />
                <p className="lead">Projects Successfully Completed</p>
                </div>
                <div className="col-md-6 mb-4">
                <Counter target={95} duration={1500} suffix="%" />
                <p className="lead">Client Retention Rate</p>
                </div>
            </div>
            </div>
        </div>
        </section>

      {/* Legacy & Journey */}
      <section className="about-section container">
        <h3>Our Legacy & Journey</h3>
        <ul>
          <li>
            2009: Reliable Deals Real Estate begins operations, focusing on
            premium plots and residential properties.
          </li>
          <li>
            2012: Green Earth Realty is established, specializing in strategic
            land investments and commercial spaces.
          </li>
          <li>
            2015: Both firms expand operations across Pune and Nanded City,
            achieving significant client growth.
          </li>
          <li>
            2018: Diversification into construction, tourism-based
            developments, and premium housing projects.
          </li>
          <li>
            2022: The two firms unite to form VM Prosperity Group, combining
            their strengths under one trusted brand.
          </li>
          <li>
            Today: Operating with a vision to be the most trusted, innovative,
            and client-centric real estate group in Maharashtra.
          </li>
        </ul>
      </section>

      {/* Services */}
      <section className="about-section container my-5">
        <h3 className="text-center mb-5">Our Services</h3>
        <div className="row g-4">
            <div className="col-md-6 col-xxl-3">
            <div className="service-card text-center p-4 shadow-sm h-100">
                <div className="service-icon mb-3">
                <i className="bi bi-building fs-1 text-light"></i>
                </div>
                <h5 className="mb-3 text-light">Real Estate Solutions</h5>
                <ul className="list-unstyled text-muted">
                <li>Residential plots, luxury apartments, and independent villas.</li>
                <li>Commercial office spaces, retail units, and mixed-use developments.</li>
                <li>Property sales, leasing, and resale services.</li>
                </ul>
            </div>
            </div>
            <div className="col-md-6 col-xxl-3">
            <div className="service-card text-center p-4 shadow-sm h-100">
                <div className="service-icon mb-3">
                <i className="bi bi-hammer fs-1 text-warning"></i>
                </div>
                <h5 className="mb-3 text-light">Construction & Development</h5>
                <ul className="list-unstyled text-muted">
                <li>Modern residential and commercial projects with sustainable designs.</li>
                <li>End-to-end project management with a focus on quality and timely delivery.</li>
                </ul>
            </div>
            </div>
            <div className="col-md-6 col-xxl-3">
            <div className="service-card text-center p-4 shadow-sm h-100">
                <div className="service-icon mb-3">
                <i className="bi bi-graph-up-arrow fs-1 text-success"></i>
                </div>
                <h5 className="mb-3 text-light">Investment Opportunities</h5>
                <ul className="list-unstyled text-muted">
                <li>Land banking for future growth.</li>
                <li>High-return real estate investment plans.</li>
                <li>Guidance on market trends, ROI, and secure asset creation.</li>
                </ul>
            </div>
            </div>
            <div className="col-md-6 col-xxl-3">
            <div className="service-card text-center p-4 shadow-sm h-100">
                <div className="service-icon mb-3">
                <i className="bi bi-tree fs-1 text-success"></i>
                </div>
                <h5 className="mb-3 text-light">Tourism & Property Experiences</h5>
                <ul className="list-unstyled text-muted">
                <li>Farmhouse stays and vacation homes.</li>
                <li>Tourism-based land development for resorts and retreats.</li>
                </ul>
            </div>
            </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-section container">
        <h3>Our Mission & Vision</h3>
        <p>
          To deliver value-driven, profitable, and ethical real estate solutions
          that create lasting benefits for our clients and communities. Our vision is to be Maharashtra’s most trusted and innovative real estate brand,
          creating spaces and opportunities that bring stability, prosperity,
          and trust to every client we serve.
        </p>
      </section>

      {/* Core Values */}
      <section className="about-section container">
        <h3>Core Values</h3>
        <ul>
          <li>Trust – We build long-term relationships through honesty and reliability.</li>
          <li>Transparency – Clear and open communication in every transaction.</li>
          <li>Integrity – Ethical practices at the heart of everything we do.</li>
          <li>Innovation – Modern solutions for a fast-changing market.</li>
          <li>Excellence – Commitment to quality, from planning to delivery.</li>
        </ul>
      </section>

      {/* Team Members */}
      <Team/>

      {/* Leadership */}
      <section className="about-section container">
        <h3>Leadership Team</h3>
        <p>
          <strong>Mr. Virendra Singh Deshmukh – Co-Founder & Director:</strong>{" "}
          Founder of Reliable Deals Real Estate, Mr. Deshmukh brings strategic
          market insight and extensive experience in property sales, land
          transactions, and development. His commitment to ethical business has
          been key to building a strong network and loyal clientele.
        </p>
        <p>
          <strong>Mr. Mayur Patil – Co-Founder & Director:</strong> Founder of
          Green Earth Realty, Mr. Patil is known for his innovative approach to
          land acquisition, investment strategies, and tourism-based
          developments. His vision is to create sustainable real estate
          opportunities that deliver long-term value.
        </p>
      </section>

      {/* Why Choose */}
      <section className="about-section container">
        <h3>Why Choose VM Prosperity Group?</h3>
        <ul>
          <li>15+ years of expertise in real estate and development.</li>
          <li>Ethical, transparent, and customer-focused approach.</li>
          <li>A proven track record in high-return investments.</li>
          <li>Personalized solutions for buyers, sellers, and investors.</li>
          <li>Strong network across Pune, Nanded City, and Maharashtra.</li>
        </ul>
      </section>

      {/* Promise */}
      <OurPromise/>
    </div>
  );
};

export default AboutUsPage;
