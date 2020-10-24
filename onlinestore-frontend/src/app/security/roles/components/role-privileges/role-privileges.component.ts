import { Component, OnInit } from '@angular/core';
import {Privilege} from '../../../privileges/model/privilege';
import {Role} from '../../model/role';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleService} from '../../service/role.service';

@Component({
  selector: 'app-role-privileges',
  templateUrl: './role-privileges.component.html',
  styleUrls: ['./role-privileges.component.css']
})
export class RolePrivilegesComponent implements OnInit {

  role: Role;
  id: number;
  unPrivileges: Privilege[];
  selUnPrivileges: Privilege[];
  selAsPrivileges: Privilege[];

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
      this.roleService.getUnassignedPrivileges(this.role.id).subscribe(data1 => {
        this.unPrivileges = data1;
      });
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

  // tslint:disable-next-line:typedef
  assignPrivilegesToRole() {
    this.roleService.assignPrivilegesToRole(this.role, this.selUnPrivileges).subscribe(data => {
      this.selUnPrivileges = null;
      this.loadRoleData();
    });
  }

  // tslint:disable-next-line:typedef
  unAssignPrivilegesFromRole() {
    this.roleService.unAssignPrivilegesFromRole(this.role, this.selAsPrivileges).subscribe(data => {
      this.selAsPrivileges = null;
      this.loadRoleData();
    });
  }

}
