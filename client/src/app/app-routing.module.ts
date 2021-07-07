import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DashboardComponent,
  ListsComponent,
  SettingsComponent
} from './pages';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'new', loadChildren: () => import('./pages/new/create-list.module').then(m => m.CreateListModule) },
  { path: 'lists', component: ListsComponent },
  { path: 'settings', component: SettingsComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
