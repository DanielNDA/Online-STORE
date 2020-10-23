import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {AddressService} from '../../../addresses/service/address.service';
import {Address} from '../../../addresses/model/address';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  id: number;
  address: Address;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private addressService: AddressService) {
  }

  ngOnInit(): void {
    this.user = new User();
    this.address = new Address();
    this.id = this.route.snapshot.params.id;
    this.user.addressDTO = this.address;
    this.userService.getById(this.id).subscribe(data => {
      this.user = data;
      this.addressService.getById(this.id).subscribe(data1 => {
        this.address = data1;
      });
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.userService.update(this.user).subscribe();
    this.upload();
    setTimeout(() => {
        this.goToHomePage();
      },
      3000);
  }

  // tslint:disable-next-line:typedef
  goToHomePage() {
    this.router.navigate(['']);
  }

  // tslint:disable-next-line:typedef
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // tslint:disable-next-line:typedef
  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.userService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          const a = event.body.id;
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }
}
