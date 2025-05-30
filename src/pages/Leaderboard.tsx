import { useState } from 'react'
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus } from 'lucide-react'

// Mock leaderboard data
const mockLeaderboard = [
  {
    id: 1,
    rank: 1,
    previousRank: 2,
    playerName: "John Smith",
    totalScore: 285,
    selectedPlayers: [
      { name: "Scottie Scheffler", score: -8, position: "T2" },
      { name: "Viktor Hovland", score: -5, position: "T8" },
      { name: "Russell Henley", score: -3, position: "T15" },
      { name: "Akshay Bhatia", score: -2, position: "T22" },
      { name: "Harris English", score: -1, position: "T35" },
      { name: "Nick Taylor", score: +2, position: "T58" }
    ]
  },
  {
    id: 2,
    rank: 2,
    previousRank: 1,
    playerName: "Sarah Johnson",
    totalScore: 287,
    selectedPlayers: [
      { name: "Xander Schauffele", score: -7, position: "T3" },
      { name: "Collin Morikawa", score: -6, position: "T5" },
      { name: "Keegan Bradley", score: -4, position: "T12" },
      { name: "Ben Griffin", score: -1, position: "T28" },
      { name: "Bud Cauley", score: 0, position: "T42" },
      { name: "Jacob Bridgeman", score: +3, position: "T65" }
    ]
  },
  {
    id: 3,
    rank: 3,
    previousRank: 3,
    playerName: "Mike Wilson",
    totalScore: 289,
    selectedPlayers: [
      { name: "Rory McIlroy", score: -6, position: "T5" },
      { name: "Tony Finau", score: -4, position: "T12" },
      { name: "Shane Lowry", score: -2, position: "T20" },
      { name: "Andrew Novak", score: -1, position: "T28" },
      { name: "Si Woo Kim", score: +1, position: "T48" },
      { name: "Ryan Gerard", score: +4, position: "T72" }
    ]
  }
]

const mockTournamentLeaderboard = [
  { rank: 1, name: "Scottie Scheffler", score: -12, today: -3, thru: "F" },
  { rank: 2, name: "Xander Schauffele", score: -10, today: -2, thru: "F" },
  { rank: 3, name: "Rory McIlroy", score: -9, today: -1, thru: "F" },
  { rank: 4, name: "Collin Morikawa", score: -8, today: -4, thru: "F" },
  { rank: 5, name: "Viktor Hovland", score: -7, today: -2, thru: "F" },
]

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState<'fantasy' | 'tournament'>('fantasy')

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankChange = (rank: number, previousRank: number) => {
    if (rank < previousRank) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (rank > previousRank) {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    } else {
      return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const formatScore = (score: number) => {
    if (score === 0) return "E"
    return score > 0 ? `+${score}` : `${score}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tournament Leaderboard</h1>
        <p className="text-lg text-gray-600">
          Track your fantasy team's performance and see how you stack up against the competition.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('fantasy')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'fantasy'
                  ? 'border-golf-green text-golf-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Fantasy Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('tournament')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tournament'
                  ? 'border-golf-green text-golf-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tournament Leaderboard
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'fantasy' ? (
        /* Fantasy Leaderboard */
        <div className="space-y-4">
          {mockLeaderboard.map((entry) => (
            <div key={entry.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getRankIcon(entry.rank)}
                    {getRankChange(entry.rank, entry.previousRank)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{entry.playerName}</h3>
                    <p className="text-sm text-gray-600">Total Score: {entry.totalScore}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-golf-green">{entry.totalScore}</div>
                  <div className="text-sm text-gray-500">Fantasy Points</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {entry.selectedPlayers.map((player, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm">{player.name}</span>
                      <span className="text-xs text-gray-500">{player.position}</span>
                    </div>
                    <div className={`text-sm font-semibold ${
                      player.score < 0 ? 'text-green-600' : 
                      player.score > 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {formatScore(player.score)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Tournament Leaderboard */
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">The Memorial Tournament - Round 4</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Pos</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Player</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Score</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Today</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Thru</th>
                </tr>
              </thead>
              <tbody>
                {mockTournamentLeaderboard.map((player) => (
                  <tr key={player.rank} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {getRankIcon(player.rank)}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{player.name}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-semibold ${
                        player.score < 0 ? 'text-green-600' : 
                        player.score > 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {formatScore(player.score)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`${
                        player.today < 0 ? 'text-green-600' : 
                        player.today > 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {formatScore(player.today)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600">{player.thru}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Live Updates Notice */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Live Updates:</strong> Scores are updated every 5 minutes during tournament play. 
              Fantasy points are calculated based on player performance and position.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 