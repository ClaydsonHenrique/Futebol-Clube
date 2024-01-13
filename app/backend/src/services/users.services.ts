import * as bcrypt from 'bcryptjs';
import UserModels from '../database/models/20240110191218-login';
import { Ilogin } from '../Interfaces/IUsers';
import sing from '../utils/token.utils';

const login = async (user:Ilogin) => {
  const { email, password } = user;
  const verifyLogin = await UserModels.findOne({ where: { email } });
  console.log(verifyLogin, 'fsfdsf');
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
  const token = sing({ email, role });
  return { status: 200, data: token };
};

export default login;
