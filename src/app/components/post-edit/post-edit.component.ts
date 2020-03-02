import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router,Params} from '@angular/router';
import {UserService}from '../../services/user.service';
import {Post}from'../../models/Post';
import {PostService}from '../../services/post.service';
import {global}from'../../services/global';
import {Category} from'../../models/Category';
import {CategoryService}from'../../services/category.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',

  providers: [UserService,PostService,CategoryService]
})
export class PostEditComponent implements OnInit {
	public post:Post;
	public categories;
	public status:string;
	public token;
	public page_title:string;
	public identity;
	public edit:boolean;
  public url;
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

  constructor(
  	public userService:UserService,
  	public route:ActivatedRoute,
  	public router:Router,
  	public postservice:PostService,
  	public categoryService:CategoryService
  	) { 
  	this.token=this.userService.getToken();
  	this.identity=this.userService.getIdentity();
  	this.page_title="EDITA TU ENTRADA";
  	this.post=new Post(1,this.identity.sub,1,'','',null,null);
  	this.edit=true;
    this.url=global.url;

  }

  ngOnInit() {

  	this.getCategories();
     this.getPost();
 
  }

  getCategories(){
  	this.categoryService.getCategories(this.token).subscribe(response=>{
  		this.categories=response.categories;
  	},error=>{

  	});
  }
    imageUpload(data){
    let json =JSON.parse(data.response);
    if(json){
     this.post.image=json.image;
    }
  }
  
  getPost(){ 
  	this.route.params.subscribe(params=>{
  		let id=params['id'];
  		this.postservice.getPost(id).subscribe(response=>{
  			if(response.status=='success'){
			this.post=response.post;
      //si ententa editar un post no perteneciente
        if(this.post.user_id!=this.identity.sub){
         this.router.navigate(['/inicio']);
        }
       // if(this.po)
  			console.log(this.post);
  			}else{
  					this.router.navigate(['/inicio']);
  			}
  			
  		
  		},error=>{
  			this.router.navigate(['/inicio']);
  		});

  	});
  }


  onSubmit(form){
  	this.postservice.update(this.post.id,this.token,this.post).subscribe(
  		response=>{
  			if(response.status=="success"){
  				this.status="success";
  				this.router.navigate(['/entrada/'+this.post.id]);	
           

  			}else{
  				this.status="error";	
  			}
  		},
  		error=>{
  				this.status="error";
  		});
  	}
}
