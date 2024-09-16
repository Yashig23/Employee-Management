import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appShowFormError]'
})
export class ShowErrorDirective implements OnInit {
  @Input('appShowFormError') control!: AbstractControl;  
  
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.control.statusChanges.subscribe(() => {
      this.displayError();
    });
    this.displayError();
  }

  private displayError() {
    const control = this.control;
    const errorDiv = this.el.nativeElement;

    if (control.invalid && (control.dirty || control.touched)) {
      const errorMessages = [];
      if (control.errors?.['required']) {
        errorMessages.push('This field is required.');
      }
      if (control.errors?.['maxlength']) {
        errorMessages.push(`Maximum length is ${control.errors['maxlength'].requiredLength} characters.`);
      }
      if (control.errors?.['minlength']) {
        errorMessages.push(`Minimum length is ${control.errors['minlength'].requiredLength} characters.`);
      }
      if (control.errors?.['pattern']) {
        errorMessages.push('Invalid pattern.');
      }
      errorDiv.innerHTML = errorMessages.join('<br>');
      errorDiv.style.display = 'block';
    } else {
      errorDiv.style.display = 'none';
    }
  }
}
