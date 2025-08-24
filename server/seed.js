const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('./models/Property');

dotenv.config();

const properties = [
  
  {
    "title": "Villa Eden",
    "location": "Lonavala",
    "price": 32000000,
    "description": "Elegant 5BHK villa with private pool and lush garden.",
    "imageUrl": "/images/villa1.jpg",
    "brokerName": "Anita Mehra",
    "brokerEmail": "vidya.nk07@gmail.com",
    "brokerPhone": "919820000002",
    "rent": 18000,
    "type": "IndependentHouse/Villa"
  },
  {
    "title": "Casa Serenity",
    "location": "Alibaug",
    "price": 27500000,
    "description": "Beachside 4BHK villa with sea-facing deck.",
    "imageUrl": "/images/villa2.jpg",
    "brokerName": "Anita Mehra",
    "brokerEmail": "vidya.nk07@gmail.com",
    "brokerPhone": "919820000002",
    "rent": 16000,
    "type": "IndependentHouse/Villa"
  },
  {
    "title": "Sunset Villa",
    "location": "North Goa",
    "price": 24000000,
    "description": "Spacious 3BHK villa with rooftop sunset view.",
    "imageUrl": "/images/villa3.jpg",
    "brokerName": "Rajiv Sharma",
    "brokerEmail": "vidya.nk07@gmail.com",
    "brokerPhone": "919769271624",
    "rent": 15000,
    "type": "IndependentHouse/Villa"
  },
  {
    "title": "Hilltop Haven",
    "location": "Panchgani",
    "price": 36000000,
    "description": "Luxury 5BHK villa with panoramic hill view.",
    "imageUrl": "/images/villa4.jpg",
    "brokerName": "Rajiv Sharma",
    "brokerEmail": "vidya.nk07@gmail.com",
    "brokerPhone": "919769271624",
    "rent": 21000,
    "type": "IndependentHouse/Villa"
  },
  {
    "title": "Riverstone Cottage",
    "location": "Mahabaleshwar",
    "price": 19000000,
    "description": "3BHK riverfront villa with stone facade.",
    "imageUrl": "/images/villa5.jpg",
    "brokerName": "Anit Padda",
    "brokerEmail": "vidya.nk07@gmail.com",
    "brokerPhone": "919920155441",
    "rent": 13500,
    "type": "IndependentHouse/Villa"
  },
  {
    "title": "Forest Retreat",
    "location": "Karjat",
    "price": 22000000,
    "description": "Eco-friendly 4BHK villa surrounded by forest.",
    "imageUrl": "/images/villa6.jpg",
    "brokerName": "Anit Padda",
    "brokerEmail": "vidya.nk07@gmail.com",
    "brokerPhone": "919920155441",
    "rent": 14500,
    "type": "IndependentHouse/Villa"
  },
  {
    "title": "Palm Grove",
    "location": "Vasai",
    "price": 21000000,
    "description": "4BHK villa with palm-tree garden and pool.",
    "imageUrl": "/images/villa7.jpg",
    "brokerName": "Anita Mehra",
    "brokerEmail": "vidya.nk07@gmail.com",
    "brokerPhone": "919820000002",
    "rent": 15500,
    "type": "IndependentHouse/Villa"
  },
  {
    "title": "Ocean Breeze Villa",
    "location": "South Goa",
    "price": 29500000,
    "description": "Modern villa with 3 bedrooms and beach access.",
    "imageUrl": "/images/villa8.jpg",
    "brokerName": "Rajiv Sharma",
    "brokerEmail": "vidya.nk07@gmail.com",
    "brokerPhone": "919769271624",
    "rent": 17000,
    "type": "IndependentHouse/Villa"
  },
  {
    "title": "Whispering Pines",
    "location": "IgATPuri",
    "price": 26000000,
    "description": "4BHK villa nestled among pine trees.",
    "imageUrl": "/images/villa9.jpg",
    "brokerName": "Anit Padda",
    "brokerEmail": "vidya.nk07@gmail.com",
    "brokerPhone": "919920155441",
    "rent": 16000,
    "type": "IndependentHouse/Villa"
  },
  {
    "title": "Lavender Lane",
    "location": "Khandala",
    "price": 28000000,
    "description": "Elegant villa with 5 bedrooms and flower garden.",
    "imageUrl": "/images/villa10.jpg",
    "brokerName": "Anita Mehra",
    "brokerEmail": "vidya.nk07@gmail.com",
    "brokerPhone": "919820000002",
    "rent": 17500,
    "type": "IndependentHouse/Villa"
  },
  {
    "title": "Skyline View",
    "location": "Mumbai Suburbs",
    "price": 35000000,
    "description": "Luxury 4BHK villa with city skyline view.",
    "imageUrl": "/images/villa11.jpg",
    "brokerName": "Rajiv Sharma",
    "brokerEmail": "vidya.nk07@gmail.com",
    "brokerPhone": "919769271624",
    "rent": 19000,
    "type": "IndependentHouse/Villa"
  },
  {
    "title": "Heritage Home",
    "location": "Pune Camp",
    "price": 18000000,
    "description": "Charming 3BHK villa with colonial architecture.",
    "imageUrl": "/images/villa12.jpg",
    "brokerName": "Anit Padda",
    "brokerEmail": "vidya.nk07@gmail.com",
    "brokerPhone": "919920155441",
    "rent": 14000,
    "type": "IndependentHouse/Villa"
  }

];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  await Property.deleteMany(); // Clear existing data
  await Property.insertMany(properties);
  console.log('Sample properties inserted!');
  process.exit();
}).catch(err => console.error(err));
