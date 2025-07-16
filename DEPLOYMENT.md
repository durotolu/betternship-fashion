# Vercel Deployment Guide for Betternship Fashion

This guide provides comprehensive instructions for deploying your monorepo to Vercel.

## Project Structure

```
betternship-fashion/
├── frontend/                 # React + Vite application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json          # Frontend-specific config
├── backend/                 # Original Express.js server (for local dev)
│   ├── server.js
│   └── package.json
├── api/                     # Vercel Functions (serverless)
│   ├── health.js
│   ├── products.js
│   ├── subscribe.js
│   └── subscribers/
│       └── count.js
├── vercel.json              # Main deployment config
├── .env.example             # Environment variables template
└── DEPLOYMENT.md            # This file
```

## Deployment Options

### Option 1: Deploy Frontend Only (Recommended for MVP)

This is the simplest approach - deploy just the frontend with static data.

1. **Create a new Vercel project:**

   ```bash
   vercel --cwd frontend
   ```

2. **Configure the project:**

   - Root Directory: `frontend`
   - Framework: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Set environment variables in Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add `VITE_API_URL` (leave empty for relative URLs)

### Option 2: Deploy Full-Stack Application

Deploy both frontend and backend as a unified application.

1. **Deploy from repository root:**

   ```bash
   vercel
   ```

2. **Configure monorepo settings:**
   - Root Directory: `.` (repository root)
   - Framework: `Other`
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`

## Step-by-Step Deployment Instructions

### 1. Prepare Your Repository

1. **Ensure all configuration files are in place:**

   - ✅ `vercel.json` (root level)
   - ✅ `frontend/vercel.json`
   - ✅ API functions in `/api` directory

2. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

3. **Login to Vercel:**
   ```bash
   vercel login
   ```

### 2. Deploy via Vercel Dashboard (Recommended)

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Import your repository:**

   - Click "Add New..." → "Project"
   - Import your Git repository
   - Select the repository

3. **Configure deployment settings:**

   - **Framework Preset:** Other
   - **Root Directory:** `.` (for full-stack) or `frontend` (frontend-only)
   - **Build Command:**
     - Full-stack: `cd frontend && npm install && npm run build`
     - Frontend-only: `npm run build`
   - **Output Directory:**
     - Full-stack: `frontend/dist`
     - Frontend-only: `dist`

4. **Set environment variables:**

   - Go to Project Settings → Environment Variables
   - Add any required variables from `.env.example`

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete

### 3. Deploy via CLI

```bash
# From repository root
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your team/account)
# - Link to existing project? No
# - Project name: betternship-fashion
# - Directory: ./ (or frontend/ for frontend-only)
```

## Environment Variables

### Required Variables

For production deployment, you may want to set:

```bash
# Frontend variables
VITE_API_URL=              # Leave empty for same-domain API calls

# Optional analytics
VITE_ANALYTICS_ID=your_id
```

### Setting Environment Variables

1. **Via Vercel Dashboard:**

   - Project Settings → Environment Variables
   - Add variables for Production, Preview, and Development

2. **Via CLI:**
   ```bash
   vercel env add VITE_API_URL
   # Enter value when prompted
   ```

## API Endpoints

After deployment, your API will be available at:

- `https://your-domain.vercel.app/api/health`
- `https://your-domain.vercel.app/api/products`
- `https://your-domain.vercel.app/api/subscribe`
- `https://your-domain.vercel.app/api/subscribers/count`

## Database Considerations

The current setup uses in-memory storage for the newsletter subscriptions, which means:

- ⚠️ **Data is not persistent** across function invocations
- ⚠️ **Subscribers will be lost** when functions restart

### Recommended Database Solutions

1. **Vercel KV (Redis):**

   ```bash
   vercel kv create newsletter-db
   ```

2. **Vercel Postgres:**

   ```bash
   vercel postgres create newsletter-db
   ```

3. **External Database:**
   - MongoDB Atlas
   - PlanetScale
   - Supabase

## Custom Domain Setup

1. **Add domain in Vercel Dashboard:**

   - Project Settings → Domains
   - Add your custom domain

2. **Configure DNS:**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or use Vercel nameservers

## Monitoring and Analytics

1. **Enable Vercel Analytics:**

   - Project Settings → Analytics
   - Install `@vercel/analytics` package

2. **Monitor Functions:**
   - Functions tab in dashboard
   - View logs and performance metrics

## Troubleshooting

### Common Issues

1. **Build Failures:**

   ```bash
   # Check build logs in Vercel Dashboard
   # Ensure all dependencies are in package.json
   # Verify build commands are correct
   ```

2. **API Not Working:**

   - Check function logs in Vercel Dashboard
   - Verify CORS headers are set correctly
   - Ensure API routes match your frontend calls

3. **Environment Variables:**
   - Ensure variables are set for correct environment
   - Redeploy after adding new variables
   - Check variable names match exactly

### Getting Help

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Support](https://vercel.com/help)

## Next Steps

1. **Set up a database** for persistent data storage
2. **Configure custom domain** for your application
3. **Set up monitoring** and analytics
4. **Implement CI/CD** with GitHub Actions (optional)
5. **Add error tracking** with Sentry or similar service

## Local Development

### Quick Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd betternship-fashion

# Run the setup script (installs all dependencies and creates env files)
npm run setup

# Start development servers
npm run dev
```

### Manual Setup

```bash
# Install dependencies
npm install
cd frontend && npm install
cd ../backend && npm install

# Create environment files
cp .env.example .env.local
cp frontend/.env.example frontend/.env.local

# Start backend (terminal 1)
cd backend && npm run dev

# Start frontend (terminal 2)
cd frontend && npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3001`.

### Available Scripts

- `npm run setup` - Install all dependencies and set up environment files
- `npm run dev` - Start both frontend and backend concurrently
- `npm run dev:frontend` - Start only the frontend development server
- `npm run dev:backend` - Start only the backend development server
- `npm run build` - Build the frontend for production
- `npm run lint` - Run ESLint on the frontend code
