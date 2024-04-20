import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(map(this.transformResponse));
  }

  private transformResponse(event: HttpEvent<any>): HttpEvent<any> {
    return event instanceof HttpResponse && event.body && event.body.results
      ? event.clone({ body: event.body.results })
      : event;
  }
}
