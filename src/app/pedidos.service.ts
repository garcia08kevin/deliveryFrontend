import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  readonly UserApiurl = "http://kevingarcia0084-001-site1.itempurl.com/api";

  constructor(private http:HttpClient) { }

  //Clientes

  getClienteList():Observable<any[]>{
    return this.http.get<any>(this.UserApiurl + '/clientes');
  }

  getClienteById(id:number):Observable<any[]>{
    return this.http.get<any>(this.UserApiurl + `/clientes/${id}`);
  }

  addCliente(data:any){
    return this.http.post(this.UserApiurl +'/clientes', data )
  }

  updateCliente(id:number|string, data:any){
    return this.http.put(this.UserApiurl + `/clientes/${id}`,data);
  }
  deleteCliente(id:number|string){
    return this.http.delete(this.UserApiurl + `/clientes/${id}`);
  }

  //Paquetes

  getPaquetesList():Observable<any[]>{
    return this.http.get<any>(this.UserApiurl + '/paquetes');
  }

  addPaquetes(data:any){
    return this.http.post(this.UserApiurl +'/paquetes', data )
  }

  updatePaquetes(id:number|string, data:any){
    return this.http.put(this.UserApiurl + `/paquetes/${id}`,data);
  }

  updatePaquetesFiltro(id:number|string, idCiudad:number|string, data:any){
    return this.http.put(this.UserApiurl + `/paquetes/${id}?ciudadUsuario=${idCiudad}`,data);
  }

  deletePaquetes(id:number|string){
    return this.http.delete(this.UserApiurl + `/paquetes/${id}`);
  }

  //Tamaño Paquetes

  getTamanioList():Observable<any[]>{
    return this.http.get<any>(this.UserApiurl + '/tamanioPaquetes');
  }

  //Tamaño Paquetes

  getEstadoPaqueteList():Observable<any[]>{
    return this.http.get<any>(this.UserApiurl + '/estadoPaquetes');
  }
  
}
