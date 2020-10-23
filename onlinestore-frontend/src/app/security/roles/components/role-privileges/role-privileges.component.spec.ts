import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePrivilegesComponent } from './role-privileges.component';

describe('RolePrivilegesComponent', () => {
  let component: RolePrivilegesComponent;
  let fixture: ComponentFixture<RolePrivilegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolePrivilegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePrivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
