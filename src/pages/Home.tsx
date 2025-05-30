import { Link } from 'react-router-dom'
import { Trophy, Users, Target, DollarSign, Calendar, Star, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { AuthModal } from '../components/AuthModal'

export function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from auth context in a real app

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-golf-green to-golf-lightgreen text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Welcome to <span className="text-golf-gold">uPickGolf</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-golf-lightgreen max-w-3xl mx-auto">
                The ultimate fantasy golf experience. Pick your dream team from 6 carefully curated buckets 
                and compete against friends in PGA tournaments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {isLoggedIn ? (
                  <>
                    <Link to="/tournaments" className="btn-secondary text-lg px-8 py-3">
                      View Tournaments
                    </Link>
                    <Link to="/rules" className="bg-white text-golf-green hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                      How It Works
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="btn-secondary text-lg px-8 py-3 flex items-center justify-center"
                    >
                      <UserPlus className="h-5 w-5 mr-2" />
                      Join Now - It's Free!
                    </button>
                    <Link to="/rules" className="bg-white text-golf-green hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                      How It Works
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Registration CTA for non-logged in users */}
        {!isLoggedIn && (
          <section className="py-12 bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-gradient-to-r from-golf-green to-golf-lightgreen text-white p-8 rounded-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Start Playing Fantasy Golf?
                </h2>
                <p className="text-golf-lightgreen text-lg mb-6">
                  Join thousands of golf fans competing in uPickGolf tournaments. Create your free account in under 2 minutes!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="btn-secondary text-lg px-8 py-3"
                  >
                    Create Free Account
                  </button>
                  <Link to="/tournaments" className="bg-white text-golf-green hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                    Browse Tournaments
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How uPickGolf Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Simple, strategic, and exciting. Here's how to build your winning team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-golf-green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pick Your Team</h3>
                <p className="text-gray-600">
                  Select golfers from 6 pre-selected buckets. Each bucket contains players of similar skill levels, 
                  ensuring balanced competition.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-golf-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Performance</h3>
                <p className="text-gray-600">
                  Watch your players compete in real PGA tournaments. Your score is based on how well 
                  your selected players perform each day.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-golf-green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Win Big</h3>
                <p className="text-gray-600">
                  Compete against friends and other players. Climb the leaderboard and claim victory 
                  in each tournament.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose uPickGolf?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card">
                <Calendar className="h-8 w-8 text-golf-green mb-4" />
                <h3 className="text-lg font-semibold mb-2">Live Tournament Action</h3>
                <p className="text-gray-600">
                  Real-time scoring updates from actual PGA tournaments. Never miss a moment of the action.
                </p>
              </div>

              <div className="card">
                <Star className="h-8 w-8 text-golf-gold mb-4" />
                <h3 className="text-lg font-semibold mb-2">Strategic Depth</h3>
                <p className="text-gray-600">
                  Our bucket system ensures every pick matters. Balance risk and reward to build the perfect team.
                </p>
              </div>

              <div className="card">
                <DollarSign className="h-8 w-8 text-golf-green mb-4" />
                <h3 className="text-lg font-semibold mb-2">Fair Competition</h3>
                <p className="text-gray-600">
                  Everyone has an equal chance to win with our carefully balanced player buckets.
                </p>
              </div>

              <div className="card">
                <Users className="h-8 w-8 text-golf-gold mb-4" />
                <h3 className="text-lg font-semibold mb-2">Social Gaming</h3>
                <p className="text-gray-600">
                  Create private leagues with friends or compete in public tournaments.
                </p>
              </div>

              <div className="card">
                <Trophy className="h-8 w-8 text-golf-green mb-4" />
                <h3 className="text-lg font-semibold mb-2">Real-time Leaderboards</h3>
                <p className="text-gray-600">
                  Track your progress and see how you stack up against the competition.
                </p>
              </div>

              <div className="card">
                <Target className="h-8 w-8 text-golf-gold mb-4" />
                <h3 className="text-lg font-semibold mb-2">Easy to Play</h3>
                <p className="text-gray-600">
                  Simple rules, intuitive interface. Perfect for both golf experts and newcomers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-golf-green text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Playing?
            </h2>
            <p className="text-xl mb-8 text-golf-lightgreen">
              Join thousands of golf fans already competing in uPickGolf tournaments.
            </p>
            {isLoggedIn ? (
              <Link to="/tournaments" className="btn-secondary text-lg px-8 py-3">
                View Current Tournaments
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn-secondary text-lg px-8 py-3"
                >
                  Create Free Account
                </button>
                <Link to="/tournaments" className="bg-white text-golf-green hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                  Browse Tournaments
                </Link>
              </div>
            )}
          </div>
        </section>
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