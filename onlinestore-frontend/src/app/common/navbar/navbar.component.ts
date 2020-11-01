import {Component, OnInit} from '@angular/core';
import {User} from '../../users/model/user';
import {UserService} from '../../users/service/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../users/service/auth.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isMenuCollapsed = true;
  isLoggedIn = false;
  currentUser: User;
  boolean: boolean;
  closeResult = '';


  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private modalService: NgbModal) {
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
  }

  // tslint:disable-next-line:typedef
  viewProfile() {
    this.userService.getByEmail(this.currentUser.email).subscribe(data => {
      this.currentUser = data;
      this.goToProfilePage(this.currentUser.id);
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
  goToProfilePage(id: number) {
    this.router.navigate(['view-profile', id]);
  }

  // tslint:disable-next-line:typedef
  goToShoppingCart() {
    this.router.navigate(['view-cart']);
  }

  // tslint:disable-next-line:typedef
  goToEditProfile(id: number) {
    this.router.navigate(['profile-edit', id]);
  }

  // tslint:disable-next-line:typedef
  hasRole(role: string) {
    this.boolean = this.authService.hasRole(role);
    return this.boolean;
  }

  // tslint:disable-next-line:typedef
  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.logOut();
      if (result !== null) {
        this.router.navigate(['login']);
      }
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
}
