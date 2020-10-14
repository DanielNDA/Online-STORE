import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Address} from '../../../addresses/model/address';
import {AddressService} from '../../../addresses/service/address.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  id: number;
  matched = true;
  addressModel: Address;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private addressService: AddressService) {
    this.user = new User();
    this.addressModel = new Address();
  }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.user.addressModel = this.addressModel;
    this.userService.save(this.user).subscribe(result => this.goToLogin());
  }

  goToLogin(): any {
    this.router.navigate(['']);
  }

}
