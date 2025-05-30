// Free Golf Data API Utilities
// These are free alternatives to paid golf APIs

// ESPN Golf API (Free, unofficial)
export const fetchESPNTournaments = async () => {
  try {
    const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard')
    const data = await response.json()
    return data.events
  } catch (error) {
    console.error('ESPN API error:', error)
    return []
  }
}

// ESPN Leaderboard (Free)
export const fetchESPNLeaderboard = async (tournamentId: string) => {
  try {
    const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/golf/pga/leaderboard/${tournamentId}`)
    const data = await response.json()
    return data.leaders
  } catch (error) {
    console.error('ESPN Leaderboard error:', error)
    return []
  }
}

// PGA Tour Website Scraping (Free but requires CORS proxy)
export const fetchPGATourData = async () => {
  // Note: You'd need a free CORS proxy like allorigins.win
  const proxyUrl = 'https://api.allorigins.win/get?url='
  const targetUrl = 'https://www.pgatour.com/tournaments'
  
  try {
    const response = await fetch(proxyUrl + encodeURIComponent(targetUrl))
    const data = await response.json()
    // Parse HTML content for tournament data
    return parseHTMLForTournaments(data.contents)
  } catch (error) {
    console.error('PGA scraping error:', error)
    return []
  }
}

// Golf.com Rankings (Free)
export const fetchWorldRankings = async () => {
  try {
    // This would require web scraping or finding a free API
    // For now, return mock data
    return [
      { rank: 1, name: "Scottie Scheffler", country: "USA" },
      { rank: 2, name: "Xander Schauffele", country: "USA" },
      { rank: 3, name: "Rory McIlroy", country: "NIR" },
      // ... more players
    ]
  } catch (error) {
    console.error('Rankings error:', error)
    return []
  }
}

// Helper function to parse HTML
const parseHTMLForTournaments = (html: string) => {
  // This would parse the HTML to extract tournament data
  // For a personal project, you might manually update this data weekly
  return []
}

// Free alternative: Manual data updates
export const manualTournamentData = [
  {
    id: 1,
    name: "The Memorial Tournament",
    location: "Dublin, OH",
    startDate: "2024-06-06",
    endDate: "2024-06-09",
    status: "upcoming",
    // Update this manually each week
  }
]

// Caching to reduce API calls
const cache = new Map()
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

export const getCachedData = async (key: string, fetchFunction: () => Promise<any>) => {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  
  const data = await fetchFunction()
  cache.set(key, { data, timestamp: Date.now() })
  return data
} 