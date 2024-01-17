import { Ileadboard } from '../Interfaces/Iladerboard';
import Teams from '../database/models/20240108214809-teams';
import Matches from '../database/models/20240114050134-matches';

const DatasTeams = async () => {
  const allTeams = await Teams.findAll({ raw: true });
  return allTeams.map((team) => ({
    id: team.id,
    name: team.teamName,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  }));
};

const calculateGoalsEfyccience = (
  datas: Ileadboard,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  const updated = { ...datas };
  updated.totalGames += 1;
  console.log(updated.totalGames);
  updated.goalsFavor += homeTeamGoals;
  updated.goalsOwn += awayTeamGoals;
  updated.goalsBalance = updated.goalsFavor - updated.goalsOwn;

  updated.efficiency = Number(
    ((updated.totalPoints / (updated.totalGames * 3)) * 100).toFixed(2),
  );
  console.log(updated, 'verificando calculate goals and eficiency');
  return updated;
};

const matchResultHome = (
  datas: Ileadboard,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  const update = { ...datas };
  if (homeTeamGoals > awayTeamGoals) {
    update.totalPoints += 3;
    update.totalVictories += 1;
  } else if (homeTeamGoals === awayTeamGoals) {
    update.totalPoints += 1;
    update.totalDraws += 1;
  } else {
    update.totalLosses += 1;
  }
  console.log(update, 'verificando upadate');
  return update;
};

const matchResult = (matches: Matches, teams: Ileadboard, status: 'home' | 'away') => {
  let datas = { ...teams };
  const { homeTeamGoals, awayTeamGoals } = matches;

  datas = calculateGoalsEfyccience(datas, homeTeamGoals, awayTeamGoals);

  if (status === 'home') {
    datas = matchResultHome(datas, homeTeamGoals, awayTeamGoals);
  }

  return datas;
};

const updateDatas = async (
  matches: Matches[],
  data: Ileadboard[],
  status: 'home' | 'away',
) => {
  const updatedData = [...data];

  matches.forEach((match) => {
    const teamId = status === 'home' ? match.homeTeamId : match.awayTeamId;
    const team = updatedData.find((t) => t.id === teamId);

    if (team) {
      const updatedTeam = matchResult(match, team, status);
      const index = updatedData.findIndex((t) => t.id === teamId);

      if (index !== -1) {
        updatedData[index] = updatedTeam;
      }
    }
  });

  return updatedData;
};

const leaderboardHome = async (): Promise<Ileadboard[]> => {
  const data = await DatasTeams();
  const homeMatches = await Matches.findAll({
    raw: true,
    where: { inProgress: false },
  });

  const a = await updateDatas(homeMatches, data, 'home');
  console.log('adfsaaaa', a);
  return a;
};

export default leaderboardHome;
