import { BrowserModule } from '@angular/platform-browser';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { ViralComponent } from './viral/viral.component';
import { CommentComponent } from './comment/comment.component';
import { EditPComponent } from './edit-p/edit-p.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AvatarModule } from 'ngx-avatar';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { TagpostComponent } from './tagpost/tagpost.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfiletagetComponent } from './profiletaget/profiletaget.component';  
import { DialogModule } from 'primeng/dialog';
import { Header1Component } from './header1/header1.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RegisComponent,
    ProfileComponent,
    ViralComponent,
    CommentComponent,
    EditPComponent,
    TagpostComponent,
    ProfiletagetComponent,
    Header1Component,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    AvatarModule,
    StorageServiceModule,
    NgbModule,
    DialogModule,
    ButtonModule,
    ToolbarModule,
    SplitButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
