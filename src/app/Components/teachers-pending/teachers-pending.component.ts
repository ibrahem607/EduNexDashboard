import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/Services/teacher/teacher.service';
import { AG_GRID_LOCALE_AR } from '../dashboard/Localisation';
import { ColDef, GridOptions } from 'ag-grid-community';
import { CustomButtonRendererComponent } from '../custom-button-renderer/custom-button-renderer.component';
import { AcceptRejectComponent } from '../Dialog/accept-reject/accept-reject.component';
import { MatDialog } from '@angular/material/dialog';
import { SendInfoComponent } from '../Dialog/send-info/send-info.component';

@Component({
  selector: 'app-teachers-pending',
  templateUrl: './teachers-pending.component.html',
  styleUrls: ['./teachers-pending.component.css']
})
export class TeachersPendingComponent implements OnInit {
  CustomButtonRendererComponent = CustomButtonRendererComponent;
  AG_GRID_LOCALE_AR = AG_GRID_LOCALE_AR;
  rowSelection: "single" | "multiple" = "multiple";
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  themeClass: string = "ag-theme-quartz";
  gridOptions: GridOptions;

  columnDefs: ColDef[] = [
    { headerName: 'الرمز التعريفي', field: 'id', flex: 1 },
    { headerName: 'الأسم الأول', field: 'firstName', flex: 1 },
    { headerName: 'الأسم الأخير', field: 'lastName', flex: 1 },
    { headerName: 'البريد الإلكتروني', field: 'email', flex: 1 },
    { headerName: 'رقم الهاتف', field: 'phoneNumber', flex: 1 },
    { headerName: 'حالة الطلب', field: 'status', flex: 1 },
    { headerName: 'العمر', field: 'age', flex: 1 },
    {
      headerName: 'قبول',
      cellRenderer: 'customButtonRenderer',
      flex: 1,
      cellRendererParams: {
        buttons: [
          {
            text: 'approve',
            icon: '<i class="fa fa-circle-check"></i>',
            action: (id: string) => this.openAcceptRejectDialog(id, 'approve')
          }
        ]
      }
    },
    {
      headerName: 'رفض',
      cellRenderer: 'customButtonRenderer',
      flex: 1,
      cellRendererParams: {
        buttons: [
          {
            text: 'reject',
            icon: '<i class="fa fa-times-circle"></i>',
            action: (id: string) => this.openAcceptRejectDialog(id, 'reject')
          }
        ]
      }
    },
    {
      headerName: 'إرسال رسالة',
      cellRenderer: 'customButtonRenderer',
      flex: 1,
      cellRendererParams: {
        buttons: [
          {
            text: 'sendInfo',
            icon: '<i class="fa fa-envelope"></i>',
            action: (id: string) => this.openSendInfoDialog(id)
          }
        ]
      }
    }
  ];
  rowData: any[] = [];

  constructor(private teacherService: TeacherService, public dialog: MatDialog) {
    this.gridOptions = {
      components: {
        customButtonRenderer: CustomButtonRendererComponent,
      },
    };
  }

  ngOnInit(): void {
    this.getAllPendingTeacher();
  }

  getAllPendingTeacher(): void {
    this.teacherService.getAllTeacherPending().subscribe({
      next: (response) => {
        this.rowData = response;
      },
      error: (err) => {
        console.log(`error:${err.error}`);
      }
    });
  }

  openAcceptRejectDialog(id: string, action: string): void {
    this.dialog.open(AcceptRejectComponent, {
      width: '450px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        message: action == 'approve' ? 'هل انت متاكد من قبول المدرس' : 'هل انت متاكد من رفض المدرس',
        confirmButtonText: action == 'approve' ? 'قبول المدرس' : 'رفض المدرس',
        action: action,
        id: id
      }
    });
  }

  openSendInfoDialog(id: string): void {
    this.dialog.open(SendInfoComponent, {
      width: '450px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        confirmButtonText: 'إرسال',
        id: id
      }
    });
  }

  defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };

  // onButtonClick(id: string): void {
  //   console.log('Button clicked for ID:', id);
  // }
}
