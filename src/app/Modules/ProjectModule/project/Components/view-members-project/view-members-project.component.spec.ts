import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMembersProjectComponent } from './view-members-project.component';

describe('ViewMembersProjectComponent', () => {
  let component: ViewMembersProjectComponent;
  let fixture: ComponentFixture<ViewMembersProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMembersProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMembersProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
