import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService implements OnDestroy {
  public destroy$ = new Subject<void>();

  protected takeUntilDestroy<T>() {
    return (source: Observable<T>) => source.pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
