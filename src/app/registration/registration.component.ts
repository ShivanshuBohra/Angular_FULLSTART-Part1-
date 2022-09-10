import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginDetails } from "../login/login.component";
import { TodoDataService } from "../service/data/todo-data.service";
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from "./must-match.validator";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loginDetails: LoginDetails;
  constructor(
    private formBuilder: FormBuilder,
    private todoDataService: TodoDataService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.saveRegistrationDetails();
  }

  saveRegistrationDetails() {
    // registerForm.value returns object so you can take valyes from object
    this.loginDetails = new LoginDetails(
      this.registerForm.value.firstName,
      this.registerForm.value.password
    );
    this.todoDataService
      .saveUserRegistrationDetails(this.loginDetails)
      .subscribe(
        (response) => {
          alert(
            " You have been registered. Login to explore more . Click Ok to Login"
          );
          window.location.href = "/login";
        },
        (error) => {
          console.log(error.status);
          if (error.status == 500) {
            alert(
              "The Username you selected already exists in Database , Please select unique user name"
            );
          }
        }
      );
  }
}
