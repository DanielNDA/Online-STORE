import {Address} from '../../addresses/model/address';
import {Observable} from 'rxjs';
import {Role} from '../../security/roles/model/role';

export class User {
  id: number;
  email: string;
  channel: string;
  firstName: string;
  lastName: string;
  password: string;
  newPassword: string;
  addressDTO: Address;
  roleDTOList: Role[];
  image: Observable<any>;
}
