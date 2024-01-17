import { Request, Response } from 'express';
import leaderboardHome from '../services/leaderboard.service';

const leadboadersHome = async (req: Request, res:Response) => {
  const restult = await leaderboardHome();
  res.status(200).json(restult);
};

export default leadboadersHome;
