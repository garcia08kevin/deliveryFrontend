import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidosService } from 'src/app/pedidos.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-edit-clientes',
  templateUrl: './add-edit-clientes.component.html',
  styleUrls: ['./add-edit-clientes.component.css']
})
export class AddEditClientesComponent implements OnInit {

  model:any;
  ciudadList$!:Observable<any[]>;
  clienteList$!:Observable<any[]>;

  constructor(private service : PedidosService, private serviceU : UserService) { }

  @Input() cliente:any;
  id: number = 0;
  nombre : string = "";
  apellido: string = "";
  telefono : number
  cedula: number;
  direccion: string = "";
  barrio: string = "";
  cuidadId!:number;
  Actualizar: boolean = false;

  ngOnInit(): void {
    this.id = this.cliente.id;
    this.nombre = this.cliente.nombre;
    this.apellido = this.cliente.apellido;
    this.telefono = this.cliente.telefono;
    this.cedula = this.cliente.cedula;
    this.direccion = this.cliente.direccion;
    this.barrio = this.cliente.barrio;
    this.cuidadId = this.cliente.cuidadId;    
    this.clienteList$ = this.service.getClienteList();
    this.ciudadList$ = this.serviceU.getCuidadList();
  }

  agregarCliente(){
    this.Actualizar = false;
    var cliente ={
      nombre:this.nombre,
      apellido:this.apellido,
      telefono:this.telefono,
      cedula:this.cedula,
      direccion :this.direccion,
      barrio : this.barrio,
      cuidadId:this.cuidadId
    }
    this.service.addCliente(cliente).subscribe(res => {
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
  

  actualizarCliente(){
    this.Actualizar = true;
    var cliente ={
      id:this.id,
      nombre:this.nombre,
      apellido:this.apellido,
      telefono:this.telefono,
      cedula:this.cedula,
      direccion :this.direccion,
      barrio : this.barrio,
      cuidadId:this.cuidadId
    }
    var id:number =this.id;
    this.service.updateCliente(id,cliente).subscribe(res => {
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
