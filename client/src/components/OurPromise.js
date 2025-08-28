import React, { useState } from 'react';
import './OurPromise.css';

const OurPromise = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('http://localhost:5000/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      alert('Enquiry submitted successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Error submitting enquiry');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="our-promise container pt-5">
      <div className="promise-text">
        <h3 className='text-secondary'>We Promise</h3>
        <p className='text-secondary'>
          When you choose <strong>VM Prosperity Group</strong>, you're not just buying property,
          you’re entering a partnership built on trust, stability, and prosperity.
          We ensure that every step, from consultation to completion, is guided by
          your needs and secured by our expertise.
        </p>
        <span className=''>
           <div className="mb-3">
          <a href="https://www.facebook.com/profile.php?id=61577943315396" className="text-secondary mx-2" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook fs-4"></i>
          </a>
          <a href="https://www.instagram.com/vm_prosperitygroup?igsh=M3c5NjZsZHB0N280" className="text-secondary mx-2" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram fs-4"></i>
          </a>
          <a href="https://linkedin.com" className="text-secondary mx-2" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-linkedin fs-4"></i>
          </a>
          <a href="https://wa.me/919112456000" className="text-secondary mx-2" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-whatsapp fs-4"></i>
          </a>
        </div>
        <h5 className='text-secondary d-flex flex-wrap'> 
          <small><i className="bi bi-envelope-fill pe-4 t-2 text-secondary"> <span> Email : admin@vmprosperitygroup.com</span></i> </small>
          <small><i className="bi bi-telephone-fill pe-4 t-2 text-secondary"><span> Call :+91 9112456000 / +91 9657096000 </span></i></small>
        </h5>
        <h5 className='text-secondary mt-2'>S-4, Second Floor, Destination Centre-1, Nanded City, Sinhagad Road, Pune - 411041.</h5>
        </span>
      </div>

      <div className="enquiry-form">
        <h4>Contact US</h4>
        <form onSubmit={handleSubmit} >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Enquiry"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit' }
          </button>
        </form>
      </div>
    </section>
  );
};

export default OurPromise;
