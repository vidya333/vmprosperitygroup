import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EnquiryModal from '../components/EnquiryModal'; 
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import './PropertyDetailPage.css';
import PropertyCard from '../components/PropertyCard';

const formatPrice = (value) => {
  if (!value) return 'N/A';
  const n = Number(value);
  if (n >= 10000000) return `${(n/10000000).toFixed(1)} Cr`;
  if (n >= 100000) return `${(n/100000).toFixed(1)} L`;
  if (n >= 1000) return `${Math.round(n/1000)}K`;
  return n;
};

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [related, setRelated] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mainImage, setMainImage] = useState(""); // <-- main image state

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/properties/${id}`);
        const data = await res.json();
        setProperty(data);

        if (data?.type) {
          const rel = await fetch(`http://localhost:5000/api/properties?type=${encodeURIComponent(data.type)}`);
          const relData = await rel.json();
          setRelated(relData.filter(p => p._id !== data._id).slice(0,6));
        }

        const imagesArr = Array.isArray(data.images) && data.images.length ? data.images : (data.imageUrl ? [data.imageUrl] : []);
        if (imagesArr.length) setMainImage(imagesArr[0]); // set first image as default

      } catch (err) {
        console.error(err);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) return <div className="container">Loading…</div>;

  const images = Array.isArray(property.images) && property.images.length ? property.images : (property.imageUrl ? [property.imageUrl] : []);

  return (
    <div className="property-detail container mt-5 pt-5">
      <div className="detail-top">
        <div className="prop-gallery">
          <img src={mainImage} alt={property.title} className="main-img" loading="lazy" />
          <div className="thumbs">
            {images.map((src, i) => (
              <img 
                key={i} 
                src={src} 
                alt={`${property.title} ${i}`} 
                className={`thumb ${src === mainImage ? 'active' : ''}`} 
                loading="lazy"
                onClick={() => setMainImage(src)} 
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>

        <div className="summary">
          <h1>{property.title}</h1>
          <p className="location h4 text-secondary">Located in {property.location}</p>
         <div className="ratio ratio-16x9">
            <iframe
              title="view on map"
              className="rounded"
              src={property.locationPin}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="actions">
              <a
                className="btn whatsapp"
                href={`https://wa.me/${property.brokerPhone}?text=${encodeURIComponent(`Hi, I'm interested in "${property.title}" (${property.location}). Could you share more details?`)}`}
                target="_blank" rel="noopener noreferrer"
              >WhatsApp</a>

              <a
                className="btn email"
                href={`mailto:${property.brokerEmail}?subject=Enquiry about ${encodeURIComponent(property.title)}&body=Hi, I'm interested in ${property.title} at ${property.location}.`}
                target="_blank" rel="noopener noreferrer"
              >Email</a>

              <a className="btn call btn-warning" href={`tel:${property.brokerPhone}`}>Call</a>

              <button className="btn primary" onClick={() => setShowModal(true)}>Enquire / Schedule Visit</button>
            </div>
          
        </div>
      </div>

      <div className="detail-body d-flex flex-wrap gap-5 mt-5">
        <span>
          <h3>Overview</h3>
            <p className='mb-0'>{property.description}</p>
            <p className="price mb-0">Price: ₹{formatPrice(property.price)}</p>
            <p className="rent mb-0">Rent: ₹{property.rent ? formatPrice(property.rent) : 'N/A'}</p>
            <p className="type mb-0">Type: {property.type}</p>
        </span>
        <span>
          <h4 className='my-2'>Key Features</h4>
          <ul className="features">
            <li>Flat Type: {property.flatType || '—'}</li>
            <li>Carpet Area in sqft.: {property.carpetArea || '—'}</li>
            <li>Furnishing: {property.furnished || '—'}</li>
            <li>Parking: {property.parking || '—'}</li>
            <li>Facing: {property.facing || '—'}</li>
          </ul>
        </span>

      </div>

      {related.length > 0 && (
          <section className="related my-4">
            <h4 className='my-4'>Similar properties</h4>
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              breakpoints={{
                320: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 4 },
              }}
            >
              {related.map(p => (
                <SwiperSlide key={p._id}>
                  <PropertyCard property={p} />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}


       {showModal && <EnquiryModal onClose={() => setShowModal(false)} prefill={{ propertyId: property._id, propertyTitle: property.title }} />}
    </div>
  );
};

export default PropertyDetailPage;
