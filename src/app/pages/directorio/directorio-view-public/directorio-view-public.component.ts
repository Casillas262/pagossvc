import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Directorio } from 'src/app/models/directorio';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { DirectorioService } from 'src/app/services/directorio.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-directorio-view-public',
  templateUrl: './directorio-view-public.component.html',
  styleUrls: ['./directorio-view-public.component.css']
})
export class DirectorioViewPublicComponent implements OnInit {


  title = "Detalles del directorio";
  user: User;
  userprofile: User;
  error: string;
  directories: Directorio;
  directory: Directorio;
  payments: Payment;
  id:number;

  rolesSelected:number;
  href : string;

  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private alertService: AlertService,
    private directorioService: DirectorioService,

  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.closeMenu();
    this.activatedRoute.params.subscribe( ({id}) => this.getDirectory(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getUserRemoto(id));

  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // return this.userService.getUserLocalStorage();
    // console.log(this.user);


  }

  getUserRemoto(id:number){
    this.userService.getUserById(+id).subscribe(
      res =>{
        this.userprofile = res[0];
        error => this.error = error
        console.log(this.userprofile);
      }
    );
    // id = this.userprofile.id;


  }

  getDirectory(id:number): void {
    // id = this.directory.user_id;

    this.directorioService.getDirectorio(id).subscribe(
      res =>{
        this.directory = res;
        error => this.error = error;
        console.log(this.directory);
      }
    );
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  /**
   * @method: Descarga la imagen del qr
   * @author: malcolm
   * @since: 11/07/2022
   */

  downloadImage(){

    const box = document.getElementById('box');
    box.parentElement.classList.add('parent')

    box.hasAttribute('img');

    this.href = document.getElementsByClassName('parent')[0].querySelector('img').src;

    // console.log('img', this.href);
  }


}
