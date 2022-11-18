import { NextFunction, Request, Response } from 'express';
import { Token } from 'Utils/Token';

const validateToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const header = request.headers.authorization;
  if (header?.startsWith('Bearer ')) {
    const token = header.split(' ')[1];
    request.body.user = Token.verify(token);
    next();
  } else return response.sendStatus(418);
};

export default validateToken;
