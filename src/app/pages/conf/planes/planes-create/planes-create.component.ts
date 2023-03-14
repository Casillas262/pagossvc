import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';

import { NgForm } from '@angular/forms';
import { Currencies } from 'src/app/models/currencies';
import { Plan } from 'src/app/models/plan';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { PlanesService } from 'src/app/services/planes.service';
import { UserService } from 'src/app/services/user.service';
interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-planes-create',
  templateUrl: './planes-create.component.html',
  styleUrls: ['./planes-create.component.css']
})
export class PlanesCreateComponent implements OnInit {

  addEmployeeForm: Plan = new Plan('','','','');

  @ViewChild("employeeForm")
  employeeForm!: NgForm;
  isSubmitted: boolean = false;

  title : string;

  public plan: Plan;
  public usuario: User;
  public currenciesAll: Currencies;

  public planSeleccionado: Plan;

  error: string;
  id:number


  // ngform
  public textInputValue: string;
  public priceInputValue: string;
  public currencyIdInputValue: string;
  public statusInputValue: string;
  public fileInputValue: File;



  constructor(

    private planService: PlanesService,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private currenciesService: CurrenciesService,
  ) {
    this.usuario = usuarioService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.getCurrencies();
    if(this.planSeleccionado){
      //actualizar
      this.title = 'Edit Plan';

    }else{
      //crear
      this.title = 'Creando Plan';
    }

  }



  getCurrencies(): void {
    this.currenciesService.getCurrencies().subscribe(
      res =>{
        this.currenciesAll = res;
        error => this.error = error;
      }
    );
  }


  // enviarNotificacion(): void {
  //   this.alertService.info("Mensaje de Planes","Se ha creado un nuevo plan!");
  // }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  savePlan(): void {
    this.isSubmitted = true;
    const formData = new FormData();
    formData.append('name', this.textInputValue);
    formData.append('image', this.fileInputValue);
    formData.append('price', this.priceInputValue);
    formData.append('currency_id', this.currencyIdInputValue);
    formData.append('status', this.statusInputValue);

    this.planService.createPlan(formData)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/planes`);

      });
  }

  public onFileSelect(event) {
    this.fileInputValue = event.target.files[0];
    console.log(this.fileInputValue);
  }


}
