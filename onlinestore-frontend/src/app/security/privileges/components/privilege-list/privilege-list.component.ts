import { Component, OnInit } from '@angular/core';
import {PrivilegeService} from '../../service/privilege.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Privilege} from '../../model/privilege';

@Component({
  selector: 'app-privilege-list',
  templateUrl: './privilege-list.component.html',
  styleUrls: ['./privilege-list.component.css']
})
export class PrivilegeListComponent implements OnInit {

  privileges: Privilege[];
  closeResult = '';

  constructor(private privilegeService: PrivilegeService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getPrivileges();
  }

  // tslint:disable-next-line:typedef
  getPrivileges() {
    this.privilegeService.findAll().subscribe(data => {
      this.privileges = data;
    });
  }

  // tslint:disable-next-line:typedef
  deletePrivilege(id: number) {
    this.privilegeService.delete(id).subscribe(data => {
      this.getPrivileges();
    });
  }

  // tslint:disable-next-line:typedef
  editPrivilege(id: number) {
    this.router.navigate(['edit-privilege', id]);
  }

  // tslint:disable-next-line:typedef
  addPrivilege() {
    this.router.navigate(['add-privilege']);
  }


  // tslint:disable-next-line:typedef
  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.deletePrivilege(id);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
