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
    res.status(200).json({
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
}
