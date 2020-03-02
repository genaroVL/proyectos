import { Component, OnInit } from '@angular/core';
import{ActivatedRoute,Router,Params}from'@angular/router';
import {CategoryService}from'../../services/category.service';
import{Category} from '../../models/Category';
import {global} from '../../services/global';
import {UserService} from '../../services/user.service';
import {PostService}from'../../services/post.service';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService,UserService,PostService]
})
export class CategoryDetailComponent implements OnInit {
	public page_title:string;
	public category:Category;
	public posts:any;
	public url:string;
	public identity;
	public token;
  constructor(
  	private _route:ActivatedRoute,
  	private _router:Router,
  	private _categoryService:CategoryService,
  	private userService:UserService,
  	private postService:PostService

  	) {
  	this.url=global.url;
  	this.identity=this.userService.getIdentity();
  	this.token=this.userService.getToken();
  }

  ngOnInit() {
  	this.getPostByCategory();
  }
  getPostByCategory(){
  	this._route.params.subscribe(params=>{
  		let id=+params['id'];
  		this._categoryService.getCategory(id).subscribe(response=>{
  			if(response.status=="success"){

  				this.category=response.categories;
  				this._categoryService.getPost(id).subscribe(response=>{
  					if(response.status=="success"){
  						this.posts=response.post;
  					}else{
  						this._router.navigate(['/inicio'])
  					}
  					
  				},error=>{


  				});
  			}else{
  				this._router.navigate(['/inicio']);
  			}
  		
  		},error=>{

  			this._router.navigate(['/inicio']);
  		});
  	});

  	
  }
    deletePost(id){
    this.postService.delete(this.token,id).subscribe(
      response=>{
        	this.getPostByCategory();
      },
      error=>{
        console.log(error);
      });
  }

}
