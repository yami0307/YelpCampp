const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
  }
  const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp'

mongoose.connect(dbUrl, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20 + 10);
        const camp = new Campground({
            author: '6592f21b4fdea8711b679185',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque nemo obcaecati perspiciatis, animi alias esse iste nesciunt quibusdam rem. Exercitationem, quidem eos illo sit dolores maxime iusto dicta quia facilis.',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [ 
                    cities[random1000].longitude, 
                    cities[random1000].latitude,
                ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dollevvcn/image/upload/v1703951155/YelpCamp/yxomojweibp6rnkunf7f.jpg',
                  filename: 'YelpCamp/yxomojweibp6rnkunf7f',
                },
                {
                  url: 'https://res.cloudinary.com/dollevvcn/image/upload/v1703951154/YelpCamp/v5qdeyitfrgn9zmmmue7.jpg',
                  filename: 'YelpCamp/v5qdeyitfrgn9zmmmue7',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
