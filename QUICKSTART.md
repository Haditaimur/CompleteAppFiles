# 🚀 Quick Reference Guide

## Fastest Way to Get Started

### Local Testing (5 minutes)
```bash
cd hotel-maintenance-app
npm install
npx prisma db push
npm run dev
```
Open http://localhost:3000

### Deploy to Vercel (15 minutes)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Setup Database** (choose one)
   - Vercel Postgres: vercel.com → Storage → Create Database → Postgres
   - Supabase: supabase.com → New Project → Get connection string
   - Railway: railway.app → New Project → PostgreSQL

3. **Deploy on Vercel**
   - Go to vercel.com
   - Import your GitHub repo
   - Add environment variable: `DATABASE_URL` = your postgres URL
   - Click Deploy

4. **Initialize Database**
   ```bash
   npm i -g vercel
   vercel login
   vercel link
   vercel env pull
   npx prisma db push
   ```

Done! Your app is live 🎉

---

## Key Features

✅ Create maintenance requests
✅ Real-time dashboard with statistics
✅ Filter by status and priority
✅ Assign technicians
✅ Track completion status
✅ Mobile responsive design

---

## Project Structure

```
hotel-maintenance-app/
├── app/
│   ├── api/          # API routes
│   ├── page.tsx      # Main UI
│   └── layout.tsx    # App layout
├── prisma/
│   └── schema.prisma # Database schema
├── types/            # TypeScript types
└── lib/              # Utilities
```

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npx prisma db push       # Sync database schema
npx prisma studio        # Open database GUI
npx prisma generate      # Generate Prisma client

# Deployment
vercel                   # Deploy to Vercel
vercel env pull          # Pull environment variables
git push                 # Auto-deploy (after initial setup)
```

---

## Environment Variables

**Local (.env.local):**
```env
DATABASE_URL="file:./dev.db"
```

**Production (Vercel):**
```env
DATABASE_URL="postgresql://..."
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/requests | Get all requests |
| POST | /api/requests | Create request |
| GET | /api/requests/[id] | Get one request |
| PATCH | /api/requests/[id] | Update request |
| DELETE | /api/requests/[id] | Delete request |
| GET | /api/stats | Get statistics |

---

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL / SQLite
- **ORM:** Prisma
- **Deployment:** Vercel

---

## Troubleshooting

**Problem:** Can't connect to database
- Check DATABASE_URL is correct
- Verify database is running
- Try adding `?sslmode=require` to connection string

**Problem:** Prisma errors
- Run `npx prisma generate`
- Clear .next folder: `rm -rf .next`
- Rebuild: `npm run build`

**Problem:** Deploy fails
- Check Vercel logs
- Verify environment variables are set
- Ensure code builds locally first

---

## Next Steps

1. ✅ Test locally
2. ✅ Deploy to Vercel
3. 📧 Add email notifications
4. 🔐 Add authentication
5. 📱 Create mobile app
6. 📊 Advanced analytics

---

## Support

- 📖 Full docs: See README.md
- 🚀 Deployment: See DEPLOYMENT.md
- 🐛 Issues: Create GitHub issue
- 💬 Questions: Check Vercel/Prisma docs

---

**Made with ❤️ for efficient hotel maintenance management**
