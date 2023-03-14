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

@Component({
  selector: 'app-directorio-edit',
  templateUrl: './directorio-edit.component.html',
  styleUrls: ['./directorio-edit.component.css']
})
export class DirectorioEditComponent implements OnInit {

  @ViewChild("directoryForm")
  directoryForm: NgForm;
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
  public especialidad: any;
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

  uploadError: string;

  submitted = false;

  constructor(
    private directorioService: DirectorioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private location: Location,

  ) {
this.user = this.userService.user;
  }



  ngOnInit() {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe( ({id}) => this.getDirectorio(id));
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



  // onSelectedFile(event):any {
  //   const file = event.target.files[0]
  //   this.extraerBase64(file).then((imagen: any) => {
  //     this.previsualizacion = imagen.base;
  //     console.log(imagen)
  //     this.imagensubir.push(file)
  //   })
  // }


  // extraerBase64 = async($event: any)=> new Promise((resolve, reject)=>{
  //   try {
  //     const usafeImg = window.URL.createObjectURL($event);
  //     const imagen = this.sanitizer.bypassSecurityTrustUrl(usafeImg);
  //     const reader = new FileReader();
  //     reader.readAsDataURL($event);
  //     reader.onload = () => {
  //       resolve({
  //         base: reader.result
  //       });
  //     };
  //     reader.onerror = error =>{
  //       resolve({
  //         base: null
  //       })
  //     }

  //   } catch (error) {
  //     return null;
  //   }
  // });

  getDirectorio(id){
    this.directorioService.getDirectorio(+id).subscribe(
      res => {
        this.directory= res;
      }
    );
  }


  guardarDirectorio() {
    this.submitted = true;

    this.formularioVcardGe();

    const formData = new FormData();
    formData.append('nombre', this.directory.nombre);
    formData.append('surname', this.directory.surname);
    formData.append('especialidad', this.directory.especialidad);
    formData.append('org', 'SVCBMF');
    formData.append('universidad', this.directory.universidad);
    formData.append('ano', this.directory.ano);
    formData.append('website', this.directory.website);
    formData.append('email', this.directory.email);
    formData.append('direccion', this.directory.direccion);
    formData.append('direccion1', this.directory.direccion1);
    formData.append('estado', this.directory.estado);
    formData.append('ciudad', this.directory.ciudad);
    formData.append('telefonos', this.directory.telefonos);
    formData.append('tel1', this.directory.tel1);
    formData.append('telhome', this.directory.telhome);
    formData.append('telmovil', this.directory.telmovil);
    formData.append('telprincipal', this.directory.telprincipal);
    formData.append('facebook', this.directory.facebook);
    formData.append('instagram', this.directory.instagram);
    formData.append('twitter', this.directory.twitter);
    formData.append('linkedin', this.directory.linkedin);
    formData.append('vcard', this.vCardInfo);
    formData.append('status', this.directory.status);
    formData.append('user_id', this.user.id);
    formData.append('image', this.fileInputValue);

    this.directorioService.updateDirectorio(formData, this.directory.id).subscribe(
      res => {
        if (res.status === 'error') {
          this.uploadError = res.message;
        } else {
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
          this.router.navigate(['/dashboard/directorio']);
        }
      },
      error => this.error = error
      );

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
    // console.log(this.vCardInfo);
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
