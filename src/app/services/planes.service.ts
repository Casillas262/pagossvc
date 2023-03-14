import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Plan } from '../models/plan';
import { environment } from 'src/environments/environment';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  public plan: Plan;
  private panes = 'assets/dataSimulada/plan.json';

  info:any = {};
  cargada:boolean = false;


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

  get status(): 'APPROVED' | 'PENDING' | 'REJECTED' {
    return this.plan.status!;
  }

  public carga_info(){
    this.http.get( "assets/dataSimulada/plan.json " )
      .subscribe( data =>{
        //console.log( data.json() );
        this.cargada = true;
        this.info = data;
      } )

  }





  getPlanes()  {
    const url = `${baseUrl}/planes`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, plans: Plan}) => resp.plans)
      )
  }

  getPlan(id: number) {
    const url = `${baseUrl}/plan/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, plan: Plan}) => resp.plan)
        );
  }


  createPlan(plan:any) {
    const url = `${baseUrl}/plan/store`;
    return this.http.post(url, plan, this.headers);

  }

  // updatePlan(plan, id:number): Observable<any> {
  //   const url = `${baseUrl}/plan/update/${plan} + ${plan.id}`;
  //    return this.http.put(url, plan, id, this.headers);

  //  }

   updatePlan(plan, id: number) {
    return this.http.post<any>(baseUrl + '/plan/update/' + id, plan, this.headers)

  }



   update(plan): Observable<any>{

    const json = JSON.stringify(plan);
    const params = 'json=' + json;

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', this.token);

    return this.http.put(baseUrl + '/plan/update/' + this.plan.id, params, {headers});
  }

  deletePlan(plan: Plan) {
    const url = `${baseUrl}/plan/destroy/${plan}`;
    return this.http.delete(url, this.headers);
  }

  uploadData(data){
    // const url = `${baseUrl}/file/${data}`;
    // return this.http.post(url,data, this.headers )
    const headers =new HttpHeaders();
    return this.http.post(environment.apiUrl+'/file', data,{
      headers: headers
    });
  }


}
