import {Component, OnInit} from '@angular/core';
import {Role} from '../../model/role';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleService} from '../../service/role.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {

  role: Role;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService) {
    this.role = new Role();
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.roleService.save(this.role).subscribe(result => this.goToRoleList());
  }

  // tslint:disable-next-line:typedef
  goToRoleList() {
    this.router.navigate(['/role']);
  }

  ngOnInit(): void {
  }
}
