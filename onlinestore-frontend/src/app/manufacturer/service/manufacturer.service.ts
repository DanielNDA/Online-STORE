import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Manufacturer} from '../model/manufacturer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  private manufacturerUrl: string;

  constructor(private http: HttpClient) {
    this.manufacturerUrl = 'http://localhost:8080/manufacturer';
  }

  public findAll(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(this.manufacturerUrl);
  }

  // tslint:disable-next-line:typedef
  public save(manufacturer: Manufacturer) {
    return this.http.post<Manufacturer>(this.manufacturerUrl, manufacturer);
  }

  // tslint:disable-next-line:typedef
  public update(manufacturer: Manufacturer) {
    return this.http.put<Manufacturer>(this.manufacturerUrl, manufacturer);
  }

  public getById(id: number): Observable<any> {
    return this.http.get(`${this.manufacturerUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.manufacturerUrl}/${id}`);
  }
}
