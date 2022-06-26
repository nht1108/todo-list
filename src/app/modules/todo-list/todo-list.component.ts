import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {TODO_LIST_SERVICE_INJECTION_TOKEN} from "../../constants/injection-token.constant";
import {debounceTime, of, Subject, Subscription, switchMap} from "rxjs";
import {TaskModel} from "../../models/task.model";
import {IToDoListServiceInterface} from "../../interfaces/todo-list-service.interface";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  //#region Properties
  public tasks: TaskModel[] = [];

  public searchControl: FormControl;

  private _todoList: TaskModel[] = [];

  private _searchTaskSubject: Subject<string>;

  private readonly _subscription: Subscription;

  //#endregion

  //#region Constructor

  constructor(
    @Inject(TODO_LIST_SERVICE_INJECTION_TOKEN) protected toDoListService: IToDoListServiceInterface
  ) {
    this.searchControl = new FormControl('');

    this._searchTaskSubject = new Subject<string>();
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {
    const hookSearchTaskSubscription = this._searchTaskSubject.asObservable().pipe(
      debounceTime(300),
      switchMap((searchKey: string) => {
        const filteredTaskList = this._todoList.filter(task => task.title.startsWith(searchKey));
        return of(filteredTaskList);
      })
    ).subscribe((taskList: TaskModel[]) => {
      this.tasks = taskList;
    });

    const loadToDoListSubscription = this.toDoListService.loadTodoListFromStorageAsync()
      .subscribe((toDoList: TaskModel[]) => {
        this._todoList = toDoList.sort((taskA, taskB) => {
          const taskADueDate = new Date(taskA.dueDate);
          const taskBDueDate = new Date(taskB.dueDate);
          return taskADueDate.getTime() - taskBDueDate.getTime();
        });
        if (this.searchControl.value) {
          this.handleSearchTask();
          return;
        }
        this.tasks = this._todoList;
      });

    this._subscription.add(loadToDoListSubscription);
    this._subscription.add(hookSearchTaskSubscription);
  }

  public handleSearchTask(): void {
    const searchKey = this.searchControl.value;
    this._searchTaskSubject.next(searchKey);
  }

  public updateTask(task: TaskModel) {
    this.toDoListService.updateTask(task);
  }

  public removeTask(id: string) {
    this.toDoListService.deleteTask(id);
  }

  public removeMultipleTask(ids: string[]): void {
    this.toDoListService.deleteTasks(ids);
  }

  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  //#endregion
}
