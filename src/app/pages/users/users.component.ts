import { Component, OnInit } from '@angular/core';

import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  title = "Usuarios"

  loading = false;
  usersCount = 0;
  usuarios: any;
  user: User;
  roles;

  p: number = 1;
  count: number = 8;

  error: string;
  msm_error: string;
  query:string ='';

  ServerUrl = environment.apiUrl;
  doctores;

  constructor(
    private userService: UserService,
    private location: Location,
    private http: HttpClient,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
    }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.closeMenu();
    this.getUsers();
    this.getUser();
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    // console.log(this.user);
    // console.log(this.user.id);
  }



  getUsers(): void {
    this.userService.getAll().subscribe(
      res =>{
        this.usuarios = res;
        error => this.error = error;
        // console.log(this.usuarios);
      }
    );
  }




  eliminarUser(user:User){
    this.userService.deleteById(user).subscribe(
      response =>{
        this.getUsers();
      },
      error=>{
        this.msm_error = 'No se pudo eliminar el curso, vuelva a intentar.'
      }
      );
      this.ngOnInit();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  search() {
    return this.userService.search(this.query).subscribe(
      res=>{
        this.usuarios = res;
        if(!this.query){
          this.ngOnInit();
        }
      });
  }



}
