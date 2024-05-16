import { Component, OnInit } from '@angular/core';
import { AG_GRID_LOCALE_AR } from '../dashboard/Localisation';
import { ColDef } from 'ag-grid-community';
import { WalletsService } from 'src/app/Services/Wallets/wallets.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';
@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit{
  AG_GRID_LOCALE_AR = AG_GRID_LOCALE_AR;
  rowSelection: "single" | "multiple" = "multiple";
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  themeClass: string = "ag-theme-quartz";
  role!: string;
  balance!: any;

  columnDefs: ColDef[] = [
    { headerName: 'رقم المحفظة', field: 'walletId', flex: 1 },
    { headerName: 'الرصيد', field: 'balance', flex: 1 },
    { headerName: 'رقم المالك', field: 'ownerId', flex: 1 },
    { headerName: 'نوع المالك', field: 'ownerType', flex: 1 },
  ];

  rowData: any[] = [];

  constructor(
    private walletService: WalletsService,
    private route: ActivatedRoute,
    private titleService: Title,
    private authData: AuthService,
  ) { }

  ngOnInit(): void {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.getAllWallets();
    this.getWalletBalance();
  }

  getWalletBalance() {
    this.walletService.getWalletBalance()
      .subscribe(balance => {
        // console.log(balance)
        this.balance = balance.resultData;
      });
  }

  getAllWallets() {
    this.walletService.getAllWallets().subscribe(
      (data) => {
        this.rowData = data.map((item: any) => ({
          ...item,
          ownerType: item.ownerType === 1 ? 'طالب' : 'مدرس'
        }));
        // console.log(this.rowData);
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
