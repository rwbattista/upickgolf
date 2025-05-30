-- uPickGolf Database Schema
-- This schema supports the fantasy golf application with user management,
-- tournament data, player buckets, team selections, and scoring

-- Users table with enhanced authentication fields
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL, -- This will be the nickname/display name
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- bcrypt hash of password
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    mobile_number VARCHAR(20), -- Optional mobile number for notifications
    email_verified BOOLEAN DEFAULT false,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User sessions table for authentication
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tournament entries table (tracks which users entered which tournaments)
CREATE TABLE tournament_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    tournament_id INTEGER REFERENCES tournaments(id) ON DELETE CASCADE,
    entry_fee_paid DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
    payment_method VARCHAR(50),
    payment_transaction_id VARCHAR(255),
    entered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, tournament_id)
);

-- Tournaments table
CREATE TABLE tournaments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    venue VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    purse DECIMAL(12,2),
    entry_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    max_entries INTEGER, -- Optional limit on number of entries
    entry_deadline TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed', 'cancelled')),
    pga_tournament_id INTEGER, -- External API reference
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Player buckets (tiers)
CREATE TABLE player_buckets (
    id SERIAL PRIMARY KEY,
    tournament_id INTEGER REFERENCES tournaments(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    min_world_rank INTEGER,
    max_world_rank INTEGER,
    bucket_order INTEGER NOT NULL, -- 1-6 for the 6 buckets
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Players table
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    full_name VARCHAR(200) NOT NULL,
    country VARCHAR(3), -- ISO country code
    world_rank INTEGER,
    pga_tour_id INTEGER, -- External API reference
    sports_data_io_id INTEGER, -- External API reference
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tournament players (which players are available for each tournament)
CREATE TABLE tournament_players (
    id SERIAL PRIMARY KEY,
    tournament_id INTEGER REFERENCES tournaments(id) ON DELETE CASCADE,
    player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
    bucket_id INTEGER REFERENCES player_buckets(id) ON DELETE CASCADE,
    world_rank_at_time INTEGER,
    recent_form VARCHAR(50), -- e.g., "W-T2-T5"
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tournament_id, player_id)
);

-- Fantasy teams (now linked to tournament entries)
CREATE TABLE fantasy_teams (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    tournament_id INTEGER REFERENCES tournaments(id) ON DELETE CASCADE,
    entry_id INTEGER REFERENCES tournament_entries(id) ON DELETE CASCADE,
    team_name VARCHAR(100) NOT NULL,
    total_score INTEGER DEFAULT 0,
    rank INTEGER,
    is_submitted BOOLEAN DEFAULT false,
    submitted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(entry_id) -- One team per tournament entry
);

-- Team player selections
CREATE TABLE team_selections (
    id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES fantasy_teams(id) ON DELETE CASCADE,
    tournament_player_id INTEGER REFERENCES tournament_players(id) ON DELETE CASCADE,
    bucket_id INTEGER REFERENCES player_buckets(id) ON DELETE CASCADE,
    selected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(team_id, bucket_id) -- One player per bucket per team
);

-- Tournament rounds
CREATE TABLE tournament_rounds (
    id SERIAL PRIMARY KEY,
    tournament_id INTEGER REFERENCES tournaments(id) ON DELETE CASCADE,
    round_number INTEGER NOT NULL CHECK (round_number BETWEEN 1 AND 4),
    round_date DATE NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Player round scores
CREATE TABLE player_round_scores (
    id SERIAL PRIMARY KEY,
    tournament_player_id INTEGER REFERENCES tournament_players(id) ON DELETE CASCADE,
    round_id INTEGER REFERENCES tournament_rounds(id) ON DELETE CASCADE,
    strokes INTEGER,
    score_to_par INTEGER,
    position VARCHAR(10), -- e.g., "T5", "1", "CUT"
    made_cut BOOLEAN DEFAULT true,
    eagles INTEGER DEFAULT 0,
    birdies INTEGER DEFAULT 0,
    pars INTEGER DEFAULT 0,
    bogeys INTEGER DEFAULT 0,
    double_bogeys INTEGER DEFAULT 0,
    worse_than_double INTEGER DEFAULT 0,
    hole_in_ones INTEGER DEFAULT 0,
    bogey_free_round BOOLEAN DEFAULT false,
    round_under_65 BOOLEAN DEFAULT false,
    round_under_70 BOOLEAN DEFAULT false,
    birdie_streak_3_plus BOOLEAN DEFAULT false,
    fantasy_points INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tournament_player_id, round_id)
);

-- Tournament final results
CREATE TABLE tournament_results (
    id SERIAL PRIMARY KEY,
    tournament_player_id INTEGER REFERENCES tournament_players(id) ON DELETE CASCADE,
    final_position INTEGER,
    final_position_text VARCHAR(10), -- e.g., "T5", "1", "CUT"
    total_strokes INTEGER,
    total_score_to_par INTEGER,
    made_cut BOOLEAN DEFAULT false,
    prize_money DECIMAL(10,2) DEFAULT 0,
    fedex_points INTEGER DEFAULT 0,
    total_fantasy_points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tournament_player_id)
);

-- Fantasy scoring rules (configurable per tournament)
CREATE TABLE scoring_rules (
    id SERIAL PRIMARY KEY,
    tournament_id INTEGER REFERENCES tournaments(id) ON DELETE CASCADE,
    rule_name VARCHAR(100) NOT NULL,
    rule_type VARCHAR(50) NOT NULL, -- 'position', 'performance', 'bonus'
    condition_value VARCHAR(100), -- e.g., '1' for 1st place, 'eagle' for eagle bonus
    points INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leaderboard cache (for performance)
CREATE TABLE leaderboard_cache (
    id SERIAL PRIMARY KEY,
    tournament_id INTEGER REFERENCES tournaments(id) ON DELETE CASCADE,
    team_id INTEGER REFERENCES fantasy_teams(id) ON DELETE CASCADE,
    rank INTEGER NOT NULL,
    total_score INTEGER NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tournament_id, team_id)
);

-- User notifications
CREATE TABLE user_notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'tournament_reminder', 'score_update', 'payment_confirmation', etc.
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    sent_via_email BOOLEAN DEFAULT false,
    sent_via_sms BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit log for important actions
CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id INTEGER,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email_verified ON users(email_verified);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_expires ON user_sessions(expires_at);
CREATE INDEX idx_tournament_entries_user_tournament ON tournament_entries(user_id, tournament_id);
CREATE INDEX idx_tournaments_status ON tournaments(status);
CREATE INDEX idx_tournaments_start_date ON tournaments(start_date);
CREATE INDEX idx_tournaments_entry_deadline ON tournaments(entry_deadline);
CREATE INDEX idx_players_world_rank ON players(world_rank);
CREATE INDEX idx_tournament_players_tournament_bucket ON tournament_players(tournament_id, bucket_id);
CREATE INDEX idx_fantasy_teams_tournament ON fantasy_teams(tournament_id);
CREATE INDEX idx_fantasy_teams_user ON fantasy_teams(user_id);
CREATE INDEX idx_team_selections_team ON team_selections(team_id);
CREATE INDEX idx_player_round_scores_tournament_player ON player_round_scores(tournament_player_id);
CREATE INDEX idx_leaderboard_cache_tournament_rank ON leaderboard_cache(tournament_id, rank);
CREATE INDEX idx_user_notifications_user_unread ON user_notifications(user_id, is_read);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tournaments_updated_at BEFORE UPDATE ON tournaments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON players FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fantasy_teams_updated_at BEFORE UPDATE ON fantasy_teams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data for testing
INSERT INTO tournaments (name, location, venue, start_date, end_date, purse, entry_fee, entry_deadline, status) VALUES
('The Memorial Tournament', 'Dublin, OH', 'Muirfield Village Golf Club', '2024-06-06', '2024-06-09', 20000000.00, 25.00, '2024-06-05 18:00:00', 'upcoming'),
('U.S. Open', 'Pinehurst, NC', 'Pinehurst Resort', '2024-06-13', '2024-06-16', 21500000.00, 50.00, '2024-06-12 18:00:00', 'upcoming');

-- Sample player buckets for tournament 1
INSERT INTO player_buckets (tournament_id, name, description, min_world_rank, max_world_rank, bucket_order) VALUES
(1, 'Elite Tier', 'Top 10 world ranked players', 1, 10, 1),
(1, 'Star Players', 'Ranked 11-25 in the world', 11, 25, 2),
(1, 'Solid Contenders', 'Ranked 26-50 in the world', 26, 50, 3),
(1, 'Rising Stars', 'Ranked 51-75 in the world', 51, 75, 4),
(1, 'Dark Horses', 'Ranked 76-100 in the world', 76, 100, 5),
(1, 'Long Shots', 'Ranked 100+ or emerging players', 101, 999, 6);

-- Sample players
INSERT INTO players (first_name, last_name, full_name, country, world_rank, pga_tour_id) VALUES
('Scottie', 'Scheffler', 'Scottie Scheffler', 'USA', 1, 46717),
('Xander', 'Schauffele', 'Xander Schauffele', 'USA', 2, 40098),
('Rory', 'McIlroy', 'Rory McIlroy', 'NIR', 3, 28237),
('Viktor', 'Hovland', 'Viktor Hovland', 'NOR', 12, 50525),
('Collin', 'Morikawa', 'Collin Morikawa', 'USA', 15, 50526),
('Tony', 'Finau', 'Tony Finau', 'USA', 18, 29725);

-- Default scoring rules (can be inserted for each tournament)
INSERT INTO scoring_rules (tournament_id, rule_name, rule_type, condition_value, points, description) VALUES
(1, 'First Place', 'position', '1', 100, 'Winner of the tournament'),
(1, 'Second Place', 'position', '2', 90, 'Second place finish'),
(1, 'Third Place', 'position', '3', 85, 'Third place finish'),
(1, 'Top 5', 'position', 'top_5', 80, 'Top 5 finish'),
(1, 'Top 10', 'position', 'top_10', 70, 'Top 10 finish'),
(1, 'Top 20', 'position', 'top_20', 60, 'Top 20 finish'),
(1, 'Top 30', 'position', 'top_30', 50, 'Top 30 finish'),
(1, 'Made Cut', 'position', 'made_cut', 30, 'Made the cut'),
(1, 'Eagle', 'performance', 'eagle', 5, 'Eagle scored'),
(1, 'Hole in One', 'performance', 'hole_in_one', 10, 'Hole in one'),
(1, 'Bogey Free Round', 'bonus', 'bogey_free', 5, 'Bogey-free round'),
(1, 'Round Under 65', 'bonus', 'under_65', 10, 'Round under 65'),
(1, 'Round Under 70', 'bonus', 'under_70', 5, 'Round under 70'),
(1, 'Birdie Streak 3+', 'bonus', 'birdie_streak_3', 3, 'Three or more birdies in a row'); 