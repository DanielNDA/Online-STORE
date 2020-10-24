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

  user: User;
  id: number;
  address: Address;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
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
  onSubmit() {
    this.userService.update(this.user).subscribe(result => this.goToHomePage());
  }

  // tslint:disable-next-line:typedef
  goToHomePage() {
    this.router.navigate(['products']);
  }
}
