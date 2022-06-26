export class TaskModel {
  public id: string;

  public title: string;

  public description: string;

  public dueDate: string;

  public priority: string;

  public isDone: boolean;

  constructor(id: string, title: string, description: string, dueDate: string, priority: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isDone = false;
  }
}
