import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HeaderComponent } from './Components/header/header.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { AgGridAngular} from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { TeachersPendingComponent } from './Components/teachers-pending/teachers-pending.component';
import { StudentsComponent } from './Components/students/students.component';
import { CustomButtonRendererComponent } from './Components/custom-button-renderer/custom-button-renderer.component';
import { AcceptRejectComponent } from './Components/Dialog/accept-reject/accept-reject.component';
import { SendInfoComponent } from './Components/Dialog/send-info/send-info.component';
import { LoginComponent } from './Components/login/login.component';
import { SignOutComponent } from './Components/Dialog/sign-out/sign-out.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { TeachersComponent } from './Components/teachers/teachers.component';
import { ExamsComponent } from './Components/exams/exams.component';
import { WalletsComponent } from './Components/wallets/wallets.component';
import { TransactionsComponent } from './Components/transactions/transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SideBarComponent,
    TeachersPendingComponent,
    StudentsComponent,
    CustomButtonRendererComponent,
    AcceptRejectComponent,
    SendInfoComponent,
    LoginComponent,
    SignOutComponent,
    CoursesComponent,
    TeachersComponent,
    ExamsComponent,
    WalletsComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    AgGridAngular,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
