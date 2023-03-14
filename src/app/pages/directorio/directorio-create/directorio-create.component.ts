import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Directorio } from 'src/app/models/directorio';
import { DirectorioService } from 'src/app/services/directorio.service';
import { UserService } from 'src/app/services/user.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-directorio-create',
  templateUrl: './directorio-create.component.html',
  styleUrls: ['./directorio-create.component.css']
})
export class DirectorioCreateComponent implements OnInit {

  @ViewChild("directoryForm")
  directoryForm!: NgForm;
  isSubmitted: boolean = false;

  pageTitle : string;
  public directory: Directorio;

  user!: User;
  userprofile!: User;
  id:any;
  error:string;

  // ngform
  public nombre: string;
  public surname: string;
  public especialidad: string;
  public org: string;
  public universidad: string;
  public ano: string;
  public website: string;
  public email: string;
  public direccion: string;
  public direccion1: string;
  public estado: string;
  public ciudad: string;
  public telefonos: string;
  public tel1: string;
  public telhome: string;
  public telmovil: string;
  public telprincipal: string;
  public facebook: string;
  public instagram: string;
  public twitter: string;
  public linkedin: string;
  public status: string;
  public vCardInfo: string;
  public fileInputValue: File;

  //Qr
  value: string;
  display = false;
  elementType: 'url' | 'canvas' | 'img' = 'url';
  href : string;
  vcard: string;

  constructor(
    private directorioService: DirectorioService,
    private router: Router,
    private location: Location,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.pageTitle = 'Crear Directorio';
    this.getUser();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
    if(!this.user || !this.user.id || this.user.id == null || this.user.id == undefined){
      this.router.navigateByUrl('/login');

    }
      this.id = this.user.id;

  }



  guardarDirectorio(): void {

    this.isSubmitted = true;

    this.formularioVcardGe();

    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('surname', this.surname);
    formData.append('especialidad', this.especialidad);
    formData.append('org', 'SVCBMF');
    formData.append('universidad', this.universidad);
    formData.append('ano', this.ano);
    formData.append('website', this.website);
    formData.append('email', this.email);
    formData.append('direccion', this.direccion);
    formData.append('direccion1', this.direccion1);
    formData.append('estado', this.estado);
    formData.append('ciudad', this.ciudad);
    formData.append('telefonos', this.telefonos);
    formData.append('tel1', this.tel1);
    formData.append('telhome', this.telhome);
    formData.append('telmovil', this.telmovil);
    formData.append('telprincipal', this.telprincipal);
    formData.append('facebook', this.facebook);
    formData.append('instagram', this.instagram);
    formData.append('twitter', this.twitter);
    formData.append('linkedin', this.linkedin);
    formData.append('vcard', this.vCardInfo);
    formData.append('status', this.status);
    formData.append('user_id', this.user.id);
    formData.append('image', this.fileInputValue);

    this.directorioService.createDirectorio(formData)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/directorio`);

      });

      this.generateQRCode();
  }

  public onFileSelect(event) {
    this.fileInputValue = event.target.files[0];
    console.log(this.fileInputValue);
  }



/**
   * @method: Permite crear el qr
   * @author: malcolm
   * @since: 11/07/2022
   */



 formularioVcardGe(){


  let {nombre, surname , org , website , facebook, instagram,
    linkedin , twitter , email , image , especialidad , direccion, direccion1,
    tel1 , telhome , telmovil , telprincipal} = this.directoryForm.form.getRawValue();

    this.vCardInfo = `BEGIN:VCARD
VERSION:3.0
N:${surname};${nombre}
FN:${surname} ${nombre}
ORG:${org}
URL:${website}
URL:${facebook}
URL:${instagram}
URL:${linkedin}
URL:${twitter}
EMAIL:${email}
PHOTO:${image}
TITLE:${especialidad}
ADR;TYPE=work:${direccion}
ADR;TYPE=home:${direccion1}
TEL;TYPE=voice,work,oref:${tel1}
TEL;TYPE=voice,home,oref:${telhome}
TEL;TYPE=voice,mobile,oref:${telmovil}
TEL;TYPE=voice,first,oref:${telprincipal}
END:VCARD
    `
    console.log(this.vCardInfo);
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

  /**
 * @method: Genera la imagen del qr
 * @author: malcolm
 * @since: 11/07/2022
 */

generateQRCode(){
  if( this.directoryForm.valid){
    this.display = true;
    // alert("Please enter the name");
  }
  return false;

}

hideQRCode(){
  if( this.directoryForm.valid){
    this.display = false;
    // alert("Please enter the name");
  }
  return false;

}

}
