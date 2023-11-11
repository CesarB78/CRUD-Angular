import { EmployeService } from './../../services/employe.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore,collection, collectionData } from '@angular/fire/firestore';

import { Component,inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  empleados:any[] = [];

// injectamos el servicio que creamos en services.
  constructor(private _empleadosServices : EmployeService,
              private toastr: ToastrService){

  }
ngOnInit(): void {
  this.getEmpleados();
}

//creamos el metodo para utilizar el servicio que creamos en services

getEmpleados(){
  this._empleadosServices.getEmpleados().subscribe(data =>{
    this.empleados = [];
    data.forEach((element:any) => {
        //console.log(element.payload.doc.id)
        //console.log(element.payload.doc.data())
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

    });
    console.log(this.empleados)
  })
}
deleteEmploye(id:string){
  this._empleadosServices.deleteEmploye(id).then(()=>{
    this.toastr.error("el empleado se Elimino con exito","Registro Eliminado",{positionClass:'toast-bottom-right'});
  }).catch(error=>{
    console.log(error);
  })
}


openModal(){

  const modal = document.getElementById('exampleModal');
  if(modal!== null){
    modal.style.display = 'block';
  }

}
closeModal(){

  const modal = document.getElementById('exampleModal');
  if(modal!== null){
    modal.style.display = 'none';
  }

}

}
