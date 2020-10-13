import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUsersComponent } from './order-users.component';

describe('OrderUsersComponent', () => {
  let component: OrderUsersComponent;
  let fixture: ComponentFixture<OrderUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
