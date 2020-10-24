import {Component, OnInit} from '@angular/core';
import {Manufacturer} from '../../model/manufacturer';
import {ActivatedRoute, Router} from '@angular/router';
import {ManufacturerService} from '../../service/manufacturer.service';

@Component({
  selector: 'app-manufacturer-add',
  templateUrl: './manufacturer-add.component.html',
  styleUrls: ['./manufacturer-add.component.css']
})
export class ManufacturerAddComponent implements OnInit {


  manufacturer: Manufacturer = new Manufacturer();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private manufacturerService: ManufacturerService) {
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
}
