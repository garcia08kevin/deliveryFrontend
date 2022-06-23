import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  public urlAddress: string = "http://kevingarcia0084-001-site1.itempurl.com"
  constructor() { }
}