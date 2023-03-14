import { Component, OnInit } from '@angular/core';

declare var $; //se daclara el jquery

@Component({
  selector: 'app-dolar-today',
  templateUrl: './dolar-today.component.html',
  styleUrls: ['./dolar-today.component.css']
})
export class DolarTodayComponent implements OnInit {


  data: any;
  error: string

  constructor(
  ) { }

  ngOnInit(): void {
    this.getDolarPrice();
  }

  getDolarPrice(){

   //https://s3.amazonaws.com/dolartoday/data.json
  $.getJSON("https://s3.amazonaws.com/dolartoday/data.json",function(data){
    // console.log(data)
    $('#texto').html('Transferencia: '+data.USD.transferencia);
    $('#textoEuro').html('Transferencia: '+data.EUR.transferencia);
    $('#sicad').html('Sicad: ' + data.USD.sicad2);
    $('#sicadEuro').html('Sicad: ' + data.EUR.sicad2);
    $('#bitcoin').html('Bitcoin: '+data.USD.bitcoin_ref);
    // $('#bitcoinEuro').html('Bitcoin: '+data.EUR.bitcoin_ref);
    $('#localbitcoin').html('Local Bitcoin: '+data.USD.localbitcoin_ref);
    // $('#localbitcoinEuro').html('Local Bitcoin: '+data.EUR.localbitcoin_ref);
    $('#dolatoday').html('Dolar Today: '+data.USD.dolartoday);
    $('#dolatodayEuro').html('Dolar Today: '+data.EUR.dolartoday);
    $('#al').html('DolarToday al: '+data._timestamp.fecha);
      });


  }

}
