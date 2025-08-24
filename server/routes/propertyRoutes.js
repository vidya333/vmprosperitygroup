const express = require('express');
const multer = require('multer');
const path = require('path');

const { getAllProperties, getPropertyById, getRelatedByType, createProperty, deleteProperty, updateProperty } = require('../controllers/propertyController');

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

// Routes
router.get('/', getAllProperties);
router.get('/related', getRelatedByType);
router.get('/:id', getPropertyById);
router.post('/', upload.array('images', 10), createProperty);
router.put('/:id', upload.array('images', 10), updateProperty);
router.delete('/:id', deleteProperty);

module.exports = router;
