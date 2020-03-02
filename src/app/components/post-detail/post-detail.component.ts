import { Component, OnInit } from '@angular/core';
import{Router,ActivatedRoute,Params} from '@angular/router';
import {PostService}from '../../services/post.service';
import{Post}from'../../models/Post';
import {global}from '../../services/global';
import {UserService}from'../../services/user.service';
import{Category}from '../../models/Category';
import {User}from'../../models/User';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers:[PostService,UserService]
})
export class PostDetailComponent implements OnInit {
	public post:any;
	public url:string;
	public identity;
  public user:User;
  public category;
  constructor(
  	public route:ActivatedRoute,
  	public router:Router,
  	public postService:PostService,
  	public userService:UserService
  	) { 
  		this.url=global.url;
  		this.identity=this.userService.getIdentity;
  	  	this.post=new Post(1,this.identity.sub,1,' ',' ',null,null);
        this.user=new User(1,'','','','','','','');
        this.category=new Category(1,'');
	  
  }

  ngOnInit() {
  	this.getPost();
  }


  getPost(){
	this.route.params.subscribe(params=>{
		let id=+params['id'];

  	this.postService.getPost(id).subscribe(response=>{

			if(response.status=="success"){
				
				this.post=response.post;
        this.category=this.post.category;
        this.user=this.post.user;
			
			}else{
				this.router.navigate(['inicio']);
			}
		},error=>{
			this.router.navigate(['inicio']);
		});
	});


  }
}
