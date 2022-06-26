import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TaskModel} from "../../../../models/task.model";
import {TaskViewModel} from "../../../../models/task.view-model";
import {TaskFormData} from "../../../../models/task-form-data.model";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnChanges {

  //#region Properties

  @Input('tasks')
  public tasks: TaskModel[] = [];

  @Output('updateTask')
  public updateTask = new EventEmitter<TaskModel>();

  @Output('removeTask')
  public removeTask = new EventEmitter<string>();

  @Output('removeTasks')
  public removeTasks = new EventEmitter<string[]>();

  public taskList: TaskViewModel[] = [];

  // Check whether bulk action should show or not
  public get shouldShowBulkAction(): boolean {
    return this.taskList.some(task => task.checkedTask);
  }

  //#endregion

  //#region Constructor
  constructor() {
  }

  //#endregion

  //#region Methods

  public ngOnChanges(changes: SimpleChanges): void {
    this.taskList = this.tasks.map(task => {
      return new TaskViewModel(task);
    });
  }

  public ngOnInit(): void {
  }

  public showTaskForm(taskItem: TaskViewModel): void {
    taskItem.showDetail = !taskItem.showDetail;
  }

  public handleTickTask(event: Event,taskItem: TaskViewModel): void {
    taskItem.checkedTask = (event.target as HTMLInputElement).checked;
  }

  public handleRemoveTask(task: TaskModel): void {
    this.removeTask.emit(task.id);
  }

  public handleSubmitTaskForm(event: TaskFormData, task: TaskModel): void {
    task.title = event.title;
    task.description = event.description;
    task.dueDate = event.dueDate;
    task.priority = event.priority;

    this.updateTask.emit(task);
  }

  public removeMultipleTask(): void {
    const chosenTaskList = this.taskList.filter(taskItem => taskItem.checkedTask);
    if (chosenTaskList && chosenTaskList.length) {
      this.removeTasks.emit(chosenTaskList.map(taskItem => taskItem.task.id));
    }
  }

  // TODO: Implement new feature mark task is done.
  public markDoneTask(): void {

  }
  //#endregion

}
