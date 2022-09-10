import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ErrorComponent } from "./error/error.component";
import { ListTodosComponent } from "./list-todos/list-todos.component";
import { MenuComponent } from "./menu/menu.component";
import { FooterComponent } from "./footer/footer.component";
import { LogoutComponent } from "./logout/logout.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TodosComponent } from "./todos/todos.component";
import { HttpIntercepterBasicAuthService } from "./service/http/http-intercepter-basic-auth.service";
import { RegistrationComponent } from "./registration/registration.component";
import { TermsAndConditionsComponent } from "./terms-and-conditions/terms-and-conditions.component";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ListTodosComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    TodosComponent,
    RegistrationComponent,
    TermsAndConditionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercepterBasicAuthService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
