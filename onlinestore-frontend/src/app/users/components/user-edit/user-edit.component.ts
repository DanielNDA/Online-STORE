import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {AddressService} from '../../../addresses/service/address.service';
import {Address} from '../../../addresses/model/address';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  id: number;
  address: Address;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private addressService: AddressService) {
  }

  ngOnInit(): void {
    this.user = new User();
    this.address = new Address();
    this.id = this.route.snapshot.params.id;
    this.user.addressDTO = this.address;
    this.userService.getById(this.id).subscribe(data => {
      this.user = data;
      this.addressService.getById(this.id).subscribe(data1 => {
        this.address = data1;
      });
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.userService.update(this.user).subscribe(result => this.goToHomePage());
  }

  // tslint:disable-next-line:typedef
  goToHomePage() {
    this.router.navigate(['']);
  }
}
