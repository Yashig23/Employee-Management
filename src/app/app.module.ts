import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { LoginComponent } from './Components/Login/login/login.component';
import { SignupComponent } from './Components/Signup/signup.component';
import { HomepageComponent } from './Components/Homepage/homepage/homepage.component';
import { AddTasksComponent } from './Components/Tasks/add-tasks/add-tasks.component';
import { ToastrModule } from 'ngx-toastr';
import { TaskModule } from './Modules/TaskModule/task/task.module';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SideBarComponent } from './Modules/SharedModule/shared/Components/side-bar/side-bar.component';
import { customInterceptor } from './Components/Services/custom.interceptor';
import { SharedModule } from './Modules/SharedModule/shared/shared.module';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    AddTasksComponent,
    // ProfilePageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogActions,
    MatDialogClose,
    TableModule,
    MatDialogContent,
    MatDialogTitle,
    MatSlideToggle,
    MatDialogModule,
    TagModule,
    RatingModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    TaskModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatIconModule,
    BrowserAnimationsModule,
    // SideBarComponent,
    ToastrModule.forRoot({
      positionClass: 'toast-upper-right',
      timeOut: 3000,
      extendedTimeOut: 1000,
      closeButton: true
    })
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([customInterceptor]))
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
