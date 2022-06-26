import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {TaskModel} from "../../models/task.model";
import {TaskFormData} from "../../models/task-form-data.model";

class Priority {
  public title: string;

  public value: string;

  constructor(title: string, value: string) {
    this.title = title;
    this.value = value;
  }
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  //#region Properties

  public taskForm: FormGroup;

  public titleControl: FormControl;

  public descriptionControl: FormControl;

  public dueDateControl: FormControl;

  public priorityControl: FormControl;

  public priorityList: Priority[] = [
    new Priority('Low', 'low'),
    new Priority('Normal', 'normal'),
    new Priority('High', 'high')
  ];

  @Input('titleButton')
  public titleButton: string = 'Add';

  @Input('task')
  public task: TaskModel | undefined;

  @Output('submitTaskForm')
  public submitTaskForm = new EventEmitter<TaskFormData>();

  private readonly today: string;

  //#endregion

  //#region Constructor
  constructor() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();

    this.today = `${year}-${month <= 9 ? '0' + month : month}-${date <= 9 ? '0' + date : date}`;

    this.titleControl = new FormControl('', [Validators.required]);
    this.descriptionControl = new FormControl('');
    this.dueDateControl = new FormControl(this.today, [Validators.required, this.validateDueDate]);
    this.priorityControl = new FormControl('normal', [Validators.required]);

    this.taskForm = new FormGroup({
      title: this.titleControl,
      description: this.descriptionControl,
      dueDate: this.dueDateControl,
      priority: this.priorityControl
    });
  }

  //#endregion


  //#region Methods
  public ngOnInit(): void {
    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        dueDate: this.task.dueDate,
        priority: this.task.priority,
      });
    }
  }

  public handleSubmitTaskForm(): void {
    if (this.taskForm.invalid) {
      console.error('FORM IS INVALID');
      return;
    }
    this.submitTaskForm.emit(this.taskForm.value);
    if (this.task) {
      return;
    }
    this.taskForm.patchValue({
      title: '',
      description: '',
      dueDate: this.today,
      priority: 'normal',
    });
    this.taskForm.markAsUntouched();
  }

  protected validateDueDate(dateControl: FormControl): ValidationErrors | null {
    if (!dateControl || !dateControl.value) {
      return null;
    }

    const chosenDate = new Date(dateControl.value);
    chosenDate.setHours(0, 0, 0, 0);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const dateDiff = chosenDate.getTime() - now.getTime();

    if (dateDiff < 0) {
      return {invalidDate: true}
    }
    return null;
  }
}
