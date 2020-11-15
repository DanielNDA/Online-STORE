import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderOrderlinesComponent } from './user-order-orderlines.component';

describe('UserOrderOrderlinesComponent', () => {
  let component: UserOrderOrderlinesComponent;
  let fixture: ComponentFixture<UserOrderOrderlinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrderOrderlinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrderOrderlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
