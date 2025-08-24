const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

router.post('/seed-properties', async (req, res) => {
  try {
   const sampleProperties = [
 {
  "title": "Cityscape Executive Suite",
  "location": "Lower Parel",
  "price": 14500000,
  "rent": 80000,
  "description": "Fully furnished serviced apartment with panoramic city views and premium concierge services.",
  "imageUrl": "/images/serviced1.jpg",
  "brokerName": "Amit Shah",
  "brokerEmail": "amit.shah@example.com",
  "brokerPhone": "919876543210",
  "type": "residential-apartment",
  "flatType": "2BHK",
  "availableFor": "rent",
  "deposit": 200000,
  "carpetArea": 700,
  "parking": "yes",
  "furnished": "furnished",
  "facing": "west",
  "locationPin": "https://maps.app.goo.gl/uRWBb66526UTJnsK6"
}

];

    await Property.insertMany(sampleProperties);
    res.status(200).json({ message: 'Properties seeded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to seed properties' });
  }
});

module.exports = router;
