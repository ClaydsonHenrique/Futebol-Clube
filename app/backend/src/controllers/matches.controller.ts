import { Request, Response } from 'express';
import {
  getMatches,
  matchesInProgrecess,
  finshMatchService,
} from '../services/matches.service';

const Matches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  console.log(inProgress);
  if (!inProgress) {
    console.log(inProgress);
    const matches = await getMatches();
    res.status(matches.status).json(matches.data);
  }
  const matches = await matchesInProgrecess(inProgress as string);
  res.status(matches.status).json(matches.data);
};

const finishMatch = async (req:Request, res:Response) => {
  const { id } = req.params;
  const matchFinished = await finshMatchService(Number(id));
  return res.status(matchFinished.status).json(matchFinished.data);
};

export { Matches, finishMatch };
