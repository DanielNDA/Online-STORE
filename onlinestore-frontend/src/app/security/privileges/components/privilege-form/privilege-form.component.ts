import { Component, OnInit } from '@angular/core';
import {Privilege} from '../../model/privilege';
import {ActivatedRoute, Router} from '@angular/router';
import {PrivilegeService} from '../../service/privilege.service';

@Component({
  selector: 'app-privilege-form',
  templateUrl: './privilege-form.component.html',
  styleUrls: ['./privilege-form.component.css']
})
export class PrivilegeFormComponent implements OnInit {

  privilege: Privilege;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private privilegeService: PrivilegeService) {
    this.privilege = new Privilege();
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.privilegeService.save(this.privilege).subscribe(result => this.goToPrivilegeList());
  }

  // tslint:disable-next-line:typedef
  goToPrivilegeList() {
    this.router.navigate(['/privilege']);
  }

  ngOnInit(): void {
  }

}
