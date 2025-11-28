# 🎯 Command Reference Cheat Sheet

Quick reference for all commands you'll need.

---

## 📦 Initial Setup

```bash
# Navigate to project
cd hotel-maintenance-app

# Install dependencies
npm install

# Setup local database
npx prisma db push

# Start development server
npm run dev
```

---

## 🚀 Development

### Start Dev Server
```bash
npm run dev
# Opens at http://localhost:3000
# Hot reload enabled
```

### Build for Production
```bash
npm run build
# Creates optimized production build
```

### Start Production Server (Local)
```bash
npm start
# Must run 'npm run build' first
```

### Run Type Checking
```bash
npx tsc --noEmit
# Check for TypeScript errors
```

---

## 🗄️ Database Commands

### Push Schema Changes
```bash
npx prisma db push
# Sync database with schema
# Use for development
```

### Generate Prisma Client
```bash
npx prisma generate
# Regenerate Prisma client after schema changes
```

### Open Database GUI
```bash
npx prisma studio
# Opens at http://localhost:5555
# Visual database browser
```

### Reset Database (DANGER!)
```bash
npx prisma db push --force-reset
# Deletes all data and recreates database
# Use with caution!
```

### View Database
```bash
# For SQLite (local dev)
sqlite3 dev.db
# Then: .tables, .schema, SELECT * FROM MaintenanceRequest;
```

---

## 📝 Git Commands

### Initialize Repository
```bash
git init
git add .
git commit -m "Initial commit"
```

### Connect to GitHub
```bash
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```

### Regular Commits
```bash
git add .
git commit -m "Description of changes"
git push
```

### Check Status
```bash
git status
# See what files changed
```

### View History
```bash
git log --oneline
# See commit history
```

---

## 🌐 Vercel Deployment

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login to Vercel
```bash
vercel login
```

### Link Project
```bash
vercel link
# Follow prompts
```

### Pull Environment Variables
```bash
vercel env pull
# Downloads .env.local from Vercel
```

### Deploy to Production
```bash
vercel --prod
# Manual deployment (usually auto on git push)
```

### View Deployment Info
```bash
vercel inspect
```

---

## 🔧 Prisma Commands (Advanced)

### Create Migration
```bash
npx prisma migrate dev --name description
# Creates a migration file
# For production use
```

### Apply Migrations
```bash
npx prisma migrate deploy
# Apply migrations in production
```

### Format Schema
```bash
npx prisma format
# Auto-format schema.prisma file
```

---

## 🧹 Cleanup Commands

### Remove node_modules
```bash
rm -rf node_modules
npm install
# Fresh install
```

### Clean Build
```bash
rm -rf .next
npm run build
# Fresh build
```

### Remove Database
```bash
rm dev.db dev.db-journal
npx prisma db push
# Fresh database
```

---

## 🔍 Debugging Commands

### Check Node Version
```bash
node --version
# Should be 18+
```

### Check npm Version
```bash
npm --version
```

### View Build Output
```bash
npm run build
# See any build errors
```

### Check for Lint Errors
```bash
npm run lint
# ESLint check (if configured)
```

### View Package Info
```bash
npm list
# See all installed packages
```

---

## 📊 Database Queries (Prisma Studio)

Open Prisma Studio first:
```bash
npx prisma studio
```

Then use the GUI to:
- View all records
- Filter and search
- Edit data
- Delete records
- Export data

---

## 🎨 Customization Commands

### Add New Package
```bash
npm install package-name
# Example: npm install date-fns
```

### Remove Package
```bash
npm uninstall package-name
```

### Update All Packages
```bash
npm update
```

### Check for Outdated Packages
```bash
npm outdated
```

---

## 🐛 Troubleshooting Commands

### Clear npm Cache
```bash
npm cache clean --force
```

### Rebuild Everything
```bash
rm -rf node_modules .next
npm install
npx prisma generate
npm run build
```

### Check Port Usage
```bash
# If port 3000 is in use
lsof -ti:3000
# Kill process: kill -9 $(lsof -ti:3000)
```

### View Error Logs
```bash
# Check terminal output
# Or check browser console (F12)
```

---

## 📱 Testing Commands

### Test Local Build
```bash
npm run build
npm start
# Test production build locally
```

### Test Database Connection
```bash
npx prisma db pull
# Test connection to database
```

---

## 🔐 Environment Commands

### Copy Example Env
```bash
cp .env.example .env.local
# Create local environment file
```

### View Environment Variables (Vercel)
```bash
vercel env ls
# List all env vars in Vercel
```

### Add Environment Variable (Vercel)
```bash
vercel env add DATABASE_URL
# Follow prompts
```

---

## 📦 Quick Start Script

### Make Executable
```bash
chmod +x start.sh
```

### Run Script
```bash
./start.sh
# Automated setup and start
```

---

## 🎯 Most Common Workflow

### Daily Development
```bash
# Start working
npm run dev

# Make changes to code
# Browser auto-refreshes

# When done
git add .
git commit -m "What I changed"
git push
# Vercel auto-deploys
```

### After Schema Changes
```bash
# Edit prisma/schema.prisma
npx prisma db push
npx prisma generate
npm run dev
```

### Before Deployment
```bash
# Test build locally
npm run build
npm start

# If good
git push
# Vercel handles the rest
```

---

## 🚨 Emergency Commands

### Something Broke - Full Reset
```bash
# 1. Clean everything
rm -rf node_modules .next dev.db dev.db-journal

# 2. Fresh install
npm install

# 3. Reset database
npx prisma db push

# 4. Regenerate client
npx prisma generate

# 5. Test
npm run dev
```

### Database is Corrupted
```bash
rm dev.db dev.db-journal
npx prisma db push
# Recreates fresh database (all data lost!)
```

### Build Fails
```bash
# Check for errors
npm run build

# Check TypeScript
npx tsc --noEmit

# Regenerate Prisma
npx prisma generate

# Try again
npm run build
```

---

## 📚 Help Commands

### Vercel Help
```bash
vercel --help
vercel deploy --help
```

### Prisma Help
```bash
npx prisma --help
npx prisma db --help
```

### npm Help
```bash
npm help
npm run --help
```

---

## 💡 Pro Tips

```bash
# Install packages faster
npm install --legacy-peer-deps

# Run in background (Linux/Mac)
npm run dev &

# Check what's running on port 3000
lsof -i :3000

# Watch for file changes
watch ls -la app/

# Count lines of code
find . -name '*.tsx' -o -name '*.ts' | xargs wc -l

# Search for text in files
grep -r "search term" app/

# See folder size
du -sh hotel-maintenance-app/
```

---

## 🎓 Learning Commands

### Explore Next.js
```bash
npx create-next-app --help
# See available options
```

### Explore Prisma
```bash
npx prisma --help
# See all Prisma commands
```

### Package Scripts
```bash
npm run
# See all available scripts
```

---

**Bookmark this file for quick reference!** 🔖
