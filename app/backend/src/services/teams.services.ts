import { TeamsServices, teamID } from '../Interfaces/teams';
import TeamsModel from '../database/models/20240108214809-teams';

const getAllTeams = async (): Promise<TeamsServices> => {
  const getTeams = await TeamsModel.findAll();
  return { status: 200, data: getTeams };
};

const getTeamsID = async (teamsId: number): Promise<teamID> => {
  const getTeamID = await TeamsModel.findOne({ where: { id: teamsId } });
  if (!getTeamID) throw new Error('No Team Found');
  return { status: 200, data: getTeamID };
};

export { getAllTeams, getTeamsID };
