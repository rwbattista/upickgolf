#!/bin/bash

# 🆓 uPickGolf Free Deployment Script
# Run this script to deploy your app for free!

echo "🏌️ uPickGolf Free Deployment Starting..."

# Check if required tools are installed
command -v git >/dev/null 2>&1 || { echo "❌ Git is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting." >&2; exit 1; }

echo "✅ Prerequisites check passed"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
fi

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "🔧 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit for uPickGolf"
    
    echo "📝 Please create a GitHub repository and run:"
    echo "git remote add origin https://github.com/rwbattista/upickgolf.git"
    echo "git push -u origin main"
    echo ""
    echo "Then run this script again to continue deployment."
    exit 0
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set up Supabase database (see FREE_DEPLOYMENT_GUIDE.md)"
echo "2. Configure EmailJS for notifications"
echo "3. Add environment variables in Vercel dashboard"
echo "4. Test your live application"
echo ""
echo "💡 Your app will be available at: https://upickgolf.vercel.app"
echo "📖 Full guide: FREE_DEPLOYMENT_GUIDE.md" 