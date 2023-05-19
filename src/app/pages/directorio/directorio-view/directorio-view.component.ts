import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Directorio } from 'src/app/models/directorio';
import { User } from 'src/app/models/user';
import { DirectorioService } from 'src/app/services/directorio.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-directorio-view',
  templateUrl: './directorio-view.component.html',
  styleUrls: ['./directorio-view.component.css']
})
export class DirectorioViewComponent implements OnInit {

  title = "Mi Directorio"
  userprofile: User;
  directory: Directorio;
  error: string;
  id:any;
  href : string;

  constructor(
    private directorioService: DirectorioService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getDirectory(id));
  }


  getDirectory(id:number): void {
    // id = this.directory.user_id;

    this.directorioService.getDirectorio(id).subscribe(
      res =>{
        this.directory = res;
        error => this.error = error;
        // console.log(this.directory);
      }
    );
  }

  getUserProfile(id:number): void {
    this.userService.getUserById(id).subscribe(
      res =>{
        this.userprofile = res[0];
        error => this.error = error
        // console.log(this.userprofile);
      }
    );
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  downloadImage(){

    const box = document.getElementById('box');
    box.parentElement.classList.add('parent')

    box.hasAttribute('img');

    this.href = document.getElementsByClassName('parent')[0].querySelector('img').src;

    // console.log('img', this.href);
  }
}
