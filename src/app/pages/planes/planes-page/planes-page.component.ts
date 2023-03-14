import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Currencies } from 'src/app/models/currencies';
import { Plan } from 'src/app/models/plan';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { MessageService } from 'src/app/services/message.service';
import { PlanesService } from 'src/app/services/planes.service';

@Component({
  selector: 'app-planes-page',
  templateUrl: './planes-page.component.html',
  styleUrls: ['./planes-page.component.css']
})
export class PlanesPageComponent implements OnInit {

  plan: Plan;
  planes: Plan;
  error:string;
  currenciesAll: Currencies;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private planesService: PlanesService,
    private currenciesService: CurrenciesService,

    ) { }

  ngOnInit(): void {
    this.getPlanes();
    window.scrollTo(0,0);
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

  getCurrencies(): void {
    this.currenciesService.getCurrencies().subscribe(
      res =>{
        this.currenciesAll = res;
        error => this.error = error
        console.log(this.currenciesAll);
      }
    );
  }

}
