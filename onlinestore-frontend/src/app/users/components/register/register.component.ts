import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  id: number;
  matched = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.userService.save(this.user).subscribe(result => this.goToLogin());
  }

  goToLogin(): any {
    this.router.navigate(['']);
  }

}