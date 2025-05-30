// Player types
export interface Player {
  id: number
  name: string
  worldRank: number
  country?: string
  recentForm?: string
  bucket?: string
}

// Tournament types
export interface Tournament {
  id: number
  name: string
  location: string
  startDate: string
  endDate: string
  purse: string
  entryFee: string
  status: 'upcoming' | 'active' | 'completed' | 'cancelled'
  entryDeadline: string
  maxEntries?: number
}

// User authentication types
export interface User {
  id: number
  username: string // This is the nickname/display name
  email: string
  firstName: string
  lastName: string
  mobileNumber?: string
  emailVerified: boolean
  isActive: boolean
  lastLogin?: string
  createdAt: string
  updatedAt: string
}

export interface UserRegistration {
  firstName: string
  lastName: string
  username: string // nickname
  email: string
  password: string
  mobileNumber?: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  message?: string
}

export interface UserSession {
  id: number
  userId: number
  sessionToken: string
  expiresAt: string
  ipAddress?: string
  userAgent?: string
  createdAt: string
}

// Tournament entry types
export interface TournamentEntry {
  id: number
  userId: number
  tournamentId: number
  entryFeePaid: number
  paymentStatus: 'pending' | 'paid' | 'refunded'
  paymentMethod?: string
  paymentTransactionId?: string
  enteredAt: string
}

// Fantasy team types (updated)
export interface FantasyTeam {
  id: number
  userId: number
  tournamentId: number
  entryId: number
  teamName: string
  selectedPlayers: SelectedPlayer[]
  totalScore: number
  rank?: number
  isSubmitted: boolean
  submittedAt?: string
}

export interface SelectedPlayer {
  playerId: number
  bucketId: number
  player: Player
}

// Leaderboard types
export interface LeaderboardEntry {
  id: number
  rank: number
  previousRank: number
  playerName: string
  totalScore: number
  selectedPlayers: PlayerPerformance[]
}

export interface PlayerPerformance {
  name: string
  score: number
  position: string
  fantasyPoints?: number
  rounds?: number[]
}

// Tournament leaderboard
export interface TournamentLeaderboardEntry {
  rank: number
  name: string
  score: number
  today: number
  thru: string
}

// Bucket system
export interface PlayerBucket {
  id: number
  name: string
  description: string
  minRank: number
  maxRank: number
  bucketOrder: number
  players: Player[]
}

// Notification types
export interface UserNotification {
  id: number
  userId: number
  type: 'tournament_reminder' | 'score_update' | 'payment_confirmation' | 'team_submitted' | 'general'
  title: string
  message: string
  isRead: boolean
  sentViaEmail: boolean
  sentViaSms: boolean
  createdAt: string
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
}

// Form validation types
export interface FormErrors {
  [key: string]: string
}

export interface ValidationResult {
  isValid: boolean
  errors: FormErrors
}

// Golf API data types (for external API integration)
export interface GolfApiPlayer {
  PlayerID: number
  FirstName: string
  LastName: string
  Country: string
  WorldGolfRank?: number
  PgaTourPlayerID?: number
}

export interface GolfApiTournament {
  TournamentID: number
  Name: string
  StartDate: string
  EndDate: string
  Venue: string
  Location: string
  Purse: number
}

export interface GolfApiLeaderboard {
  PlayerID: number
  Name: string
  Rank: number
  TotalScore: number
  TotalStrokes: number
  Earnings: number
  FedExPoints: number
}

// Payment types (for future payment integration)
export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'succeeded' | 'failed'
  clientSecret?: string
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'bank_account' | 'paypal'
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
} 