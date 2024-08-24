import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubChildTasksComponent } from './sub-child-tasks.component';

describe('SubChildTasksComponent', () => {
  let component: SubChildTasksComponent;
  let fixture: ComponentFixture<SubChildTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubChildTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubChildTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
