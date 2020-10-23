import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Privilege} from '../model/privilege';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  private readonly privilegeURL: string;

  constructor(private http: HttpClient) {
    this.privilegeURL = 'http://localhost:8080/privilege';
  }

  public findAll(): Observable<Privilege[]> {
    return this.http.get<Privilege[]>(this.privilegeURL);
  }

  // tslint:disable-next-line:typedef
  public save(privilege: Privilege) {
    return this.http.post<Privilege>(this.privilegeURL, privilege);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.privilegeURL}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public update(privilege: Privilege) {
    return this.http.put<Privilege>(this.privilegeURL, privilege);
  }

  // tslint:disable-next-line:typedef
  public getById(id: number): Observable<Privilege> {
    return this.http.get<Privilege>(`${this.privilegeURL}/${id}`);
  }
}

