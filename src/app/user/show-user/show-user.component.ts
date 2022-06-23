import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserService } from 'src/app/user.service';
import jwtDecode, { JwtHeader} from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  userList$!:Observable<any[]>;
  vehiculoList: any=[];
  usuarioList: any=[];
  cuidadList:any=[];
  cuidadList$!:Observable<any[]>;
  vehiculoList$!:Observable<any[]>;
  userMapVehiculo:Map<number, string> = new Map();
  userMapCiudad:Map<number, string> = new Map();
  token:any=[];
  usuarioActual:any=[];
  emailActual ="";
  
  constructor(private service:UserService, private serviceA:AuthenticationService, private _jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.userList$ = this.service.getUserAList();
    this.cuidadList$ = this.service.getCuidadList();
    this.vehiculoList$ = this.service.getVehiculoList();
    this.mapeoCuidad();
    this.mapeoVehiculo();
    this.getUsuarioActual();
  }

  //variable propiedades
  modalTitle:string='';
  activeAddEditUserComponent:boolean=false;
  user:any;

  getUsuarioActual(){
    this.usuarioActual =[];
    this.usuarioList =[];
    this.serviceA.getCurrentUser().subscribe(data =>{
      this.token = data;
      const user = jwtDecode(this.token);    
      const decodedToken = this._jwtHelper.decodeToken(this.token);
      const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
      console.log(email);
      this.emailActual = email;
      this.service.getUserAList().subscribe(data => {
      this.usuarioList = data;
      })         
    })
    this.service.getUserAList().subscribe(data => {
      this.usuarioList = data;
      let usuarioActual = this.usuarioList.filter(usuarioList => usuarioList.userName === this.emailActual);   
      console.log(usuarioActual); 
      this.usuarioActual = usuarioActual;
    })    
  }

  mapeoVehiculo(){
    this.service.getVehiculoList().subscribe(data => {
      this.vehiculoList = data;

      for(let i = 0; i < data.length; i++){
        this.userMapVehiculo.set(this.vehiculoList[i].id,this.vehiculoList[i].tipo)
      }
    })
  }

  mapeoCuidad(){
    this.service.getCuidadList().subscribe(data => {
      this.cuidadList = data;

      for(let i = 0; i < data.length; i++){
        this.userMapCiudad.set(this.cuidadList[i].id,this.cuidadList[i].nombre)
      }
    })
  }


  modalEdit(item:any){
      this.user=item;
      this.modalTitle = "Editar Usuario";
      this.activeAddEditUserComponent=true; 
      this.getUsuarioActual();
  }

  delete(item:any){
    if(confirm(`Estas seguro que desea eliminar el usuario ${item.firstName} ${item.lastName}`)){
      this.service.deleteAUser(item.id).subscribe(res=>{
        var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess){
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showDeleteSuccess){
          showDeleteSuccess.style.display ="none"
        }
      }, 4000);
      this.userList$ = this.service.getUserAList();
      })
    }
  }

  modalClose(){
    this.activeAddEditUserComponent = false;
    this.userList$ = this.service.getUserAList();
  }
}
