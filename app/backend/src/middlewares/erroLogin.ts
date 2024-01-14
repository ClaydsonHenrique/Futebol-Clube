import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import { verifyToken } from '../utils/token.utils';

const erroLogin = (req:Request, res:Response, next:NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const isEmail = validator.isEmail(email);

  if (!isEmail || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return next();
};

const erroRole = (req:Request, res:Response, next:NextFunction) => {
  const { authorization: token } = req.headers;

  console.log(token, 'token');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const tokens = token.split(' ')[1];

  console.log(tokens);

  const validToken = verifyToken(tokens);

  console.log(validToken, 'valid token');

  if (!validToken) {
    console.log('entrou aqui 222', validToken);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  return next();
};

export { erroLogin, erroRole };
