import { Component, Input, OnInit } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { PedidosService } from 'src/app/pedidos.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-show-clientes',
  templateUrl: './show-clientes.component.html',
  styleUrls: ['./show-clientes.component.css']
})
export class ShowClientesComponent implements OnInit {

  cuidadList$!:Observable<any[]>;
  cuidadList: any=[];
  clienteList$!:Observable<any[]>;
  clienteList:any=[];
  filtroCiudad:any=[];
  MapCuidad:Map<number, string> = new Map();
  MapBarrio:Map<number, string> = new Map();

  constructor(private service:PedidosService, private serviceU:UserService) { }

  @Input() cliente:any;
  cuidadId:number;

  ngOnInit(): void {
    this.cuidadList$ = this.serviceU.getCuidadList();
    this.listaClientes();
    this.mapeoCiudad();    
  }

  modalTitle:string='';
  activeAddEditClientesComponent:boolean=false;
  MostrarDatosBarrio:boolean=false;
  clientes:any;

  modalAdd(){
    this.clientes = {
      id : 0,
      nombre:null,
      apellido:null,
      telefono:null,
      cedula:null,
      direccion:null,
      cuidadId:null
    }
    this.modalTitle = "Agregar Cliente";
    this.activeAddEditClientesComponent= true;
    this.MostrarDatosBarrio= false;           
  }

  filtrarCuidad(){
    this.service.getClienteList().subscribe(data =>{
      this.clienteList = data;
      let filtro = this.clienteList.filter(clienteList => clienteList.cuidadId == this.cuidadId)
      this.clienteList = filtro
    })
  }

  listaClientes(){
    this.service.getClienteList().subscribe(data =>{
      this.clienteList = data;
    })
  }

  modalEdit(item:any){
    this.MostrarDatosBarrio= false;           
    this.clientes=item;
    this.modalTitle = "Editar Cliente";
    this.activeAddEditClientesComponent=true; 
  }

  modalClose(){
    this.activeAddEditClientesComponent = false;
    this.MostrarDatosBarrio= false;           
    this.clienteList$ = this.service.getClienteList();
  }

  mapeoCiudad(){
    this.serviceU.getCuidadList().subscribe(data => {
      this.cuidadList = data;

      for(let i = 0; i < data.length; i++){
        this.MapBarrio.set(this.cuidadList[i].id,this.cuidadList[i].nombre)
      }
    })
  }

  delete(item:any){
    if(confirm(`Estas seguro que desea eliminar a este cliente`)){
      this.service.deleteCliente(item.id).subscribe(res=>{
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
      this.clienteList$ = this.service.getClienteList();
      })
    }
  }
}
