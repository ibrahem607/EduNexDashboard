import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { TeachersPendingComponent } from './Components/teachers-pending/teachers-pending.component';
import { StudentsComponent } from './Components/students/students.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, data: { title: 'login' } },
  { path: 'students', component: StudentsComponent, data: { title: 'Students' } },
  // { path: 'login', component: LoginComponent, data: { title: 'login' } },
  { path: 'teachers', component: DashboardComponent, data: { title: 'Teachers' } },
  { path: 'teachers/pending', component: TeachersPendingComponent, data: { title: 'PendingTeachers' } },
  { path: 'courses', component: DashboardComponent, data: { title: 'Courses' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
