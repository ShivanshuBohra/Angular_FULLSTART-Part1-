import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let authUsername = "user";
    let authPassword = "password";
    // window.btao is used to convert into base 64 encoading
    let basicAuthHeaderString =
      "Basic " + window.btoa(`${authUsername}:${authPassword}`);

    //Clone the req. just add one more header for authention
    // addition header will be  key as Authorization value as : Basic dXNlcjpwYXNzd29yZA==   "Basic username+password" space in between value
    request = request.clone({
      setHeaders: {
        Authorization: basicAuthHeaderString,
      },
    });

    return next.handle(request);
  }
}
