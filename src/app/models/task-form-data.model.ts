export class TaskFormData {
  public title: string;

  public description: string;

  public dueDate: string;

  public priority: string;

  constructor(title: string, description: string, dueDate: string, priority: string) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}
