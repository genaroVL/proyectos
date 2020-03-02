import { Component,OnInit,DoCheck } from '@angular/core';
import {UserService}from './services/user.service';
import {CategoryService} from './services/category.service';
import {global}from './services/global';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService,CategoryService]
})
export class AppComponent implements OnInit,DoCheck {
  title = 'blog-angular';
  show:boolean=false;
  public identity;
  public token;
  public url;
  public categories;

  constructor(
  	private _userService:UserService,private _categoryService:CategoryService
  	){
    this.loadUser();
    this.url=global.url;
  }
  ngDoCheck(){
    this.loadUser();
  }
  ngOnInit(){
  this.loadCategories();
  }
  loadUser(){
      this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }
  loadCategories(){
    this._categoryService.getCategories(this.token).subscribe(
      response =>{

        if(response.status=='success'){
          this.categories=response.categories;
             
        }
   
      },error =>{

      }
      );
  }
}
