import {Component, OnInit} from '@angular/core';
import {User} from '../../users/model/user';
import {UserService} from '../../users/service/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../users/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isMenuCollapsed = true;
  isLoggedIn = false;
  currentUser: User;


  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService) {
    this.currentUser = new User();
    this.currentUser.email = '';
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
      this.currentUser = new User();
      if (this.isLoggedIn) {
        this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
        if (this.currentUser === null) {
          this.currentUser = new User();
        }
      }
    });
  }

  // tslint:disable-next-line:typedef
  logOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  // tslint:disable-next-line:typedef
  viewProfile() {
    this.userService.getByEmail(this.currentUser.email).subscribe(data => {
      this.currentUser = data;
      this.goToProfilePage(this.currentUser.id);
    });
  }

  // tslint:disable-next-line:typedef
  goToProfilePage(id: number) {
    this.router.navigate(['view-profile', id]);
  }
}
