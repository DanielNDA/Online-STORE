import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Address} from '../../../addresses/model/address';
import {AuthService} from '../../service/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id: number;
  address: Address;
  confirmPassword: '';
  matched = true;
  users: User[] = [];
  currentUser: User;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private modalService: NgbModal,
              private route: ActivatedRoute) {
    this.currentUser = new User();
    this.currentUser.email = '';
  }

  ngOnInit(): void {
    this.currentUser = new User();
    this.id = this.route.snapshot.params.id;
    this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
    this.userService.getByEmail(this.currentUser.email).subscribe(data => {
      this.currentUser = data;
      this.userService.findAll().subscribe(data1 => {
        this.users = data;
      });
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.userService.update(this.currentUser).subscribe(result => this.goToHomePage());
  }

  // tslint:disable-next-line:typedef
  goToHomePage() {
    this.router.navigate(['products']);
  }

  // tslint:disable-next-line:typedef
  matchPasswords() {
    if (this.currentUser.newPassword === '' || this.currentUser.newPassword === this.confirmPassword) {
      this.matched = true;
    } else {
      this.matched = false;
    }
  }
}
