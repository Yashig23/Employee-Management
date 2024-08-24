import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ToastService{

    constructor(private toastr: ToastrService) { }

    private info ={
        timeOut: 10000, 
        tapToDismiss: true,
        closeButton: true
    }

    public showSuccess(msg: string) {
        this.toastr.success(msg, '', this.info);
      }

    public showWarning(msg: string){
        this.toastr.warning(msg,'', this.info);
    }

    public showInfo(msg: string){
        this.toastr.info(msg, '', this.info);
    }
}