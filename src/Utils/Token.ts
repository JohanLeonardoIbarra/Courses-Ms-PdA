import JWT from 'jsonwebtoken';
import Config from 'Config/env';

export class Token {
  public static verify(token: string) {
    return JWT.verify(token, Config.secretKey);
  }
}
