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
  usuarios: User[]=[];
  user: User;
  roles;

  p: number = 1;
  count: number = 8;

  error: string;
  msm_error: string;


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



  // showDeleteConfirm(id: any) {
  //   this.confirmService.openConfirmDialog("Seguro que desea borrar este usuario?" + id, "Eliminar", this.proced, id.toString(),this);

  // }

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

  /*
   proced - Esta función se ejecuta en el ambito del servicio confirmService y no en esta clase.
            Por eso paso por referencia este objecto en la variable that y así poder ejecutar estos metodos.

   */
  public proced(id?: string, that?:any): void {

    if (id && that) {

      that.userService.deleteById(id).subscribe();

    }
  }




  // search( text: string) {// funciona, devuelve la busqueda


  //   if( this.search.length == 0){
  //     return;
  //   }

  //   return this.http.get(this.ServerUrl + 'api_directorio/search?text=' + text )
  //     .toPromise()
  //     .then(doctores=>{
  //       this.doctores= {'results': JSON.stringify(doctores, null),

  //       'json': ()=>{
  //         return doctores;
  //       }

  //     };

  //     // devolver el array
  //     const mapped = Object.keys(doctores)
  //     .map(key => ({type: key, value: doctores[key]}));
  //     console.log(doctores);
  //     this.doctores = doctores;

  //     });

  // }





}
