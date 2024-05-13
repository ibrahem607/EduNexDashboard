import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { TeachersPendingComponent } from './Components/teachers-pending/teachers-pending.component';
import { StudentsComponent } from './Components/students/students.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'students', component: StudentsComponent, data: { title: 'Students' } },
  { path: 'teachers', component: DashboardComponent, data: { title: 'Teachers' } },
  { path: 'teachers/pending', component: TeachersPendingComponent, data: { title: 'PendingTeachers' } },
  { path: 'courses', component: DashboardComponent, data: { title: 'Courses' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
