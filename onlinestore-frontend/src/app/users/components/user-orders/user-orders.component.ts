import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {Order} from '../../../cart/model/order';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderService} from '../../../cart/service/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  config = {
    itemsPerPage: 6,
    currentPage: 1
  };
  searchValue = '';
  users: User[] = [];
  orders: Order[] = [];
  id: number;
  currentUser: User;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.currentUser = new User();
    this.userService.findAll().subscribe(data => {
      this.users = data;
      this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
      for (const user of this.users) {
        if (this.currentUser.id === user.id) {
          this.orderService.findOrders().subscribe(data1 => {
            this.orders = data1;
          });
        }
      }
    });
  }

  // tslint:disable-next-line:typedef
  viewOrderLines(id: number) {
    this.router.navigate(['user-order-orderlines', id]);
  }
}
