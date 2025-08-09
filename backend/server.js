const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes'); 
const projectRoutes = require('./routes/projectRoutes'); // Importing project routes
const enquiryRoutes = require("./routes/enquiryRoutes.js");
const partnerRoutes = require("./routes/partnerRoutes.js"); // Importing partner routes
const testimonialRoutes = require('./routes/testimonialRoutes'); // Importing testimonial routes
const mediaRoutes = require('./routes/mediaRoutes'); // Importing media routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => { 
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });


// Routes
app.use('/api/auth', userRoutes); // single endpoint for user & admin auth 
app.use('/api/projects', projectRoutes); // Project categories and projects routes
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/partners", partnerRoutes);
app.use('/api/testimonials', testimonialRoutes); // Testimonial routes
app.use('/api/media', mediaRoutes); // Media routes

app.use('/', (req, res) => {
    res.send('Welcome to the Goklyn Backend');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));