import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HardcodedAuthenticationService } from "../service/hardcoded-authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  username = "Shivanshu";
  password = "";
  invalidLogin = false;
  invalidCredentialsMessage = "Invalid Credentials";

  //to use DI and use router add that in constructor ..
  constructor(
    private router: Router,
    private hardcoadedAuthenticationService: HardcodedAuthenticationService
  ) {}

  ngOnInit() {}

  handleLogin() {
    if (
      this.hardcoadedAuthenticationService.authenticate(
        this.username,
        this.password
      )
    ) {
      this.invalidLogin = false;
      //navigate to other component
      this.router.navigate(["welcome", this.username]);
    } else {
      this.invalidLogin = true;
    }
  }
}
