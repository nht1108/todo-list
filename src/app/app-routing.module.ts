import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'todo-list',
    loadChildren: () => import('./modules/todo-list/todo-list.module').then(m => m.TodoListModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todo-list'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
