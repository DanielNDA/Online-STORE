import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {AuthService} from '../../service/auth.service';

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

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private modalService: NgbModal,
              private route: ActivatedRoute) {
    this.currentUser = new User();
    this.currentUser.email = '';
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe(data => {
      this.users = data;
      this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
      for (const user of this.users) {
        if (this.currentUser.id === user.id) {
          this.currentUser.image = this.userService.getUserImage(this.currentUser.id);
        }
      }
    });
  }

  // tslint:disable-next-line:typedef
  // getCurrentUser() {
  // this.authService.isLoggedIn.subscribe(data => {
  //   this.isLoggedIn = data;
  //   this.currentUser = new User();
  //   if (this.isLoggedIn) {
  //     this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
  //     this.currentUser.image = this.userService.getUserImage(this.currentUser.id);
  //     console.log(this.currentUser.image);
  //     if (this.currentUser === null) {
  //       this.currentUser = new User();
  //     }
  //   }
  // });
  // }

  // tslint:disable-next-line:typedef
  deleteProfile(id: number) {
    this.userService.delete(id).subscribe(data => {
      this.goToHomePage();
    });
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
}
