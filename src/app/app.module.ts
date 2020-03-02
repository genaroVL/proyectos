import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing,appRoutingProviders} from'./app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {IdentityGuard}from'./services/identity.guard';
import {UserService}from './services/user.service';
//umport para peticiones
import {HttpClientModule} from '@angular/common/http';

//import {HttpClient,HttpHeaders} from '@angular/common/http';

// import para formulario
import {FormsModule} from '@angular/forms';
import { UserEditComponent } from './components/user-edit/user-edit.component';

import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostListComponent } from './components/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    UserEditComponent,
    
    CategoryNewComponent,
    
    PostNewComponent,
    
    PostDetailComponent,
    
    PostEditComponent,
    
    CategoryDetailComponent,
    
    ProfileComponent,
    
    PostListComponent,

  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
     FroalaEditorModule.forRoot(), 
     FroalaViewModule.forRoot()

  ],
  providers: [
  appRoutingProviders,UserService,IdentityGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
