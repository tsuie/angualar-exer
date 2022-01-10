import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.storage.get('user')?.token;
    let authReq = request;
    if(token) {
      authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token) })
    }

    return next.handle(authReq);
  }
}
