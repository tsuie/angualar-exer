import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IFacility } from '../../models/facility.interface';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private _url: string = environment.userApiUrl
  private _token = null;
  private _httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' },
    )
  };

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this._token = this.storage.get('user')?.token;
    if(this._token) {
      this._httpOptions = {
        headers: new HttpHeaders(
          { 'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + this._token }
        )
      }
    }
  }

  create(data: object): Observable<IFacility>  {
    return this.http.post<IFacility>(this._url + "facilities", data, this._httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  read(): Observable<any>  {
    return this.http.get<any>(this._url + "facilities", this._httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  update(data: object): Observable<IFacility[]>  {
    return this.http.post<IFacility[]>(this._url + "facilities", data, this._httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  delete(data: object): Observable<IFacility[]>  {
    return this.http.post<IFacility[]>(this._url + "facilities", data, this._httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }



  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
