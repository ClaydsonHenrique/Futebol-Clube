import { NextFunction, Request, Response } from 'express';
import Teams from '../database/models/20240108214809-teams';

const erroMatches = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    res.status(422).json({ message: 'It is not possible to create a match with two equal teams' });
  }
  const team1 = await Teams.findOne({ where: homeTeamId });
  const team2 = await Teams.findOne({ where: awayTeamId });
  console.log(team2);

  if (!team1 || !team2) {
    res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default erroMatches;
