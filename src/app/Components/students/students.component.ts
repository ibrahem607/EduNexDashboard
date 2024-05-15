import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/Services/student/student.service';
import { AG_GRID_LOCALE_AR } from '../dashboard/Localisation';
import { ColDef } from 'ag-grid-community';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DeleteComponent } from '../Dialog/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomButtonRendererComponent } from '../custom-button-renderer/custom-button-renderer.component';

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
    {
      headerName: 'حذف',
      cellRenderer: 'customButtonRenderer',
      flex: 2,
      cellRendererParams: {
        buttons: [
          {
            text: 'delete',
            icon: '<i class="fa fa-trash"></i>',
            action: (id: string) => this.openDeleteDialog(id, 'student')
          }
        ]
      }
    },
  ];

  rowData: any[] = [];
  gridOptions: { components: { customButtonRenderer: typeof CustomButtonRendererComponent; }; };

  constructor(
    private stdService: StudentService,
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

    this.stdService.getAllStudent().subscribe(
      (data) => {
        this.rowData = data;
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
