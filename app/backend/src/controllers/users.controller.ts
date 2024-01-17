import { Request, Response } from 'express';
import { login, getRole } from '../services/users.services';

const Login = async (req:Request, res:Response): Promise<void> => {
  const { email, password } = req.body;
  const userlogin = { email, password };
  const { status, data } = await login(userlogin);
  res.status(status).json(data);
};

const role = (req:Request, res:Response) => {
  const authorizationHeader = req.get('Authorization');
  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = authorizationHeader.split(' ')[1];
  const Role = getRole(token);
  return res.status(200).json({ role: Role });
};

export { Login, role };
