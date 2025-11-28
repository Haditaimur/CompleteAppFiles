# Complete Deployment Guide

## Overview
This guide will walk you through deploying your Hotel Maintenance App to Vercel with a production database.

---

## Part 1: Local Testing (Do This First!)

### 1. Install Dependencies
```bash
cd hotel-maintenance-app
npm install
```

### 2. Initialize Local Database
```bash
npx prisma db push
```

This creates a local SQLite database (`dev.db`) for testing.

### 3. Start Development Server
```bash
npm run dev
```

### 4. Test Locally
- Open http://localhost:3000
- Create a few test maintenance requests
- Test filtering and status updates
- Verify everything works before deploying

---

## Part 2: Prepare for Deployment

### 1. Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Hotel Maintenance App"

# Create a new repository on GitHub (github.com/new)
# Then connect it:
git remote add origin https://github.com/YOUR_USERNAME/hotel-maintenance-app.git
git branch -M main
git push -u origin main
```

### 2. Update Prisma for PostgreSQL

Before deploying, we need to switch from SQLite to PostgreSQL.

Edit `prisma/schema.prisma`, change line 7:
```prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

Commit this change:
```bash
git add prisma/schema.prisma
git commit -m "Update database provider to PostgreSQL"
git push
```

---

## Part 3: Set Up Database

### Option A: Vercel Postgres (Easiest for Vercel deployment)

1. Go to https://vercel.com/dashboard
2. Click "Storage" in the top menu
3. Click "Create Database"
4. Choose "Postgres"
5. Name it: `hotel-maintenance-db`
6. Select your preferred region
7. Click "Create"

**Important:** Copy these environment variables (you'll need them later):
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

### Option B: Supabase (Good free alternative)

1. Go to https://supabase.com
2. Create account and new project
3. Wait for database to provision
4. Go to Settings → Database
5. Copy the connection string (URI format)
6. Replace `[YOUR-PASSWORD]` with your actual password

Example:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

### Option C: Railway (Another good free option)

1. Go to https://railway.app
2. Create account
3. Click "New Project" → "Provision PostgreSQL"
4. Click on the database
5. Go to "Connect" tab
6. Copy the "Postgres Connection URL"

---

## Part 4: Deploy to Vercel

### 1. Connect GitHub to Vercel

1. Go to https://vercel.com
2. Sign in (use GitHub to sign in)
3. Click "Add New..." → "Project"
4. Find and select your `hotel-maintenance-app` repository
5. Click "Import"

### 2. Configure Project

On the import screen:

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** Leave as `./`

**Build and Output Settings:** Leave as default

### 3. Add Environment Variables

Click "Environment Variables" section and add:

#### If using Vercel Postgres:
- Variable: `POSTGRES_URL`
  - Value: [paste from Vercel Postgres]
  
- Variable: `POSTGRES_PRISMA_URL`
  - Value: [paste from Vercel Postgres]
  
- Variable: `POSTGRES_URL_NON_POOLING`
  - Value: [paste from Vercel Postgres]
  
- Variable: `DATABASE_URL`
  - Value: `${POSTGRES_PRISMA_URL}`

#### If using Supabase or Railway:
- Variable: `DATABASE_URL`
  - Value: [paste your PostgreSQL connection string]

### 4. Deploy

Click "Deploy"

Wait 2-3 minutes for deployment to complete.

---

## Part 5: Initialize Production Database

After deployment succeeds:

### Method 1: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Pull environment variables
vercel env pull

# Push database schema
npx prisma db push

# Optional: Generate Prisma client
npx prisma generate
```

### Method 2: Manual Setup

```bash
# Set the production database URL
export DATABASE_URL="your_production_postgres_url_here"

# Push the schema
npx prisma db push
```

---

## Part 6: Verify Deployment

1. Go to your Vercel dashboard
2. Click on your project
3. Click "Visit" to open your deployed app
4. Test creating a maintenance request
5. Verify it saves and appears in the list

---

## Troubleshooting

### "Environment variable not found: DATABASE_URL"

**Solution:**
- Check Vercel dashboard → Your Project → Settings → Environment Variables
- Ensure DATABASE_URL is set
- Redeploy the project

### "Can't reach database server"

**Solution:**
- Verify database connection string is correct
- Check database is running (for Supabase/Railway)
- Ensure no IP restrictions on database
- Try connection string with `?sslmode=require` at the end

### Build fails with TypeScript errors

**Solution:**
```bash
# Locally, run:
npm run build

# Fix any errors shown
# Then commit and push
git add .
git commit -m "Fix build errors"
git push
```

### Prisma Client errors

**Solution:**
- Redeploy from Vercel dashboard
- Or add build command in vercel.json:
```json
{
  "buildCommand": "npx prisma generate && npm run build"
}
```

### Database is empty after deployment

**Solution:**
- You need to run `npx prisma db push` as shown in Part 5
- The deployment doesn't automatically create tables

---

## Monitoring Your App

### View Logs
1. Vercel Dashboard → Your Project
2. Click "Deployments"
3. Click on latest deployment
4. Click "View Function Logs"

### Check Database
- **Vercel Postgres:** Dashboard → Storage → Your Database → Data
- **Supabase:** Project → Table Editor
- **Railway:** Database → Data

---

## Update Your App

To make changes:

```bash
# Make your code changes
# Test locally first
npm run dev

# Commit and push
git add .
git commit -m "Description of changes"
git push

# Vercel automatically redeploys on push!
```

---

## Production Checklist

- [ ] Local testing complete
- [ ] GitHub repository created
- [ ] Database created (Vercel/Supabase/Railway)
- [ ] Environment variables set in Vercel
- [ ] Project deployed to Vercel
- [ ] Database schema pushed (`prisma db push`)
- [ ] Test creating requests in production
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic with Vercel)

---

## Next Steps

### Add Custom Domain (Optional)

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

### Enable Analytics

1. Vercel Dashboard → Your Project → Analytics
2. Click "Enable"

### Add Authentication (Future Enhancement)

Consider adding:
- NextAuth.js for authentication
- Role-based access control
- Protected API routes

---

## Cost Estimates

### Free Tier Limits:
- **Vercel:** 100GB bandwidth/month, unlimited requests
- **Vercel Postgres:** 256MB storage, 60 hours compute
- **Supabase:** 500MB database, 2GB bandwidth
- **Railway:** $5 free credit/month

All are sufficient for small to medium hotel operations!

---

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Supabase Docs: https://supabase.com/docs

---

**Questions?** Check the main README.md or create an issue in your GitHub repository.
