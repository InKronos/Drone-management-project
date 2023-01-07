import jwt, { SignOptions } from 'jsonwebtoken';
export const signJwt = (
  payload: Object
) => {
 //const privateKey = keyName === 'accessTokenPrivateKey' ? process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY :  process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;
  return jwt.sign(payload, 'Secret');
};

export const verifyJwt = <T>(
    token: string,
    keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
  ): T | null => {
    try {
      const decoded = jwt.verify(token, 'Secret') as T;
  
      return decoded;
    } catch (error) {
      return null;
    }
  };