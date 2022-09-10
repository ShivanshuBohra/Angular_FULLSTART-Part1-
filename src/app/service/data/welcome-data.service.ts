import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export class HelloWorldBean {
  constructor(public msg: String) {}
}

@Injectable({
  providedIn: "root",
})
export class WelcomeDataService {
  AWS_URL: "http://todoapp-env.eba-7nhjyvvx.us-west-2.elasticbeanstalk.com";

  constructor(private http: HttpClient) {}
  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>(
      // "http://localhost:8080/hello-world-bean"
      //adding AWS URL
      this.AWS_URL + "/hello-world-bean"
    );
  }
}
