import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IUser } from './user.interface';
import { Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url: string = "http://localhost:8000/api/";
  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  createUser(userData: Object): Observable<IUser[]> {
    return this.http.post<IUser[]>(this._url + "register", userData, this._httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  rememberUser(userData: object) {
    this.storage.set("user", userData);
  }

  fetchUserSession() {
    return this.storage.get('user');
  }

  logout() {
    this.storage.clear();
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
