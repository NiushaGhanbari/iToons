import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable()
export class StatusInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse && event.body && event.body.status) {
          // TODO: Do something with the 'status' property
          console.log('Status from response:', event.body.status);
        }
        return event;
      })
    );
  }
}
