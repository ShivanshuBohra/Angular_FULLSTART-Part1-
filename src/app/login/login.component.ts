import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TodoDataService } from "../service/data/todo-data.service";
import { HardcodedAuthenticationService } from "../service/hardcoded-authentication.service";

export class LoginDetails {
  // params in contruct
  constructor(public username: String, public password: String) {}
}

export class AuthenticationDetails {
  // params in contruct
  constructor(public isValid: Boolean, public username: String) {}
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  username = "shivanshu";
  password = "";
  invalidLogin = false;
  invalidCredentialsMessage = "Invalid Credentials";
  loginDetails: LoginDetails;
  authenticationDetails: AuthenticationDetails;

  //to use DI and use router add that in constructor ..
  constructor(
    private router: Router,
    private hardcoadedAuthenticationService: HardcodedAuthenticationService,
    private todoDataService: TodoDataService
  ) {}

  ngOnInit() {}

  handleLogin() {
    // if (
    //   this.hardcoadedAuthenticationService.authenticate(
    //     this.username,
    //     this.password
    //   )
    // ) {
    //   this.invalidLogin = false;
    //   //navigate to other component
    //   this.router.navigate(["welcome", this.username]);
    // } else {
    //   this.invalidLogin = true;
    // }

    this.loginDetails = new LoginDetails(this.username, this.password);
    this.authenticationDetails = new AuthenticationDetails(true, "");

    this.hardcoadedAuthenticationService
      .authenticate(this.loginDetails)
      .subscribe((data) => this.handleAysncAuthenticationResponse(data));
  }

  handleAysncAuthenticationResponse(data) {
    this.authenticationDetails = data;
    if (this.authenticationDetails.isValid) {
      this.invalidLogin = false;
      sessionStorage.setItem("authenticateUser", this.username);
      console.log("routing to welcome");
      this.router.navigate(["welcome", this.authenticationDetails.username]);
    } else {
      this.invalidLogin = true;
    }
  }

  handleRegistration() {
    this.router.navigate(["registration"]);
  }

  handlesubscription() {
    var email = prompt(
      "Please Enter the Email and confirm subscription through your email inbox. This is added to test SNS servives by AWS."
    );
    var filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(email)) {
      this.todoDataService
        .sendEmailSubscriptionMail(email)
        .subscribe((data) => window.alert(data));
    }
  }
  aboutApp() {
    console.log("about app");
    window.open(
      "/aboutApp",
      "_blank" // <- This is what makes it open in a new window.
    );
  }
}
