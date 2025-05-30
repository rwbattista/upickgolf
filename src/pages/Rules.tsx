import { Users, Trophy, Target, Calculator, Calendar, Star } from 'lucide-react'

export function Rules() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">How to Play uPickGolf</h1>
        <p className="text-lg text-gray-600">
          Everything you need to know to dominate your fantasy golf league.
        </p>
      </div>

      {/* Quick Overview */}
      <div className="card mb-8 bg-golf-green text-white">
        <h2 className="text-2xl font-bold mb-4">Quick Overview</h2>
        <p className="text-golf-lightgreen text-lg">
          uPickGolf is a fantasy golf game where you select one player from each of 6 pre-selected buckets 
          to create your team. Your score is based on how well your selected players perform in real PGA tournaments.
        </p>
      </div>

      {/* Game Rules */}
      <div className="space-y-8">
        
        {/* Team Selection */}
        <section className="card">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-golf-green mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Team Selection</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">The Bucket System</h3>
              <p className="text-gray-600 mb-3">
                Players are divided into 6 buckets based on their world ranking and recent performance:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-800">Elite Tier</h4>
                  <p className="text-sm text-yellow-700">Top 10 world ranked players</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800">Star Players</h4>
                  <p className="text-sm text-blue-700">Ranked 11-25 in the world</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800">Solid Contenders</h4>
                  <p className="text-sm text-green-700">Ranked 26-50 in the world</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-800">Rising Stars</h4>
                  <p className="text-sm text-purple-700">Ranked 51-75 in the world</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-orange-800">Dark Horses</h4>
                  <p className="text-sm text-orange-700">Ranked 76-100 in the world</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-800">Long Shots</h4>
                  <p className="text-sm text-red-700">Ranked 100+ or emerging players</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Selection Rules</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>You must select exactly one player from each bucket</li>
                <li>Once a tournament starts, your team is locked</li>
                <li>You can change your selections until the entry deadline</li>
                <li>Each player can only be selected once per team</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Scoring System */}
        <section className="card">
          <div className="flex items-center mb-4">
            <Calculator className="h-6 w-6 text-golf-green mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Scoring System</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Daily Scoring</h3>
              <p className="text-gray-600 mb-3">
                Your fantasy points are calculated based on your players' performance each day:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Position-Based Points</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>1st Place: 100 points</li>
                      <li>2nd Place: 90 points</li>
                      <li>3rd Place: 85 points</li>
                      <li>Top 5: 80 points</li>
                      <li>Top 10: 70 points</li>
                      <li>Top 20: 60 points</li>
                      <li>Top 30: 50 points</li>
                      <li>Made Cut: 30 points</li>
                      <li>Missed Cut: 0 points</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Performance Bonuses</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>Eagle: +5 points</li>
                      <li>Hole-in-One: +10 points</li>
                      <li>Bogey-Free Round: +5 points</li>
                      <li>Round Under 65: +10 points</li>
                      <li>Round Under 70: +5 points</li>
                      <li>3+ Birdies in a Row: +3 points</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Total Team Score</h3>
              <p className="text-gray-600">
                Your total score is the sum of all points earned by your 6 selected players throughout the tournament.
              </p>
            </div>
          </div>
        </section>

        {/* Tournament Format */}
        <section className="card">
          <div className="flex items-center mb-4">
            <Calendar className="h-6 w-6 text-golf-green mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Tournament Format</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Entry Deadlines</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Teams must be submitted before the tournament's first round begins</li>
                <li>Typically 6:00 PM ET the day before the tournament starts</li>
                <li>Late entries are not accepted once play begins</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tournament Duration</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Most tournaments run Thursday through Sunday (4 rounds)</li>
                <li>Some tournaments may have different formats (3 rounds, team events, etc.)</li>
                <li>Scoring updates in real-time during tournament play</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Winning */}
        <section className="card">
          <div className="flex items-center mb-4">
            <Trophy className="h-6 w-6 text-golf-green mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Winning & Prizes</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Leaderboard Rankings</h3>
              <p className="text-gray-600 mb-3">
                Players are ranked by their total fantasy points. In case of ties, the following tiebreakers apply:
              </p>
              <ol className="list-decimal list-inside text-gray-600 space-y-1">
                <li>Player with the highest-finishing individual golfer</li>
                <li>Player with the most top-10 finishers</li>
                <li>Player with the most made cuts</li>
                <li>Random draw if still tied</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Prize Structure</h3>
              <p className="text-gray-600">
                Prize structures vary by tournament and league. Check individual tournament details for specific payouts.
              </p>
            </div>
          </div>
        </section>

        {/* Strategy Tips */}
        <section className="card">
          <div className="flex items-center mb-4">
            <Target className="h-6 w-6 text-golf-green mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Strategy Tips</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Course Knowledge</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Research how players have performed at the specific course in previous years</li>
                <li>Consider course conditions and weather forecasts</li>
                <li>Look for players who excel in similar course setups</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Recent Form</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Check players' recent tournament results and trends</li>
                <li>Consider players coming off strong finishes</li>
                <li>Be cautious of players with recent missed cuts</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Balanced Approach</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Don't just pick the highest-ranked players - value matters</li>
                <li>Consider upside potential in lower buckets</li>
                <li>Balance safe picks with high-upside players</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Fair Play */}
        <section className="card">
          <div className="flex items-center mb-4">
            <Star className="h-6 w-6 text-golf-green mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Fair Play & Rules</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Prohibited Actions</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Creating multiple accounts to gain an advantage</li>
                <li>Sharing account information with other players</li>
                <li>Using automated tools or bots</li>
                <li>Collusion with other players</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Disputes</h3>
              <p className="text-gray-600">
                All scoring disputes must be reported within 24 hours of the tournament's conclusion. 
                Decisions by tournament administrators are final.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-golf-green text-white p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Play?</h2>
        <p className="text-golf-lightgreen mb-6 text-lg">
          Now that you know the rules, it's time to build your winning team!
        </p>
        <button className="btn-secondary text-lg px-8 py-3">
          View Available Tournaments
        </button>
      </div>
    </div>
  )
} 