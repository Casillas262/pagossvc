import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map} from 'rxjs/operators';
import { Observable} from 'rxjs';
import { Directorio } from 'src/app/models/directorio';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { User } from '../models/user';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  public member: Member;
  public user: User;

  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('auth_token') || '';
  }


  get headers(){
    return{
      headers: {
        'auth_token': this.token,
      }
    }

  }

  getAll(): Observable<any> {
    console.log(baseUrl)
    return this.http.get(baseUrl + '/members');
  }

  get(id:string): Observable<any> {
    let url = `${baseUrl}/members/id/${id}`;
    console.log(url)
    return this.http.get<Member>(url);
  }

  getMemberDirectory(): Observable<any> {
    const url = `${baseUrl}/members/directories/`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, users: User}) => resp.users)
      )
  }



  createMemberDirectory(directory) {
    // const url = `${baseUrl}/member/directory/store`;
    // return this.http.post(url, directory, this.headers);

    const url = `${baseUrl}/directory/store`;
    return this.http.post(url, directory, this.headers);
  }


  getMemberDirectoryById(id:number): Observable<any> {

    const url = `${baseUrl}/member/directory/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, directory: Directorio}) => resp.directory)
        );

  }

  // updateMemberDirectory(directory, id: any) {
  //   return this.http.post<any>(baseUrl + '/member/directory/update/' + id, directory, this.headers)

  // }

  updateMemberDirectory(directory): Observable<any> {
    const url = `${baseUrl}/member/directory/update/${directory.id}`;
     return this.http.post(url, directory, this.headers);
   }

  deleteMemberDirectory(directory:Directorio) {
    const url = `${baseUrl}/member/directory/destroy/${directory}`;
    return this.http.delete(url, this.headers);
  }

}
