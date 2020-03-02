import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params}from '@angular/router';
import {UserService}from'../../services/user.service';
import {CategoryService}from '../../services/category.service';
import {Post}from '../../models/Post';
import {Category}from'../../models/Category';
import {PostService}from '../../services/post.service';
import {global}from'../../services/global';
@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers:[UserService,CategoryService,PostService]
})
export class PostNewComponent implements OnInit {
public page_title:string;
public identity;
public token;
public post:Post;
public categories:Category;
public status;
public afuConfig={
    multiple: false,
    formatsAllowed: ".jpg,.png,gif,jpeg",
    maxSize: "30",
    uploadAPI:  {
      url:global.url+'post/upload',
      headers: {
   
     "Authorization" : this.userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText:' Cargar Imagen' 
};
public froala_options: Object = {
    charCounterCount: true,

  placeholderText : '¡ Edite su contenido aquí! ',
    quickInsertTags: [],
    charCounterMax:140,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };
  constructor(public userService:UserService,
  	public categoryService:CategoryService,
  	public router:Router,
  	public route:ActivatedRoute,
    public postService:PostService
  	)
   {
	this.page_title="Crear una nueva entrada";
	this.identity=userService.getIdentity();
	this.token=userService.getToken();
	this.post=new Post(1,this.identity.sub,1,'','',null,null);
   }

  ngOnInit() {
  	console.log(this.post);
    this.getCategories();
  }

  getCategories(){
  this.categoryService.getCategories(this.token).subscribe(
      response=>{
        if(response.status=='success'){
          this.categories=response.categories;
   
        }
      },error=>{
        console.log(error);
      }
      );
  }
  imageUpload(data){
    let json =JSON.parse(data.response);
    if(json){
     this.post.image=json.image;
    }
  }
  onSubmit(form){
    this.postService.createPost(this.token,this.post).subscribe(
      response=>{
        if(response.status=="success"){
          this.status="success";
          this.router.navigate(['inicio']);
        }else{
          this.status="error";
        }
      }
      ,error=>{
        this.status="error";
      });
   
  }


 
}
