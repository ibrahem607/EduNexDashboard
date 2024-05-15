import { Component, OnInit } from '@angular/core';
import { AG_GRID_LOCALE_AR } from '../dashboard/Localisation';
import { ColDef } from 'ag-grid-community';
import { TeacherService } from 'src/app/Services/teacher/teacher.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DeleteComponent } from '../Dialog/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomButtonRendererComponent } from '../custom-button-renderer/custom-button-renderer.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  AG_GRID_LOCALE_AR = AG_GRID_LOCALE_AR;
  rowSelection: "single" | "multiple" = "multiple";
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  themeClass: string = "ag-theme-quartz";
  role!: string;

  columnDefs: ColDef[] = [
    { headerName: 'الرمز التعريفي', field: 'id', flex: 1 },
    { headerName: 'الاسم الأول', field: 'firstName', flex: 1 },
    { headerName: 'الاسم الأخير', field: 'lastName', flex: 1 },
    { headerName: 'البريد الإلكتروني', field: 'email', flex: 1 },
    { headerName: 'الهاتف', field: 'phoneNumber', flex: 1 },
    { headerName: 'الجنس', field: 'gender', flex: 1 },
    { headerName: 'العنوان', field: 'address', flex: 1 },
    { headerName: 'حساب الفيسبوك', field: 'facebookAccount', flex: 1 },
    { headerName: 'الحالة', field: 'status', flex: 1 },
    {
      headerName: 'حذف',
      cellRenderer: 'customButtonRenderer',
      flex: 1,
      cellRendererParams: {
        buttons: [
          {
            text: 'delete',
            icon: '<i class="fa fa-trash"></i>',
            action: (id: string) => this.openDeleteDialog(id, 'teacher')
          }
        ]
      }
    },
  ];

  rowData: any[] = [];
  gridOptions: { components: { customButtonRenderer: typeof CustomButtonRendererComponent; }; };

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private titleService: Title,
    public dialog: MatDialog
  ) {
    this.gridOptions = {
      components: {
        customButtonRenderer: CustomButtonRendererComponent,
      },
    };
  }

  ngOnInit(): void {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.getAllTeachers();
  }

  getAllTeachers() {
    this.teacherService.getAllTeachers().subscribe(
      (data) => {
        this.rowData = data;
        // console.log(data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  openDeleteDialog(id: string, action: string): void {
    this.dialog.open(DeleteComponent, {
      width: '450px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        message: 'هل انت متاكد من حذف المدرس',
        confirmButtonText: 'حذف المدرس',
        action: action,
        id: id
      }
    });
  }

  defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };
}
