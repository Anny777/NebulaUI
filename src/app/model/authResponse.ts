export class AuthResponse{
  constructor(success:boolean, userInfo?:any){
    this.success = success;
    this.userInfo = userInfo;
  }
  public success: boolean;
  public userInfo: any; // TODO create typed model!
}
