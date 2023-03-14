import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CartItemModel } from '../../../models/cart-item-model';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Currencies } from 'src/app/models/currencies';
import { Payment } from 'src/app/models/payment';
import { Plan } from 'src/app/models/plan';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { MessageService } from 'src/app/services/message.service';
import { PaymentService } from 'src/app/services/payment.service';
import { PlanesService } from 'src/app/services/planes.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
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

  title= 'Realizar un Pago';

  @Input() cartItem: CartItemModel;
  cartItems: any[] = [];
  Item: any[] = [];
  total= 0;

  // public product: ProductPaypal;

  addPaymentRegisterForm: Payment = new Payment();
  @ViewChild("PaymentRegisterForm")

  PaymentRegisterForm!: NgForm;
  isSubmitted: boolean = false;

  public usuario;
  visible :boolean = false;

  error: string;
  pagoSeleccionado: Payment;
  pagoS: Payment;
  currenciesAll: Currencies;
  plan: Plan;

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

  public imagensubir: any = [];
  public previsualizacion: string;


  constructor(

    private location: Location,
    private messageService: MessageService,
    private paymentService: PaymentService,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private currenciesService: CurrenciesService,
    private storageService: StorageService,
    private alertService: AlertService,
    private planesService: PlanesService,
    private sanitizer: DomSanitizer,
  ) {
    this.user = this.usuarioService.user;
  }


  ngOnInit(): void {
    window.scrollTo(0,0);

    this.visible= false;
    this.getCurrencies();
    this.getPlanes();
    this.getUser();
    this.closeCart();
    console.log(this.usuario);
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
        this.enviarNotificacion();
      });
  }

  public onFileSelect(event) {
    this.fileInputValue = event.target.files[0];
    console.log(this.fileInputValue);
  }

  // public onFileSelect(event) {
  //   this.fileInputValue = event.target.files[0];
  //   console.log(this.fileInputValue);
  //   this.extraerBase64(this.fileInputValue).then((imagen: any) => {
  //     this.previsualizacion = imagen.base;
  //     console.log(imagen)
  //     this.imagensubir.push(this.fileInputValue)
  //   })
  // }


  extraerBase64 = async($event: any)=> new Promise((resolve, reject)=>{
    try {
      const usafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(usafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error =>{
        resolve({
          base: null
        })
      }

    } catch (error) {
      return null;
    }
  });



  enviarNotificacion(): void {
    this.alertService.success("Mensaje de Pago","Nuevo Pago, Favor verificar!");
  }

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

  // onSelectedFile(event) {

  //   console.log(event);
  //       this.file = event.target.files[0];

  //       const reader = new FileReader();
  //       reader.onloadend = () =>{
  //         this.imgTemp = reader.result;
  //       }

  //       reader.readAsDataURL(this.file);
  // }


}
