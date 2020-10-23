import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeFormComponent } from './privilege-form.component';

describe('PrivilegeFormComponent', () => {
  let component: PrivilegeFormComponent;
  let fixture: ComponentFixture<PrivilegeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivilegeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
