import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthGuardService } from './security/auth-guard.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { BulkDeleteComponent } from './bulk-delete/bulk-delete.component';
import { CreateTaskComponent } from './create-task/create-task.component';


const routes: Routes = [
  {
    path: '', component: LoginComponent },
  {
    path: 'register', component: RegisterComponent },
  {
    path: 'login', component: LoginComponent },
  {
    path: 'list-tasks', component: ListTasksComponent, canActivate: [AuthGuardService] },  
  {
    path: 'create-task', component: CreateTaskComponent, canActivate: [AuthGuardService] },
  {
    path: 'bulk-delete', component: BulkDeleteComponent, canActivate: [AuthGuardService] },
    

    

  // {
  //   path: '',
  //    component: DashboardComponent,
  //   // canActivate: [AuthGuardService],
  //   loadChildren: () =>
  //     import('./dashboard/content/dashboard.module').then(
  //       (m) => m.DashboardModule
  //     ),
  // },
];

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
