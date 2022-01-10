import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUser } from './user.interface';
import { Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url: string = "http://localhost:8000/api/";

  constructor(
    private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) { }

  createUser(userData: Object): Observable<IUser[]> {
    return this.http.post<IUser[]>(this._url + "register", userData).pipe(
      catchError(this.errorHandler)
    )
  }

  rememberUser(userData: object, token: string) {
    this.storage.set("user", userData);
    this.storage.set("token", token);
  }

  logout() {
    this.storage.clear();
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
