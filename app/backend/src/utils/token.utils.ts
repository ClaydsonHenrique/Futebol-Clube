import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'vingador mais forte';

type TokenPayload = {
  email: string;
  role: string;
};

// criando token
function sing(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

// validando token
function verifyToken(token: string): TokenPayload | null {
  try {
    const tokenVerify = jwt.verify(token, secret) as TokenPayload;
    return tokenVerify;
  } catch (err) {
    return null;
  }
}

export { sing, verifyToken };
