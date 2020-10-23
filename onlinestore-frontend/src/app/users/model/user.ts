import {Address} from '../../addresses/model/address';
import {Observable} from 'rxjs';

export class User {
  id: number;
  email: string;
  channel: string;
  firstName: string;
  lastName: string;
  password: string;
  newPassword: string;
  addressDTO: Address;
  url: Observable<any>;
}
