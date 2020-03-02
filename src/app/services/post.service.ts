import{HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable}from'rxjs';
import {Injectable} from'@angular/core';
import {Post}from'../models/Post';
import {global}from '../services/global';

@Injectable()
 export class PostService{
 	public url;
 	constructor(public _http:HttpClient) {
 		this.url=global.url;
 	}
 createPost(token,post):Observable<any>{
 	//de html entities a utf-8
 	post.content=global.htmlEntities(post.content);
 	let json=JSON.stringify(post);
 	let params='json='+json;
 	let headers=new HttpHeaders().set('Content-type','application/x-www-form-urlencoded').set('Authorization',token);

 	return this._http.post(this.url+'post',params,{headers:headers});
 }

 getPosts():Observable<any>{
 	let headers=new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
 	return this._http.get(this.url+"post",{headers:headers});
	 }

getPost(id):Observable<any>{
let headers=new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
return this._http.get(this.url+'post/'+id,{headers:headers});
	}


	update(id,token,post):Observable<any>{
		 	//de html entities a utf-8
 		post.content=global.htmlEntities(post.content);

		let json=JSON.stringify(post);
		let params='json='+json;
		let headers=new HttpHeaders().set('content-type','application/x-www-form-urlencoded').set('Authorization',token);
		return this._http.put(this.url+'post/'+id,params,{headers:headers});
	}

	delete(token,id){
		let headers=new HttpHeaders().set('content-Type','application/x-www-form-urlencoded').set('Authorization',token);
		return this._http.delete(this.url+'post/'+id,{headers:headers});
	}
	
}
