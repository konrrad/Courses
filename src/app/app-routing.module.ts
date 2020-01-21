import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { LoginComponent} from './login/login.component'
import { AuthGuard } from './auth.guard';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component'


const routes: Routes = [
  
  {
    path: 'details/:$key',
    component: CourseComponent, canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent, pathMatch: 'full'
  },
  { path: '404', 
  component: PagenotfoundComponent },
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
