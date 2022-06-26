import {InjectionToken} from "@angular/core";
import {IToDoListServiceInterface} from "../interfaces/todo-list-service.interface";

export const TODO_LIST_SERVICE_INJECTION_TOKEN = new InjectionToken<IToDoListServiceInterface>('Injection token for navigation service');
