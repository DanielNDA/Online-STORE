import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../users/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  boolean: boolean;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  hasRole(role: string) {
    this.boolean = this.authService.hasRole(role);
    if (!this.boolean) {
      this.router.navigate(['products']);
    }
    return this.boolean;
  }

}
