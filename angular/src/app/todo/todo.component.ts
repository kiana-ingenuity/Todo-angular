import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToDo } from '../models/ToDo';
import { ToDoService } from '../services/todo_service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class ToDoComponent implements OnInit {
  model_todo = new ToDo()
  SelectedStatus: string = "Not Completed";
  SelectedPriority: string = "Low";
  displayedColumns: string[] = ['Action', 'Id', 'Title', 'CreateDate', 'Status', 'Priority'];
  dataSource: MatTableDataSource<ToDo>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  btnAddUpdateVal: string;

  constructor(private todoService: ToDoService, private datepipe: DatePipe) {

  }

  listTodos() {
    this.todoService.getAll().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  createTodo(param: ToDo) {
    if (this.btnAddUpdateVal == "Update") {
      this.updateTodo();
      return;
    }
    let todo = {
      id: new Date().getTime(),
      CreateDate: this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss'),
      Title: param.Title,
      Status: this.SelectedStatus,
      Priority: this.SelectedPriority,
    }
    this.todoService.create(todo).subscribe({
      next: (response) => {
        this.listTodos();
        this.Clear();
      }
    });
  }

  editTodo(todo: ToDo) {
    this.btnAddUpdateVal = "Update";
    this.model_todo.id = todo.id;
    this.model_todo.Title = todo.Title;
    this.model_todo.CreateDate = todo.CreateDate;
    this.SelectedStatus = todo.Status;
    this.SelectedPriority = todo.Priority;
  };

  updateTodo() {
    let data = {
      id: this.model_todo.id,
      Title: this.model_todo.Title,
      CreateDate: this.model_todo.CreateDate,
      Status: this.SelectedStatus,
      Priority: this.SelectedPriority,
    }
    this.todoService.update(data.id, data).subscribe({
      next: (response) => this.listTodos()
    });
  }

  deleteTodo(id: any) {
    this.todoService.delete(id).subscribe({
      next: (response) => {
        this.listTodos();
        this.Clear();
      }
    });
  }

  ngOnInit() {
    this.listTodos();
    this.Clear();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Clear() {
    this.btnAddUpdateVal = "Add";
    this.SelectedPriority = "Low";
    this.SelectedStatus = "Not Completed";
    this.model_todo.Title = "";
  }


}




