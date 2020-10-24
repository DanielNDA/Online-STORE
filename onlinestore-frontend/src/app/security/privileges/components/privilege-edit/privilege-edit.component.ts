import { Component, OnInit } from '@angular/core';
import {Privilege} from '../../model/privilege';
import {ActivatedRoute, Router} from '@angular/router';
import {PrivilegeService} from '../../service/privilege.service';

@Component({
  selector: 'app-privilege-edit',
  templateUrl: './privilege-edit.component.html',
  styleUrls: ['./privilege-edit.component.css']
})
export class PrivilegeEditComponent implements OnInit {

  privilege: Privilege;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private privilegeService: PrivilegeService) {
    this.privilege = new Privilege();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.privilegeService.getById(this.id).subscribe(data => {
      this.privilege = new Privilege();
      this.privilege = data;
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.privilegeService.update(this.privilege).subscribe(result => this.goToPrivilegeList());
  }

  // tslint:disable-next-line:typedef
  goToPrivilegeList() {
    this.router.navigate(['/privilege']);
  }

}
