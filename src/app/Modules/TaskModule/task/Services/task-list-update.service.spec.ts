import { TestBed } from '@angular/core/testing';

import { TaskListUpdateService } from './task-list-update.service';

describe('TaskListUpdateService', () => {
  let service: TaskListUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskListUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
