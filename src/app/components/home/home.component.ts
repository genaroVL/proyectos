import { Component, OnInit } from '@angular/core';
import {PostService}from '../../services/post.service';
import {Post}from '../../models/Post';
import {global}from '../../services/global';
import {UserService} from'../../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[PostService,UserService]
})
export class HomeComponent implements OnInit {
public page_title:string;
public posts:Array<Post>;
public identity;
public token;
public url:string;
  constructor(
    private postService:PostService,
    private userService:UserService
    ) { 
  	this.page_title='inicio';
  	this.url=global.url;
    this.token=this.userService.getToken();
    this.identity=this.userService.getIdentity();
  }

  ngOnInit() {
  	this.getPosts();
  }

    getPosts(){
    this.postService.getPosts().subscribe(
      response=>{
      	this.posts=response.post;

     
      },error=>{
      	console.log(error);
      });
  }

  deletePost(id){
    this.postService.delete(this.token,id).subscribe(
      response=>{
        this.getPosts();
      },
      error=>{
        console.log(error);
      });
  }

}
