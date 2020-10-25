import {Component, OnInit} from '@angular/core';
import {Manufacturer} from '../../model/manufacturer';
import {ManufacturerService} from '../../service/manufacturer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../users/service/auth.service';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.css']
})
export class ManufacturerListComponent implements OnInit {

  manufacturers: Manufacturer[];
  boolean: boolean;

  constructor(private manufacturerService: ManufacturerService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.manufacturers = [];
    this.getAll();
  }

// tslint:disable-next-line:typedef
  getAll() {
    this.manufacturerService.findAll().subscribe(data => {
      this.manufacturers = [];
      this.manufacturers = data;
    });
  }

  // tslint:disable-next-line:typedef
  add() {
    this.router.navigate(['addManufacturer']);
  }

  // tslint:disable-next-line:typedef
  delete(id: number) {
    this.manufacturerService.delete(id).subscribe(data => {
      this.getAll();
    });
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
