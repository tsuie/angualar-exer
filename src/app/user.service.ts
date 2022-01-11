import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IUser } from './user.interface';
import { Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url: string = environment.userApiUrl;
  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  createUser(userData: object): Observable<IUser[]> {
    return this.http.post<IUser[]>(this._url + "register", userData, this._httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  loginUser(userData: object): Observable<IUser[]> {
    return this.http.post<IUser[]>(this._url + "login", userData, this._httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  rememberUser(userData: object) {
    this.storage.set("user", userData);
  }

  isLoggedIn() {
    // const token = this.storage.get('user').token;
    return !!this.storage.get('user')?.token;
  }

  fetchDetails() {
    return this.storage.get('user')?.data;
  }

  logout() {
    this.storage.clear();
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
