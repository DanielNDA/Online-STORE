import {Component, OnInit} from '@angular/core';
import {OrderLine} from '../../model/order-line';
import {OrderService} from '../../service/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../model/order';
import {User} from '../../../users/model/user';
import {AuthService} from '../../../users/service/auth.service';
import {UserService} from '../../../users/service/user.service';
import {ProductService} from '../../../products/components/service/product.service';

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
  users: User[] = [];

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private productService: ProductService) {
    this.currentUser = new User();
    this.currentUser.email = '';
    this.order = new Order();
    this.shippingCost = 15;
  }

  ngOnInit(): void {
    this.order = new Order();
    this.order.orderLines = [];
    this.userService.findAll().subscribe(data => {
      this.users = data;
      this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
      this.getOrderLines();
      for (const user of this.users) {
        if (this.currentUser.id === user.id) {
          this.currentUser.image = this.userService.getUserImage(this.currentUser.id);
        }
      }
    });
  }

  // tslint:disable-next-line:typedef
  getOrderLines() {
    this.orderService.getByUsername(this.currentUser.email).subscribe(data => {
      this.order = data;
      for (const o of this.order.orderLines) {
        o.productDTO.thumbnail = this.productService.getProductImage(o.productDTO.id);
      }
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
  checkout(id: number) {
    this.router.navigate(['/order-details', id]);
  }

  // tslint:disable-next-line:typedef
  updateQuantity(olID: number) {
    this.order = new Order();
    this.orderService.update(this.currentUser.email, olID, this.selectedValue).subscribe(data => {
      this.order = data;
      this.router.navigate(['/view-cart']);
    });
  }

  changeQuantity = (olID, quantity) => {
    this.order = new Order();
    this.orderService.update(this.currentUser.email, olID, quantity).subscribe(data => {
      this.order = data;
      this.getOrderLines();
    });
  };

}
