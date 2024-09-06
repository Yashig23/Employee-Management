import { Component } from '@angular/core';
import { EmployeeForProjects } from '../../Models/Project.model';

@Component({
  selector: 'app-view-members-project',
  templateUrl: './view-members-project.component.html',
  styleUrl: './view-members-project.component.scss'
})
export class ViewMembersProjectComponent {
public data: EmployeeForProjects[]=[];
}
