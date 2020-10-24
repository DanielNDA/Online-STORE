import {Component, OnInit} from '@angular/core';
import {OrderLine} from '../../model/order-line';
import {OrderService} from '../../service/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../model/order';
import {User} from '../../../users/model/user';
import {AuthService} from '../../../users/service/auth.service';
import {UserService} from '../../../users/service/user.service';

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
  selectedValue: number;
  shippingCost: number;
  isLoggedIn = false;
  currentUser: User;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userService: UserService) {
    this.currentUser = new User();
    this.currentUser.email = '';
    this.shippingCost = 15;
  }

  ngOnInit(): void {
    this.getOrderLines();
    this.authService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
      this.currentUser = new User();
      if (this.isLoggedIn) {
        this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
      }
    });
  }

  // tslint:disable-next-line:typedef
  getOrderLines() {
    console.log(this.currentUser.email);
    this.orderService.getByUsername(this.currentUser.email).subscribe(data => {
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
    this.orderService.update(this.currentUser.email, olID, this.selectedValue).subscribe(data => {
      this.router.navigate(['/view-cart']);
    });
  }

  changeQuantity = (olID, quantity) => {
    console.log(quantity);
    this.orderService.update(this.currentUser.email, olID, quantity).subscribe(data => {
      this.order = data;
      this.getOrderLines();
    });
  }

}
