import { Router } from '@angular/router';
import { AuthenticationService } from './../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public isUserAuthenticated: boolean;
  public isAdmin: boolean;
  public role = "";

  constructor(private _authService: AuthenticationService, private _router: Router,private _jwtHelper: JwtHelperService) {
    this._authService.authChanged
    .subscribe(res => {
    this.isUserAuthenticated = res;
  })
   }

  ngOnInit(): void {  
    this.isAdmin = false;  
    this._authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res; 
      this.isAdmin =this.esAdministrador()  
    })    
      
  }

  public esAdministrador= (): boolean =>{
    this._authService.getCurrentUser().subscribe(data =>{
      const token = data;
      const user = jwtDecode(token);    
      const decodedToken = this._jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.role = role            
    }) 
    if(this.role === 'Administrator'){
      return true
    }
    else{
      return false
    }                    
  }

  public logout = () => {
    this._authService.logout();
    this._router.navigate(["/"]);
  }
}
