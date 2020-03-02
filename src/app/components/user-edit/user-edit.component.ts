import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {global}from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers:[UserService]
})
export class UserEditComponent implements OnInit {
public page_title:string;
public user:User;
public identity;
public token;
public status;
public url;


public afuConfig={
    multiple: false,
    formatsAllowed: ".jpg,.png,gif,jpeg",
    maxSize: "30",
    uploadAPI:  {
      url:global.url+'user/upload',
      headers: {
   
     "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText:' Subir imagen    ' 
};


public froala_options: Object = {
    charCounterCount: true,

  placeholderText : '¡ Edite su contenido aquí! ',
    quickInsertTags: [],
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  constructor(private _userService:UserService) { 

this.page_title='Ajustes de perfil';
 this.user=new User(1,'','','ROLE_USER','','','','');
 this.identity=this._userService.getIdentity();
 this.token=this._userService.getToken();
 this.user=this.identity;
 this.url=global.url;

  }

  ngOnInit() {
  	
  }
  onSubmit(form){
  	

  	this._userService.update(this.token,this.user).subscribe(
  		response=>{
  			
  			if(response.status && response){
  				this.status='success';

  				this.identity=response.changes;
  				localStorage.setItem('identity',JSON.stringify(this.identity));

  			}else{
  				this.status='error';
  			}
  		},
  		error=>{
  			this.status='error';
  			console.log(<any>error);
  		}
  		);
  }
  avatarUpload(datos){
    let data=JSON.parse(datos.response);
    this.user.image=data.image;
  }
}
