import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';

//import de el servicio
import {UserService} from'../../services/user.service';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
	public page_title:string;
  public user:User;
  public status:string;
  public flag:boolean;

  constructor(
    private _userService: UserService
    ) { 
  	this.page_title='Registrate';
    this.user=new User(1,'','','ROLE_USER','','','','');
 
    this.flag=false;

  }

  ngOnInit() {
  	console.log('componente de registrolanzado');
  }
  onSubmit(form){
   // console.log(' ');
    this._userService.register(this.user).subscribe(
      response=> {

      
       if(response.status=="success"){
         this.status=response.status;

         form.reset();
       
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

}
