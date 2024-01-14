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
  const authorizationHeader = req.get('Authorization');
  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = authorizationHeader.split(' ')[1];
  const validToken = verifyToken(token);
  if (validToken === null) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  return next();
};

export { erroLogin, erroRole };
