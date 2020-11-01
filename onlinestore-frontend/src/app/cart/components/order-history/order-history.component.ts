import {Component, OnInit} from '@angular/core';
import {Order} from '../../model/order';
import {OrderService} from '../../service/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../users/service/auth.service';
import {UserService} from '../../../users/service/user.service';
import {ProductService} from '../../../products/components/service/product.service';

@Component({
  selector: 'app-order-users',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[];

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.orderService.findAll().subscribe(data => {
      this.orders = data;
    });
  }

}
