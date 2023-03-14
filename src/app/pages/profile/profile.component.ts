import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Directorio } from 'src/app/models/directorio';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MemberService } from 'src/app/services/member.service';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild("directoryForm")
  directoryForm: NgForm;
  isSubmitted: boolean = false;

  title = "Mi Cuenta";
  @Output() directorioUser : any;
  // profileForm: FormGroup;
  imagePath: string;
  error: string;
  uploadError: boolean;

  identity: any;

  user: User;
  userprofile: User;

  image:any;
  imageName:any;
  thumbUrl: any;

  profileSeleccionado: User;

  // passwordForm: FormGroup;

  directorio: Directorio;
  infoDirectorio: any;
  id: number | null;
  idDirecotory: number | null;
  idPerfil: number | null;
  pageTitle: string;
  directory: Directorio;


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


  //vcard
  // vCardInfo:string;
  value: string;
  display = false;
  elementType: 'url' | 'canvas' | 'img' = 'url';
  href? : string;
  vcard: string;
  errors:any = null;

  public formSumitted = false;

  constructor(
    private location: Location,
    private userService: UserService,
    private accountService: AccountService,
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    // private fb: FormBuilder,

  ) {
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.closeMenu();
    this.getUser();
    this.activatedRoute.params.subscribe( ({id}) => this.getUserServer(id));

  }
  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // console.log(this.user);
  }

  getUserServer(id:number){
    this.userService.getUserById(id).subscribe(
      res =>{
        this.userprofile = res[0];
        error => this.error = error
        // console.log(this.userprofile);
      }
    );


    // this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioPassword(id));
    // if (!id == null || !id == undefined || id) {
    //   this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioDirectorio(id));

    // }else{
    //   alert('Agrega info a tu durectorio!');
    // }
  }


  // onSelectedFile(event) {debugger
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.profileForm.get('image').setValue(file.name);
  //     // this.directorioForm.get('image').setValue(file);

  //     this.image = file.name;
  //   }

  // }
  // onSelectedFile(event) {debugger
  //   if (event.target.files.length > 0) {
  //     this.image = event.target.files[0];
  //     this.imageName = <File>event.target.files[0].name;
  //     var reader = new FileReader();
  //     reader.onload = (event: any) => {
  //           this.thumbUrl = event.target.result;
  //     }
  //     reader.readAsDataURL(this.image);
  //     }

  // }

  public onSelectedFile(event) {
    this.fileInputValue = event.target.files[0];
    console.log(this.fileInputValue);
  }




  guardarDirectorio() {debugger
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
    formData.append('status', 'PENDING');
    formData.append('user_id', this.user.id);
    formData.append('image', this.fileInputValue);


    this.memberService.createMemberDirectory(formData).subscribe(
        res => {
          Swal.fire('Creado', `creado correctamente`, 'success');
        },
        error => this.error = error
        );

      this.generateQRCode();

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
    box?.parentElement?.classList.add('parent')

    box?.hasAttribute('img');

    this.href = document.getElementsByClassName('parent')[0].querySelector('img')?.src;

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


// iniciarFormularioPassword(id:number){
//     // const id = this.route.snapshot.paramMap.get('id');
//     if (!id == null || !id == undefined || id) {

//       this.memberService.getMemberDirectoryById(id).subscribe(
//         res => {
//           this.passwordForm.patchValue({
//             id: res.id,
//             email: res.email,
//           });
//         }
//       );
//     } else {
//       this.pageTitle = 'Crear Directorio';
//     }
//     this.validarFormularioPassword();

//   }

//   validarFormularioPassword(){
//     this.passwordForm = this.fb.group({
//       id: [''],
//       email: ['', Validators.required],
//       password: ['', Validators.required],
//     password2: ['', Validators.required],
//     }, {
//       validators: this.passwordsIguales('password', 'password2')

//     });
//   }

//   passwordNoValido(){
//     const pass1 = this.passwordForm.get('password').value;
//     const pass2 = this.passwordForm.get('password2').value;

//     if((pass1 !== pass2) && this.formSumitted){
//       return true;
//     }else{
//       return false;
//     }
//   }

//   passwordsIguales(pass1Name: string, pass2Name: string){
//     return (formGroup: FormGroup) =>{
//       const pass1Control = formGroup.get(pass1Name);
//       const pass2Control = formGroup.get(pass2Name);

//       if(pass1Control.value === pass2Control.value){
//         pass2Control.setErrors(null)
//       }else{
//         pass2Control.setErrors({noEsIgual: true});
//       }
//     }
//   }

// cambiarPassword(){debugger
//   this.formSumitted = true;

//   const {name } = this.passwordForm.value;

//   if(this.userprofile){debugger
//     //actualizar
//     const data = {
//       ...this.passwordForm.value,
//       id: this.userprofile.id
//     }
//     this.accountService.resetPassword(data).subscribe(
//       resp =>{
//         Swal.fire('Cambiado', `${name}  Password Cambiado correctamente`, 'success');
//       });

//   }

// }

}
