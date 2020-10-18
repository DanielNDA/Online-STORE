import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  id: number;
  user: User;
  closeResult = '';
  image: Observable<any>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.user = new User();
    this.id = this.route.snapshot.params.id;
    this.userService.getById(this.id).subscribe(data => {
      this.user = data;
      this.user.image = this.getPhoto(this.id);
    });
  }

  // tslint:disable-next-line:typedef
  deleteProfile(id: number) {
    this.userService.delete(id).subscribe(data => {
      this.goToHomePage();
    });
  }

  getPhoto(id: number): Observable<any> {
    return this.userService.getUserImage(id);
  }


  // tslint:disable-next-line:typedef
  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.deleteProfile(id);
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

  // tslint:disable-next-line:typedef
  private goToHomePage() {
    this.router.navigate(['']);
  }
}
