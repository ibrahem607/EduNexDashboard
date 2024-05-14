import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, catchError, tap, throwError, window } from 'rxjs';
import { CustomJwtPayload } from 'src/app/model/CustomJwtPayload';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'http://localhost:5293';
  tokenKey: string = 'auth_token';
  teacherId: any = '';
  currentUserId: string = 'UserId';
  currentUserRole: string = 'UserRole';
  IsLogin: any = new BehaviorSubject(null);
  IsUser!: boolean;

  constructor(private httpClient: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    if (localStorage.getItem(this.tokenKey) !== null || localStorage.getItem(this.tokenKey) !== "") {
      this.saveCurrentUserId()
    }
  }

  login(data: any): Observable<any> {

    return this.httpClient.post(`${this.baseUrl}/api/Auth/login`, data).pipe(
      tap((response: any) => {
        if (response && response.token) {

          localStorage.setItem(this.tokenKey, response.token);
          this.saveCurrentUserId()
          console.log(this.currentUserRole)

          if (localStorage.getItem(this.currentUserRole) == "Admin") {
            // Save token
            this.snackBar.open('  تم تسجيل الدخول بنجاح ', 'Close', {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-success'
            });
            if (localStorage.getItem(this.currentUserRole) == "Admin") {
              this.reloadCurrentRoute()
            }

          } else {

            this.snackBar.open(`خطأ في عنوان البريد او كلمة السر`, 'Close', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['custom-snackbar'],
            });
            this.removeToken();
            this.removeUserId();
            this.removeUserRole();

          }

        }
      }),
      catchError(error => {

        this.snackBar.open(`خطأ في عنوان البريد او كلمة السر`, 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['custom-snackbar'],
        });

        // Return an observable that emits the error
        return throwError(error);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  removeUserRole(): void {
    localStorage.removeItem(this.currentUserRole);
  }

  removeUserId(): void {
    localStorage.removeItem(this.currentUserId);
  }

  getUserId(): any {
    return localStorage.getItem(this.currentUserId);
  }

  getUserRole(): any {
    return localStorage.getItem(this.currentUserRole);
  }
  currentUser: any = new BehaviorSubject(null);

  saveCurrentUserId(): any {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {

      const decodedUser: CustomJwtPayload = jwtDecode(token);
      localStorage.setItem(this.currentUserId, decodedUser.nameid);
      localStorage.setItem(this.currentUserRole, decodedUser.role);

      console.log(`${localStorage.getItem(this.currentUserRole)} and ${localStorage.getItem(this.currentUserId)}`);
      this.IsLogin.next(decodedUser);
      return decodedUser.nameid;
    } else {
      console.log('No token found.');
    }
  }

  logOut(): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/api/Auth/logout`, null);
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    location.reload();
    // this.router.navigateByUrl('/students', { skipLocationChange: true }).then(() => {
    //   this.router.navigate([currentUrl]);
    // });
  }
}
