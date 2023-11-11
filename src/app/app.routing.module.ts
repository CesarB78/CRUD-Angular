import { CreateEmployeComponent } from './components/create-employe/create-employe.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



 const routes : Routes = [
  {path:'',redirectTo:'list-employees',pathMatch:'full'},
  {path:'list-employees',component:ListEmployeesComponent},
  {path:'create-employe', component: CreateEmployeComponent},
  {path:'edit-Employe/:id', component: CreateEmployeComponent},
  {path:'**',redirectTo:'list-employees',pathMatch:'full'},
 ];

 @NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
 })

 export class AppRoutingModule{};
