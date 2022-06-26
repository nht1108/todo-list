import {NgModule} from '@angular/core';
import {TODO_LIST_SERVICE_INJECTION_TOKEN} from "../constants/injection-token.constant";
import {TodoListService} from "./todo-list.service";

@NgModule({
  providers: [
    {
      provide: TODO_LIST_SERVICE_INJECTION_TOKEN,
      useClass: TodoListService
    }
  ]
})
export class ServicesModule {
}
