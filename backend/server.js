const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'], // Vite dev server and React dev server
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample product data
const products = [
  {
    id: "1",
    name: "Elegant Summer Dress",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=center",
    category: "dresses"
  },
  {
    id: "2", 
    name: "Classic Denim Jacket",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop&crop=center",
    category: "outerwear"
  },
  {
    id: "3",
    name: "Luxury Silk Scarf",
    price: 45.99,
    imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=600&fit=crop&crop=center",
    category: "accessories"
  },
  {
    id: "4",
    name: "Designer Handbag",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=600&fit=crop&crop=center",
    category: "accessories"
  },
  {
    id: "5",
    name: "Casual Sneakers",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop&crop=center",
    category: "shoes"
  },
  {
    id: "6",
    name: "Vintage Sunglasses",
    price: 65.99,
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=600&fit=crop&crop=center",
    category: "accessories"
  }
];

// File path for storing newsletter subscriptions
const subscribersFile = path.join(__dirname, 'subscribers.json');

// Helper function to read subscribers
const readSubscribers = () => {
  try {
    if (fs.existsSync(subscribersFile)) {
      const data = fs.readFileSync(subscribersFile, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading subscribers file:', error);
    return [];
  }
};

// Helper function to write subscribers
const writeSubscribers = (subscribers) => {
  try {
    fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing subscribers file:', error);
    return false;
  }
};

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get all products
app.get('/api/products', (req, res) => {
  try {
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Newsletter subscription endpoint
app.post('/api/subscribe', (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Read existing subscribers
    const subscribers = readSubscribers();

    // Check for duplicates
    const existingSubscriber = subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase());
    if (existingSubscriber) {
      return res.status(409).json({
        success: false,
        error: 'Email is already subscribed to our newsletter'
      });
    }

    // Add new subscriber
    const newSubscriber = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString()
    };

    subscribers.push(newSubscriber);

    // Save to file
    if (!writeSubscribers(subscribers)) {
      return res.status(500).json({
        success: false,
        error: 'Failed to save subscription'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: {
        email: newSubscriber.email,
        subscribedAt: newSubscriber.subscribedAt
      }
    });

  } catch (error) {
    console.error('Error processing subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get subscriber count (optional endpoint for admin)
app.get('/api/subscribers/count', (req, res) => {
  try {
    const subscribers = readSubscribers();
    res.json({
      success: true,
      count: subscribers.length
    });
  } catch (error) {
    console.error('Error getting subscriber count:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Betternship Fashion API server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
  console.log(`📧 Newsletter API: http://localhost:${PORT}/api/subscribe`);
});

module.exports = app;
