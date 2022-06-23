import { UserForRegistrationDto } from '../../_interfaces/userLogin/userForRegistrationDto'; 
import { RegistrationResponseDto } from '../../_interfaces/response/registrationResponseDto';
import { AuthResponseDto } from '../../_interfaces/response/AuthResponseDto';
import { UserForAuthenticationDto } from '../../_interfaces/userLogin/userForAuthenticationDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();
  
  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService, private _jwtHelper: JwtHelperService) { }

  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this._http.post<RegistrationResponseDto>(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  private currentUserSubject = new BehaviorSubject<any>(null);

  public loginUser = (route: string, body: UserForAuthenticationDto) => {    
    return this._http.post<AuthResponseDto>(this.createCompleteRoute(route, this._envUrl.urlAddress), body).pipe(
      map(userInfo => {
        localStorage.setItem('token', userInfo.token);          
        this.currentUserSubject.next(userInfo.token); // <-- pump the value in here
         
        return userInfo;
      })
    );
  }

  public getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("token");    
    const decodedToken = this._jwtHelper.decodeToken(token!);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return role === 'Administrator';
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }
  public isUserAuthenticated = (): boolean | string | null => {
    const token = localStorage.getItem("token");
 
    return token && !this._jwtHelper.isTokenExpired(token);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  

}
