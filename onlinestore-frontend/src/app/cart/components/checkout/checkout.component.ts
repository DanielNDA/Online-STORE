import {Component, OnInit} from '@angular/core';
import {Order} from '../../model/order';
import {OrderService} from '../../service/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../users/service/auth.service';
import {UserService} from '../../../users/service/user.service';
import {ProductService} from '../../../products/components/service/product.service';
import {User} from '../../../users/model/user';
import {DatePipe, formatDate} from '@angular/common';

@Component({
  selector: 'app-order-add',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  order: Order;
  id: number;
  currentUser: User;
  time: number = Date.now();
  dateTime: Date;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private productService: ProductService,
              private datePipe: DatePipe) {
    this.order = new Order();
    this.currentUser = new User();
    this.dateTime = new Date();
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
    this.id = this.route.snapshot.params.id;
    this.orderService.getById(this.id).subscribe(data => {
      this.order = data;
      this.dateTime.setDate(this.time);
    });
  }

  // tslint:disable-next-line:typedef
  checkout(id: number) {
    this.orderService.checkout(id).subscribe(data => {
      this.router.navigate(['products']);
    });
  }

}
