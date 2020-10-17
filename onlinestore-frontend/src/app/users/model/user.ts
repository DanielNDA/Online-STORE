import {Address} from '../../addresses/model/address';

export class User {
  id: number;
  email: string;
  channel: string;
  password: string;
  newPassword: string;
  addressDTO: Address;
}
