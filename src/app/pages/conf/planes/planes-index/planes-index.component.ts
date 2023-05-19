import { Component, OnInit } from '@angular/core';

import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { Plan } from 'src/app/models/plan';
import { User } from 'src/app/models/user';
import { PlanesService } from 'src/app/services/planes.service';


@Component({
  selector: 'app-planes-index',
  templateUrl: './planes-index.component.html',
  styleUrls: ['./planes-index.component.css']
})
export class PlanesIndexComponent implements OnInit {
  title = "Planes y productos"
  planes: Plan;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private planesService: PlanesService,
    handler: HttpBackend
  ) {
   }

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
        // console.log(this.planes);
      }
    );
  }

  eliminarPlan(plan:Plan){
    this.planesService.deletePlan(plan).subscribe(
      response =>{
        this.getPlanes();
      },
      error=>{
        this.msm_error = 'No se pudo eliminar, vuelva a intentar.'
      }
      );
      this.ngOnInit();
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }



}
