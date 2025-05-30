# 🆓 uPickGolf Free Deployment Guide

Deploy your fantasy golf app with **$0 monthly costs**!

## 📋 Free Services Stack

| Service | Free Tier | What You Get |
|---------|-----------|--------------|
| **Vercel** | Forever Free | Frontend hosting, custom domain |
| **Supabase** | Forever Free | PostgreSQL database + auth |
| **EmailJS** | 200 emails/month | User notifications |
| **ESPN API** | Unlimited | Golf tournament data |
| **GitHub** | Free | Code repository |

## 🚀 Step-by-Step Deployment

### 1. Prepare Your Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Push to GitHub (create repo first on github.com)
git remote add origin https://github.com/yourusername/upickgolf.git
git push -u origin main
```

### 2. Set Up Free Database (Supabase)

1. **Go to [supabase.com](https://supabase.com)** and create free account
2. **Create new project** (choose free tier)
3. **Copy your database schema** from `database-schema.sql`
4. **Run in Supabase SQL Editor**:
   ```sql
   -- Paste your entire database-schema.sql content here
   ```
5. **Get your credentials**:
   - Project URL: `https://your-project.supabase.co`
   - Anon Key: `eyJ...` (from Settings > API)

### 3. Set Up Free Email (EmailJS)

1. **Go to [emailjs.com](https://emailjs.com)** and create account
2. **Create email service** (Gmail, Outlook, etc.)
3. **Create email template**:
   ```
   Subject: Welcome to uPickGolf!
   Body: Hello {{nickname}}, welcome to uPickGolf!
   ```
4. **Get your IDs**:
   - Service ID: `service_xxx`
   - Template ID: `template_xxx`
   - Public Key: `xxx`

### 4. Deploy to Vercel (Free)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: upickgolf
# - Directory: ./
# - Override settings? No

# Deploy to production
vercel --prod
```

### 5. Add Environment Variables

In Vercel dashboard:
1. Go to your project
2. Settings > Environment Variables
3. Add these:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
```

### 6. Update Your Code for Production

Create `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 7. Free Golf Data Integration

Use ESPN's free API in your components:
```typescript
// In your tournaments page
useEffect(() => {
  fetch('https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard')
    .then(res => res.json())
    .then(data => setTournaments(data.events))
}, [])
```

## 🔧 Free Alternatives to Paid Services

### Instead of SportsDataIO ($50/month):
- **ESPN API** (free, unofficial)
- **Manual data entry** (update weekly)
- **Web scraping** with free proxies

### Instead of Stripe ($0.30 per transaction):
- **PayPal** (similar fees but more familiar)
- **Venmo/CashApp** for friends
- **Honor system** for personal use

### Instead of Twilio SMS ($0.0075 per SMS):
- **Browser notifications** (free)
- **Email notifications** only
- **Discord webhooks** for updates

## 📱 Free Domain Options

### Option 1: Vercel Subdomain (Free)
- `upickgolf.vercel.app`
- Instant setup, professional looking

### Option 2: Free Domain (.tk, .ml, .ga)
- Use [Freenom](https://freenom.com)
- Point to Vercel in DNS settings

### Option 3: GitHub Pages + Custom Domain
- If you own a domain, use GitHub Pages
- Point CNAME to your Vercel app

## 🔄 Ongoing Maintenance (Free)

### Weekly Tasks (5 minutes):
1. **Update tournament data** manually in Supabase
2. **Check ESPN API** for new tournaments
3. **Update player rankings** if needed

### Monthly Tasks (10 minutes):
1. **Review Supabase usage** (stay under 500MB)
2. **Check email quota** (200 emails/month)
3. **Update any hardcoded data**

## 📊 Free Tier Limits

| Service | Limit | What Happens When Exceeded |
|---------|-------|----------------------------|
| Supabase | 500MB storage | Need to upgrade or clean data |
| Vercel | 100GB bandwidth | Site temporarily unavailable |
| EmailJS | 200 emails/month | Emails stop sending |
| ESPN API | Rate limited | Temporary API blocks |

## 🚨 Staying Within Free Limits

### Database Optimization:
```sql
-- Clean old data monthly
DELETE FROM audit_log WHERE created_at < NOW() - INTERVAL '30 days';
DELETE FROM user_sessions WHERE expires_at < NOW();
```

### Reduce Email Usage:
- Only send critical notifications
- Use browser notifications when possible
- Batch weekly summaries instead of daily

### API Rate Limiting:
```typescript
// Cache API responses
const cache = new Map()
const getCachedData = (key, fetchFn) => {
  if (cache.has(key)) return cache.get(key)
  const data = fetchFn()
  cache.set(key, data)
  setTimeout(() => cache.delete(key), 30 * 60 * 1000) // 30 min
  return data
}
```

## 🎯 Launch Checklist

- [ ] Code pushed to GitHub
- [ ] Supabase project created and schema imported
- [ ] EmailJS account set up with templates
- [ ] Vercel deployment successful
- [ ] Environment variables configured
- [ ] Test user registration
- [ ] Test tournament data loading
- [ ] Test email notifications
- [ ] Custom domain configured (optional)

## 🔮 Future Scaling (When Ready)

When your project grows and you want to upgrade:

1. **Supabase Pro** ($25/month) - More storage and features
2. **Custom domain** ($12/year) - Professional branding
3. **Paid golf API** ($50/month) - Real-time data
4. **Email service upgrade** - More emails per month

## 💡 Pro Tips for Free Hosting

1. **Use Vercel's preview deployments** for testing
2. **Set up GitHub Actions** for automated deployments
3. **Monitor your usage** in each service dashboard
4. **Keep backups** of your database schema
5. **Document your setup** for easy recreation

---

**Total Monthly Cost: $0** 🎉

Your uPickGolf app will be live and fully functional without spending a penny! 