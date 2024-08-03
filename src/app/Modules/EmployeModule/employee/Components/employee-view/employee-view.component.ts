import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.scss'
})
export class EmployeeViewComponent implements OnInit{
  public paramId!: number;
  public isEdit!: boolean;
 
  constructor(public router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      this.paramId = Number(paramMap.get('id'));
      if(this.paramId){
        this.isEdit = true;
        // this.getAdminById(this.paramId);
        // this.getEditData();
      }
    });
  }

  public getAdminByID(): void{
    
  }
}
