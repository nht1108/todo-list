import {Component, Inject, OnInit} from '@angular/core';
import {TODO_LIST_SERVICE_INJECTION_TOKEN} from "../../../../constants/injection-token.constant";
import {IToDoListServiceInterface} from "../../../../interfaces/todo-list-service.interface";
import {TaskModel} from "../../../../models/task.model";
import {TaskFormData} from "../../../../models/task-form-data.model";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  //#region Constructor
  constructor(
    @Inject(TODO_LIST_SERVICE_INJECTION_TOKEN) protected todoListService: IToDoListServiceInterface
  ) { }

  //#endregion

  //#region Methods

  public ngOnInit(): void {
  }

  public handleSubmitTaskForm(event: TaskFormData): void {
    const uuid = new Date().getTime() + '_' + Math.random();
    const task = new TaskModel(uuid, event.title, event.description, event.dueDate, event.priority);
    this.todoListService.createNewTask(task);
  }
  //#endregion
}
