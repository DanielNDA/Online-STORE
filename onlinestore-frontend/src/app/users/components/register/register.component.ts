import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Address} from '../../../addresses/model/address';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  id: number;
  matched = true;
  address: Address;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
    this.user = new User();
    this.address = new Address();
    this.user.addressDTO = this.address;
  }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.userService.save(this.user).subscribe(data => {
      this.user = data;
    });
    this.upload();
    setTimeout(() =>
      {
        this.goToLogin();
      },
      3000);
  }

  goToLogin(): any {
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
          const  a = event.body.id;
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
