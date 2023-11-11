import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private firestore: AngularFirestore) { }


  //agregamos metodo para agregar los empleados
  addEmploye(employee:any):Promise<any>{
    return this.firestore.collection('empleados').add(employee);


  }

  getEmpleados():Observable<any>{
    return this.firestore.collection('empleados',ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges();
  }


  deleteEmploye(id:string): Promise<any>{
    return this.firestore.collection('empleados').doc(id).delete();
  }

  getEmpleado(id:string):Observable<any>{
    return this.firestore.collection('empleados').doc(id).snapshotChanges();

  }

  updateEmploye(id: string, data: any):Promise<any>{
    return this.firestore.collection('empleados').doc(id).update(data);
  }




}
