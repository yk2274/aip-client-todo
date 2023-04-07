import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { TaskComponent } from './component/main/task/task.component';
import { AuthGuard } from './service/auth-guard.service';
import { AdminComponent } from './component/admin/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: LoginComponent },
  { path: 'task', component: TaskComponent, canActivate:[AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data: {role: "ROLE_ADMIN"} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  token = localStorage.getItem('jwt_token')
}
