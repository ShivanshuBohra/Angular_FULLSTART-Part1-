import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Todo } from "src/app/list-todos/list-todos.component";
import { Session } from "protractor";
import { text } from "@angular/core/src/render3";

@Injectable({
  providedIn: "root",
})
export class TodoDataService {
  constructor(private http: HttpClient) {}

  username = sessionStorage.getItem("authenticateUser");

  AWS_URL: "http://mytodos-env.eba-53zdbfth.us-west-2.elasticbeanstalk.com/";

  createBasicAuthenticationHttpHeader() {
    let authUsername = "user";
    let authPassword = "password";
    let basicAuthHeaderString =
      // window.btao is used to convert into base 64 encoading
      "Basic " + window.btoa(`${authUsername}:${authPassword}`);
    return basicAuthHeaderString;
  }

  retriveAllTodos(username) {
    // The logic to add authentication is defined in HttpIntercepterBasic authention so need to pass headers additionally
    //Also add the intercepter class in providers in app.module.ts
    //rtreive authentication used in spring security
    //let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();
    //let headers = new HttpHeaders({ Authorization: basicAuthHeaderString });
    return this.http.get<Todo[]>(
      //for local springboot app
      // `http://localhost:5000/users/${username}/todos`
      // We are Using HTTP intercepter so no need to pass headers additionally
      // `http://localhost:5000/users/${username}/todos`,
      // { headers: headers } // first header is contant second one is value passed
      //for Aws app call
      `http://mytodos-env.eba-53zdbfth.us-west-2.elasticbeanstalk.com/users/${username}/todos`
    );
  }

  deleteTodo(id) {
    // return this.http.delete(`http://localhost:8080/deleteTodo/${id}`);
    // return this.http.delete(`http://localhost:5000/deleteTodo/${id}`);
    //adding aws URL
    return this.http.delete(
      `http://mytodos-env.eba-53zdbfth.us-west-2.elasticbeanstalk.com/deleteTodo/${id}`
    );
  }

  retriveTodo(username, id) {
    return this.http.get<Todo>(
      //  `http://localhost:5000/users/${this.username}/todos/${id}`
      //  `http://localhost:8080/users/${username}/todos/${id}`
      `http://mytodos-env.eba-53zdbfth.us-west-2.elasticbeanstalk.com/users/${username}/todos/${id}`
    );
  }

  updateTodo(username, id, todo) {
    return this.http.put(
      // `http://localhost:5000/users/${username}/todos/${id}`,
      //  `http://localhost:8080/users/${username}/todos/${id}`,
      `http://mytodos-env.eba-53zdbfth.us-west-2.elasticbeanstalk.com/users/${username}/todos/${id}`,
      todo
    );
  }

  createTodo(todo, username) {
    return this.http.post(
      //  ` http://localhost:5000/users/${this.username}/todos`,
      `http://mytodos-env.eba-53zdbfth.us-west-2.elasticbeanstalk.com/users/${username}/todos`,
      todo
    );
  }

  saveUserRegistrationDetails(loginDetails) {
    return this.http.post(
      //` http://localhost:5000/registerUser`,

      `http://mytodos-env.eba-53zdbfth.us-west-2.elasticbeanstalk.com/registerUser`,
      loginDetails
    );
  }

  sendEmailSubscriptionMail(email) {
    return this.http.get(
      // ` http://localhost:5000/addSubscription/${email}`,
      ` http://mytodos-env.eba-53zdbfth.us-west-2.elasticbeanstalk.com/addSubscription/${email}`,
      {
        responseType: "text" as "text",
      }
    );
  }
}
