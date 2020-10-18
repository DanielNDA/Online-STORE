import { Component, OnInit } from '@angular/core';
import {Manufacturer} from '../model/manufacturer';
import {ManufacturerService} from '../service/manufacturer.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.css']
})
export class ManufacturerListComponent implements OnInit {

  manufacturers: Manufacturer[];

  constructor(private manufacturerService: ManufacturerService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getManufacturers();
  }
// tslint:disable-next-line:typedef
  getManufacturers() {
    this.manufacturerService.findAll().subscribe(data => {
      this.manufacturers = data;
    });
  }
  // tslint:disable-next-line:typedef
  addManufacturer(){
    this.router.navigate(['/manufacturer-add']);
  }
}
