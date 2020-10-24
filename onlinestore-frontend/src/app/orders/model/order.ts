import {OrderLine} from './order-line';

export class Order {
  id: number;
  userName: string;
  total: number;
  dateOfOrder: Date;
  status: string;
  orderLines: OrderLine[] = [];
}
