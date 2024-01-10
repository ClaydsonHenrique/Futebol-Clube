import { Request, Response } from 'express';
import login from '../services/users.services';

const Login = async (req:Request, res:Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'All fields must be filled' });
  }
  const { status, data } = await login({ email, password });
  res.status(status).json(data);
};
export default Login;
