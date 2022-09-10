import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TodoDataService } from "../service/data/todo-data.service";

// class Todo
export class Todo {
  // params in contruct
  constructor(
    public id: Number,
    public description: String,
    public isDone: boolean,
    public targetDate: Date
  ) {}
}
@Component({
  selector: "app-list-todos",
  templateUrl: "./list-todos.component.html",
  styleUrls: ["./list-todos.component.css"],
})
export class ListTodosComponent implements OnInit {
  // add values craetes new todo class
  // todos = [
  //   new Todo(1, "Java", true, new Date()),
  //   new Todo(2, "Spring Boot/ Rest api", true, new Date()),
  //   new Todo(3, "Hibernate", true, new Date()),
  //   new Todo(4, "My Sql", true, new Date()),
  //   new Todo(5, "Javascript Basics", true, new Date()),
  //   new Todo(6, "Learn Angular", true, new Date()),
  //   new Todo(7, "Deploy Full stack app to AWS", false, new Date()),
  //   new Todo(8, "Learn Bootstrap", false, new Date()),
  // ];

  todos = [];
  message: String;
  username = sessionStorage.getItem("authenticateUser");

  constructor(private todoService: TodoDataService, private router: Router) {}

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService
      .retriveAllTodos(this.username)
      .subscribe((response) => (this.todos = response));
  }
  deleteTodo(id) {
    this.todoService.deleteTodo(id).subscribe((response) => {
      this.message = `Delete of Todo ${id} successful`;
      this.refreshTodos();
    });
  }

  updateTodo(id) {
    console.log("todos");
    this.router.navigate(["todos", id]);
  }

  addTodo() {
    // Pass Id as -1 for adding new todo
    this.router.navigate(["todos", -1]);
  }
}
