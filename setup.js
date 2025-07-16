#!/usr/bin/env node

/**
 * Setup script for Betternship Fashion monorepo
 * This script helps install dependencies and set up the development environment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Betternship Fashion monorepo...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error('❌ Node.js 18 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version:', nodeVersion);

// Install root dependencies
console.log('\n📦 Installing root dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Root dependencies installed');
} catch (error) {
  console.error('❌ Failed to install root dependencies');
  process.exit(1);
}

// Install frontend dependencies
console.log('\n📦 Installing frontend dependencies...');
try {
  execSync('cd frontend && npm install', { stdio: 'inherit', shell: true });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies');
  process.exit(1);
}

// Install backend dependencies
console.log('\n📦 Installing backend dependencies...');
try {
  execSync('cd backend && npm install', { stdio: 'inherit', shell: true });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

// Create environment files if they don't exist
console.log('\n🔧 Setting up environment files...');

const envFiles = [
  { src: '.env.example', dest: '.env.local' },
  { src: 'frontend/.env.example', dest: 'frontend/.env.local' }
];

envFiles.forEach(({ src, dest }) => {
  if (fs.existsSync(src) && !fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Created ${dest} from ${src}`);
  }
});

console.log('\n🎉 Setup complete! Next steps:');
console.log('');
console.log('For local development:');
console.log('  npm run dev              # Start both frontend and backend');
console.log('  npm run dev:frontend     # Start only frontend');
console.log('  npm run dev:backend      # Start only backend');
console.log('');
console.log('For deployment:');
console.log('  1. Push your code to GitHub');
console.log('  2. Connect your repository to Vercel');
console.log('  3. Follow the deployment guide in DEPLOYMENT.md');
console.log('');
console.log('📖 Read DEPLOYMENT.md for detailed deployment instructions');
console.log('🌐 Frontend will be available at: http://localhost:5173');
console.log('🔌 Backend will be available at: http://localhost:3001');
