import {TaskModel} from "./task.model";

export class TaskViewModel {
  public task: TaskModel;

  public showDetail: boolean;

  public checkedTask: boolean;

  constructor(task: TaskModel) {
    this.task = task;
    this.showDetail = false;
    this.checkedTask = false;
  }
}
