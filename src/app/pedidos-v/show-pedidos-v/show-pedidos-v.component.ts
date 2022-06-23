import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';
import { count, Observable } from 'rxjs';
import { PedidosService } from 'src/app/pedidos.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-show-pedidos-v',
  templateUrl: './show-pedidos-v.component.html',
  styleUrls: ['./show-pedidos-v.component.css']
})
export class ShowPedidosVComponent implements OnInit {
  paqueteList$!:Observable<any[]>;
  paqueteList: any=[];
  tamanioList$!:Observable<any[]>;
  tamanioList:any=[];  
  clienteList$!:Observable<any[]>;
  clienteList:any=[];
  clienteSeleccionado:any=[];
  estadoPaquete$!:Observable<any[]>;
  estadoPaquete: any=[];
  Ciudadist: any=[];
  MapTamanio:Map<number, string> = new Map();
  MapClienteNombre:Map<number, string> = new Map();
  MapClienteId:Map<number, string> = new Map();
  MapEstado:Map<number, string> = new Map();
  MapCiudad:Map<number, string> = new Map();
  token:any=[];
  usuarioActual:any=[];
  emailActual ="";
  usuarioList: any=[];  
  clienteFilter : any[];
  paqueteFilter : any[];
  ListaCompleta : any[];
  ListaCompleta2 : any[];
  opcionesFlitro : any[];
  dateObjectControl = new FormControl(new Date());
  fechaInicio: any;
  fechaFin: any;

  constructor(private service:PedidosService,private serviceU:UserService, private serviceA:AuthenticationService, private _jwtHelper: JwtHelperService) { }

  @Input() pedido:any;
  clienteId:number = 0;
  filtro: number;
  
  ngOnInit(): void {
    this.paqueteList$ = this.service.getPaquetesList();
    this.tamanioList$ = this.service.getTamanioList();
    this.clienteList$ = this.service.getClienteList();
    this.estadoPaquete$ = this.service.getEstadoPaqueteList();
    this.mapeoTamanioPaquete();
    this.mapeoEstadoPaquete();
    this.mapeoNombreCliente();
    this.mapeoCuidad();
    this.mapeoClienteId();
    this.UsuarioActual();
    this.MostrarClientes();
    this.opcionesFlitro= ['Cliente','Fecha','Entregados','No Entregados','Ninguno'];
  }
  modalTitle:string='';
  activeAddEditPedidosComponent:boolean=false;
  pedidos:any;
  MostrarDatosCliente:boolean=false;
  MostrarFiltroCliente:boolean=false
  MostrarFiltroFecha:boolean=false
  MostrarFiltroEntregado:boolean=false
  MostrarFiltroNoEntregados:boolean=false

  OpcionesFiltro(filtro){
    if(filtro == "Ninguno"){
      this.MostrarFiltroCliente = false;
      this.MostrarFiltroFecha=false
      this.MostrarFiltroEntregado=false
      this.MostrarFiltroNoEntregados=false
      this.MostrarClientes()
    }
    if(filtro === "Cliente"){
      this.MostrarFiltroCliente = true;
      this.MostrarFiltroFecha=false
      this.MostrarFiltroEntregado=false
      this.MostrarFiltroNoEntregados=false
    } 
    else if(filtro === "Fecha"){
      this.MostrarFiltroFecha = true;
      this.MostrarFiltroCliente=false
      this.MostrarFiltroEntregado=false
      this.MostrarFiltroNoEntregados=false
    }
    else if(filtro === "Entregados"){
      this.MostrarFiltroEntregado = true;
      this.MostrarFiltroCliente=false
      this.MostrarFiltroFecha=false
      this.MostrarFiltroNoEntregados=false
    }
    else if(filtro === "No Entregados"){
      this.MostrarFiltroNoEntregados = true;
      this.MostrarFiltroCliente=false
      this.MostrarFiltroFecha=false
      this.MostrarFiltroEntregado=false
    }
  }

  UsuarioActual(){
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
    })              
  }

  MostrarClientes(){
    this.service.getClienteList().subscribe(data1 =>{
      this.clienteFilter = data1;
      let filtroCliente = this.clienteFilter.filter(clienteFilter => clienteFilter.cuidadId == this.usuarioActual.ciudadId);
      this.ListaCompleta = filtroCliente;
      this.service.getPaquetesList().subscribe(data =>{
        this.paqueteFilter = data;     
        this.ListaCompleta2 = [];
        for(let i = 0; i < filtroCliente.length; i++){
          if(this.usuarioActual.vehiculoId == 2){
            let filtroPaquetes = this.paqueteFilter.filter(paqueteFilter => paqueteFilter.clienteId == filtroCliente[i].id);          
            for(let y = 0; y < filtroPaquetes.length; y++){
              if(filtroPaquetes[y].tamanioPaqueteId <= 2){
                this.ListaCompleta2.push(filtroPaquetes[y]); 
              }           
            } 
          }else if(this.usuarioActual.vehiculoId == 3){
            let filtroPaquetes = this.paqueteFilter.filter(paqueteFilter => paqueteFilter.clienteId == filtroCliente[i].id);          
            for(let y = 0; y < filtroPaquetes.length; y++){
              if(filtroPaquetes[y].tamanioPaqueteId <= 3){
                this.ListaCompleta2.push(filtroPaquetes[y]); 
              }                        
            }
          }else if(this.usuarioActual.vehiculoId == 4){
            let filtroPaquetes = this.paqueteFilter.filter(paqueteFilter => paqueteFilter.clienteId == filtroCliente[i].id);          
            for(let y = 0; y < filtroPaquetes.length; y++){
              if(filtroPaquetes[y].tamanioPaqueteId <= 4 && filtroPaquetes[y].tamanioPaqueteId >=2){
                this.ListaCompleta2.push(filtroPaquetes[y]); 
              }                          
            }
        }                             
        }  
      })   
    })                
  }

  fitrarFecha(){
    let filtroFecha = this.ListaCompleta2.filter(ListaCompleta2 => ListaCompleta2.fechaEntrega >= this.fechaInicio && ListaCompleta2.fechaEntrega <= this.fechaFin)
    console.log(filtroFecha);
    this.ListaCompleta2 = filtroFecha ;
  }

  filtrarEntregados(){
    let filtroEntregados = this.ListaCompleta2.filter(ListaCompleta2 => ListaCompleta2.estadoPaqueteId == 3)
    this.ListaCompleta2 = filtroEntregados;
  }

  filtrarNoEntregados(){
    let filtroEntregados = this.ListaCompleta2.filter(ListaCompleta2 => ListaCompleta2.estadoPaqueteId == 1)
    this.ListaCompleta2 = filtroEntregados;
  }

  MostrarPedidos(){
    let filtroPaquetes = this.ListaCompleta2.filter(ListaCompleta2 => ListaCompleta2.clienteId == this.clienteId);    
    this.ListaCompleta2 = filtroPaquetes;
  }

  modalAdd(){
    this.MostrarDatosCliente= false; 
    this.pedidos = {
      id : 0,
      descripcion:null,
      fechaEntrega:null,
      nivelFragilidad:null,
      tamanioPaqueteId:null,
      clienteId:null
    }
    this.modalTitle = "Agregar Pedido";
    this.activeAddEditPedidosComponent= true;
  }

  modalEdit(item:any){
    this.MostrarDatosCliente= false; 
    this.pedidos=item;
    this.modalTitle = "Editar Pedido";
    this.activeAddEditPedidosComponent=true; 
  }

  modalClose(){
    this.MostrarDatosCliente= false; 
    this.activeAddEditPedidosComponent = false;
    this.MostrarClientes();
  }

  modalInformation(item:any){
    this.modalTitle = "Datos del CLiente";
    this.MostrarDatosCliente= true;
      this.service.getClienteList().subscribe(data =>{
      this.clienteSeleccionado = data;
      let cliente = this.clienteSeleccionado.filter(clienteSeleccionado => clienteSeleccionado.id == item.clienteId);   
      this.clienteSeleccionado = cliente;
    }); 
  }

  mapeoTamanioPaquete(){
    this.service.getTamanioList().subscribe(data => {
      this.tamanioList = data;

      for(let i = 0; i < data.length; i++){
        this.MapTamanio.set(this.tamanioList[i].id,this.tamanioList[i].tamanio)
      }
    })
  }

  mapeoCuidad(){
    this.serviceU.getCuidadList().subscribe(data => {
      this.Ciudadist = data;

      for(let i = 0; i < data.length; i++){
        this.MapCiudad.set(this.Ciudadist[i].id,this.Ciudadist[i].nombre)
      }
    })
  }

  mapeoNombreCliente(){
    this.service.getClienteList().subscribe(data => {
      this.clienteList = data;

      for(let i = 0; i < data.length; i++){
        this.MapClienteNombre.set(this.clienteList[i].id,this.clienteList[i].nombre)
      }
    })
  }

  mapeoClienteId(){
    this.service.getClienteList().subscribe(data => {
      this.clienteList = data;

      for(let i = 0; i < data.length; i++){
        this.MapClienteId.set(this.clienteList[i].id,this.clienteList[i].cuidadId)
      }
    })
  }

  mapeoEstadoPaquete(){
    this.service.getEstadoPaqueteList().subscribe(data => {
      this.estadoPaquete = data;

      for(let i = 0; i < data.length; i++){
        this.MapEstado.set(this.estadoPaquete[i].id,this.estadoPaquete[i].paquete)
      }
    })
  }

}
