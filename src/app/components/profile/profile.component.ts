import { Component, OnInit } from '@angular/core';
import {UserService}from'../../services/user.service';
import {ActivatedRoute,Params} from '@angular/router';
import {PostService}from'../../services/post.service';
import {global}from'../../services/global';
import {Post}from'../../models/Post';
import {User}from '../../models/User';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[UserService,PostService]

})
export class ProfileComponent implements OnInit {
public idUser;
public token;
public user:User;
public identity;
public url;
public posts:Array<Post>;
  constructor(
  	public userService:UserService,
  	public route:ActivatedRoute,
    public postService:PostService
  	) { 
    this.token=userService.getToken();
    this.url=global.url;
    this.identity=userService.getIdentity();
    this.user=new User(1,'','','','','','','');
 
  }

  ngOnInit() {
    this.getProfile();

  	
  }

  getuser(id){

    this.userService.getUser(id).subscribe(response=>{
         
      if(response.status=="sucess"){
  
        this.user=response.user;

      }
    },error=>{
      console.log(error);

    });
  }

getProfile() {
	this.route.params.subscribe(params=>{
    this.idUser=params['id'];
  this.getPostUser(this.idUser);  
  this.getuser(this.idUser);
  });

	}
  getPostUser(id){
  	this.userService.getPosts(id).subscribe(response=>{
     // console.log(response);
      if(response.status=="success"){
           this.posts=response.post;
      }
   
    },error=>{


    });
  }

  deletePost(id){
    this.postService.delete(this.token,id).subscribe(
      response=>{
       this.getProfile();
      },
      error=>{
        console.log(error);
      });
  }
}
