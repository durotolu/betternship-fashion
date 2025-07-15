# Betternship Fashion - Complete Fashion Brand Landing Page

A professional-quality, full-stack fashion brand landing page application built with modern web technologies. This project demonstrates a complete e-commerce-style landing page with both frontend and backend components.

## 🌟 Features

### Frontend Features
- **Hero Section**: Compelling brand presentation with smooth scrolling navigation
- **Product Showcase**: Responsive grid displaying 6 fashion items with hover effects
- **About Section**: Engaging brand story with company values and statistics
- **Newsletter Signup**: Email validation with success/error states and UX feedback
- **Responsive Design**: Mobile-first approach supporting all device sizes
- **Modern Styling**: Tailwind CSS with custom design system and animations

### Backend Features
- **Products API**: RESTful endpoint serving fashion product data
- **Newsletter API**: Email subscription with validation and duplicate prevention
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Error Handling**: Comprehensive error responses with appropriate HTTP status codes
- **Data Persistence**: JSON file storage for newsletter subscriptions

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite 5.4.2** - Fast build tool and dev server
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Modern JavaScript (ES6+)** - Latest language features

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.18** - Web application framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Nodemon** - Development auto-restart

## 📁 Project Structure

```
betternship-fashion/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Hero.jsx     # Hero section component
│   │   │   ├── ProductShowcase.jsx  # Product grid component
│   │   │   ├── About.jsx    # About section component
│   │   │   ├── Newsletter.jsx       # Newsletter signup component
│   │   │   └── Footer.jsx   # Footer component
│   │   ├── services/        # API service layer
│   │   │   └── api.js       # API communication service
│   │   ├── App.jsx          # Main application component
│   │   ├── main.jsx         # Application entry point
│   │   └── index.css        # Global styles with Tailwind
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.js   # Tailwind configuration
│   ├── postcss.config.js    # PostCSS configuration
│   └── vite.config.js       # Vite configuration
├── backend/                 # Node.js backend API
│   ├── server.js           # Express server and API routes
│   ├── package.json        # Backend dependencies
│   ├── subscribers.json    # Newsletter subscribers storage (auto-generated)
│   └── .gitignore         # Backend gitignore
├── README.md              # This file
└── LICENSE               # Project license
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd betternship-fashion
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the Backend Server**
   ```bash
   cd ../backend
   npm run dev
   ```
   The backend will start on `http://localhost:3001`

5. **Start the Frontend Development Server**
   ```bash
   cd ../frontend
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`

6. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Production Build

To build the frontend for production:

```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` directory.

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### Health Check
- **GET** `/health`
- **Description**: Check if the API server is running
- **Response**:
  ```json
  {
    "status": "OK",
    "timestamp": "2025-07-15T21:47:02.991Z"
  }
  ```

#### Get Products
- **GET** `/products`
- **Description**: Retrieve all fashion products
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "1",
        "name": "Elegant Summer Dress",
        "price": 129.99,
        "imageUrl": "https://images.unsplash.com/photo-...",
        "category": "dresses"
      }
    ],
    "count": 6
  }
  ```

#### Newsletter Subscription
- **POST** `/subscribe`
- **Description**: Subscribe an email to the newsletter
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "success": true,
    "message": "Successfully subscribed to newsletter!",
    "data": {
      "email": "user@example.com",
      "subscribedAt": "2025-07-15T21:47:02.991Z"
    }
  }
  ```
- **Error Responses**:
  - **400**: Invalid email or missing email
  - **409**: Email already subscribed
  - **500**: Server error

#### Get Subscriber Count
- **GET** `/subscribers/count`
- **Description**: Get total number of newsletter subscribers
- **Response**:
  ```json
  {
    "success": true,
    "count": 42
  }
  ```

## 🏗 Architecture Overview

### Frontend Architecture
- **Component-Based**: Modular React components for maintainability
- **Service Layer**: Centralized API communication through `api.js`
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: React hooks for local component state
- **Error Handling**: Comprehensive error boundaries and user feedback

### Backend Architecture
- **RESTful API**: Clean, predictable API endpoints
- **Middleware Stack**: Security, logging, and CORS handling
- **Data Storage**: JSON file storage for simplicity (easily replaceable)
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Validation**: Input validation and sanitization

### Communication Flow
```
Frontend (React) ←→ API Service ←→ Backend (Express) ←→ JSON Storage
```

## 🎨 Design System

### Color Palette
- **Primary**: Pink/Rose tones (#ec4899, #db2777, #be185d)
- **Neutral**: Grayscale (#171717 to #fafafa)
- **Semantic**: Success, error, and warning colors

### Typography
- **Primary Font**: Inter (sans-serif)
- **Display Font**: Playfair Display (serif)
- **Responsive Scaling**: Mobile-first typography scale

### Responsive Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1199px
- **Desktop**: 1200px+

## 🧪 Testing

### Manual Testing Checklist

#### Frontend Testing
- [ ] Hero section displays correctly on all screen sizes
- [ ] Product grid loads and displays 6 items
- [ ] Product images load with fallback handling
- [ ] Newsletter form validates email addresses
- [ ] Newsletter form shows success/error states
- [ ] Smooth scrolling navigation works
- [ ] Responsive design works on mobile, tablet, and desktop

#### Backend Testing
- [ ] Health check endpoint responds correctly
- [ ] Products API returns all 6 products
- [ ] Newsletter subscription accepts valid emails
- [ ] Newsletter subscription rejects invalid emails
- [ ] Newsletter subscription prevents duplicates
- [ ] CORS headers allow frontend communication

#### Integration Testing
- [ ] Frontend successfully fetches products from backend
- [ ] Newsletter subscription works end-to-end
- [ ] Error handling displays appropriate messages
- [ ] Loading states show during API calls

### API Testing with curl

Test the backend endpoints:

```bash
# Health check
curl http://localhost:3001/api/health

# Get products
curl http://localhost:3001/api/products

# Subscribe to newsletter
curl -X POST http://localhost:3001/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Get subscriber count
curl http://localhost:3001/api/subscribers/count
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
```

#### Backend
The backend uses default configurations but can be customized with environment variables:
```env
PORT=3001
NODE_ENV=development
```

### Customization

#### Adding New Products
Edit `backend/server.js` and modify the `products` array:

```javascript
const products = [
  {
    id: "7",
    name: "New Fashion Item",
    price: 99.99,
    imageUrl: "https://example.com/image.jpg",
    category: "new-category"
  }
  // ... existing products
];
```

#### Styling Customization
Modify `frontend/tailwind.config.js` to customize colors, fonts, and spacing:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color palette
      }
    }
  }
}
```

## 🚀 Deployment

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)
3. Update the API URL in environment variables

### Backend Deployment
1. Deploy to a Node.js hosting service (Heroku, Railway, DigitalOcean, etc.)
2. Set environment variables for production
3. Consider using a proper database instead of JSON files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** - Product images
- **Google Fonts** - Typography (Inter & Playfair Display)
- **Tailwind CSS** - Styling framework
- **React** - Frontend framework
- **Express** - Backend framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Review this README for common solutions
3. Create a new issue with detailed information

---

**Built with ❤️ for modern web development**