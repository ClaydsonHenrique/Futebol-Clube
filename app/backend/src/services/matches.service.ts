import Matches from '../database/models/20240114050134-matches';
import Teams from '../database/models/20240108214809-teams';
import { TeamsServices } from '../Interfaces/teams';

const getMatches = async (): Promise<TeamsServices> => {
  const allMatches = await Matches.findAll({
    include: [
      { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });
  console.log(allMatches);
  if (!allMatches) {
    return { status: 400, data: { message: 'erro' } };
  }
  return { status: 200, data: allMatches };
};

const matchesInProgrecess = async (inProgress:string): Promise<TeamsServices> => {
  if (!inProgress || inProgress !== 'true') {
    return { status: 400, data: { message: 'erro' } };
  }
  const allMatches = await Matches.findAll({
    where: { inProgress: true },
    include: [
      { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });
  return { status: 200, data: allMatches };
};

export { getMatches, matchesInProgrecess };
