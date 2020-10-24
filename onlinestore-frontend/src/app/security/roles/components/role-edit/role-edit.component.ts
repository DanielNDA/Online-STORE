import { Component, OnInit } from '@angular/core';
import {Role} from '../../model/role';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleService} from '../../service/role.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  role: Role;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService) {
    this.role = new Role();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.roleService.getById(this.id).subscribe(data => {
      this.role = new Role();
      this.role = data;
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.roleService.update(this.role).subscribe(result => this.goToRoleList());
  }

  // tslint:disable-next-line:typedef
  goToRoleList() {
    this.router.navigate(['/role']);
  }

}
