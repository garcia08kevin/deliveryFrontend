import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { PedidosService } from 'src/app/pedidos.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-edit-pedidos-v',
  templateUrl: './add-edit-pedidos-v.component.html',
  styleUrls: ['./add-edit-pedidos-v.component.css']
})
export class AddEditPedidosVComponent implements OnInit {
  dateObjectControl = new FormControl(new Date());
  model:any;
  paqueteList$!:Observable<any[]>;
  tamanioList$!:Observable<any[]>;
  estadoList$!:Observable<any[]>;
  clienteList$!:Observable<any[]>;
  Actualizar: boolean = false;
  token:any=[];
  usuarioActual:any=[];
  emailActual ="";
  usuarioList: any=[]; 

  constructor(private service: PedidosService,private serviceU:UserService, private serviceA:AuthenticationService, private _jwtHelper: JwtHelperService) { }

  @Input() pedido:any;
  id: number = 0;
  descripcion : string = "";
  fechaEntrega: any;
  nivelFragilidad: number;
  estadoPaqueteId!:number;
  tamanioPaqueteId!:number;
  clienteId!:number;


  ngOnInit(): void {    
    this.id = this.pedido.id;
    this.descripcion = this.pedido.descripcion;
    this.fechaEntrega = this.pedido.fechaEntrega;
    this.estadoPaqueteId = this.pedido.estadoPaqueteId;
    this.nivelFragilidad = this.pedido.nivelFragilidad;
    this.tamanioPaqueteId = this.pedido.tamanioPaqueteId;
    this.clienteId = this.pedido.clienteId;
    this.paqueteList$ = this.service.getPaquetesList();
    this.clienteList$ = this.service.getClienteList();
    this.tamanioList$ = this.service.getTamanioList();
    this.estadoList$ = this.service.getEstadoPaqueteList();
  }  

  UsuarioActual(){
               
  }

  actualizarPedido(){
    this.Actualizar = true;
    var pedido ={
      id:this.id,
      descripcion:this.descripcion,
      fechaEntrega:this.fechaEntrega,
      nivelFragilidad:this.nivelFragilidad,
      estadoPaqueteId :this.estadoPaqueteId,
      tamanioPaqueteId:this.tamanioPaqueteId,
      clienteId:this.clienteId
    }
    var id:number =this.id;
    this.usuarioActual =[];
    this.usuarioList =[];
    this.serviceA.getCurrentUser().subscribe(data =>{
      this.token = data;
      const user = jwtDecode(this.token);    
      const decodedToken = this._jwtHelper.decodeToken(this.token);
      const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
      this.emailActual = email;        
    })
    this.serviceU.getUserAList().subscribe(data => {
      this.usuarioList = data;
      let usuarioActual = this.usuarioList.filter(usuarioList => usuarioList.userName === this.emailActual);   
      this.usuarioActual = usuarioActual[0];   
      this.service.updatePaquetesFiltro(id,this.usuarioActual.ciudadId,pedido).subscribe(res => {
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
    })       
  }

}
