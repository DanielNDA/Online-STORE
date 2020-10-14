import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Address} from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private readonly addressesUrl: string;

  constructor(private http: HttpClient) {
    this.addressesUrl = 'http://localhost:8080/addresses';
  }

  // tslint:disable-next-line:typedef
  public save(address: Address) {
    return this.http.post<Address>(this.addressesUrl, address);
  }
}
