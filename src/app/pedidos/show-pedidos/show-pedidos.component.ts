import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { PedidosService } from 'src/app/pedidos.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-show-pedidos',
  templateUrl: './show-pedidos.component.html',
  styleUrls: ['./show-pedidos.component.css']
})
export class ShowPedidosComponent implements OnInit {
  paqueteList$!:Observable<any[]>;
  paqueteList: any=[];
  tamanioList$!:Observable<any[]>;
  tamanioList:any=[];  
  clienteList$!:Observable<any[]>;
  clienteList:any=[];
  clienteSeleccionado:any=[];
  estadoPaquete$!:Observable<any[]>;
  estadoPaquete: any=[];
  ciudadList: any=[];
  MapTamanio:Map<number, string> = new Map();
  MapClienteNombre:Map<number, string> = new Map();
  MapEstado:Map<number, string> = new Map();
  MapCuidad:Map<number, string> = new Map();

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
  clienteId:number;
  cuidadId:number;
  filtro:number;

  ngOnInit(): void {
    this.paqueteList$ = this.service.getPaquetesList();
    this.tamanioList$ = this.service.getTamanioList();
    this.clienteList$ = this.service.getClienteList();
    this.estadoPaquete$ = this.service.getEstadoPaqueteList();
    this.mapeoTamanioPaquete();
    this.mapeoEstadoPaquete();
    this.mapeoNombreCliente();
    this.mapeoCuidad();
    this.MostrarPedidos();
    this.opcionesFlitro= ['Cliente','Ciudad','Fecha','Entregados','En Camino','No Entregados','Ninguno'];

  }
  modalTitle:string='';
  activeAddEditPedidosComponent:boolean=false;
  pedidos:any;
  MostrarDatosCliente:boolean=false;
  MostrarFiltroCliente:boolean=false
  MostrarFiltroFecha:boolean=false
  MostrarFiltroEntregado:boolean=false
  MostrarFiltroNoEntregados:boolean=false
  MostrarFiltroEnCamino:boolean=false
  MostrarFiltroCiudad:boolean=false;
  
  OpcionesFiltro(filtro){
    if(filtro == "Ninguno"){
      this.MostrarFiltroCliente = false;
      this.MostrarFiltroFecha=false
      this.MostrarFiltroEntregado=false
      this.MostrarFiltroNoEntregados=false
      this.MostrarFiltroEnCamino=false;
      this.MostrarFiltroCiudad=false;
      this.MostrarPedidos();
    }
    if(filtro === "Cliente"){
      this.MostrarFiltroCliente = true;
      this.MostrarFiltroFecha=false
      this.MostrarFiltroEntregado=false
      this.MostrarFiltroNoEntregados=false
      this.MostrarFiltroEnCamino=false;
      this.MostrarFiltroCiudad=false;
    } 
    else if(filtro === "Fecha"){
      this.MostrarFiltroFecha = true;
      this.MostrarFiltroCliente=false
      this.MostrarFiltroEntregado=false
      this.MostrarFiltroNoEntregados=false
      this.MostrarFiltroEnCamino=false;
      this.MostrarFiltroCiudad=false;
    }
    else if(filtro === "Entregados"){
      this.MostrarFiltroEntregado = true;
      this.MostrarFiltroCliente=false
      this.MostrarFiltroFecha=false
      this.MostrarFiltroNoEntregados=false
      this.MostrarFiltroEnCamino=false;
      this.MostrarFiltroCiudad=false;
    }
    else if(filtro === "No Entregados"){
      this.MostrarFiltroNoEntregados = true;
      this.MostrarFiltroCliente=false
      this.MostrarFiltroFecha=false
      this.MostrarFiltroEntregado=false
      this.MostrarFiltroEnCamino=false;
      this.MostrarFiltroCiudad=false;
    }else if(filtro === "En Camino"){
      this.MostrarFiltroNoEntregados = false;
      this.MostrarFiltroCliente=false
      this.MostrarFiltroFecha=false
      this.MostrarFiltroEntregado=false
      this.MostrarFiltroEnCamino=true;
      this.MostrarFiltroCiudad=false;
    }else if(filtro === "Ciudad"){
      this.MostrarFiltroNoEntregados = false;
      this.MostrarFiltroCliente=false
      this.MostrarFiltroFecha=false
      this.MostrarFiltroEntregado=false
      this.MostrarFiltroEnCamino=false;
      this.MostrarFiltroCiudad=true;
    }
  }

  filtroCuidades(){
    this.ListaCompleta2= [];
    let filtroCliente = this.clienteList.filter(clienteList => clienteList.cuidadId == this.cuidadId)
    this.service.getPaquetesList().subscribe(data =>{
      this.paqueteList = data;
      for(let i = 0; i < filtroCliente.length; i++){      
        let filtroCuidad = this.paqueteList.filter(paqueteList => paqueteList.clienteId == filtroCliente[i].id) 
        for(let y = 0; y < filtroCuidad.length; y++){
          this.ListaCompleta2.push(filtroCuidad[y]);
        }
      }
    })    
  }
  
  fitrarFecha(){
    let filtroFecha = this.ListaCompleta2.filter(ListaCompleta2 => ListaCompleta2.fechaEntrega >= this.fechaInicio && ListaCompleta2.fechaEntrega <= this.fechaFin)
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

  filtrarEnCamino(){
    let filtroEntregados = this.ListaCompleta2.filter(ListaCompleta2 => ListaCompleta2.estadoPaqueteId == 2)
    this.ListaCompleta2 = filtroEntregados;
  }

  filtrarPorClientes(){
    let filtroPaquetes = this.ListaCompleta2.filter(ListaCompleta2 => ListaCompleta2.clienteId == this.clienteId);    
    this.ListaCompleta2 = filtroPaquetes;
  }

  MostrarPedidos(){
    this.service.getPaquetesList().subscribe(data =>{
      this.ListaCompleta2 = data;
    })
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
    this.paqueteList$ = this.service.getPaquetesList();
  }

  modalInformation(item:any){
    this.modalTitle = "Datos del Cliente";
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
      this.ciudadList = data;

      for(let i = 0; i < data.length; i++){
        this.MapCuidad.set(this.ciudadList[i].id,this.ciudadList[i].nombre)
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

  mapeoEstadoPaquete(){
    this.service.getEstadoPaqueteList().subscribe(data => {
      this.estadoPaquete = data;

      for(let i = 0; i < data.length; i++){
        this.MapEstado.set(this.estadoPaquete[i].id,this.estadoPaquete[i].paquete)
      }
    })
  }

  delete(item:any){
    if(confirm(`Estas seguro que desea eliminar este pedido`)){
      this.service.deletePaquetes(item.id).subscribe(res=>{
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
      this.paqueteList$ = this.service.getPaquetesList();
      })
    }
  }
}
