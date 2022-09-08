import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WelcomeDataService } from "../service/data/welcome-data.service";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"],
})
export class WelcomeComponent implements OnInit {
  name = "";
  welcomeMessageFromService: String;

  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService
  ) {}

  ngOnInit() {
    this.name = this.route.snapshot.params["name"];
  }

  getWelcomeMessage() {
    this.service.executeHelloWorldBeanService().subscribe(
      (response) => this.handleSuccessfulResponse(response),
      (error) => this.handleErrorResponse(error)
    );
  }

  handleSuccessfulResponse(response) {
    this.welcomeMessageFromService = response.msg;
  }
  handleErrorResponse(error) {
    console.log(error);
    console.log(error.error);
    this.welcomeMessageFromService = error.error.message;
  }
}
