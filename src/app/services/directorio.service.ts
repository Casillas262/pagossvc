import { Injectable } from '@angular/core';
import { Directorio } from '../models/directorio';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DirectorioService {

  public directories: Directorio;
  public directory: Directorio;
  public directoriesPublished: Directorio;


  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('auth_token') || '';
  }

  get status(): 'PUBLISHED'| 'PENDING' | 'REJECTED' {
    return this.directory.status!;
  }


  get headers(){
    return{
      headers: {
        'auth_token': this.token,
      }
    }
  }

  createDirectorio(directory) {

    const url = `${baseUrl}/directory/store`;
    return this.http.post(url, directory, this.headers);
  }

  // updateDirectorio(directory) {
  //   const url = `${baseUrl}/directory/update/${directory.id}`;
  //   return this.http.put(url, directory, this.headers);
  // }

  updateDirectorio(directory, id: number) {
    return this.http.put<any>(baseUrl + '/directory/update/' + id, directory, this.headers)

  }



  deleteFoto(id) {
    return this.http.delete(baseUrl + '/directory/delete-foto/' + id);
  }


  getDirectorios() {
    const url = `${baseUrl}/directories`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, directories: Directorio}) => resp.directories)
      )
  }
  getDirectoriosPublicados() {
    const url = `${baseUrl}/directorios`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, directories: Directorio}) => resp.directories)
      )
  }

  getDirectorio(id: number) {
    const url = `${baseUrl}/directory/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, directory: Directorio}) => resp.directory)
        );
  }
  getDirectoriobyUser(user_id: number) {
    const url = `${baseUrl}/directory/show/user/${user_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, directory: Directorio}) => resp.directory)
        );
  }





  deleteDirectorio(id:number) {
    const url = `${baseUrl}/directory/destroy/${id}`;
    return this.http.delete(url, this.headers);
  }


  onUpload(file):Observable<any>{
    const fd= new FormData;
    fd.append('image',file,file.name);
    const url = `${baseUrl}/directory/store`;
    return this.http.post(url, file, this.headers);
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
