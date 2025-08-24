const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const propertyRoutes = require('./routes/propertyRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const seedRoutes = require('./routes/seedRoutes');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require("./routes/projectRoutes");
const mediaRoutes = require("./routes/mediaRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/properties', propertyRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api', seedRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/media", mediaRoutes);


const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
