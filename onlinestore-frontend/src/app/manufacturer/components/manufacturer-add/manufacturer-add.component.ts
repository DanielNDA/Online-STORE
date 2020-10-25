import {Component, OnInit} from '@angular/core';
import {Manufacturer} from '../../model/manufacturer';
import {ActivatedRoute, Router} from '@angular/router';
import {ManufacturerService} from '../../service/manufacturer.service';
import {AuthService} from "../../../users/service/auth.service";

@Component({
  selector: 'app-manufacturer-add',
  templateUrl: './manufacturer-add.component.html',
  styleUrls: ['./manufacturer-add.component.css']
})
export class ManufacturerAddComponent implements OnInit {


  manufacturer: Manufacturer = new Manufacturer();
  boolean: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private manufacturerService: ManufacturerService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.manufacturerService.save(this.manufacturer).subscribe(data => {
      this.manufacturer = data;
      this.goToManufacturerList();
    });
  }

  // tslint:disable-next-line:typedef
  goToManufacturerList() {
    this.router.navigate(['/manufacturer-list']);
  }

  // tslint:disable-next-line:typedef
  hasRole(role: string) {
    this.boolean = this.authService.hasRole(role);
    if (!this.boolean) {
      this.router.navigate(['products']);
    }
    return this.boolean;
  }
}
