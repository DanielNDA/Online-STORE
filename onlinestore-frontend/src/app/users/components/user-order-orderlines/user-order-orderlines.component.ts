import {Component, OnInit} from '@angular/core';
import {Category} from '../../../categories/model/category';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../categories/service/category.service';
import {AuthService} from '../../service/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderService} from '../../../cart/service/order.service';
import {Order} from '../../../cart/model/order';
import {OrderLine} from '../../../cart/model/order-line';

@Component({
  selector: 'app-user-order-orderlines',
  templateUrl: './user-order-orderlines.component.html',
  styleUrls: ['./user-order-orderlines.component.css']
})
export class UserOrderOrderlinesComponent implements OnInit {

  order: Order;
  id: number;
  searchValue = '';
  config = {
    itemsPerPage: 6,
    currentPage: 1
  };
  boolean: boolean;
  orderLines: OrderLine[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.order = new Order();
    this.id = this.route.snapshot.params.id;
    this.orderService.getById(this.id).subscribe(data => {
      this.order = data;
      this.orderLines = this.order.orderLines;
    });
  }
}
