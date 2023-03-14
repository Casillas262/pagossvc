import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Plan } from 'src/app/models/plan';
import { PlanesService } from 'src/app/services/planes.service';
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  plan: Plan;
  constructor(
    private planService: PlanesService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.getPlan(id));
  }

  getPlan(id:number){
    this.planService.getPlan(id).subscribe(
      res=>{

        this.plan = res;
      }
    )
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
