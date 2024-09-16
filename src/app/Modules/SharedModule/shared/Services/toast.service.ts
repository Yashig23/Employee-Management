import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ToastService{

    constructor(private toastr: ToastrService) { }

    private info ={
        timeOut: 10000000, 
        tapToDismiss: true,
        closeButton: true,
        positionClass: 'toast-custom-position'
    }

    public showSuccess(msg: string) {
        // console.log("entered inside toaster");
        this.toastr.success(msg, 'Success', this.info);
      }

    public showWarning(msg: string){
        this.toastr.warning(msg,'Warning', this.info);
    }

    public showInfo(msg: string){
        this.toastr.info(msg, 'Info', this.info);
    }
}