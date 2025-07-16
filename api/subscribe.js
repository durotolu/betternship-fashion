// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// In-memory storage for demo purposes
// In production, you should use a database like Vercel KV, PostgreSQL, or MongoDB
let subscribers = [];

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
    return;
  }

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
}
