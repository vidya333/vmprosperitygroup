import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import './Home.css';
import Banner from '../components/Banner';
import PropertyTypeSlider from '../components/PropertyTypeSlider';
// import SeedPropertiesButton from '../components/SeedButton';
import { ReactTyped } from "react-typed";
import BusinessPartners from '../components/BusinessPartners';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { useNavigate } from 'react-router-dom';
import OurPromise from '../components/OurPromise';
import ProjectCard from '../components/ProjectCard';

const Home = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [rentRange, setRentRange] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 4;
  const [totalProperties,setTotalProperties] = useState();
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const [bhk, setBhk] = useState('');
 

  useEffect(() => {
  axios.get('http://localhost:5000/api/properties')
    .then(res => {
      setProperties(res.data);
      setFilteredProperties(res.data);
      setTotalProperties(res.data.length);
    })
    .catch(err => console.error(err));
  }, []);

useEffect(() => {
  const filtered = properties.filter(property => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());

    let withinPriceRange = true;
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      withinPriceRange = property.price >= min && property.price <= max;
    }

    let withinRentRange = true;
    if (rentRange && property.rent !== undefined) {
      const [min, max] = rentRange.split('-').map(Number);
      withinRentRange = property.rent >= min && property.rent <= max;
    }

    let matchesBhk = true;
    if (bhk) {
      if (bhk === "5BHK+") {
        // match anything 5BHK or more
        const bhkNum = parseInt(property.flatType); // extracts 2 from "2BHK"
        matchesBhk = bhkNum >= 5;
      } else {
        matchesBhk = property.flatType === bhk;
      }
    }

    return matchesSearch && withinPriceRange && withinRentRange && matchesBhk;
  });

  setFilteredProperties(filtered);
}, [searchQuery, priceRange, rentRange, bhk, properties]);

  return (
    <div className="landing-container">        

      <Banner/>

      <div className='flex d-none'>
        Total Properties : {totalProperties}
      </div> 

      <section className='about my-5 container text-center'>
        <h3 className="Property-title my-3 text-center" id='properties'>
          A Bond of Stability, Prosperity & Trust !</h3>
        <p className=' h5 text-secondary fw-normal pb-4 text-center'>
        <ReactTyped
          strings={[
            "VM Prosperity Group is the result of a powerful collaboration between two of Maharashtra’s most trusted real estate brands – Reliable Deals Real Estate, founded by Mr. Virendra Singh Deshmukh, and Green Earth Realty, founded by Mr. Mayur Patil."
          ]}
          typeSpeed={10}
          backSpeed={0}
          showCursor={false}
          />
          </p>
           <button className="standard-button" 
            onClick={() => navigate('/about-us')}>
              Know More About Us
            </button>
      </section>
      
      <section className="property-section w-full p-4">

        <h3 className="Property-title mb-5 text-center" id='properties'>
          Find Your Dream Property with VM Prosperity Group</h3>

          <PropertyTypeSlider/>

          <h3 className="Property-title my-5 text-center" id='properties'>
          Looking for an Apartment ?</h3>

        <div className="filter-bar w-full my-3">
          <input
            type="text"
            placeholder="Search by Location or Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input w-full"
          />

          <select
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
            className="search-input w-full"
          >
            <option value="">Select BHK</option>
            <option value="1BHK">1 BHK</option>
            <option value="2BHK">2 BHK</option>
            <option value="3BHK">3 BHK</option>
            <option value="4BHK">4 BHK</option>
            <option value="5BHK+">5 BHK+</option>
          </select>


          <select
            value={rentRange}
            onChange={(e) => setRentRange(e.target.value)}
            className="search-input w-full"
          >
            <option value="">Select Rents</option>
            <option value="0-10000">Below ₹10K</option>
            <option value="10000-20000">₹10K – ₹20K</option>
            <option value="20000-50000">₹20K – ₹50K</option>
            <option value="50000-100000">Above ₹50K</option>
          </select>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="search-input w-full"
          >
            <option value="">Select Price Range</option>
            <option value="0-5000000">Below ₹50 Lakhs</option>
            <option value="5000000-10000000">₹50L - ₹1 Cr</option>
            <option value="10000000-20000000">₹1 Cr - ₹2 Cr</option>
            <option value="20000000-100000000">Above ₹2 Cr</option>
          </select>

          <button 
            className="standard-button w-full"
            onClick={() => {
              setSearchQuery('');
              setRentRange('');
              setPriceRange('');
              setBhk('');
            }}
          >
            Clear Filters
          </button>
        </div>

        <div className="property-grid">
          {(showAll ? filteredProperties : currentProperties).map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>

        {filteredProperties.length > propertiesPerPage && !showAll && (

            <div className="text-center mt-3 d-flex justify-content-center gap-2">
              <button 
                className="btn btn-outline-secondary" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                ← Previous
              </button>
              <span className="align-self-center">Page {currentPage} of {totalPages}</span>
              <button 
                className="btn btn-outline-secondary" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next →
              </button>
            </div>
          )}

        {filteredProperties.length > 4 && (
          <div className="text-center mt-3">
            <button className="standard-button" 
           onClick={() => {
            setShowAll(!showAll);
            setCurrentPage(1);
          }}>
              {showAll ? 'View Less Properties' : 'View All Properties'}
            </button>
          </div>
        )}

      </section>

      <ProjectCard/>

      <section>
        <BusinessPartners/>
        <TestimonialCarousel/>
        <section className='contact-section bg-dark'>
        <OurPromise/>
        </section>
      </section>

    </div>
  );
};

export default Home;
