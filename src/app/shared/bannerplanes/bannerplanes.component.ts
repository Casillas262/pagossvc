import { Component, OnInit,Input } from '@angular/core';
import { Plan } from 'src/app/models/plan';
import { PlanesService } from 'src/app/services/planes.service';
@Component({
  selector: 'app-bannerplanes',
  templateUrl: './bannerplanes.component.html',
  styleUrls: ['./bannerplanes.component.css']
})
export class BannerplanesComponent implements OnInit {


  planes: Plan;

  constructor(private planesService: PlanesService,) { }

  ngOnInit(): void {
    this.getPlanes();
  }

  getPlanes(): void {
    // return this.planesService.carga_info();
    this.planesService.getPlanes().subscribe(
      res =>{
        this.planes = res;
      }
    );
  }

}
