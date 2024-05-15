import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AG_GRID_LOCALE_AR } from '../dashboard/Localisation';
import { ColDef } from 'ag-grid-community';
import { TransactionsService } from 'src/app/Services/Transactions/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  AG_GRID_LOCALE_AR = AG_GRID_LOCALE_AR;
  rowSelection: "single" | "multiple" = "multiple";
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  themeClass: string = "ag-theme-quartz";
  role!: string;

  columnDefs: ColDef[] = [
    { headerName: 'الرمز التعريفي', field: 'id', flex: 1 },
    { headerName: 'رقم المحفظة', field: 'walletId', flex: 1 },
    { headerName: 'نوع المعاملة', field: 'transactionType', flex: 1 },
    { headerName: 'المبلغ', field: 'amount', flex: 1 },
    { headerName: 'تاريخ المعاملة', field: 'transactionDate', flex: 2 },
  ];

  rowData: any[] = [];

  constructor(
    private transactionService: TransactionsService,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactionService.getAllTransactions().subscribe(
      (data) => {
        this.rowData = data;
        // console.log(data);
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
