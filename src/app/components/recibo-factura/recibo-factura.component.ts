import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Currencies } from 'src/app/models/currencies';
import { Payment } from 'src/app/models/payment';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-recibo-factura',
  templateUrl: './recibo-factura.component.html',
  styleUrls: ['./recibo-factura.component.css']
})
export class ReciboFacturaComponent implements OnInit {

  title = "Factura";
  pago: Payment;
  error: string;

  @Input() amount;
  @Input() items;
  @Input() reference;
  @Input() email;
  @Input() name;
  @Input() status;

  currenciesAll: Currencies;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private currenciesService: CurrenciesService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.getPagoById(id));
    // this.getPagoById(this.id, this.reference, this.email, this.name,
    //   this.status, this.amount, this.items,
    //   );
    this.getCurrencies()
  }

  getPagoById(id:number){debugger
    this.paymentService.getPagosbyUser(id).subscribe(
      res=>{
        this.pago = res;
        console.log(this.pago);
      }
    )
  }

  getCurrencies(): void {
    this.currenciesService.getCurrencies().subscribe(
      res =>{
        this.currenciesAll = res;
      }
    );
  }



}
