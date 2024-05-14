import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { AuthService } from './Services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EduNexDashboard';
  role!: string;

  @ViewChild('sideNav') sideNav!: MatSidenav;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {

   }

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    this.cdr.detectChanges();
  }
}
