import React, { useState } from 'react';
import './EnquiryModal.css';

const EnquiryModal = ({ onClose }) => {
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
      onClose(); 
    } catch (err) {
      console.error(err);
      alert('Error submitting enquiry');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-light rounded">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className='text-dark'>Please fill Details</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Your Email" required onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
          <textarea name="message" placeholder="Your Enquiry" required onChange={handleChange}></textarea>
          
          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>

          <button onClick={onClose} type="button" className="cancel-btn">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
