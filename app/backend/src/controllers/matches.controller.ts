import { Request, Response } from 'express';
import {
  getMatches,
  matchesInProgrecess,
  finshMatchService,
  updateMatches,
  createNewMatch,
} from '../services/matches.service';

const Matches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (!inProgress) {
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

const updateMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const matchFinished = await updateMatches(Number(id), homeTeamGoals, awayTeamGoals);
  return res.status(matchFinished.status).json(matchFinished.data);
};

const createMatch = async (req:Request, res:Response): Promise<void> => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
  const newMatch = await createNewMatch(
    homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
  );
  res.status(newMatch.status).json(newMatch.data);
};

export { Matches, finishMatch, updateMatch, createMatch };
