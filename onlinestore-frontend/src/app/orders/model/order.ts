import {OrderLine} from './order-line';
import {Address} from '../../addresses/model/address';

export class Order {
  id: number;
  userName: string;
  total: number;
  dateOfOrder: Date;
  status: string;
  orderLines: OrderLine[] = [];
  deliveryAddress: Address;
}
