import { Component, OnInit } from '@angular/core';
import {User} from '../../../../users/model/user';
import {Role} from '../../model/role';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleService} from '../../service/role.service';

@Component({
  selector: 'app-role-users',
  templateUrl: './role-users.component.html',
  styleUrls: ['./role-users.component.css']
})
export class RoleUsersComponent implements OnInit {

  role: Role;
  id: number;
  unUsers: User[];
  selUnUsers: User[];
  selAsUsers: User[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService) {
    this.role = new Role();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadRoleData();
  }

  // tslint:disable-next-line:typedef
  loadRoleData() {
    this.roleService.getById(this.id).subscribe(data => {
      this.role = new Role();
      this.role = data;
      this.roleService.getUnAssignedUsers(this.role.id).subscribe(data1 => {
        this.unUsers = data1;
      });
    });
  }


  // tslint:disable-next-line:typedef
  goToRoleList() {
    this.router.navigate(['/role']);
  }

  // tslint:disable-next-line:typedef
  assignUsersToRole() {
    this.roleService.assignUsersToRole(this.role, this.selUnUsers).subscribe(data => {
      this.selUnUsers = null;
      this.loadRoleData();
    });
  }

  // tslint:disable-next-line:typedef
  unAssignUsersFromRole() {
    this.roleService.unAssignUsersFromRole(this.role, this.selAsUsers).subscribe(data => {
      this.selAsUsers = null;
      this.loadRoleData();
    });
  }

}
