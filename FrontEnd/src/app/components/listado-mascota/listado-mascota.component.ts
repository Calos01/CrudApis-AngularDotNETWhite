import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

// const ListaMascota: Mascota[] = [
//   {name: 'Loco', edad: 10, raza: 'H', color: 'verde', peso: 32},
//   {name: 'Holi', edad: 10, raza: 'H', color: 'verde', peso: 32},
//   {name: 'Aser', edad: 10, raza: 'H', color: 'verde', peso: 32},
//   {name: 'dja', edad: 10, raza: 'H', color: 'verde', peso: 32},
//   {name: 'udna', edad: 10, raza: 'H', color: 'verde', peso: 32},
//   {name: 'fef', edad: 10, raza: 'H', color: 'verde', peso: 32},
//   {name: 'fkko', edad: 10, raza: 'H', color: 'verde', peso: 32},
//   {name: 'bi', edad: 10, raza: 'H', color: 'verde', peso: 32}
// ];
@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})

//implements afterview que se inicia el constructor despues para el paginator
//Signo de exclamacion en paginator para decir que es no nulo
export class ListadoMascotaComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['name', 'edad', 'raza', 'color', 'peso', 'acciones'];
  dataSource = new MatTableDataSource<Mascota>();
//progressbar
  loading:boolean=false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _serviceMascota: MascotaService) {
    
  }
  ngOnInit(): void {
    this.ObtenerMascota();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //cambiando el label de la paginacion
    this.paginator._intl.itemsPerPageLabel="Items por pagina: "
    //ordenamiento de columnas
    this.dataSource.sort = this.sort;
  }

  //tabla con filter y pagination ; https://material.angular.io/components/table/examples
  applyFilter(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value; // obtenemos valor
    // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue.trim().toLowerCase();//filtros
  }

  ObtenerMascota(){
    this.loading=true;
      return this._serviceMascota.obtenerMascota().subscribe(data=>{
        this.dataSource.data=data;
        this.loading=false;
      })
  }

  eliminarMascota(id:number) {
    this.loading=true;
    //como en el servicio el delete devuelve un void ya no es necesario ponerle data
      this._serviceMascota.deleteMascota(id).subscribe(()=>{
        this.mensajeEliminado();
        this.loading=false;
        //para que se refresque la lista
        this.ObtenerMascota();
      }) 
  }

  mensajeEliminado(){
      this._snackBar.open("Producto Eliminado","",{
        duration:4000,
        horizontalPosition:'end'
      }); 
  }
}
