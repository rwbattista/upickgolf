import { useState } from 'react'
import { Calendar, MapPin, DollarSign, Users, Trophy, Clock, UserPlus } from 'lucide-react'
import { AuthModal } from '../components/AuthModal'

// Mock data - in a real app, this would come from your API
const mockTournaments = [
  {
    id: 1,
    name: "The Memorial Tournament",
    location: "Muirfield Village Golf Club, Dublin, OH",
    startDate: "2024-06-06",
    endDate: "2024-06-09",
    purse: "$20,000,000",
    status: "upcoming",
    entryDeadline: "2024-06-05T18:00:00Z",
    entryFee: "$25"
  },
  {
    id: 2,
    name: "U.S. Open",
    location: "Pinehurst Resort, Pinehurst, NC",
    startDate: "2024-06-13",
    endDate: "2024-06-16",
    purse: "$21,500,000",
    status: "upcoming",
    entryDeadline: "2024-06-12T18:00:00Z",
    entryFee: "$50"
  }
]

const mockPlayerBuckets = {
  bucket1: {
    name: "Elite Tier",
    description: "Top 10 world ranked players",
    players: [
      { id: 1, name: "Scottie Scheffler", worldRank: 1, recentForm: "W-T2-T5" },
      { id: 2, name: "Xander Schauffele", worldRank: 2, recentForm: "T3-W-T8" },
      { id: 3, name: "Rory McIlroy", worldRank: 3, recentForm: "T5-T12-W" },
    ]
  },
  bucket2: {
    name: "Star Players",
    description: "Ranked 11-25 in the world",
    players: [
      { id: 4, name: "Viktor Hovland", worldRank: 12, recentForm: "T8-T15-T3" },
      { id: 5, name: "Collin Morikawa", worldRank: 15, recentForm: "T12-T6-T20" },
      { id: 6, name: "Tony Finau", worldRank: 18, recentForm: "T5-T25-T10" },
    ]
  },
  bucket3: {
    name: "Solid Contenders",
    description: "Ranked 26-50 in the world",
    players: [
      { id: 7, name: "Russell Henley", worldRank: 28, recentForm: "T15-T8-T30" },
      { id: 8, name: "Keegan Bradley", worldRank: 32, recentForm: "T20-T12-T18" },
      { id: 9, name: "Shane Lowry", worldRank: 35, recentForm: "T25-T15-T22" },
    ]
  },
  bucket4: {
    name: "Rising Stars",
    description: "Ranked 51-75 in the world",
    players: [
      { id: 10, name: "Akshay Bhatia", worldRank: 55, recentForm: "T30-T18-T45" },
      { id: 11, name: "Ben Griffin", worldRank: 62, recentForm: "T25-T35-T28" },
      { id: 12, name: "Andrew Novak", worldRank: 68, recentForm: "T40-T22-T50" },
    ]
  },
  bucket5: {
    name: "Dark Horses",
    description: "Ranked 76-100 in the world",
    players: [
      { id: 13, name: "Harris English", worldRank: 78, recentForm: "T45-T30-T60" },
      { id: 14, name: "Bud Cauley", worldRank: 85, recentForm: "T50-T40-T35" },
      { id: 15, name: "Si Woo Kim", worldRank: 92, recentForm: "T55-T45-T40" },
    ]
  },
  bucket6: {
    name: "Long Shots",
    description: "Ranked 100+ or emerging players",
    players: [
      { id: 16, name: "Nick Taylor", worldRank: 105, recentForm: "T60-T55-T70" },
      { id: 17, name: "Jacob Bridgeman", worldRank: 120, recentForm: "T65-T50-T80" },
      { id: 18, name: "Ryan Gerard", worldRank: 135, recentForm: "T70-T60-T85" },
    ]
  }
}

export function Tournaments() {
  const [selectedTournament, setSelectedTournament] = useState<number | null>(null)
  const [selectedPlayers, setSelectedPlayers] = useState<{[key: string]: number | null}>({
    bucket1: null,
    bucket2: null,
    bucket3: null,
    bucket4: null,
    bucket5: null,
    bucket6: null,
  })
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from auth context in a real app

  const handlePlayerSelect = (bucketKey: string, playerId: number) => {
    setSelectedPlayers(prev => ({
      ...prev,
      [bucketKey]: playerId
    }))
  }

  const isTeamComplete = () => {
    return Object.values(selectedPlayers).every(playerId => playerId !== null)
  }

  const handleSubmitTeam = () => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true)
      return
    }

    if (isTeamComplete() && selectedTournament) {
      alert('Team submitted successfully! (In a real app, this would save to the database)')
      // Reset selections
      setSelectedPlayers({
        bucket1: null,
        bucket2: null,
        bucket3: null,
        bucket4: null,
        bucket5: null,
        bucket6: null,
      })
    }
  }

  const selectedTournamentData = mockTournaments.find(t => t.id === selectedTournament)

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Available Tournaments</h1>
          <p className="text-lg text-gray-600">
            Select a tournament and build your dream team from our carefully curated player buckets.
          </p>
        </div>

        {/* Authentication Notice */}
        {!isLoggedIn && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <UserPlus className="h-6 w-6 text-blue-600 mt-1 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Join uPickGolf to Play</h3>
                <p className="text-blue-700 mb-4">
                  Create a free account to enter tournaments, build your fantasy teams, and compete for prizes!
                </p>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn-primary"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tournament Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {mockTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className={`card cursor-pointer transition-all duration-200 ${
                selectedTournament === tournament.id
                  ? 'ring-2 ring-golf-green border-golf-green'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedTournament(tournament.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{tournament.name}</h3>
                <span className="bg-golf-green text-white px-3 py-1 rounded-full text-sm">
                  {tournament.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {tournament.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {tournament.purse} purse
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Entry deadline: {new Date(tournament.entryDeadline).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-lg font-bold text-golf-green">{tournament.entryFee}</span>
                <span className="text-sm text-gray-500">Entry Fee</span>
              </div>
            </div>
          ))}
        </div>

        {/* Player Selection */}
        {selectedTournament && (
          <div className="space-y-6">
            <div className="bg-golf-green text-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Build Your Team</h2>
              <p className="text-golf-lightgreen mb-2">
                Select one player from each bucket to complete your team. Each bucket represents different skill tiers.
              </p>
              {selectedTournamentData && (
                <p className="text-golf-lightgreen text-sm">
                  Tournament: {selectedTournamentData.name} • Entry Fee: {selectedTournamentData.entryFee}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {Object.entries(mockPlayerBuckets).map(([bucketKey, bucket]) => (
                <div key={bucketKey} className="card">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{bucket.name}</h3>
                    <p className="text-sm text-gray-600">{bucket.description}</p>
                  </div>

                  <div className="space-y-3">
                    {bucket.players.map((player) => (
                      <div
                        key={player.id}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          selectedPlayers[bucketKey] === player.id
                            ? 'border-golf-green bg-golf-green bg-opacity-10'
                            : 'border-gray-200 hover:border-golf-green hover:bg-gray-50'
                        }`}
                        onClick={() => handlePlayerSelect(bucketKey, player.id)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{player.name}</span>
                          <span className="text-sm text-gray-500">#{player.worldRank}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          Recent: {player.recentForm}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Team Summary */}
            <div className="card bg-gray-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Your Team ({Object.values(selectedPlayers).filter(p => p !== null).length}/6)
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                {Object.entries(mockPlayerBuckets).map(([bucketKey, bucket]) => {
                  const selectedPlayerId = selectedPlayers[bucketKey]
                  const selectedPlayer = selectedPlayerId 
                    ? bucket.players.find(p => p.id === selectedPlayerId)
                    : null

                  return (
                    <div key={bucketKey} className="text-center">
                      <div className="text-sm font-medium text-gray-700 mb-1">{bucket.name}</div>
                      <div className="text-sm text-gray-600">
                        {selectedPlayer ? selectedPlayer.name : 'Not selected'}
                      </div>
                    </div>
                  )
                })}
              </div>

              {!isLoggedIn ? (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-4">You must be logged in to submit a team</p>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="btn-primary"
                  >
                    Sign In to Submit Team
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSubmitTeam}
                  disabled={!isTeamComplete()}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                    isTeamComplete()
                      ? 'bg-golf-green text-white hover:bg-golf-lightgreen'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isTeamComplete() ? (
                    <span className="flex items-center justify-center">
                      <Trophy className="h-5 w-5 mr-2" />
                      Submit Team ({selectedTournamentData?.entryFee})
                    </span>
                  ) : (
                    'Select all 6 players to submit'
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="register"
      />
    </>
  )
} 