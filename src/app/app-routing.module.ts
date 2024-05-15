import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersPendingComponent } from './Components/teachers-pending/teachers-pending.component';
import { StudentsComponent } from './Components/students/students.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { TeachersComponent } from './Components/teachers/teachers.component';
import { ExamsComponent } from './Components/exams/exams.component';
import { WalletsComponent } from './Components/wallets/wallets.component';
import { TransactionsComponent } from './Components/transactions/transactions.component';

const routes: Routes = [
  { path: 'students', component: StudentsComponent, data: { title: 'Students' } },
  { path: 'teachers', component: TeachersComponent, data: { title: 'Teachers' } },
  { path: 'pending', component: TeachersPendingComponent, data: { title: 'PendingTeachers' } },
  { path: 'courses', component: CoursesComponent, data: { title: 'Courses' } },
  { path: 'exams', component: ExamsComponent, data: { title: 'Exams' } },
  { path: 'wallets', component: WalletsComponent, data: { title: 'Wallets' } },
  { path: 'transactions', component: TransactionsComponent, data: { title: 'Transactions' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
