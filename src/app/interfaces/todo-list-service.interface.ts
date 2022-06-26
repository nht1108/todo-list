import {Observable} from "rxjs";
import {TaskModel} from "../models/task.model";

export interface IToDoListServiceInterface {

  //#region Methods

  // Load todo list from localstorage
  loadTodoListFromStorageAsync(): Observable<TaskModel[]>;

  // Create a new task
  createNewTask(newTask: TaskModel): void;

  // Update a task
  updateTask(updatedTask: TaskModel): void

  // Delete a task
  deleteTask(id: string): void;

  // Delete multiple task
  deleteTasks(ids: string[]): void

  //#endregion
}
