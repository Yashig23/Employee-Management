import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTaskListComponent } from './full-task-list.component';

describe('FullTaskListComponent', () => {
  let component: FullTaskListComponent;
  let fixture: ComponentFixture<FullTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullTaskListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
