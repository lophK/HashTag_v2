import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisComponent } from './regis/regis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProfileComponent } from './profile/profile.component';
import { ViralComponent } from './viral/viral.component';
import { CommentComponent } from './comment/comment.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'Register', component: RegisComponent},
  {path: 'Homepage', component: HomeComponent},
  {path: 'Profile', component: ProfileComponent},
  {path: 'Viral', component: ViralComponent},
  {path: 'Comment', component: CommentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
