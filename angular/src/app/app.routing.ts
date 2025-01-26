import { Routes, RouterModule } from '@angular/router';
import { ToDoComponent } from './todo/todo.component';






const routes: Routes = [
  { path: 'todo', component: ToDoComponent },
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
  { path: '**', component : ToDoComponent}
];

export const routing = RouterModule.forRoot(routes); 
