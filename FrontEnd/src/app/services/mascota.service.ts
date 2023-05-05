import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../interfaces/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private MyAppUrl: string=environment.apiBaseUrl;
  private MyApiUrl: string='api/Mascota/';
  constructor(private http:HttpClient) { 

  }
  obtenerMascota():Observable<Mascota[]>{
    return this.http.get<Mascota[]>(`${this.MyAppUrl}${this.MyApiUrl}`);
  }
  obtenerMascotaId(id:number):Observable<Mascota>{
    return this.http.get<Mascota>(`${this.MyAppUrl}${this.MyApiUrl}${id}`);
  }
  deleteMascota(id:number): Observable<void>{
    return this.http.delete<void>(`${this.MyAppUrl}${this.MyApiUrl}${id}`);
  }
  addMascota(mascota:Mascota):Observable<Mascota>{
    return this.http.post<Mascota>(`${this.MyAppUrl}${this.MyApiUrl}`,mascota)
  }
  updateMascota(id:number, mascota:Mascota):Observable<void>{
    return this.http.put<void>(`${this.MyAppUrl}${this.MyApiUrl}${id}`,mascota)
  }
}
