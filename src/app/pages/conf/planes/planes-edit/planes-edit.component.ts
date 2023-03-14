import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { NgForm } from '@angular/forms';
import { Currencies } from 'src/app/models/currencies';
import { Plan } from 'src/app/models/plan';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { PlanesService } from 'src/app/services/planes.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-planes-edit',
  templateUrl: './planes-edit.component.html',
  styleUrls: ['./planes-edit.component.css']
})
export class PlanesEditComponent implements OnInit {

  @ViewChild("planEditForm")
  planEditForm: NgForm;

  public plan: Plan;

  public imgSelect : String | ArrayBuffer;
  public currenciesAll: Currencies;

  title: string;

  public planSeleccionado: Plan;

  public name: any;
  public price: any;
  public status: any;
  public currency_id: any;
  public fileInputValue: File;

  imagePath: string;
  error: string;
  uploadError: string;

  constructor(
    private router: Router,
    private planService: PlanesService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private currenciesService: CurrenciesService,
    ) { }

  ngOnInit(): void {
    this.getCurrencies();
    this.activatedRoute.params.subscribe( ({id}) => this.getplan(id));
  }

  getplan(id){
    this.planService.getPlan(+id).subscribe(
      res => {
        this.plan= res;
      }
    );
  }


  public onFileSelect(event) {
    this.fileInputValue = event.target.files[0];
    console.log(this.fileInputValue);
  }


  editPlan(){
    const formData = new FormData();
    formData.append('name', this.plan.name);
    formData.append('image', this.fileInputValue);
    formData.append('price', this.plan.price);
    formData.append('currency_id', this.plan.currency_id);
    formData.append('status', this.plan.status);

      this.planService.updatePlan(formData, this.plan.id).subscribe(
              res => {
                if (res.status === 'error') {
                  this.uploadError = res.message;
                } else {
                  Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
                  this.router.navigate(['/dashboard/planes']);
                }
              },
              error => this.error = error
              );
    }





  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  getCurrencies(): void {
    this.currenciesService.getCurrencies().subscribe(
      res =>{
        this.currenciesAll = res;
      }
    );
  }



}




