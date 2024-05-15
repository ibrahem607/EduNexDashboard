import { Component, OnInit } from '@angular/core';
import { AG_GRID_LOCALE_AR } from '../dashboard/Localisation';
import { ColDef } from 'ag-grid-community';
import { ExamsService } from 'src/app/Services/Exams/exams.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  AG_GRID_LOCALE_AR = AG_GRID_LOCALE_AR;
  rowSelection: "single" | "multiple" = "multiple";
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  themeClass: string = "ag-theme-quartz";
  role!: string;

  columnDefs: ColDef[] = [
    { headerName: 'الرمز التعريفي', field: 'id', flex: 1 },
    { headerName: 'عنوان الامتحان', field: 'title', flex: 1 },
    { headerName: 'وقت البدء', field: 'startDateTime', flex: 1 },
    { headerName: 'وقت الانتهاء', field: 'endDateTime', flex: 1 },
    { headerName: 'المدة (دقائق)', field: 'duration', flex: 1 },
    { headerName: 'نوع الامتحان', field: 'type', flex: 1 },
    { headerName: 'رقم المحاضرة', field: 'lectureId', flex: 1 },
  ];

  rowData: any[] = [];

  constructor(
    private examService: ExamsService,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.getAllExams();
  }

  getAllExams() {
    this.examService.getAllExams().subscribe(
      (data) => {
        this.rowData = data;
        console.log(data);
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
