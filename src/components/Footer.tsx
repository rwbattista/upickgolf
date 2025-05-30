import { Trophy } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-golf-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="h-6 w-6" />
              <span className="text-xl font-bold">uPickGolf</span>
            </div>
            <p className="text-golf-lightgreen text-sm">
              The ultimate fantasy golf experience. Pick your players, compete with friends, and win big!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/tournaments" className="text-golf-lightgreen hover:text-white transition-colors">Tournaments</a></li>
              <li><a href="/leaderboard" className="text-golf-lightgreen hover:text-white transition-colors">Leaderboard</a></li>
              <li><a href="/rules" className="text-golf-lightgreen hover:text-white transition-colors">Rules</a></li>
              <li><a href="/my-team" className="text-golf-lightgreen hover:text-white transition-colors">My Team</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-golf-lightgreen hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-golf-lightgreen hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-golf-lightgreen hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-golf-lightgreen hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-golf-lightgreen mt-8 pt-8 text-center">
          <p className="text-golf-lightgreen text-sm">
            © 2024 uPickGolf. All rights reserved. Built for golf enthusiasts, by golf enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  )
} 