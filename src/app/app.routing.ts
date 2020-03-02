import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';


import {HomeComponent} from './components/home/home.component';
import {ErrorComponent}from './components/error/error.component';
import {LoginComponent} from './components/login/login.component';
import{RegisterComponent}from './components/register/register.component';
import{UserEditComponent}from './components/user-edit/user-edit.component';
import {CategoryNewComponent} from './components/category-new/category-new.component';
import {PostNewComponent}from './components/post-new/post-new.component';
import {PostDetailComponent}from './components/post-detail/post-detail.component';
import {PostEditComponent}from './components/post-edit/post-edit.component';
import{CategoryDetailComponent}from'./components/category-detail/category-detail.component';
import {IdentityGuard}from'./services/identity.guard';
 import {ProfileComponent} from'./components/profile/profile.component';
 
 const appRoutes: Routes =[
 {path:'',component:HomeComponent},
 {path:'login',component:LoginComponent},
 {path:'inicio',component:HomeComponent},
 {path:'registro',component:RegisterComponent},
 {path:'logout/:sure',component:LoginComponent},
 {path:'ajuste',component:UserEditComponent},
 {path:'crear-categoria',component:CategoryNewComponent,canActivate: [IdentityGuard]},
 {path:'crear-entrada',component:PostNewComponent,canActivate: [IdentityGuard]},
 {path:'entrada/:id',component:PostDetailComponent},
  {path:'perfil/:id',component:ProfileComponent},
  {path:'entrada/editar/:id',component:PostEditComponent,canActivate: [IdentityGuard]},
  {path:'categoria/:id',component:CategoryDetailComponent},
 {path:'**',component:ErrorComponent}


 ];

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);