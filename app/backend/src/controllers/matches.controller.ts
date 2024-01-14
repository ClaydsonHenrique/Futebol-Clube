import { Request, Response } from 'express';
import { getMatches, matchesInProgrecess } from '../services/matches.service';

const Matches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (!inProgress) {
    const matches = await getMatches();
    res.status(matches.status).json(matches.data);
  }
  const matches = await matchesInProgrecess(inProgress as string);
  res.status(matches.status).json(matches.data);
};

export default Matches;
