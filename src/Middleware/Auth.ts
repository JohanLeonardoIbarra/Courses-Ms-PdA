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
    try {
      request.body.user = Token.verify(token);
      next();
    } catch (err) {
      return response.sendStatus(403);
    }
  } else return response.sendStatus(401);
};

export default validateToken;
