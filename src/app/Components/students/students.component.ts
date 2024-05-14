import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/Services/student/student.service';
import { AG_GRID_LOCALE_AR } from '../dashboard/Localisation';
import { ColDef } from 'ag-grid-community';


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

  columnDefs: ColDef[] = [
    { headerName: 'الرمز التعريفي', field: 'id', flex: 3 },
    { headerName: 'الأسم الأول', field: 'firstName', flex: 2 },
    { headerName: 'الأسم الأخير', field: 'lastName', flex: 2 },
  ];

  rowData: any[] = [];

  constructor(private stdService: StudentService) { }

  ngOnInit(): void {
    this.stdService.getAllStudent().subscribe(
      (data) => {
        this.rowData = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };

}
