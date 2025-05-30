# uPickGolf - Fantasy Golf Application

A modern fantasy golf platform where users select players from curated buckets to compete in PGA tournaments. Built with React, TypeScript, and Tailwind CSS.

## 🏌️ Features

### Core Functionality
- **Bucket-Based Player Selection**: Choose one player from each of 6 skill-based tiers
- **Real-time Tournament Tracking**: Live scoring updates during PGA tournaments
- **Fantasy Leaderboards**: Compete against friends and other players
- **Comprehensive Scoring System**: Points based on position, performance, and bonuses
- **Mobile-Responsive Design**: Optimized for all devices

### Player Buckets
1. **Elite Tier** - Top 10 world ranked players
2. **Star Players** - Ranked 11-25 in the world
3. **Solid Contenders** - Ranked 26-50 in the world
4. **Rising Stars** - Ranked 51-75 in the world
5. **Dark Horses** - Ranked 76-100 in the world
6. **Long Shots** - Ranked 100+ or emerging players

### Scoring System
- **Position-based points**: 100 pts for 1st, 90 for 2nd, etc.
- **Performance bonuses**: Eagles (+5), Hole-in-ones (+10), Bogey-free rounds (+5)
- **Achievement bonuses**: Rounds under 65 (+10), under 70 (+5), birdie streaks (+3)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (for production database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/uPickGolf.git
   cd uPickGolf
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
uPickGolf/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/            # Page components
│   │   ├── Home.tsx
│   │   ├── Tournaments.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── MyTeam.tsx
│   │   └── Rules.tsx
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx           # Main application component
│   ├── index.css         # Global styles with Tailwind
│   └── main.tsx          # Application entry point
├── database-schema.sql    # Complete database schema
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Project dependencies
```

## 🎨 Design System

### Colors
- **Golf Green**: `#2d5016` - Primary brand color
- **Light Green**: `#4a7c59` - Secondary green
- **Gold**: `#d4af37` - Accent color for highlights
- **Dark Gold**: `#b8941f` - Darker gold variant

### Components
- **Cards**: White background with subtle shadows
- **Buttons**: Primary (golf green) and secondary (gold) variants
- **Forms**: Clean inputs with focus states
- **Typography**: Clear hierarchy with proper contrast

## 🗄️ Database Schema

The application uses PostgreSQL with the following key tables:

- **users** - User accounts and profiles
- **tournaments** - PGA tournament information
- **players** - Golfer profiles and rankings
- **player_buckets** - Skill-based player tiers
- **fantasy_teams** - User team selections
- **team_selections** - Individual player picks
- **player_round_scores** - Real-time scoring data
- **tournament_results** - Final tournament outcomes

See `database-schema.sql` for the complete schema.

## 🔌 API Integration

### Golf Data Sources
The application is designed to integrate with golf APIs for real-time data:

- **SportsDataIO Golf API** - Comprehensive PGA Tour data
- **PGA Tour API** - Official tournament information
- **World Golf Rankings** - Player ranking data

### API Endpoints (Planned)
```
GET /api/tournaments          # Available tournaments
GET /api/tournaments/:id      # Tournament details
GET /api/players             # Player database
GET /api/leaderboard/:id     # Tournament leaderboard
POST /api/teams              # Submit team selection
GET /api/teams/:id           # User team details
```

## 🏆 Scoring Logic

### Position Points
- 1st Place: 100 points
- 2nd Place: 90 points
- 3rd Place: 85 points
- Top 5: 80 points
- Top 10: 70 points
- Top 20: 60 points
- Top 30: 50 points
- Made Cut: 30 points
- Missed Cut: 0 points

### Performance Bonuses
- Eagle: +5 points
- Hole-in-One: +10 points
- Bogey-Free Round: +5 points
- Round Under 65: +10 points
- Round Under 70: +5 points
- 3+ Birdies in a Row: +3 points

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

### Backend (Recommended)
- **Node.js** with Express or Fastify
- **PostgreSQL** - Primary database
- **Prisma** or **TypeORM** - Database ORM
- **Redis** - Caching and sessions
- **JWT** - Authentication

### External Services
- **SportsDataIO** - Golf tournament data
- **Vercel/Netlify** - Frontend hosting
- **Railway/Supabase** - Database hosting

## 🚀 Deployment

### Frontend Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to Vercel:
   ```bash
   npx vercel --prod
   ```

### Database Setup
1. Create a PostgreSQL database
2. Run the schema from `database-schema.sql`
3. Configure environment variables:
   ```env
   DATABASE_URL=postgresql://user:password@host:port/database
   GOLF_API_KEY=your_sportsdata_api_key
   JWT_SECRET=your_jwt_secret
   ```

## 🔮 Future Enhancements

### Phase 1 - Core Features
- [ ] User authentication and registration
- [ ] Real-time API integration
- [ ] Payment processing for entry fees
- [ ] Email notifications

### Phase 2 - Advanced Features
- [ ] Private leagues and groups
- [ ] Live chat during tournaments
- [ ] Player statistics and analytics
- [ ] Mobile app (React Native)

### Phase 3 - Premium Features
- [ ] AI-powered player recommendations
- [ ] Advanced analytics dashboard
- [ ] Tournament prediction models
- [ ] Social features and sharing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- PGA Tour for tournament data
- SportsDataIO for comprehensive golf APIs
- The golf community for inspiration
- React and Tailwind CSS teams for excellent tools

## 📞 Support

For support, email support@upickgolf.com or join our Discord community.

---

**Built with ❤️ for golf enthusiasts everywhere**
