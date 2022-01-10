import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUser } from './user.interface';
import { Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url: string = "http://localhost:8000/api/";

  constructor(private http: HttpClient) { }

  createUser(userData: Object): Observable<IUser[]> {
    return this.http.post<IUser[]>(this._url + "register", userData).pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
