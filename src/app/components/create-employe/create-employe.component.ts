import { EmployeService } from './../../services/employe.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwIfEmpty } from 'rxjs';
import { DocumentSnapshot } from 'firebase/firestore';


@Component({
  selector: 'app-create-employe',
  templateUrl: './create-employe.component.html',
  styleUrls: ['./create-employe.component.css']
})
export class CreateEmployeComponent {

  createEmploye: FormGroup;
  submitte = false;
  loading = false;
  id: string | null;
  title = 'Formulario de Ingreso';
  textButtom = 'Agregar';

  constructor(private fb:FormBuilder, private _empleadoService : EmployeService,
              private router: Router,private toastr: ToastrService,
              private aRoute: ActivatedRoute){

    //validacioes con reactiveForm

    this.createEmploye = this.fb.group({
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      documento:['', Validators.required],
      salario:['', Validators.required],
      cargo:['', Validators.required],
      fechaNac:['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
      this.editarForm()
  }


  addEditEmploye():void{
    this.submitte = true

    if(this.createEmploye.invalid){
      return;

    }
    if(this.id === null){
      this.addEmploye();
    }else{
      this.editEmploye(this.id);
    }
  }

  addEmploye(){
    //estraemos los datos de los input
    const employe : any = {
      nombre:this.createEmploye.value.nombre,
      apellido:this.createEmploye.value.apellido,
      documento:this.createEmploye.value.documento,
      salario:this.createEmploye.value.salario,
      cargo:this.createEmploye.value.cargo,
      fechaNac:this.createEmploye.value.fechaNac,
      fechaCreacion: new Date(),
      fechaActualizacion:new Date()

    }
    this.loading = true;
    this._empleadoService.addEmploye(employe).then(()=>{
      this.toastr.success("el empleado se registro con exito","empleado registrado",{positionClass:'toast-bottom-left'});
      this.loading = false;
      this.router.navigate(['/list-employees'])
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  //metodo para editar el empleado
  editEmploye(id: string){
    const employe : any = {
      nombre:this.createEmploye.value.nombre,
      apellido:this.createEmploye.value.apellido,
      documento:this.createEmploye.value.documento,
      salario:this.createEmploye.value.salario,
      cargo:this.createEmploye.value.cargo,
      fechaNac:this.createEmploye.value.fechaNac,
      fechaActualizacion:new Date()

    }
    this.loading = true;
    this._empleadoService.updateEmploye(id, employe).then(()=>{

      this.loading = false;
      this.toastr.info('El Registro fue modificado exitosamente','Actualizacion',{positionClass:'toast-bottom-right'});
    })
    this.router.navigate(['/list-employees'])
  }


  // metodo para editar registro.

   editarForm(){

     if(this.id !== null){
      this.loading = true
      this.title = "Editar Registro"
      this.textButtom = 'Actualizar Registro'
       this._empleadoService.getEmpleado(this.id).subscribe(data =>{
        this.loading = false

        this.createEmploye.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
          cargo: data.payload.data()['cargo'],
          fechaNac: data.payload.data()['fechaNac']
        })
       })
     }
   }






}
