import Matches from '../database/models/20240114050134-matches';
import Teams from '../database/models/20240108214809-teams';
import { TeamsServices } from '../Interfaces/teams';

/* *  função para pegar todas partidas* */
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

/* *  função para pegar as partidas pela query string * */

const matchesInProgrecess = async (inProgress:string): Promise<TeamsServices> => {
  if (!inProgress) {
    return { status: 400, data: { message: 'erro' } };
  }
  const matchValue = inProgress === 'true';
  const allMatches = await Matches.findAll({
    where: { inProgress: matchValue },
    include: [
      { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });
  return { status: 200, data: allMatches };
};

/* *  função para atualizar partida * */
const finshMatchService = async (id:number): Promise<TeamsServices> => {
  if (!id) {
    return { status: 400, data: { message: 'id não encontrado' } };
  }
  const getMatche = await Matches.findOne({ where: { id } });
  if (!getMatche) {
    return { status: 400, data: { message: 'id invalido' } };
  }
  console.log(getMatche, 'ljsldkflskdf');
  await Matches.update({ inProgress: 0 as any }, { where: { id } });
  return { status: 200, data: { message: 'Finished' } };
};

const updateMatches = async (
  id:number,
  homeTeamGoals:number,
  awayTeamGoals:number,
) : Promise<TeamsServices> => {
  if (!id || !homeTeamGoals || !awayTeamGoals) {
    return { status: 400, data: { message: 'id não encontrado' } };
  }
  const getMatche = await Matches.findOne({ where: { id } });
  if (!getMatche) {
    return { status: 400, data: { message: 'id invalido' } };
  }
  await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  return { status: 200, data: { message: 'atualizado' } };
};

const createNewMatch = async (
  homeTeamId: number,
  awayTeamId:number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  const createMatch = await Matches.create(
    { homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true },
  );
  return { status: 201, data: createMatch };
};

export {
  getMatches,
  matchesInProgrecess,
  finshMatchService,
  updateMatches,
  createNewMatch,
};
