import { Component,Input , OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  UserList$! : Observable<any[]>;
  vehiculoList: any=[];
  cuidadList:any=[];
  cuidadList$!:Observable<any[]>;
  vehiculoList$!:Observable<any[]>;
  constructor(private service:UserService) { }

  @Input() user:any;
  id:string= ""
  vehiculoId : number;
  ciudadId!:number;
  firstName:string= "";
  lastName:string= "";
  userName:string="";
  normalizedUserName:string= "";
  email:string= "";
  normalizedEmail:string= "";
  emailConfirmed:boolean;
  passwordHash:string= "";
  securityStamp:string= "";
  concurrencyStamp:string= "";
  PhoneNumber:string="";
  phoneNumberConfirmed:boolean;
  twoFactorEnabled: boolean;
  lockoutEnd:Date;
  lockoutEnabled: boolean;
  AccessFailedCount: number;
  


  ngOnInit(): void {
    this.id =this.user.id;
    this.cuidadList$ = this.service.getCuidadList();
    this.vehiculoList$ = this.service.getVehiculoList();
    this.vehiculoId = this.user.vehiculoId;
    this.ciudadId = this.user.ciudadId;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.userName = this.user.userName;
    this.normalizedUserName = this.user.normalizedUserName;
    this.email = this.user.email;
    this.normalizedEmail = this.user.normalizedEmail;
    this.emailConfirmed = this.user.emailConfirmed;
    this.passwordHash = this.user.passwordHash;
    this.securityStamp = this.user.securityStamp;
    this.concurrencyStamp = this.user.concurrencyStamp;
    this.PhoneNumber = this.user.PhoneNumber;
    this.phoneNumberConfirmed = this.user.phoneNumberConfirmed;
    this.twoFactorEnabled = this.user.twoFactorEnabled;
    this.lockoutEnd = this.user.lockoutEnd;
    this.lockoutEnabled = this.user.lockoutEnabled;
    this.AccessFailedCount = this.user.AccessFailedCount;
  }

  
  updateUser(){
    var user ={
      id:this.id,
      vehiculoId:this.vehiculoId,
      ciudadId:this.ciudadId,
      firstName:this.user.firstName,
      lastName:this.user.lastName,
      userName:this.user.userName,
      normalizedUserName:this.user.normalizedUserName,
      email:this.user.email,
      normalizedEmail:this.user.normalizedEmail,
      emailConfirmed:this.user.emailConfirmed,
      passwordHash:this.user.passwordHash,
      securityStamp:this.user.securityStamp,
      concurrencyStamp:this.user.concurrencyStamp,
      PhoneNumber:this.user.PhoneNumber,
      phoneNumberConfirmed:this.user.phoneNumberConfirmed,
      twoFactorEnabled:this.user.twoFactorEnabled,
      lockoutEnd:this.user.lockoutEnd,
      lockoutEnabled:this.user.lockoutEnabled,
      AccessFailedCount:this.user.AccessFailedCount,
      IdentityUserClaim:1
    }
    var id:string =this.id;
    this.service.updateAUser(id,user).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess){
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showUpdateSuccess){
          showUpdateSuccess.style.display ="none"
        }
      }, 4000);
    })
  }
}
