import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'vingador mais forte';

type TokenPayload = {
  email:string,
  role:string,
};

// criando token

function sing(payload:TokenPayload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

export default sing;
