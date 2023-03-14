import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import { CartItemModel } from 'src/app/models/cart-item-model';
import { Currencies } from 'src/app/models/currencies';
import { Payment } from 'src/app/models/payment';
import { Plan } from 'src/app/models/plan';
import { User } from 'src/app/models/user';

import { CurrenciesService } from 'src/app/services/currencies.service';
import { PaymentService } from 'src/app/services/payment.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';
import { PlanesService } from 'src/app/services/planes.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-reportar-pago',
  templateUrl: './reportar-pago.component.html',
  styleUrls: ['./reportar-pago.component.css']
})
export class ReportarPagoComponent implements OnInit {

  addPaymentRegisterForm: Payment = new Payment();
  @ViewChild("paymentRegisterForm")
  PaymentRegisterForm!: NgForm;
  isSubmitted: boolean = false;

  title= 'Realizar un Pago';


  @Input() cartItem: CartItemModel;
  cartItems: any[] = [];
  Item: any[] = [];
  total= 0;

  // public product: ProductPaypal;

  // public PaymentRegisterForm: FormGroup;
  public usuario;
  visible :boolean = false;

  metodo:string;
  error: string;
  pagoSeleccionado: Payment;
  pagoS: Payment;
  currenciesAll: Currencies;
  plan: Plan;

  image:string;
  uploadError: boolean;
  imagePath: string;

  // public imagenSubir: File;
  // public imgTemp: any = null;
  // public file:File;
  // public imgSelect : String | ArrayBuffer;

  paymentSeleccionado:Payment;

  user:User;
  planes: Plan;

  // ngform
  public metodoInputValue: string;
  public banknameInputValue: string;
  public montoInputValue: string;
  public currencyIdInputValue: string;
  public referenciaInputValue: string;
  public planIdInputValue: string;
  public nombreInputValue: string;
  public emailInputValue: string;
  public fileInputValue: File;



  constructor(
    // private fb: FormBuilder,
    private location: Location,
    private messageService: MessageService,
    private paymentService: PaymentService,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private currenciesService: CurrenciesService,
    private storageService: StorageService,
    private planesService: PlanesService,
  ) {
    this.user = this.usuarioService.user;
  }


  ngOnInit(): void {
    window.scrollTo(0,0);
    // this.activatedRoute.params.subscribe( ({id}) => this.cargarForm(id));
    // this.validarFormulario();
    this.visible= false;
    this.getCurrencies();
    this.getPlanes();
    this.getUser();
    this.closeCart();

    if(this.storageService.existCart()){
      this.cartItems = this.storageService.getCart();
    }
    this.total = this.getTotal();


    // this.imagePath = environment.apiUrlMedia;
  }

  getUser(): void {
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }


  getTotal():number{
    let total =  0;
    this.cartItems.forEach(item => {
      total += item.quantity * item.productPrice;
    });
    return +total.toFixed(2);
  }


  getCurrencies(): void {
    this.currenciesService.getCurrencies().subscribe(
      res =>{
        this.currenciesAll = res;
        error => this.error = error
        console.log(this.currenciesAll);
      }
    );
  }

  getPlanes(): void {
    // return this.planesService.carga_info();
    this.planesService.getPlanes().subscribe(
      res =>{
        this.planes = res;
        error => this.error = error
        console.log(this.planes);
      }
    );
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  // validarFormulario(){
  //   this.PaymentRegisterForm = this.fb.group({
  //     metodo: ['',Validators.required],
  //     bank_name: [''],
  //     monto: ['',Validators.required],
  //     currency_id: [''],
  //     referencia: [''],
  //     email: [''],
  //     nombre: [''],
  //     plan_id: [''],
  //     status: ['PENDING'],
  //     validacion: ['PENDING'],
  //     user_id: [''],
  //     image: [this.imagenSubir],
  //   })
  // }

  // cargarForm(id: string){

  //   if (id) {
  //     this.paymentService.getPagoById(id).subscribe(
  //       res => {
  //         this.PaymentRegisterForm.patchValue({
  //           metodo: res.metodo,
  //           bank_name: res.bank_name,
  //           monto: res.monto,
  //           currency_id: this.currenciesAll.id,
  //           referencia: res.referencia,
  //           email: res.email,
  //           nombre: res.nombre,
  //           status: res.status,
  //           validacion: res.validacion,
  //           user_id: this.user.id,
  //           plan_id: this.planes.id,
  //           // image: this.imagenSubir
  //         });
  //         // this.imagePath  = res.image;

  //         this.pagoSeleccionado = res;
  //         console.log(this.pagoSeleccionado);
  //       }
  //     );
  //   } else {
  //     return;
  //   }

  // }

  // onSelectedFile(event) {

  //   console.log(event);
  //       this.file = event.target.files[0];

  //       const reader = new FileReader();
  //       reader.onloadend = () =>{
  //         this.imgTemp = reader.result;
  //       }

  //       reader.readAsDataURL(this.file);
  // }

  public onSelectedFile(event) {
    this.fileInputValue = event.target.files[0];
    console.log(this.fileInputValue);
  }

  updateForm(): void {debugger
    this.isSubmitted = true;
    const formData = new FormData();
    formData.append('metodo', this.metodoInputValue);
    formData.append('bank_name', this.banknameInputValue);
    formData.append('monto', this.montoInputValue);
    formData.append('plan_id', this.planIdInputValue);
    formData.append('currency_id', this.currencyIdInputValue);
    formData.append('referencia', this.referenciaInputValue);
    formData.append('nombre', this.nombreInputValue);
    formData.append('email', this.emailInputValue);
    formData.append('user_id', this.usuario.id);
    formData.append('validacion', 'PENDING');
    formData.append('status', 'PENDING');
    formData.append('image', this.fileInputValue);

    this.paymentService.create(formData)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/historial-pagos`);
        this.emptyCart();
      });
  }




  // updateForm(){

  //   const formData = new FormData();
  //   formData.append('metodo', this.PaymentRegisterForm.get('metodo').value);
  //   formData.append('bank_name', this.PaymentRegisterForm.get('bank_name').value);
  //   formData.append('monto', this.PaymentRegisterForm.get('monto').value);
  //   formData.append('currency_id', this.PaymentRegisterForm.get('currency_id').value);
  //   formData.append('referencia', this.PaymentRegisterForm.get('referencia').value);
  //   formData.append('nombre', this.PaymentRegisterForm.get('nombre').value);
  //   formData.append('email', this.PaymentRegisterForm.get('email').value);
  //   formData.append('image', this.PaymentRegisterForm.get('image').value);


  //   //crear
  //   const data = {
  //     ...this.PaymentRegisterForm.value,
  //     user_id: this.usuario.id
  //   }
  //   this.paymentService.create(data)
  //   .subscribe( (resp: any) =>{
  //     // Swal.fire('Creado', `creado correctamente`, 'success');
  //     this.router.navigateByUrl(`/dashboard/historial-pagos`);
  //     this.pagoSeleccionado = resp;
  //     console.log(this.pagoSeleccionado);
  //     // this.enviarNotificacion();
  //     this.emptyCart();
  //   })

  // }

  // enviarNotificacion(): void {
  //   this.alertService.success("Mensaje de Pago","Nuevo Pago, Favor verificar!");
  // }

  closeCart(){
    var cartNotification = document.getElementsByClassName("cart-modal");
      for (var i = 0; i<cartNotification.length; i++) {
        cartNotification[i].classList.remove("cart-modal--active");

      }
  }



  verpaypal(){
    var verPaypalpay = document.getElementsByClassName("vibiblepayp");
      for (var i = 0; i<verPaypalpay.length; i++) {
        verPaypalpay[i].classList.toggle("vibiblepaypblok");

      }
  }
  hidepaypal(){
    var verPaypalpay = document.getElementsByClassName("vibiblepayp");
      for (var i = 0; i<verPaypalpay.length; i++) {
        verPaypalpay[i].classList.remove("vibiblepaypblok");

      }
  }



  emptyCart():void{
    this.cartItems = [];
    this.total = 0;
    this.storageService.clear();
  }


}
