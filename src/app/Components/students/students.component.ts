import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/Services/student/student.service';
import { AG_GRID_LOCALE_AR } from '../dashboard/Localisation';
import { ColDef } from 'ag-grid-community';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  AG_GRID_LOCALE_AR = AG_GRID_LOCALE_AR;
  rowSelection: "single" | "multiple" = "multiple";
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  themeClass: string = "ag-theme-quartz";
  role!: string;

  columnDefs: ColDef[] = [
    { headerName: 'الرمز التعريفي', field: 'id', flex: 3 },
    { headerName: 'الأسم الأول', field: 'firstName', flex: 2 },
    { headerName: 'الأسم الأخير', field: 'lastName', flex: 2 },
  ];

  rowData: any[] = [];

  constructor(
    private stdService: StudentService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.role = this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.stdService.getAllStudent().subscribe(
      (data) => {
        this.rowData = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    if (this.role != 'Admin') {
      this.closePage();
    }
  }

  defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };

  closePage() {
    this.openSnackBar('غير متاح او لا يمكن الوصول', 'حسناً');

    setTimeout(() => {
      this.goBackAndRemoveCurrentRoute();
    }, 2000);
  }

  goBackAndRemoveCurrentRoute(): void {
    window.history.back();
    window.history.replaceState(null, '', this.router.url);
    window.location.href = 'https://example.com';
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
