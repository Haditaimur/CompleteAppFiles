# Hotel Maintenance App

A complete hotel maintenance request management system built with Next.js 14, React, TypeScript, Prisma, and Tailwind CSS.

## Features

- 📝 Create and manage maintenance requests
- 🏨 Track room-specific issues
- 📊 Real-time statistics dashboard
- 🔍 Filter by status and priority
- 👥 Assign technicians to requests
- 🎨 Beautiful, responsive UI
- ⚡ Fast performance with Next.js 14

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Production) / SQLite (Development)
- **ORM:** Prisma
- **Icons:** Lucide React

## Quick Start (Local Development)

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or extract the project:
```bash
cd hotel-maintenance-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database (SQLite for local dev):
```bash
npx prisma db push
```

4. (Optional) Seed the database with sample data:
```bash
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Step 1: Prepare Your Project

1. Create a GitHub repository and push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Set Up Database

You have two options for the database:

#### Option A: Vercel Postgres (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to Storage → Create Database → Postgres
3. Copy the connection strings provided

#### Option B: External PostgreSQL

Use any PostgreSQL provider:
- [Supabase](https://supabase.com) (Free tier available)
- [Railway](https://railway.app) (Free tier available)
- [Neon](https://neon.tech) (Free tier available)
- [ElephantSQL](https://www.elephantsql.com)

### Step 3: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure your project:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** .next (default)

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add: `DATABASE_URL` with your PostgreSQL connection string
   - If using Vercel Postgres, also add:
     - `POSTGRES_PRISMA_URL`
     - `POSTGRES_URL_NON_POOLING`

6. Click "Deploy"

### Step 4: Initialize Database

After deployment:

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Ensure DATABASE_URL is set correctly
4. In your local terminal, run:
```bash
# Set your production database URL
export DATABASE_URL="your_vercel_postgres_url"

# Push the schema to production
npx prisma db push
```

Or use Vercel CLI:
```bash
npm i -g vercel
vercel env pull
npx prisma db push
```

## Database Schema

The app uses a single `MaintenanceRequest` model:

```prisma
model MaintenanceRequest {
  id          String   @id @default(cuid())
  roomNumber  String
  category    String   // plumbing, electrical, hvac, etc.
  priority    String   // low, medium, high, urgent
  description String
  status      String   // pending, in-progress, completed, cancelled
  createdBy   String
  assignedTo  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  resolvedAt  DateTime?
  notes       String?
}
```

## API Routes

- `GET /api/requests` - Get all requests (supports filters)
- `POST /api/requests` - Create new request
- `GET /api/requests/[id]` - Get single request
- `PATCH /api/requests/[id]` - Update request
- `DELETE /api/requests/[id]` - Delete request
- `GET /api/stats` - Get statistics

## Environment Variables

Create a `.env` file for production:

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

For Vercel Postgres, use:
```env
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."
DATABASE_URL="${POSTGRES_PRISMA_URL}"
```

## Switching from SQLite to PostgreSQL

To switch from local SQLite to PostgreSQL:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

2. Update your DATABASE_URL in `.env`

3. Run migrations:
```bash
npx prisma db push
```

## Project Structure

```
hotel-maintenance-app/
├── app/
│   ├── api/
│   │   ├── requests/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── stats/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── prisma.ts
├── prisma/
│   └── schema.prisma
├── types/
│   └── index.ts
├── .env.example
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Common Issues & Solutions

### Issue: "Environment variable not found: DATABASE_URL"
**Solution:** Ensure `.env.local` exists with DATABASE_URL set

### Issue: Prisma Client errors
**Solution:** Run `npx prisma generate` after schema changes

### Issue: Deployment fails on Vercel
**Solution:** 
- Check build logs for specific errors
- Ensure all environment variables are set in Vercel dashboard
- Verify DATABASE_URL is accessible from Vercel

### Issue: Database connection fails
**Solution:**
- Verify connection string format
- Check database is accessible (not behind firewall)
- For Vercel Postgres, use POSTGRES_PRISMA_URL

## Customization

### Adding New Request Categories
Edit `types/index.ts`:
```typescript
export type Category = 
  | 'plumbing'
  | 'electrical'
  | 'your-new-category'
```

### Changing Technician List
Edit the select options in `app/page.tsx` (search for "Assign Technician")

### Modifying Styles
The app uses Tailwind CSS. Colors can be customized in `tailwind.config.js`

## Production Best Practices

1. **Security:**
   - Never commit `.env` files
   - Use environment variables for all secrets
   - Implement authentication (not included in this basic version)

2. **Performance:**
   - Enable Vercel Edge caching
   - Add database indexes for frequently queried fields
   - Consider implementing pagination for large datasets

3. **Monitoring:**
   - Enable Vercel Analytics
   - Set up error tracking (Sentry, LogRocket, etc.)
   - Monitor database performance

## Future Enhancements

- User authentication and authorization
- Email notifications
- File upload for maintenance issues
- Mobile app version
- Advanced reporting and analytics
- Integration with hotel management systems

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions:
1. Check the documentation above
2. Review Vercel deployment logs
3. Check Prisma documentation for database issues
