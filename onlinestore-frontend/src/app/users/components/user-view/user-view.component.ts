import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {AuthService} from '../../service/auth.service';
import {OrderService} from '../../../cart/service/order.service';
import {Order} from '../../../cart/model/order';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  id: number;
  currentUser: User;
  closeResult = '';
  isLoggedIn = false;
  image: Observable<any>;
  users: User[] = [];
  orders: Order[] = [];
  lastOrder: Order;


  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private orderService: OrderService) {
    this.currentUser = new User();
    this.currentUser.email = '';
    this.lastOrder = new Order();
  }

  ngOnInit(): void {
    this.currentUser = new User();
    this.userService.findAll().subscribe(data => {
      this.users = data;
      this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
      for (const user of this.users) {
        if (this.currentUser.id === user.id) {
          this.currentUser.image = this.userService.getUserImage(this.currentUser.id);
          this.orderService.findOrders().subscribe(data1 => {
            this.orders = data1;
            this.lastOrder = this.orders[this.orders.length - 1];
          });
        }
      }
    });
  }

  // tslint:disable-next-line:typedef
  deleteProfile(id: number) {
    this.userService.delete(id).subscribe(data => {
      this.goToHomePage();
    });
  }

  // tslint:disable-next-line:typedef
  editProfile() {
    this.userService.getByEmail(this.currentUser.email).subscribe(data => {
      this.currentUser = data;
      this.goToEditProfile(this.currentUser.id);
    });
  }

  // tslint:disable-next-line:typedef
  goToEditProfile(id: number) {
    this.router.navigate(['profile-edit', id]);
  }

  // tslint:disable-next-line:typedef
  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.deleteProfile(id);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // tslint:disable-next-line:typedef
  private goToHomePage() {
    this.router.navigate(['products']);
  }

  // tslint:disable-next-line:typedef
  viewOrders(id: number) {
    this.router.navigate(['orders-user', id]);
  }
}
