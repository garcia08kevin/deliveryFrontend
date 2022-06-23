import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly UserApiurl = "http://kevingarcia0084-001-site1.itempurl.com/api";

  constructor(private http:HttpClient) { }

  //UsuarioControl

  getUserActual():Observable<any[]>{
    return this.http.get<any>(this.UserApiurl + '/accounts');
  }  

  getUserAList():Observable<any[]>{
    return this.http.get<any>(this.UserApiurl + '/userLogin');
  }

  addAUser(data:any){
    return this.http.post(this.UserApiurl +'/userLogin', data )
  }

  updateAUser(id:number|string, data:any){
    return this.http.put(this.UserApiurl + `/userLogin/${id}`,data);
  }
  deleteAUser(id:number|string){
    return this.http.delete(this.UserApiurl + `/userLogin/${id}`);
  }

    //Vehiculo

    getVehiculoList():Observable<any[]>{
      return this.http.get<any>(this.UserApiurl + '/vehiculos');
    }
  
      addVehiculo(data:any){
        return this.http.post(this.UserApiurl +'/vehiculos', data )
      }
  
      updateVehiculo(id:number|string, data:any){
        return this.http.put(this.UserApiurl + `/vehiculos/${id}`,data);
      }
      deleteVehiculo(id:number|string){
        return this.http.delete(this.UserApiurl + `/vehiculos/${id}`);
      }
      

    //Cuidad
    getCuidadList():Observable<any[]>{
      return this.http.get<any>(this.UserApiurl + '/cuidades');
    }
  
      addCiudad(data:any){
        return this.http.post(this.UserApiurl +'/cuidades', data )
      }
  
      updateCuidad(id:number|string, data:any){
        return this.http.put(this.UserApiurl + `/cuidades/${id}`,data);
      }
      deleteCuidad(id:number|string){
        return this.http.delete(this.UserApiurl + `/cuidades/${id}`);
      }      
}
