import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchItem: string ='';

  private http: HttpClient;
  ServerUrl = environment.apiUrl;
  doctores;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['searchItem'])
      this.searchItem = params['searchItem'];
    })
  }

  search(){
    if(this.searchItem)
    // this.router.navigateByUrl('/users/'+ this.searchItem);
    console.log(this.searchItem);


    if( this.search.length == 0){
      return;
    }

    return this.http.get(this.ServerUrl + 'directorios/search?text=' + this.searchItem )
    .toPromise()
    .then(doctores=>{
        this.doctores= {'results': JSON.stringify(doctores, null),

        'json': ()=>{
          return doctores;
        }

      };

      // devolver el array
      const mapped = Object.keys(doctores)
      .map(key => ({type: key, value: doctores[key]}));
      console.log(doctores);
      this.doctores = doctores;

    });

  }

}
