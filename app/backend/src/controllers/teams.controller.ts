import { Request, Response } from 'express';
import { getAllTeams, getTeamsID } from '../services/teams.services';

const getAllTeam = async (_req: Request, res: Response): Promise<void> => {
  const getTeams = await getAllTeams();
  const { status, data } = getTeams;
  res.status(status).json(data);
};

const getTeamsByID = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const teamId = await getTeamsID(Number(id));
  res.status(teamId.status).json(teamId.data);
};

export { getAllTeam, getTeamsByID };
