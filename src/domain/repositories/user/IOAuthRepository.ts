import { OAuthUserDTO } from "../../../application/dtos/auth/oauth.dto";

export interface IOAuthService {
  getAccessToken(authCode: string): Promise<string>;
  getUserInfo(token: string): Promise<OAuthUserDTO>;
}
