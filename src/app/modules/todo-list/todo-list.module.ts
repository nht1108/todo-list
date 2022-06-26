import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoListRoutingModule} from './todo-list-routing.module';
import {TodoListComponent} from './todo-list.component';
import {NewTaskComponent} from "./components/new-task/new-task.component";
import {TaskListComponent} from "./components/task-list/task-list.component";
import {TaskFormModule} from "../../shared/task-form/task-form.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TodoListComponent,
    NewTaskComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TodoListRoutingModule,
    TaskFormModule
  ]
})
export class TodoListModule {
}
