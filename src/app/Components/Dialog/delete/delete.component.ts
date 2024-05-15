import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/Services/student/student.service';
import { TeacherService } from 'src/app/Services/teacher/teacher.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  id: string;
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private router: Router
  ) {
    this.id = this.data.id;
  }

  onYesClick() {
    if (this.data.action == 'teacher') {
      this.DeleteTeacher(this.id);
    } else {
      this.DeleteStudent(this.id);
    }
    this.dialogRef.close(true);
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  DeleteStudent(id: string): void {
    this.studentService.deleteStudent(id).subscribe({
      next: (respon) => {
        console.log(respon);
        this.reloadCurrentRoute();
        this.openSnackBar('تم حذف الطالب', 'حسناَ');
      },
      error: (error) => {
        if (error.status == 200) {
          this.reloadCurrentRoute();
          this.openSnackBar('تم حذف الطالب', 'حسناَ');
        }
        console.log(error);
      }
    });
  }

  DeleteTeacher(id: string): void {
    this.teacherService.ApproveTeacherProfile(id).subscribe({
      next: (respon) => {
        console.log(respon);
        this.reloadCurrentRoute();
        this.openSnackBar('تم حذف المدرس', 'حسناَ')
      },
      error: (error) => {
        if (error.status == 200) {
          this.reloadCurrentRoute();
          this.openSnackBar('تم حذف المدرس', 'حسناَ')
        }
        console.log(error);
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: 'snackbar-success'
    });
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
