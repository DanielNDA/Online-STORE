import {OrderLine} from './order-line';
import {User} from '../../users/model/user';
import {Address} from '../../addresses/model/address';

export class Order {
  id: number;
  userName: string;
  total: number;
  dateOfOrder: Date;
  deliveryAddress: Address;
  userAddress: Address;
  orderLines: OrderLine[];
  customer: User;
  status: string;
}
