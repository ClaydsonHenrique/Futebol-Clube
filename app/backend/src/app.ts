import * as express from 'express';
import 'express-async-errors';
import { getAllTeam, getTeamsByID } from './controllers/teams.controller';
import { Login, role } from './controllers/users.controller';
import { Matches, finishMatch, updateMatch, createMatch } from './controllers/matches.controller';
import leadboadersHome from './controllers/leaderboard.controller';
import erroMatches from './middlewares/erroMatches';
import errorMiddleware from './middlewares/errorMiddleware';
import { erroLogin, tokenFail } from './middlewares/erroLogin';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    /** Rota Teams */
    this.app.get('/teams', getAllTeam);
    this.app.get('/teams/:id', getTeamsByID);

    /** Rota login */
    this.app.post('/login', erroLogin, Login);
    this.app.get('/login/role', tokenFail, role);

    /** Rota matches */
    this.app.get('/matches', Matches);
    this.app.patch('/matches/:id/finish', tokenFail, finishMatch);
    this.app.patch('/matches/:id', tokenFail, updateMatch);
    this.app.post('/matches', tokenFail, erroMatches, createMatch);

    /* Leaderboard */
    this.app.get('/leaderboard/home', leadboadersHome);

    // Não remova esse middleware de erro, mas fique a vontade para customizá-lo
    // Mantenha ele sempre como o último middleware a ser chamado
    this.app.use(errorMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
