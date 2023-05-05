import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent implements OnInit, OnDestroy {
id!:number;
mascota!:Mascota;
mascota$!:Observable<Mascota>
//Desuscribirse
deSub!: Subscription;

loading:boolean=false;

constructor(private _snackBar: MatSnackBar, private _serviceMascota: MascotaService, private _aroute:ActivatedRoute) {
  // this.id=Number(this._aroute.snapshot.paramMap.get('id'));//Este 'id' es del app-routing
}
  
  ngOnInit(): void {
    // this.mascota$=this._serviceMascota.obtenerMascotaId(this.id);//pipeAsync
    // this.obtenerMascotaId();
    //truco para que el id ya no pase por el constructor y  para que no se ejecuta una sola vez//CAMBIAR ID//esto debe desuscribirse por memory
    this.deSub=this._aroute.params.subscribe(data=>{
      this.id=data['id'];
      this.mascota$=this._serviceMascota.obtenerMascotaId(this.id);
    })
  }
  ngOnDestroy(): void {
    this.deSub.unsubscribe();
  }

obtenerMascotaId(){
  return this._serviceMascota.obtenerMascotaId(this.id).subscribe(data=>
    this.mascota=data  
  )
}
}
