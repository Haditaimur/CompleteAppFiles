#!/bin/bash

echo "🏨 Hotel Maintenance App - Quick Start"
echo "======================================"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed"
echo ""

# Setup database
echo "🗄️  Setting up local database..."
npx prisma db push

if [ $? -ne 0 ]; then
    echo "❌ Failed to set up database"
    exit 1
fi

echo "✓ Database ready"
echo ""

# Start dev server
echo "🚀 Starting development server..."
echo ""
echo "   Your app will be available at: http://localhost:3000"
echo ""
echo "   Press Ctrl+C to stop the server"
echo ""

npm run dev
