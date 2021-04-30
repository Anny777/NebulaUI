import jwt_decode from 'jwt-decode';

export class LoginResult {
  access_token: string;
  token_type: string;

  public getDecodedToken(): any {
    const result = jwt_decode(this.access_token);
    console.log(result);
    return result;
  }
}
