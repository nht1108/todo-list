import {Injectable} from '@angular/core';
import {IToDoListServiceInterface} from "../interfaces/todo-list-service.interface";
import {BehaviorSubject, map, Observable} from "rxjs";
import {LocalStorageKeyConstant} from "../constants/local-storage-key.constant";
import {TaskModel} from "../models/task.model";

@Injectable()
export class TodoListService implements IToDoListServiceInterface {

  //#region Properties

  private _todoList: TaskModel[] = [];

  private _todoListSubject: BehaviorSubject<void>;

  //#endregion

  //#region Constructor
  constructor() {
    this._todoListSubject = new BehaviorSubject<void>(void (0));
  }

  //#endregion

  //#region Methods

  // Load todo list from localstorage
  public loadTodoListFromStorageAsync(): Observable<TaskModel[]> {
    return this._todoListSubject.asObservable().pipe(
      map(_ => {
        if (this._todoList && this._todoList.length) {
          return [...this._todoList];
        }
        const todoListJson = localStorage.getItem(LocalStorageKeyConstant.todoList);
        if (!todoListJson) {
          return [];
        }
        this._todoList = JSON.parse(todoListJson);
        return [...this._todoList];
      })
    );
  }

  // Create a new task
  public createNewTask(newTask: TaskModel): void {
    if (!newTask) {
      console.error('NO TASK TO SAVE');
      return;
    }

    this._todoList.push(newTask);
    this.saveToDoList();
  }

  // Update a task
  public updateTask(updatedTask: TaskModel): void {
    if (!updatedTask) {
      console.error('NO TASK TO UPDATE');
      return;
    }

    const id = updatedTask.id;
    const taskIndex = this._todoList.findIndex(task => task.id === id);
    if (taskIndex < 0) {
      console.error('NO TASK MATCH WITH THIS ID: ' + id);
      return;
    }

    this._todoList.splice(taskIndex, 1, updatedTask);
    this.saveToDoList();
  }

  // Delete a single task
  public deleteTask(id: string): void {
    this.deleteTaskWithSkipUpdateStorageOption(id);
  }

  // Delete multiple task at a time
  public deleteTasks(ids: string[]): void {
    if (!ids || !ids.length) {
      return;
    }

    for (let id of ids) {
      this.deleteTaskWithSkipUpdateStorageOption(id, true);
    }
    this.saveToDoList();
  }

  /*
  ** @param shouldSkipUpdateStorage: to check whether update to storage or not
  * */

  private deleteTaskWithSkipUpdateStorageOption(id: string, shouldSkipUpdateStorage: boolean = false) {
    if (!id) {
      return;
    }

    const taskIndex = this._todoList.findIndex(task => task.id === id);
    if (taskIndex < 0) {
      console.error('NO TASK MATCH WITH THIS ID: ' + id);
      return;
    }

    this._todoList.splice(taskIndex, 1);
    if (shouldSkipUpdateStorage) {
      return;
    }
    this.saveToDoList();
  }

  // Save todo list to storage and broadcast change to subscriber
  private saveToDoList(): void {
    const todoListJson = JSON.stringify(this._todoList);
    localStorage.setItem(LocalStorageKeyConstant.todoList, todoListJson);
    this.broadcastToDoListChange();
  }

  private broadcastToDoListChange(): void {
    this._todoListSubject.next();
  }
}
