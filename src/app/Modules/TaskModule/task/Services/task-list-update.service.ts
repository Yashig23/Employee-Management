import { Injectable } from '@angular/core';
import { TaskServiceService } from './task-service.service';
import { TaskList } from '../Models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskListUpdateService {
  public reloadTaskList: boolean = false;

  constructor() { }

  public reloadTasks(){
   this.reloadTaskList != this.reloadTaskList;
  }

  public shouldReloadTasks(): boolean {
    return this.reloadTaskList;
  }

}
