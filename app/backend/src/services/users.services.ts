import * as bcrypt from 'bcryptjs';
import UserModels from '../database/models/20240110191218-login';
import { Ilogin } from '../Interfaces/IUsers';

const login = async (user:Ilogin) => {
  try {
    const { email, password } = user;
    const verifyLogin = await UserModels.findOne({ where: { email } });
    if (!verifyLogin) throw new Error('Email or Password is incorrect');
    const verfifyPassword = await bcrypt.compare(
      password,
      verifyLogin.password,
    );
    if (!verfifyPassword) {
      return { status: 403, data: { message: 'senha incorreta' } };
    }
    return { status: 201, data: verifyLogin };
  } catch (e) {
    console.log('Erro no controller de Login', e);
  }
};

export default login;
