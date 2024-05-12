import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersPendingComponent } from './teachers-pending.component';

describe('TeachersPendingComponent', () => {
  let component: TeachersPendingComponent;
  let fixture: ComponentFixture<TeachersPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeachersPendingComponent]
    });
    fixture = TestBed.createComponent(TeachersPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
