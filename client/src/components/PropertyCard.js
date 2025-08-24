import React, { useState, useEffect } from 'react';
import './PropertyCard.css'; 
import { Link } from 'react-router-dom';

const formatPrice = (value) => {
  if (!value) return "N/A";

  const formatSingle = (num) => {
    num = Number(num);
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)} Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)} L`;
    if (num >= 1000) return `${Math.round(num / 1000)}K`;
    return num;
  };

  if (typeof value === 'string' && value.includes('-')) {
    const [min, max] = value.split('-');
    return `${formatSingle(min)} - ${formatSingle(max)}`;
  }

  return formatSingle(value);
};

const PropertyCard = ({ property }) => {
  const { title, location, price, description, imageUrl, images, brokerEmail, brokerPhone, rent, type } = property;

  // Combine multiple images or fall back to single imageUrl
  const imgArray = Array.isArray(images) && images.length > 0 ? images : (imageUrl ? [imageUrl] : []);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    if (imgArray.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imgArray.length);
      }, 3000); // slide every 3 seconds

      return () => clearInterval(interval); // cleanup on unmount
    }
  }, [imgArray.length]);

  return (
    <div className="property-card">
      <Link to={`/property/${property._id}`} className='text-decoration-none'>
        
        {/* Image slider */}
        <div className="image-slider">
          <img src={imgArray[currentIndex]} alt={title} className="property-image" />

          {/* Pagination dots */}
          <div className="dots">
            {imgArray.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === currentIndex ? 'active' : ''}`} 
                onClick={(e) => { 
                  e.preventDefault(); 
                  setCurrentIndex(index); 
                }}
              ></span>
            ))}
          </div>
        </div>

        <div className="property-info">
          <h3>{title}</h3>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Type:</strong> {type}</p>
          <p><strong>Price:</strong> ₹{formatPrice(price)}</p>
          <p><strong>Rent:</strong> ₹{rent ? formatPrice(rent) : "N/A"}</p>
          <p>
            {description.length > 35
              ? description.slice(0, 35) + "..."
              : description}
          </p>
        </div>
      </Link>

      <div className="card-buttons my-2 mx-2">
        <a href={`https://wa.me/${brokerPhone}?text=${encodeURIComponent(
            `Hi, I'm interested in the property "${title}" located at ${location}, priced at ₹${formatPrice(price)}. Could you please share more details?`
          )}`} target="_blank" rel="noopener noreferrer">
          <button className="whatsapp-btn">WhatsApp</button>
        </a>
        <a href={`mailto:${brokerEmail}?subject=Enquiry about ${title}&body=Hi, I'm interested in the property located at ${location} listed for ₹${formatPrice(price)}. Could you please provide more details?`} target='_blank' rel="noopener noreferrer">
          <button className="email-btn">Email</button>
        </a>
        <a href={`tel:${property.brokerPhone}`}>
          <button className="call-btn">Call</button>
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;
