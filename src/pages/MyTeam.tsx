import { Users, Trophy, TrendingUp, Calendar, Target } from 'lucide-react'

// Mock user team data
const mockUserTeam = {
  tournamentName: "The Memorial Tournament",
  teamName: "My Dream Team",
  totalScore: 285,
  rank: 1,
  totalEntrants: 156,
  selectedPlayers: [
    { 
      id: 1, 
      name: "Scottie Scheffler", 
      bucket: "Elite Tier", 
      worldRank: 1, 
      currentScore: -8, 
      position: "T2",
      rounds: [68, 67, 69, 70],
      fantasyPoints: 85
    },
    { 
      id: 4, 
      name: "Viktor Hovland", 
      bucket: "Star Players", 
      worldRank: 12, 
      currentScore: -5, 
      position: "T8",
      rounds: [70, 68, 71, 69],
      fantasyPoints: 72
    },
    { 
      id: 7, 
      name: "Russell Henley", 
      bucket: "Solid Contenders", 
      worldRank: 28, 
      currentScore: -3, 
      position: "T15",
      rounds: [69, 70, 68, 72],
      fantasyPoints: 58
    },
    { 
      id: 10, 
      name: "Akshay Bhatia", 
      bucket: "Rising Stars", 
      worldRank: 55, 
      currentScore: -2, 
      position: "T22",
      rounds: [71, 69, 70, 70],
      fantasyPoints: 45
    },
    { 
      id: 13, 
      name: "Harris English", 
      bucket: "Dark Horses", 
      worldRank: 78, 
      currentScore: -1, 
      position: "T35",
      rounds: [72, 70, 69, 71],
      fantasyPoints: 32
    },
    { 
      id: 16, 
      name: "Nick Taylor", 
      bucket: "Long Shots", 
      worldRank: 105, 
      currentScore: +2, 
      position: "T58",
      rounds: [73, 72, 71, 74],
      fantasyPoints: 18
    }
  ]
}

export function MyTeam() {
  const formatScore = (score: number) => {
    if (score === 0) return "E"
    return score > 0 ? `+${score}` : `${score}`
  }

  const getBucketColor = (bucket: string) => {
    const colors = {
      "Elite Tier": "bg-yellow-100 text-yellow-800",
      "Star Players": "bg-blue-100 text-blue-800",
      "Solid Contenders": "bg-green-100 text-green-800",
      "Rising Stars": "bg-purple-100 text-purple-800",
      "Dark Horses": "bg-orange-100 text-orange-800",
      "Long Shots": "bg-red-100 text-red-800"
    }
    return colors[bucket as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Team</h1>
        <p className="text-lg text-gray-600">
          Track your team's performance and see how each player is contributing to your success.
        </p>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <Trophy className="h-8 w-8 text-golf-gold mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{mockUserTeam.rank}</div>
          <div className="text-sm text-gray-600">Current Rank</div>
        </div>

        <div className="card text-center">
          <Target className="h-8 w-8 text-golf-green mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{mockUserTeam.totalScore}</div>
          <div className="text-sm text-gray-600">Total Points</div>
        </div>

        <div className="card text-center">
          <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{mockUserTeam.totalEntrants}</div>
          <div className="text-sm text-gray-600">Total Entrants</div>
        </div>

        <div className="card text-center">
          <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {Math.round((1 - (mockUserTeam.rank - 1) / mockUserTeam.totalEntrants) * 100)}%
          </div>
          <div className="text-sm text-gray-600">Percentile</div>
        </div>
      </div>

      {/* Tournament Info */}
      <div className="card mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">{mockUserTeam.tournamentName}</h2>
            <p className="text-gray-600">Team: {mockUserTeam.teamName}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">Round 4 Complete</span>
          </div>
        </div>
      </div>

      {/* Player Performance */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Player Performance</h2>
        
        {mockUserTeam.selectedPlayers.map((player) => (
          <div key={player.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{player.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBucketColor(player.bucket)}`}>
                    {player.bucket}
                  </span>
                  <span className="text-sm text-gray-500">World Rank #{player.worldRank}</span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span>Position: <strong>{player.position}</strong></span>
                  <span>Score: <strong className={player.currentScore < 0 ? 'text-green-600' : player.currentScore > 0 ? 'text-red-600' : 'text-gray-600'}>
                    {formatScore(player.currentScore)}
                  </strong></span>
                  <span>Fantasy Points: <strong className="text-golf-green">{player.fantasyPoints}</strong></span>
                </div>
              </div>
            </div>

            {/* Round by Round Scores */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              {player.rounds.map((round, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">R{index + 1}</div>
                  <div className={`text-lg font-semibold ${
                    round < 70 ? 'text-green-600' : 
                    round > 72 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {round}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="mt-8 card bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Best Performer</h4>
            <p className="text-sm text-gray-600">
              <strong>Scottie Scheffler</strong> with 85 fantasy points
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Total Strokes Under Par</h4>
            <p className="text-sm text-gray-600">
              <strong>-17</strong> combined across all players
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Strategy Effectiveness</h4>
            <p className="text-sm text-gray-600">
              Your bucket selections are performing <strong>above average</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Next Tournament CTA */}
      <div className="mt-8 bg-golf-green text-white p-6 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-2">Ready for the Next Tournament?</h3>
        <p className="text-golf-lightgreen mb-4">
          The U.S. Open is coming up. Start building your team now!
        </p>
        <button className="btn-secondary">
          View Upcoming Tournaments
        </button>
      </div>
    </div>
  )
} 