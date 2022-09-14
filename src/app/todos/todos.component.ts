import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Todo } from "../list-todos/list-todos.component";
import { TodoDataService } from "../service/data/todo-data.service";
import { WelcomeComponent } from "../welcome/welcome.component";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"],
})
export class TodosComponent implements OnInit {
  id: Number;
  todo: Todo;
  username = sessionStorage.getItem("authenticateUser");

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.todo = new Todo(1, "", false, new Date());
    this.id = this.route.snapshot.params["id"];

    if (this.id == -1) {
    } else {
      // only retrive data if id is not -1 , because -1 is set for new data post call
      this.todoService
        .retriveTodo(this.username, this.id)
        .subscribe((data) => (this.todo = data));
    }
  }

  saveTodo() {
    if (this.id == -1) {
      //if id =-1 , -1 is passed for new todo so create istead of update
      this.todoService
        .createTodo(this.todo, this.username)
        .subscribe((data) => this.router.navigate(["todos"]));
    } else {
      // only save data if id is not -1 , because -1 is set for new data post call
      this.todoService
        .updateTodo(this.username, this.id, this.todo)
        .subscribe((data) => this.router.navigate(["todos"]));
    }
  }
}
