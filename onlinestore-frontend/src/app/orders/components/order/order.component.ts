import {Component, OnInit} from '@angular/core';
import {OrderLine} from '../../model/order-line';
import {OrderService} from '../../service/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../model/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  totalPrice: number;
  cartList: OrderLine[];
  order: Order;
  id: number;
  values: number[];
  selectedValue: number;
  shippingCost: number;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router) {
    this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.shippingCost = 15;
  }

  ngOnInit(): void {
    this.getOrderLines();
  }

  // tslint:disable-next-line:typedef
  getOrderLines() {
    this.orderService.getByUsername('alisa').subscribe(data => {
      this.order = data;
      if (this.order.total < 80) {
        this.order.total = this.order.total + this.shippingCost;
      }
    });
  }

  // tslint:disable-next-line:typedef
  continueShopping() {
    this.router.navigate(['/products']);
  }

  // tslint:disable-next-line:typedef
  checkout() {
    this.id = this.route.snapshot.params.id;
    this.orderService.checkout(this.id).subscribe(data => {

      this.router.navigate(['/products']);
    });
  }

  // tslint:disable-next-line:typedef
  updateQuantity(olID: number) {
    console.log(this.selectedValue);
    this.orderService.update('alisa', olID, this.selectedValue).subscribe(data => {
      this.router.navigate(['/view-cart']);
    });
  }

  changeQuantity = (olID, quantity) => {
    console.log(quantity);
    this.orderService.update('alisa', olID, quantity).subscribe(data => {
      this.order = data;
      this.getOrderLines();
    });
  }

}
