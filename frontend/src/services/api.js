const API_BASE_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.PROD
    ? '' // Use relative URLs in production (same domain)
    : 'http://localhost:3001' // Use local backend in development
);

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include credentials for CORS
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all products
  async getProducts() {
    return this.request('/api/products');
  }

  // Subscribe to newsletter
  async subscribeNewsletter(email) {
    return this.request('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health');
  }

  // Get subscriber count (optional)
  async getSubscriberCount() {
    return this.request('/api/subscribers/count');
  }
}

export default new ApiService();
