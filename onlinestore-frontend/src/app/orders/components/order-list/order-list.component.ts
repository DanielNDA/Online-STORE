import {Component, OnInit} from '@angular/core';
import {OrderLine} from '../../model/order-line';
import {OrderService} from '../../service/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../model/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  totalPrice: number;
  cartList: OrderLine[];
  order: Order;
  id: number;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getOrderLines();
  }

  // tslint:disable-next-line:typedef
  getOrderLines() {
    this.id = this.route.snapshot.params.id;
    this.orderService.getOrderLines(this.id).subscribe(data => {
      this.cartList = data;
    });
  }

}
