import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PedidosService } from 'src/app/pedidos.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-edit-pedidos',
  templateUrl: './add-edit-pedidos.component.html',
  styleUrls: ['./add-edit-pedidos.component.css']
})
export class AddEditPedidosComponent implements OnInit {
  dateObjectControl = new FormControl(new Date());
  model:any;
  paqueteList$!:Observable<any[]>;
  tamanioList$!:Observable<any[]>;
  estadoList$!:Observable<any[]>;
  clienteList$!:Observable<any[]>;
  clienteList: any=[];
  ciudadList: any=[];
  Actualizar: boolean = false;
  pedidosList: any=[];
  MapCuidad:Map<number, string> = new Map();

  constructor(private service: PedidosService,private serviceU:UserService) { }

  @Input() pedido:any;
  id: number = 0;
  descripcion : string = "";
  fechaEntrega: any;
  nivelFragilidad: number;
  estadoPaqueteId!:number;
  tamanioPaqueteId!:number;
  ciudadId!: number;
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
    this.mapeoCuidad();
    this.Listas();
  }  

  Listas(){
    this.serviceU.getCuidadList().subscribe(data =>{
      this.ciudadList = data;
    })    
  }

  mostrarClientesPorCiudad(){    
    this.service.getClienteList().subscribe(data =>{
      this.clienteList = data;
      let filtrarCiudad = this.clienteList.filter(clienteList => clienteList.cuidadId == this.ciudadId)
      this.clienteList = filtrarCiudad;
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

  agregarPedido(){
    this.Actualizar = false;
    var pedido ={
      descripcion:this.descripcion,
      fechaEntrega:this.fechaEntrega,
      nivelFragilidad:this.nivelFragilidad,
      estadoPaqueteId :1,
      tamanioPaqueteId:this.tamanioPaqueteId,
      clienteId:this.clienteId
    }
    this.service.addPaquetes(pedido).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display ="none"
        }
      }, 4000);
    })
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
    this.service.updatePaquetes(id,pedido).subscribe(res => {
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
