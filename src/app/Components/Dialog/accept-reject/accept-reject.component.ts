import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/Services/teacher/teacher.service';

@Component({
  selector: 'app-accept-reject',
  templateUrl: './accept-reject.component.html',
  styleUrls: ['./accept-reject.component.css']
})
export class AcceptRejectComponent {
  id: string;
  constructor(
    public dialogRef: MatDialogRef<AcceptRejectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private teacherService: TeacherService,
    private router: Router
  ) {
    this.id = this.data.id;
  }

  onYesClick() {
    if (this.data.action == 'approve') {
      this.Approve(this.id);
    } else {
      this.Reject(this.id);
    }
    this.dialogRef.close(true);
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  Reject(id: string): void {
    this.teacherService.RejectTeacherProfile(id).subscribe({
      next: (respon) => {
        console.log(respon);
        this.reloadCurrentRoute();
        this.openSnackBar('تم رفض المدرس', 'حسناَ');
      },
      error: (error) => {
        if (error.status == 200) {
          this.reloadCurrentRoute();
          this.openSnackBar('تم رفض المدرس', 'حسناَ');
        }
        console.log(error);
      }
    });
  }

  Approve(id: string): void {
    this.teacherService.ApproveTeacherProfile(id).subscribe({
      next: (respon) => {
        console.log(respon);
        this.reloadCurrentRoute();
        this.openSnackBar('تم قبول المدرس', 'حسناَ')
      },
      error: (error) => {
        if (error.status == 200) {
          this.reloadCurrentRoute();
          this.openSnackBar('تم قبول المدرس', 'حسناَ')
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
