import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../model/role';
import {Privilege} from '../../privileges/model/privilege';
import {User} from '../../../users/model/user';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly roleURL: string;

  constructor(private http: HttpClient) {
    this.roleURL = 'http://localhost:8080/role';
  }

  public findAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.roleURL);
  }

  // tslint:disable-next-line:typedef
  public save(role: Role) {
    return this.http.post<Role>(this.roleURL, role);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.roleURL}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public update(role: Role) {
    return this.http.put<Role>(this.roleURL, role);
  }

  // tslint:disable-next-line:typedef
  public getById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.roleURL}/${id}`);
  }

  public getUnassignedPrivileges(id: number): Observable<Privilege[]> {
    return this.http.get<Privilege[]>(`${this.roleURL}/un-assigned-privileges/${id}`);
  }

  // tslint:disable-next-line:typedef
  public assignPrivilegesToRole(role: Role, privilegeList: Privilege[]) {
    return this.http.post<Privilege[]>(`${this.roleURL}/assign-privileges/${role.id}`, privilegeList);
  }

  // tslint:disable-next-line:typedef
  public unAssignPrivilegesFromRole(role: Role, privilegeList: Privilege[]) {
    return this.http.post<Privilege[]>(`${this.roleURL}/un-assign-privileges/${role.id}`, privilegeList);
  }

  // users
  public getUnAssignedUsers(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.roleURL}/un-assigned-users/${id}`);
  }

  // tslint:disable-next-line:typedef
  public assignUsersToRole(role: Role, userList: User[]) {
    return this.http.post<User[]>(`${this.roleURL}/assign-users/${role.id}`, userList);
  }

  // tslint:disable-next-line:typedef
  public unAssignUsersFromRole(role: Role, userList: User[]) {
    return this.http.post<User[]>(`${this.roleURL}/un-assign-users/${role.id}`, userList);
  }
}
