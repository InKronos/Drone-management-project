import jwt, { SignOptions } from 'jsonwebtoken';
export const signJwt = (
  payload: Object
) => {
 //const privateKey = keyName === 'accessTokenPrivateKey' ? process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY :  process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;
  return jwt.sign(payload, 'Secret');
};

export const verifyJwt = (
    token: string,
  ) => {
    try {
      const decoded = jwt.verify(token, 'Secret');
      console.log(decoded.sub);
      return decoded.sub?.toString();
    } catch (error) {
      return null;
    }
  };