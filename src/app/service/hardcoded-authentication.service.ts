import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationDetails } from "../login/login.component";

@Injectable({
  providedIn: "root",
})
export class HardcodedAuthenticationService {
  constructor(private http: HttpClient) {}
  // authenticate(username, password) {
  //   if (username === "Shivanshu" && password === "admin") {
  //     sessionStorage.setItem("authenticateUser", username);
  //     return true;
  //   }
  //   return false;
  // }

  authenticate(loginDetails) {
    return this.http.post<AuthenticationDetails>(
      // ` http://localhost:5000/authenticateUser`,
      //aws URL
      `http://mytodos-env.eba-53zdbfth.us-west-2.elasticbeanstalk.com/authenticateUser`,
      loginDetails
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticateUser");
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem("authenticateUser");
  }
}
