import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Currencies } from '../models/currencies';

const baseUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  public currency: Currencies;


  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('auth_token') || '';
  }


  get headers(){
    return{
      headers: {
        'auth_token': this.token
      }
    }
  }


  getCurrencies() {
    const url = `${baseUrl}/currencies`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, currenciesAll: Currencies}) => resp.currenciesAll)
      )
  }

  getCurrency(currency: any) {
    const url = `${baseUrl}/currency/show/${currency}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, currency: Currencies}) => resp.currency)
        );
  }


  createCurrency(currency:any) {
    const url = `${baseUrl}/currency/store`;
    return this.http.post(url, currency, this.headers);
  }

  updateCurrency(currency:Currencies) {
    const url = `${baseUrl}/currency/update/${currency.id}`;
    return this.http.put(url, currency, this.headers);
  }

  deleteCurrency(currency: any) {
    const url = `${baseUrl}/currency/destroy/${currency}`;
    return this.http.delete(url, this.headers);
  }

}
