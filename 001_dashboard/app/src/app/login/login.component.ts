import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../api/user.service';
import { DialogComponent } from './dialog.component';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RegisterComponent } from '../register/register.component';

export interface User {
  username: string;
  password: string;
  name?: string;
  currency?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  username: string = ""
  password: string = ""
  errorMessage = ""

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, public dialog: MatDialog) {

   }

  ngOnInit(): void {
  }

  request() {
    this.dialog.open(RegisterComponent)
  }

  login() {
    this.userService.login({
      username: this.username,
      password: this.password
    })
    .pipe(catchError(error => this.handleError(error, this.dialog)))
    .subscribe(res => {
      if (res != null && res.username == this.username) {
        console.log(res)
        this.router.navigate(['/dashboard'], { relativeTo: this.route });
        return
      }
    })

  }

  private handleError(error: HttpErrorResponse, dialog: MatDialog) {
    this.dialog.open(DialogComponent)
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
