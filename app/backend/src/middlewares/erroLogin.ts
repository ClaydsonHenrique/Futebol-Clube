import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

const erroLogin = (req:Request, res:Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'All fields must be filled' });
  }
  const isEmail = validator.isEmail(email);
  if (!isEmail || password.length < 6) {
    res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default erroLogin;
