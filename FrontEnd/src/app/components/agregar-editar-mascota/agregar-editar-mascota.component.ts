import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit {
  loading:boolean=false;
  form:FormGroup;
  id!:number;
  titulo:string="Agregar";
  
  constructor(private fb:FormBuilder, private _serviceMascota: MascotaService, private router:Router, private _snackBar:MatSnackBar, private aRoute:ActivatedRoute) {    
    this.form=this.fb.group({
      nombre:['', Validators.required], 
      edad:['', Validators.required], 
      raza:['', Validators.required], 
      color:['', Validators.required], 
      peso:['', Validators.required], 
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));//id del routing parsear ya q devuelve string
  }
  ngOnInit(): void {
    if(this.id!=0){
      this.titulo="Editar"
      this.obtenerMascota(this.id)
    }
  }

  obtenerMascota(id:number){
    this._serviceMascota.obtenerMascotaId(id).subscribe(data=>{
      this.form.setValue({//en el set se tiene que rellenar todos los campos y en el patchValue no es necesario
        nombre:data.nombre,//nombre es del input del html
        edad:data.edad,
        raza:data.raza,
        color:data.color,
        peso:data.peso
      })
    })
  }

  agregarEditarMascota(){
    
    const mascota:Mascota={
      nombre: this.form.value.nombre,
      edad: this.form.value.edad,
      raza: this.form.value.raza,
      color: this.form.value.color,
      peso: this.form.value.peso
    };
    // console.log(mascota);
    // //este es otra forma de jalar un dato
    // console.log(this.form.get('nombre')?.value);
    
      if(this.id!=0){
        this.editarMascota(this.id,mascota);
      }else{
        this.agregarMascota(mascota);
      }
    } 

    editarMascota(id:number,mascota:Mascota){
      mascota.id=this.id;//tienes que setear el id porq sino su id sera 0 por defecto
      this._serviceMascota.updateMascota(id,mascota).subscribe(()=>{
        this.router.navigate(['/ListadoMascota']);//para volver al listado
        this.mensajeAgregado('actualizado');
      })
    }

    agregarMascota(mascota:Mascota){
      this._serviceMascota.addMascota(mascota).subscribe(data=>{
        console.log(data);
        this.router.navigate(['/ListadoMascota']);//para volver al listado
        this.mensajeAgregado('agregado');
      })
    }

    mensajeAgregado(texto:string){
      this._snackBar.open(`Producto ${texto} exitosamente`,"",{
        duration:4000,
        horizontalPosition:'end'
      }); 
    }
  }

