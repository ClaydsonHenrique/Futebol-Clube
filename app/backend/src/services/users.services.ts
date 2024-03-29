import * as bcrypt from 'bcryptjs';
import UserModels from '../database/models/20240110191218-login';
import { Ilogin } from '../Interfaces/IUsers';
import { verifyToken, sign } from '../utils/token.utils';

const login = async (user:Ilogin) => {
  const { email, password } = user;
  const verifyLogin = await UserModels.findOne({ where: { email } });
  if (!verifyLogin || !verifyLogin.dataValues) {
    return { status: 401, data: { message: 'Invalid email or password' } };
  }
  const verfifyPassword = await bcrypt.compare(
    password,
    verifyLogin.password,
  );
  if (!verfifyPassword) {
    return { status: 401, data: { message: 'Invalid email or password' } };
  }
  const { role } = verifyLogin;
  const token = sign({ email, role });
  return { status: 200, data: { token } };
};

const getRole = (token: string): string | null => {
  const decoded = verifyToken(token);
  if (decoded) {
    return decoded.role;
  }
  return null;
};

export { login, getRole };
