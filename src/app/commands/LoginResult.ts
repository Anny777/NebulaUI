import jwt_decode from 'jwt-decode';

export class LoginResult {
  access_token: string;
  token_type: string;
}
