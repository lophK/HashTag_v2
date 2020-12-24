import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisComponent } from './regis/regis.component';
import { Routes,RouterModule } from "@angular/router";
import { ProfileComponent } from './profile/profile.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'Register', component: RegisComponent},
  {path: 'Homepage', component: HomeComponent},
<<<<<<< HEAD
  {path: 'Profile', component: ProfileComponent},
=======
   {path: 'login', component: LoginComponent},
>>>>>>> 470f7deeaab924b6c38a7dabdc3c2684d5573db3
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RegisComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
