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

  create(data: IFacility): Observable<IFacility>  {
    return this.http.post<IFacility>(this._url + "facilities", {
      facility_number: data.facility_number,
      facility: data.facility,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      state: data.state,
      phone1: data.phone1,
      phone2: data.phone2,
      fax: data.fax,
      web_url: data.web_url
    }, this._httpOptions).pipe(
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
