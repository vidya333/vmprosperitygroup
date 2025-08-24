import React from 'react';
import axios from 'axios';

const SeedPropertiesButton = () => {
  const seedProperties = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/seed-properties');
      alert(response.data.message);
    } catch (err) {
      alert('Failed to seed properties');
    }
  };

  return (
    <button onClick={seedProperties} className="btn btn-primary my-3">
      Insert Properties
    </button>
  );
};

export default SeedPropertiesButton;
