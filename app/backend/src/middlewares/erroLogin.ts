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

const tokenFail = (req:Request, res:Response, next:NextFunction) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const tokens = token.split(' ')[1];

  const validToken = verifyToken(tokens);

  if (!validToken) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  return next();
};

export { erroLogin, tokenFail };
