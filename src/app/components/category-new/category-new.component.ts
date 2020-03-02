import { Component, OnInit } from '@angular/core';
import{Router,ActivatedRoute,Params}from '@angular/router';
import {UserService}from '../../services/user.service';
import {CategoryService}from '../../services/category.service';

import {Category}from '../../models/Category';
@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService,CategoryService]
})
export class CategoryNewComponent implements OnInit {
public page_title:string;
public category:Category;
public status:string;
public identity;
public token;
  constructor(public userService:UserService,
  	public categoryService:CategoryService,
  	public router:Router,
  	public route:ActivatedRoute) {
  	this.page_title='Crear Nueva Categoria';
  	this.identity=this.userService.getIdentity();
  	this.token=this.userService.getToken();
 	this.category=new Category(1,'');
   }

  ngOnInit() {
  }
onSubmit(form){
	this.categoryService.register(this.token,this.category).subscribe(
		response=>{
			if(response.status=="success"){
			this.status="success";

			this.category=response.categorie;
			console.log(this.category);
			this.router.navigate(['/inicio']);
			}else{
			this.status="error";
			}
		}

		,error=>{

		}
		);
}
}
