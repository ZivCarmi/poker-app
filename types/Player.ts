export type Player = {
  id: string;
  name: string;
  gamesPlayed: number;
  moneyEarned: number;
  moneySpent: number;
};

export type Participant = {
  id: string;
  username: string;
  games_played: number;
  money_spent: number;
  money_won: number;
  created_at: Date;
};
