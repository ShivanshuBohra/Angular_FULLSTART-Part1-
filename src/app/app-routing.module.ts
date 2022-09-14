import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { abort } from "process";
import { AboutAppComponent } from "./about-app/about-app.component";
import { ErrorComponent } from "./error/error.component";
import { ListTodosComponent } from "./list-todos/list-todos.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { RegistrationComponent } from "./registration/registration.component";
import { RouteGuardService } from "./service/route-guard.service";
import { TermsAndConditionsComponent } from "./terms-and-conditions/terms-and-conditions.component";
import { TodosComponent } from "./todos/todos.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "aboutApp", component: AboutAppComponent },
  { path: "termsAndConditions", component: TermsAndConditionsComponent },
  {
    path: "welcome",
    component: WelcomeComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: "welcome/:name",
    component: WelcomeComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: "todos",
    component: ListTodosComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: "todos/:id",
    component: TodosComponent,
    canActivate: [RouteGuardService],
  },
  { path: "logout", component: LogoutComponent },
  { path: "**", component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
