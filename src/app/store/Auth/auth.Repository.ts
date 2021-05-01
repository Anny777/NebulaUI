import { LoginResult } from 'src/app/commands/LoginResult';
import jwt_decode from 'jwt-decode';

export class AuthRepository {
  private accessTokenKey: string = "access_token";
  private tokenTypeKey: string = "token_type";

  public saveSession(accessToken: string, tokenType: string) {
    let expires = new Date(0).toUTCString();
    if(accessToken)
    {
      var decoded = jwt_decode<any>(accessToken);
      expires = decoded.exp;
    }

    document.cookie = `${this.accessTokenKey}=${accessToken}; path=/; expires=${expires}`;
    document.cookie = `${this.tokenTypeKey}=${tokenType}; path=/; expires=${expires}`;
  }

  public resetSession() {
    this.saveSession('', '');
  }

  public getSession(): LoginResult {
    const token = this.getCookie(this.accessTokenKey);
    const tokenType = this.getCookie(this.tokenTypeKey);
    let result = new LoginResult();
    result.access_token = token;
    result.token_type = tokenType;
    return result;
  }

  private getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
}
