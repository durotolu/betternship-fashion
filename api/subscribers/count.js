// In-memory storage for demo purposes
// In production, you should use a database like Vercel KV, PostgreSQL, or MongoDB
// This should be synchronized with the subscribers array in subscribe.js
// For a real application, use a shared database

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
    return;
  }

  try {
    // For demo purposes, return 0
    // In production, this should query your database
    res.status(200).json({
      success: true,
      count: 0
    });
  } catch (error) {
    console.error('Error getting subscriber count:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
