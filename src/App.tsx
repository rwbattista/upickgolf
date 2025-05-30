import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Tournaments } from './pages/Tournaments'
import { Leaderboard } from './pages/Leaderboard'
import { MyTeam } from './pages/MyTeam'
import { Rules } from './pages/Rules'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/my-team" element={<MyTeam />} />
              <Route path="/rules" element={<Rules />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
